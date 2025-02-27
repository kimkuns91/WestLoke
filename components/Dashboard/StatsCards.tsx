import { MessageSquare, UserCheck, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getUserStats } from "@/actions/user";

export default async function StatsCards() {
  const stats = await getUserStats();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">총 유저</p>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <UserCheck className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">구독자</p>
            <h3 className="text-2xl font-bold">{stats.subscribers}</h3>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <MessageSquare className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">미해결 문의</p>
            <h3 className="text-2xl font-bold">{stats.pendingInquiries}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
}
