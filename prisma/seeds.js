import { PrismaClient } from "@prisma/client";
// import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Vytváření rolí
  const auditor = await prisma.userRoleType.upsert({
    where: { code: "AUDITOR" },
    update: {
      value: 7625,
      description: "Auditor",
    },
    create: {
      code: "AUDITOR",
      value: 7625,
      description: "Auditor",
    },
  });

  const support = await prisma.userRoleType.upsert({
    where: { code: "SUPPORT" },
    update: {
      value: 4468,
      description: "Podpora",
    },
    create: {
      code: "SUPPORT",
      value: 4468,
      description: "Podpora",
    },
  });

  const editor = await prisma.userRoleType.upsert({
    where: { code: "EDITOR" },
    update: {
      value: 1984,
      description: "Editor",
    },
    create: {
      code: "EDITOR",
      value: 1984,
      description: "Editor",
    },
  });

  const moderator = await prisma.userRoleType.upsert({
    where: { code: "MODERATOR" },
    update: {
      value: 3128,
      description: "Moderátor",
    },
    create: {
      code: "MODERATOR",
      value: 3128,
      description: "Moderátor",
    },
  });

  const admin = await prisma.userRoleType.upsert({
    where: { code: "ADMIN" },
    update: {
      value: 5150,
      description: "Administrátor",
    },
    create: {
      code: "ADMIN",
      value: 5150,
      description: "Administrátor",
    },
  });

  const superAdmin = await prisma.userRoleType.upsert({
    where: { code: "SUPER_ADMIN" },
    update: {
      value: 2821,
      description: "Super administrátor",
    },
    create: {
      code: "SUPER_ADMIN",
      value: 2821,
      description: "Super administrátor",
    },
  });

  console.log({ auditor, support, editor, moderator, admin, superAdmin });

  // Vytváření oprávnění
  const userView = await prisma.permission.upsert({
    where: { code: "USER_VIEW" },
    update: {
      value: 1,
      description: "Zobrazit uživatele",
    },
    create: {
      code: "USER_VIEW",
      value: 1,
      description: "Zobrazit uživatele",
    },
  });
  const userEdit = await prisma.permission.upsert({
    where: { code: "USER_EDIT" },
    update: {
      value: 2,
      description: "Upravit uživatele",
    },
    create: {
      code: "USER_EDIT",
      value: 2,
      description: "Upravit uživatele",
    },
  });
  const userDelete = await prisma.permission.upsert({
    where: { code: "USER_DELETE" },
    update: {
      value: 3,
      description: "Smazat uživatele",
    },
    create: {
      code: "USER_DELETE",
      value: 3,
      description: "Smazat uživatele",
    },
  });
  const roleAssign = await prisma.permission.upsert({
    where: { code: "ROLE_ASSIGN" },
    update: {
      value: 10,
      description: "Přiřazovat role",
    },
    create: {
      code: "ROLE_ASSIGN",
      value: 10,
      description: "Přiřazovat role",
    },
  });
  const permissionEdit = await prisma.permission.upsert({
    where: { code: "PERMISSION_EDIT" },
    update: {
      value: 20,
      description: "Správa oprávnění",
    },
    create: {
      code: "PERMISSION_EDIT",
      value: 20,
      description: "Správa oprávnění",
    },
  });
  const logView = await prisma.permission.upsert({
    where: { code: "LOG_VIEW" },
    update: {
      value: 30,
      description: "Zobrazit systémové logy",
    },
    create: {
      code: "LOG_VIEW",
      value: 30,
      description: "Zobrazit systémové logy",
    },
  });
  const postApprove = await prisma.permission.upsert({
    where: { code: "POST_APPROVE" },
    update: {
      value: 40,
      description: "Schválit příspěvek",
    },
    create: {
      code: "POST_APPROVE",
      value: 40,
      description: "Schválit příspěvek",
    },
  });
  const recipePublish = await prisma.permission.upsert({
    where: { code: "RECIPE_PUBLISH" },
    update: {
      value: 50,
      description: "Publikovat recept",
    },
    create: {
      code: "RECIPE_PUBLISH",
      value: 50,
      description: "Publikovat recept",
    },
  });
  const recipeEdit = await prisma.permission.upsert({
    where: { code: "RECIPE_EDIT" },
    update: {
      value: 51,
      description: "Upravovat recept",
    },
    create: {
      code: "RECIPE_EDIT",
      value: 51,
      description: "Upravovat recept",
    },
  });
  const recipeDelete = await prisma.permission.upsert({
    where: { code: "RECIPE_DELETE" },
    update: {
      value: 52,
      description: "Mazat recept recept",
    },
    create: {
      code: "RECIPE_DELETE",
      value: 52,
      description: "Publikovat recept",
    },
  });
  const imagePublish = await prisma.permission.upsert({
    where: { code: "IMAGE_PUBLISH" },
    update: {
      value: 60,
      description: "Publikovat obrázky",
    },
    create: {
      code: "IMAGE_PUBLISH",
      value: 60,
      description: "Publikovat obrázky",
    },
  });
  const imageDelete = await prisma.permission.upsert({
    where: { code: "IMAGE_DELETE" },
    update: {
      value: 61,
      description: "Mazat obrázky",
    },
    create: {
      code: "IMAGE_DELETE",
      value: 61,
      description: "Mazat obrázky",
    },
  });
  const commentPublish = await prisma.permission.upsert({
    where: { code: "COMMENT_PUBLISH" },
    update: {
      value: 70,
      description: "Publikovat komentáře",
    },
    create: {
      code: "COMMENT_PUBLISH",
      value: 70,
      description: "Publikovat komentáře",
    },
  });
  const commentDelete = await prisma.permission.upsert({
    where: { code: "COMMENT_DELETE" },
    update: {
      value: 71,
      description: "Mazat komentáře",
    },
    create: {
      code: "COMMENT_DELETE",
      value: 71,
      description: "Mazat komentáře",
    },
  });
  const ratingPublish = await prisma.permission.upsert({
    where: { code: "RATING_PUBLISH" },
    update: {
      value: 80,
      description: "Publikovat hodnocení",
    },
    create: {
      code: "RATING_PUBLISH",
      value: 80,
      description: "Publikovat hodnocení",
    },
  });
  const ticketView = await prisma.permission.upsert({
    where: { code: "TICKET_VIEW" },
    update: {
      value: 90,
      description: "Zobrazit tikety podpory",
    },
    create: {
      code: "TICKET_VIEW",
      value: 90,
      description: "Zobrazit tikety podpory",
    },
  });
  const ticketManage = await prisma.permission.upsert({
    where: { code: "TICKET_MANAGE" },
    update: {
      value: 91,
      description: "Spravovat tikety",
    },
    create: {
      code: "TICKET_MANAGE",
      value: 91,
      description: "Spravovat tikety",
    },
  });
  const settingsEdit = await prisma.permission.upsert({
    where: { code: "SETTINGS_EDIT" },
    update: {
      value: 100,
      description: "Spravovat nastavení systému",
    },
    create: {
      code: "SETTINGS_EDIT",
      value: 100,
      description: "Spravovat nastavení systému",
    },
  });

  const unitView = await prisma.permission.upsert({
    where: { code: "UNIT_VIEW" },
    update: {
      value: 110,
      description: "Zobrazit jednotky",
    },
    create: {
      code: "UNIT_VIEW",
      value: 110,
      description: "Zobrazit jednotky",
    },
  });
  const unitEdit = await prisma.permission.upsert({
    where: { code: "UNIT_EDIT" },
    update: {
      value: 111,
      description: "Spravovat jednotky",
    },
    create: {
      code: "UNIT_EDIT",
      value: 111,
      description: "Spravovat jednotky",
    },
  });
  const unitDelete = await prisma.permission.upsert({
    where: { code: "UNIT_DELETE" },
    update: {
      value: 112,
      description: "Mazat jednotky",
    },
    create: {
      code: "UNIT_DELETE",
      value: 112,
      description: "Mazat jednotky",
    },
  });

  const ingredientView = await prisma.permission.upsert({
    where: { code: "INGREDIENT_VIEW" },
    update: {
      value: 120,
      description: "Zobrazit ingredience",
    },
    create: {
      code: "INGREDIENT_VIEW",
      value: 120,
      description: "Zobrazit ingredience",
    },
  });
  const ingredientEdit = await prisma.permission.upsert({
    where: { code: "INGREDIENT_EDIT" },
    update: {
      value: 121,
      description: "Spravovat ingrediencí",
    },
    create: {
      code: "INGREDIENT_EDIT",
      value: 121,
      description: "Spravovat ingrediencí",
    },
  });
  const ingredientDelete = await prisma.permission.upsert({
    where: { code: "INGREDIENT_DELETE" },
    update: {
      value: 122,
      description: "Mazat ingredience",
    },
    create: {
      code: "INGREDIENT_DELETE",
      value: 122,
      description: "Mazat ingredience",
    },
  });

  console.log({
    userView,
    userEdit,
    userDelete,
    roleAssign,
    permissionEdit,
    logView,
    postApprove,
    recipePublish,
    recipeEdit,
    recipeDelete,
    imagePublish,
    imageDelete,
    commentPublish,
    commentDelete,
    ratingPublish,
    ticketView,
    ticketManage,
    settingsEdit,
    unitView,
    unitEdit,
    unitDelete,
    ingredientView,
    ingredientEdit,
    ingredientDelete,
  });

  // Vytváření RolePermission a přiřazení pro každou roli
  const allRoles = await prisma.userRoleType.findMany();
  const allPermissions = await prisma.permission.findMany();

  const getRoleId = (code) =>
    allRoles.find((r) => r.code === code)?.idUserRoleType;

  const getPermissionId = (code) =>
    allPermissions.find((p) => p.code === code)?.idPermission;

  // Mapování rolí na oprávnění
  const rolePermissionMap = {
    SUPER_ADMIN: [
      userView.code,
      userEdit.code,
      userDelete.code,
      roleAssign.code,
      permissionEdit.code,
      logView.code,
      postApprove.code,
      ticketView.code,
      ticketManage.code,
      settingsEdit.code,
      unitView.code,
      unitEdit.code,
      unitDelete.code,
      ingredientView.code,
      ingredientEdit.code,
      ingredientDelete.code,
    ],
    ADMIN: [
      userView.code,
      userEdit.code,
      roleAssign.code,
      permissionEdit.code,
      logView.code,
      ticketView.code,
      ticketManage.code,
      unitView.code,
      unitEdit.code,
      unitDelete.code,
      ingredientView.code,
      ingredientEdit.code,
      ingredientDelete.code,
    ],
    MODERATOR: [
      postApprove.code,
      ticketView.code,
      commentDelete.code,
      recipeDelete.code,
      unitView.code,
      ingredientView.code,
    ],
    SUPPORT: [
      ticketView.code,
      ticketManage.code,
      unitView.code,
      ingredientView.code,
    ],
    EDITOR: [
      recipePublish.code,
      recipeEdit.code,
      recipeDelete.code,
      imagePublish.code,
      imageDelete.code,
      commentPublish.code,
      ratingPublish.code,
    ],
    AUDITOR: [userView.code, logView.code, unitView.code, ingredientView.code],
  };

  for (const [roleCode, permissionCodes] of Object.entries(rolePermissionMap)) {
    const roleId = getRoleId(roleCode);
    if (!roleId) {
      console.warn(`Role not found: ${roleCode}`);
      continue;
    }

    for (const permissionCode of permissionCodes) {
      const permissionId = getPermissionId(permissionCode);
      if (!permissionId) {
        console.warn(`Permission not found: ${permissionCode}`);
        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          idUserRoleType_idPermission: {
            idUserRoleType: roleId,
            idPermission: permissionId,
          },
        },
        update: {},
        create: {
          idUserRoleType: roleId,
          idPermission: permissionId,
        },
      });
    }
  }

  // Naplní tabulku pro 1000 uživatelů
  // for (let i = 0; i < 1000; i++) {
  //   await prisma.user.create({
  //     data: {
  //       password: faker.internet.password(12),
  //       isDisabled: faker.datatype.boolean(),
  //       twoFactor: faker.datatype.boolean(),

  //       userInfo: {
  //         create: {
  //           userName: faker.internet.username(),
  //           email: faker.internet.email(),
  //           phone: faker.phone.number(),
  //           firstName: faker.firstName,
  //           lastName: faker.lastName,
  //           imageUrl: faker.image.avatar(),
  //           emailVerifiedAt: faker.date.past(),
  //         },
  //       },
  //     },
  //   });
  // }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
