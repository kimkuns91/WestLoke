"use server";

import { IUser } from "@/interface/auth";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function getUserProfile(): Promise<IUser | null> {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null;
  }
}

export async function deleteAccount() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      throw new Error("Unauthorized");
    }

    await prisma.user.delete({
      where: {
        email: session.user.email,
      },
    });
  } catch (error) {
    console.error("Failed to delete account:", error);
    throw error;
  }
}

export async function createUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> {
  try {
    // 기존 사용자 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: {
          select: {
            provider: true,
          },
        },
      },
    });

    if (existingUser) {
      // 소셜 로그인 계정이 있는지 확인
      const socialAccount = existingUser.accounts.find(
        (account) =>
          account.provider === "google" || account.provider === "github"
      );

      if (socialAccount) {
        throw new Error(
          `EXISTING_${socialAccount.provider.toUpperCase()}_USER`
        );
      } else if (existingUser.hashedPassword) {
        throw new Error("EXISTING_EMAIL_USER");
      }
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
}

export async function getUserStats() {
  const totalUsers = await prisma.user.count();
  const subscribers = await prisma.user.count({
    where: { isSubscribed: true },
  });
  const pendingInquiries = await prisma.inquiry.count({
    where: { status: "PENDING" },
  });

  return {
    totalUsers,
    subscribers,
    pendingInquiries,
  };
}

export async function getRecentUsers(limit = 5) {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });
}

export async function getAllUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isSubscribed: true,
      createdAt: true,
    },
  });
}
