"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { useState } from "react";

export function EmailSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: 이메일 설정 저장 로직 구현
      toast.success("이메일 설정이 저장되었습니다.");
    } catch (error) {
      toast.error("설정 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="adminEmail">관리자 이메일</Label>
        <Input id="adminEmail" type="email" defaultValue="admin@westloke.com" />
      </div>

      <div className="space-y-4">
        <Label>이메일 알림 설정</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Switch id="newInquiry" defaultChecked />
            <Label htmlFor="newInquiry">새 문의 알림</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="newSubscriber" defaultChecked />
            <Label htmlFor="newSubscriber">새 구독자 알림</Label>
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "저장 중..." : "설정 저장"}
      </Button>
    </form>
  );
}
