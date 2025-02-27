"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { useState } from "react";

export function SiteSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: 설정 저장 로직 구현
      toast.success("설정이 저장되었습니다.");
    } catch (error) {
      toast.error("설정 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="siteName">사이트 이름</Label>
        <Input id="siteName" defaultValue="WestLoke Amps" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="siteDescription">사이트 설명</Label>
        <Input
          id="siteDescription"
          defaultValue="Handcrafted boutique tube amplifiers"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="maintenance" />
        <Label htmlFor="maintenance">유지보수 모드</Label>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "저장 중..." : "설정 저장"}
      </Button>
    </form>
  );
}
