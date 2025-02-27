import {
  InquiryList,
  StatsCards,
  SubscriberChart,
  UserList,
} from "@/components/Dashboard";

import { Card } from "@/components/ui/card";
import { Loading } from "@/components/Dashboard/Loading";
import { Suspense } from "react";
import { getSubscriberStats } from "@/actions/subscribe";

export default async function DashboardPage() {
  const subscriberData = await getSubscriberStats();

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <Suspense fallback={<Loading height="h-[120px]" />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 최근 가입한 유저 */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">최근 가입한 유저</h2>
          <Suspense fallback={<Loading height="h-[300px]" />}>
            <UserList />
          </Suspense>
        </Card>

        {/* 최근 문의 내역 */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">최근 문의 내역</h2>
          <Suspense fallback={<Loading height="h-[300px]" />}>
            <InquiryList />
          </Suspense>
        </Card>
      </div>

      {/* 구독자 통계 */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-bold">구독자 통계</h2>
        <Suspense fallback={<Loading height="h-[400px]" />}>
          <SubscriberChart data={subscriberData} />
        </Suspense>
      </Card>
    </div>
  );
}
