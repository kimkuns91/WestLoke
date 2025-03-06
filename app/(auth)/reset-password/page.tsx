import { Metadata } from "next";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정 | Westloke Amps",
  description: "새로운 비밀번호를 설정하여 계정에 다시 접근하세요.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          유효하지 않은 링크
        </h1>
        <p className="mb-6 text-gray-600">
          비밀번호 재설정 링크가 유효하지 않습니다. 다시 시도해주세요.
        </p>
        <a
          href="/forgot-password"
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          비밀번호 찾기로 돌아가기
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <ResetPasswordForm token={token} />
    </div>
  );
}
