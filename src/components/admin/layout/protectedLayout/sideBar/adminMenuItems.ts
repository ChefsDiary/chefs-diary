import PermissionTypeEnum from "@/lib/enums/PermissionTypeEnum";
import adminRoutes from "@/lib/routes/adminRoutes";
import AdminMenuItemType from "@/lib/types/admin/AdminMenuItemType";

const adminMenuItems: AdminMenuItemType[] = [
  {
    key: "dashboard-group",
    label: "Dashboard",
    link: adminRoutes.Dashboard,
    icon: "RiDashboardFill",
  },
  {
    key: "users-group",
    label: "Uživatelé",
    permissions: [PermissionTypeEnum.USER_VIEW],
    icon: "FaUserLarge",
    subitems: [
      {
        key: "all-users",
        label: "Všichni uživatelé",
        link: adminRoutes.AllUsers,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
      {
        key: "user-profile",
        label: "Profil uživatele",
        link: adminRoutes.UserProfile,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
      {
        key: "user-roles",
        label: "Práva uživatelů",
        link: adminRoutes.LogIn,
        permissions: [PermissionTypeEnum.USER_VIEW],
      },
    ],
  },
  {
    key: "units-group",
    label: "Jednotky",
    permissions: [PermissionTypeEnum.UNIT_VIEW],
    icon: "FaUnity",
    subitems: [
      {
        key: "units-groups",
        label: "Skupiny jednotek",
        link: adminRoutes.UnitGroups,
        permissions: [PermissionTypeEnum.UNIT_VIEW],
      },
      {
        key: "units",
        label: "Jednotky",
        link: adminRoutes.Units,
        permissions: [PermissionTypeEnum.UNIT_VIEW],
      },
    ],
  },
  {
    key: "ingredients-group",
    label: "Ingredience",
    permissions: [PermissionTypeEnum.INGREDIENT_VIEW],
    icon: "FaPlateWheat",
    subitems: [
      {
        key: "ingredient-groups",
        label: "Skupiny ingrediencí",
        link: adminRoutes.IngredientGroups,
        permissions: [PermissionTypeEnum.INGREDIENT_VIEW],
      },
      {
        key: "ingredients",
        label: "Ingredience",
        link: adminRoutes.Ingredients,
        permissions: [PermissionTypeEnum.INGREDIENT_VIEW],
      },
    ],
  },
  {
    key: "roles-permissions-group",
    label: "Práva a oprávnění",
    permissions: [],
    icon: "FaDatabase",
    subitems: [
      {
        key: "roles",
        label: "Práva",
        link: adminRoutes.Dashboard,
        permissions: [],
      },
      {
        key: "permissions",
        label: "Oprávnění",
        link: adminRoutes.Dashboard,
        permissions: [],
      },
    ],
  },
];

export default adminMenuItems;
