import type { User, UserInfo, UserLoginHistory } from "@prisma/client";

import { prisma } from "../../config/prisma/prisma";
import UserWithStatsDTO from "../dTOs/admin/UserWithStatsDTO";
import { PaginatedDTO } from "../dTOs/shared/PaginatedDTO";
import AuthenticationModeEnum from "../enums/AuthenticationModeEnum";
import UserRoleTypeEnum from "../enums/UserRoleTypeEnum";
import { hashPassword } from "../services/hashService";

/**
 * Gets user by user name
 * @param userName User name
 * @returns {Promise<User | null>}
 */
export async function getUserByUserName(
  userName: string
): Promise<User | null> {
  return await prisma.user.findFirst({
    relationLoadStrategy: "join",
    where: {
      userInfo: {
        userName: userName,
      },
    },
  });
}

/**
 * Gets user by email
 * @param email User email
 * @returns {Promise<User | null>}
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findFirst({
    relationLoadStrategy: "join",
    where: {
      userInfo: {
        email: email,
      },
    },
  });
}

/**
 * Creates user
 * @param userName User name
 * @param email User email
 * @param password User password
 * @returns {Promise<User>}
 */
export async function createUser(
  userName: string,
  email: string,
  password: string
): Promise<User> {
  // TODO: Hash by se m2l d2lat v service
  const hashedPassword = await hashPassword(password);

  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        password: hashedPassword,
      },
    });

    await tx.userInfo.create({
      data: {
        idUser: user.idUser,
        userName: userName,
        email: email,
      },
    });

    const userRoleTypes = await tx.userRoleType.findMany({
      where: {
        value: UserRoleTypeEnum.EDITOR,
      },
    });

    await Promise.all(
      userRoleTypes.map((item) =>
        tx.userRole.create({
          data: {
            idUser: user.idUser,
            idUserRoleType: item.idUserRoleType,
          },
        })
      )
    );

    return user;
  });
}

/**
 * Gets user roles by IdUser
 * @param idUser User Id
 * @returns {Promise<Array<number>>}
 */
export async function getUserRoleValuesByIdUser(
  idUser: string
): Promise<Array<number>> {
  const userRoles = await prisma.userRole.findMany({
    relationLoadStrategy: "join",
    include: {
      userRoleType: true,
      user: true,
    },
    where: {
      idUser: idUser,
    },
  });

  return userRoles.map((item) => item.userRoleType.value);
}

/**
 * Logs login attempt
 * @param idUser User id
 * @param loginSuccessful Login successful
 * @param authMode Authentication mode WEB/ADMIN
 * @returns {Promise<UserLoginHistory>}
 */
export async function logLoginAttempt(
  idUser: string,
  loginSuccessful: boolean,
  authMode: AuthenticationModeEnum
): Promise<UserLoginHistory> {
  return await prisma.userLoginHistory.create({
    data: {
      idUser: idUser,
      loginSuccessful: loginSuccessful,
      authMode: authMode,
    },
  });
}

/**
 * Gets user info by IdUser
 * @param idUser User id
 * @returns {Promise<UserInfo | null>}
 */
export async function getUserInfoByIdUser(
  idUser: string
): Promise<UserInfo | null> {
  return await prisma.userInfo.findFirst({
    where: {
      idUser: idUser,
    },
  });
}

/**
 * Updates user info
 * @param email User email
 * @param userInfo User info
 * @returns {Promise<UserInfo>}
 */
export async function updateUserInfoByEmail(
  email: string,
  userInfo: Partial<Omit<UserInfo, "Email">>
): Promise<UserInfo> {
  return await prisma.userInfo.update({
    where: {
      email: email,
    },
    data: {
      ...userInfo,
    },
  });
}

/**
 * Gets failed login attempts
 * @param idUser User Id
 * @param loginAttemptDateLimit A date from which the attempts should be find
 * @param authMode Authentication mode WEB/ADMIN
 * @returns {Promise<number>}
 */
export async function getFailedLoginAttemptsCountByIdUser(
  idUser: string,
  loginAttemptDateLimit: Date,
  authMode: AuthenticationModeEnum
): Promise<number> {
  return await prisma.userLoginHistory.count({
    where: {
      idUser: idUser,
      loginSuccessful: false,
      loginAttemptDate: {
        gte: loginAttemptDateLimit,
      },
      authMode: authMode,
    },
  });
}

/**
 * Updates user by Id user
 * @param idUser User Id
 * @param user User
 * @returns {Promise<User>}
 */
export async function updateUserByIdUser(
  idUser: string,
  user: Partial<User>
): Promise<User> {
  return await prisma.user.update({
    where: {
      idUser: idUser,
    },
    data: {
      ...user,
    },
  });
}

/**
 * Gets all user permissions
 * @param idUser User Id
 * @returns {Promise<number[]>}
 */
export async function getPermissionsByIdUser(
  idUser: string
): Promise<number[]> {
  const userPermissions = await prisma.user.findMany({
    relationLoadStrategy: "join",
    where: { idUser: idUser },
    select: {
      userPermissionOverride: {
        select: {
          permission: true,
        },
      },
      userRole: {
        select: {
          userRoleType: {
            select: {
              rolePermission: {
                select: {
                  permission: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const rolePermissions = userPermissions?.[0]?.userRole
    .flatMap((r) => r.userRoleType.rolePermission)
    .map((rp) => rp.permission);

  const overridePermissions = userPermissions?.[0]?.userPermissionOverride.map(
    (up) => up.permission
  );

  const allPermissions = [
    ...(rolePermissions || []),
    ...(overridePermissions || []),
  ];

  // Optionally filter out duplicates based on IdPermission
  return Array.from(
    new Map(allPermissions.map((p) => [p.idPermission, p.value])).values()
  );
}

/**
 * Get all users with statistics paginated
 * @param page Page number
 * @param pageSize Page size
 * @param filterValue Search filter value
 * @param orderByField Order by field
 * @param orderDirection Order by direction
 * @returns {Promise<PaginatedDTO<UserWithStatsDTO>>}
 */
export async function getAllUsersPaginated(
  page: number,
  pageSize: number,
  filterValue?: string,
  orderByField?: string,
  orderDirection?: string
): Promise<PaginatedDTO<UserWithStatsDTO>> {
  const skip = (page - 1) * pageSize;
  const isFilterValue = filterValue && filterValue.length >= 3;
  // TODO: Map bych měl dělat v service
  const orderBy =
    orderByField && orderDirection
      ? {
          userInfo: {
            [orderByField]: orderDirection,
          },
        }
      : undefined;
  const where = isFilterValue
    ? {
        userInfo: {
          OR: [
            { email: { search: filterValue } },
            { userName: { search: filterValue } },
          ],
        },
      }
    : undefined;

  const [users, totalCount] = await Promise.all([
    prisma.user
      .findMany({
        cacheStrategy: {
          ttl: 1800,
          swr: 600,
          tags: ["all_users"],
        },
        relationLoadStrategy: "join",
        skip,
        take: pageSize,
        orderBy,
        where,
        select: {
          idUser: true,
          isDisabled: true,
          webLoginRestrictedUntil: true,
          adminLoginRestrictedUntil: true,
          twoFactor: true,
          userInfo: {
            select: {
              userName: true,
              emailVerifiedAt: true,
              imageUrl: true,
              createdAt: true,
              email: true,
            },
          },
          userLoginHistory: {
            select: {
              loginSuccessful: true,
              loginAttemptDate: true,
            },
          },
        },
      })
      .then((users) =>
        users.map((user) => {
          const successfulLoginNumber = user.userLoginHistory.filter(
            (h) => h.loginSuccessful
          ).length;
          const failedLoginNumber = user.userLoginHistory.filter(
            (h) => !h.loginSuccessful
          ).length;
          const lastSuccessfulLogIn = user.userLoginHistory
            ?.filter((h) => h.loginSuccessful)
            ?.sort(
              (a, b) =>
                b.loginAttemptDate.getTime() - a.loginAttemptDate.getTime()
            )[0]?.loginAttemptDate;

          return {
            idUser: user.idUser,
            isDisabled: user.isDisabled,
            webLoginRestrictedUntil: user.webLoginRestrictedUntil,
            adminLoginRestrictedUntil: user.adminLoginRestrictedUntil,
            twoFactor: user.twoFactor,
            userName: user.userInfo?.userName ?? "",
            email: user.userInfo?.email ?? "",
            emailVerifiedAt: user.userInfo?.emailVerifiedAt ?? null,
            imageUrl: user.userInfo?.imageUrl ?? null,
            createdAt: user.userInfo?.createdAt ?? null,
            successfulLoginNumber,
            failedLoginNumber,
            lastSuccessfulLogIn,
          } as UserWithStatsDTO;
        })
      ),
    prisma.user.count({
      cacheStrategy: {
        swr: 1800,
        ttl: 600,
        tags: ["all_users_count"],
      },
      where: isFilterValue
        ? {
            userInfo: {
              OR: [
                {
                  email: {
                    contains: filterValue,
                    mode: "insensitive",
                  },
                },
                {
                  userName: {
                    contains: filterValue,
                    mode: "insensitive",
                  },
                },
              ],
            },
          }
        : undefined,
    }),
  ]);

  return { items: users, totalCount };
}

export const userRepository = {
  getUserByUserName,
  getUserByEmail,
  createUser,
  getUserRoleValuesByIdUser,
  logLoginAttempt,
  getUserInfoByIdUser,
  updateUserInfoByEmail,
  getFailedLoginAttemptsCountByIdUser,
  updateUserByIdUser,
  getPermissionsByIdUser,
  getAllUsersPaginated,
};
