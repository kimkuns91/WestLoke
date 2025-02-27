import { Card } from "@/components/ui/card";
import { InquiryTable } from "@/components/Dashboard/Inquiries/InquiryTable";
import { Loading } from "@/components/Dashboard/Loading";
import { Suspense } from "react";

export default function InquiriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">문의 관리</h1>
      </div>

      <Card className="p-6">
        <Suspense fallback={<Loading />}>
          <InquiryTable />
        </Suspense>
      </Card>
    </div>
  );
}
