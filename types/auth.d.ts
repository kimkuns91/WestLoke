import "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      image: string | null;
      role: UserRole;
      provider: string;
    };
  }

  interface User {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    hashedPassword: string | null;
    emailVerified: Date | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    provider: string;
  }
}
