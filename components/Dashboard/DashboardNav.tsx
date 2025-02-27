import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  {
    title: "대시보드",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "유저 관리",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "문의 관리",
    href: "/dashboard/inquiries",
    icon: MessageSquare,
  },
  {
    title: "설정",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardNav() {
  return (
    <nav className="h-full w-64 border-r bg-white p-4">
      <div className="flex h-full flex-col">
        <div className="space-y-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">관리자 대시보드</h2>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>

        <div className="mt-auto border-t pt-4">
          <Link href="/">
            <Button
              variant="destructive"
              size="lg"
              className="w-full gap-2 font-medium"
            >
              <Home className="h-5 w-5" />
              관리자 모드 종료
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
