import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { EmailSettings } from "@/components/Dashboard/Settings/EmailSettings";
import { Loading } from "@/components/Dashboard/Loading";
import { Separator } from "@/components/ui/separator";
import { SiteSettings } from "@/components/Dashboard/Settings/SiteSettings";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">설정</h1>
          <div className="flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 text-sm text-yellow-700">
            <AlertCircle className="h-4 w-4" />
            <span>준비 중인 기능입니다</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">사이트 설정</h2>
          <p className="text-sm text-gray-500">
            사이트의 기본 설정을 관리합니다.
          </p>
          <Separator className="my-4" />
          <Suspense fallback={<Loading />}>
            <SiteSettings />
          </Suspense>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold">이메일 설정</h2>
          <p className="text-sm text-gray-500">
            이메일 알림 설정을 관리합니다.
          </p>
          <Separator className="my-4" />
          <Suspense fallback={<Loading />}>
            <EmailSettings />
          </Suspense>
        </Card>
      </div>
    </div>
  );
}
