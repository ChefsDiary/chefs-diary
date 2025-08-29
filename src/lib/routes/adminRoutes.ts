const adminRoutes = {
  LogIn: "/admin/prihlaseni",
  ForgottenPassword: "/admin/zapomenute-heslo",
  Dashboard: "/admin",
  AllUsers: "/admin/vsichni-uzivatele",
  UserProfile: "/admin/profil-uzivatele",
  UnitGroups: "/admin/skupiny-jednotek",
  Units: "/admin/jednotky",
  IngredientGroups: "/admin/skupiny-ingredienci",
  Ingredients: "/admin/ingredience",
} as const;

export default adminRoutes;

export type RouteProperty = keyof typeof adminRoutes;
export type RouteValue = (typeof adminRoutes)[RouteProperty];
