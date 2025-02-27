"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import Image from "next/image";
import { User } from "@prisma/client";
import { deleteAccount } from "@/actions/user";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface UserProfileProps {
  user: Pick<User, "id" | "name" | "email" | "image" | "role" | "createdAt">;
}

export function UserProfile({ user }: UserProfileProps) {
  // const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const t = useTranslations("UserProfile");

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount(); // 1. DB에서 사용자 계정 삭제

      // 2. 사용자에게 즉시 피드백
      toast.success(t("deleteSuccess"));

      // 3. 2초 후에 세션 정리 및 리다이렉트
      setTimeout(async () => {
        await signOut({
          redirect: true,
          callbackUrl: "/",
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to delete account:", error);
      toast.error(t("deleteError"));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-6">
          <div className="relative h-24 w-24">
            <Image
              src={user.image || "/images/noUser.webp"}
              alt={user.name || "사용자"}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("name")}
              </label>
              <p className="text-lg font-medium">{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("email")}
              </label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("joinDate")}
              </label>
              <p className="text-lg">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                {t("role")}
              </label>
              <p className="text-lg capitalize">
                {user.role === "USER" ? t("userRole") : t("adminRole")}
              </p>
            </div>
            <div className="space-y-2 pt-4">
              {/* 프로필 수정 기능 추가 예정 */}
              {/* <Button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full"
              >
                {t("editProfile")}
              </Button> */}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    {t("deleteAccount")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("deleteAccount")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("deleteAccountDescription")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      disabled={isDeleting}
                    >
                      {isDeleting ? t("deleting") : t("confirm")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
