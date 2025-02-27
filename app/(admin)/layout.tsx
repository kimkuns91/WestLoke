import { DashboardNav } from "@/components/Dashboard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // 관리자 권한 체크
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex h-screen">
      <DashboardNav />
      <div className="flex-1 overflow-auto bg-gray-50 p-8">{children}</div>
    </div>
  );
}
