import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "비밀번호 찾기 | Westloke Amps",
  description:
    "비밀번호를 잊으셨나요? 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto py-10">
      <ForgotPasswordForm />
    </div>
  );
}
