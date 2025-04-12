import AuthLayout from "@/components/admin/auth/layout/AuthLayout";

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
