"use server";

import { auth } from "@/auth";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/utils/mailer";

interface SubscribeParams {
  email?: string;
}

export async function subscribe({ email }: SubscribeParams = {}) {
  try {
    const session = await auth();

    // 로그인한 사용자의 경우
    if (session?.user?.id) {
      const user = await prisma.user.update({
        where: { id: session.user.id },
        data: { isSubscribed: true },
      });

      await sendSubscriptionEmail(user.email, user.name || "Customer");
      return { success: true };
    }

    // 로그인하지 않은 사용자의 경우
    if (!email) {
      throw new Error("Email is required");
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // 중복 구독 확인
    const existingSubscription = await prisma.subscription.findUnique({
      where: { email },
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        throw new Error("Already subscribed");
      } else {
        // 비활성화된 구독을 다시 활성화
        await prisma.subscription.update({
          where: { email },
          data: { isActive: true },
        });
      }
    } else {
      // 새 구독 생성
      await prisma.subscription.create({
        data: { email },
      });
    }

    await sendSubscriptionEmail(email);
    return { success: true };
  } catch (error) {
    console.error("Failed to subscribe:", error);
    throw error;
  }
}

export async function unsubscribe() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { isSubscribed: false },
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to unsubscribe:", error);
    throw error;
  }
}

async function sendSubscriptionEmail(email: string, name?: string) {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.5;
          }
          .header {
            background: #B50000;
            color: white;
            padding: 2rem;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: white;
            padding: 2rem;
            border: 1px solid #e5e7eb;
            border-top: none;
            border-radius: 0 0 8px 8px;
          }
          .footer {
            text-align: center;
            padding: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 style="margin:0;font-size:1.5rem;">Welcome to Westloke Newsletter!</h1>
          </div>
          <div class="content">
            <p>Hello ${name ? `<strong>${name}</strong>` : ""},</p>
            <p>Thank you for subscribing to our newsletter. You'll be the first to know about:</p>
            <ul>
              <li>New product releases</li>
              <li>Special offers</li>
              <li>Upcoming events</li>
              <li>Behind-the-scenes content</li>
            </ul>
            <p>Stay tuned for exciting updates!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Westloke Amps. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await sendMail({
    to: email,
    subject: "Welcome to Westloke Newsletter!",
    html,
  });
}

export async function getSubscriptionStatus() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { isSubscribed: false };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isSubscribed: true },
    });

    return { isSubscribed: user?.isSubscribed ?? false };
  } catch (error) {
    console.error("Failed to get subscription status:", error);
    return { isSubscribed: false };
  }
}

export async function getSubscriberStats() {
  const subscribers = await prisma.subscription.groupBy({
    by: ["createdAt"],
    _count: {
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return subscribers.map((sub) => ({
    date: formatDate(sub.createdAt),
    subscribers: sub._count.id,
  }));
}
