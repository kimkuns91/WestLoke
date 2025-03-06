"use server";

import { auth, signIn, signOut, update } from "@/auth";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/utils/mailer";

const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

export const logout = async () => {
  await signOut();
  revalidatePath("/");
};

export const loginWithCreds = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
    role: "ADMIN",
    redirectTo: "/",
  };

  const existingUser = await getUserByEmail(formData.get("email") as string);
  console.log(existingUser);

  try {
    await signIn("credentials", rawFormData);
  } catch (error: Error | AuthError | unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
  revalidatePath("/");
};

export const resetPassword = async (email: string) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return { error: "User not found with this email" };
    }

    // Generate a reset token (random string)
    const resetToken =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    // Set expiration time (1 hour from now)
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    // Update user with reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Send email with reset link
    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;

    // Create email template
    const emailHtml = createPasswordResetEmailTemplate({
      userName: user.name || "User",
      resetLink,
    });

    // Send email
    await sendMail({
      to: email,
      subject: "Reset Password Request | Westloke Amps",
      html: emailHtml,
    });

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "Failed to process password reset" };
  }
};

export const completePasswordReset = async (
  token: string,
  newPassword: string
) => {
  try {
    // Find user with this token
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(), // Token must not be expired
        },
      },
    });

    if (!user) {
      return { error: "Invalid or expired token" };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user with new password and clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Complete password reset error:", error);
    return { error: "Failed to reset password" };
  }
};

// Email template for password reset
const createPasswordResetEmailTemplate = ({
  userName,
  resetLink,
}: {
  userName: string;
  resetLink: string;
}) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p>Hello ${userName},</p>
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #4a6cf7; color: white !important; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-size: 16px; letter-spacing: 0.5px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">Reset Password</a>
      </div>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; color: #4a6cf7;">${resetLink}</p>
      <p>This link will expire in 1 hour.</p>
      <p>Thank you,<br>Westloke Amps Team</p>
    </div>
  `;
};

export { auth as getSession, update as updateSession };
