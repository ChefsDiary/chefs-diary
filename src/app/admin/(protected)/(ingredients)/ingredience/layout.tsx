import PageContent from "@/components/admin/pageContent/PageContent";
import PageTitle from "@/components/admin/pageTitle/PageTitle";
import RedirectUnpermittedPage from "@/components/shared/layout/redirectUnpermittedPage/RedirectUnpermittedPage";
import adminRoutes from "@/lib/routes/adminRoutes";
import { getPermissionsForAdminMenuItem } from "@/lib/utils/admin";

type Props = { children: React.ReactNode };

export default function UnitsLayout({ children }: Props) {
  return (
    <RedirectUnpermittedPage
      allowedPermissions={getPermissionsForAdminMenuItem("units")}
      redirectPath={adminRoutes.Dashboard}
    >
      <div className="min-h-full flex flex-col">
        <PageTitle>Jednotky</PageTitle>
        <PageContent className="flex-1">{children}</PageContent>
      </div>
    </RedirectUnpermittedPage>
  );
}
