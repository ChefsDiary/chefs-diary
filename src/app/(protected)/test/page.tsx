import { redirect } from "next/navigation";

import { auth } from "@/config/auth/auth";
import webRoutes from "@/lib/routes/web/routes";

export default async function TestPage() {
  // TODO: Toto bych asi dal do layoutu
  const session = await auth();

  if (!session) {
    redirect(webRoutes.Login);
  }

  return <div>Test</div>;
}
