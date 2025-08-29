import UserWithStatsDTO from "@/lib/dTOs/admin/UserWithStatsDTO";
import { User } from "@heroui/react";

type Props = {
  user: UserWithStatsDTO;
};

export default function TableCellUser({ user }: Props) {
  return (
    <User
      avatarProps={{ radius: "lg", src: user.imageUrl ?? "" }}
      description={user.email}
      name={user.userName}
    />
  );
}
