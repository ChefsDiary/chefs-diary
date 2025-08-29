import { TableColumn } from "@/lib/types/common/table";

const allUsersColumns: TableColumn[] = [
  {
    label: "Uživatelské jméno",
    key: "userName",
    allowsSorting: true,
  },
  {
    label: "Email",
    key: "email",
    allowsSorting: true,
  },
  {
    label: "Účet vytvořen",
    key: "createdAt",
    allowsSorting: true,
  },
  {
    label: "Email ověřen",
    key: "emailVerifiedAt",
    allowsSorting: true,
  },
  {
    label: "Stav",
    key: "isDisabled",
  },
  {
    label: "Poslední úspěšné přihlášení",
    key: "lastSuccessfulLogIn",
  },
  {
    label: "Úspěšná přihlášení",
    key: "successfulLoginNumber",
  },
  {
    label: "Neúspěšná přihlášení",
    key: "failedLoginNumber",
  },
  {
    label: "Akce",
    key: "actions",
  },
];

export default allUsersColumns;
