"use server";

import { IUser } from "@/interface";
import { auth } from "@/auth";
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
