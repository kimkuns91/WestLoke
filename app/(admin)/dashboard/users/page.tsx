import { Card } from "@/components/ui/card";
import { Loading } from "@/components/Dashboard/Loading";
import { Suspense } from "react";
import { UserTable } from "@/components/Dashboard/Users/UserTable";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">유저 관리</h1>
      </div>

      <Card className="p-6">
        <Suspense fallback={<Loading />}>
          <UserTable />
        </Suspense>
      </Card>
    </div>
  );
}
