import { UserProfile } from "@/components/MyPage/UserProfile";
import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { getUserProfile } from "@/actions/user";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const t = await getTranslations("UserProfile");
  // 먼저 인증 체크
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const user = await getUserProfile();

  if (!user) {
    return (
      <div className="container py-10">
        <h1 className="mb-8 text-2xl font-bold">{t("error")}</h1>
        <p>{t("errorDescription")}</p>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="mb-8 text-2xl font-bold">{t("title")}</h1>
      <div className="space-y-8">
        <UserProfile user={user} />
      </div>
    </div>
  );
}
