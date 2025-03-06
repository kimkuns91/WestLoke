"use server";

import { ADMIN_EMAIL } from "@/config";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/utils/mailer";

const createEmailTemplate = (params: {
  title: string;
  userName: string;
  productName: string;
  message: string;
  type: "create" | "cancel";
}) => {
  const { title, userName, productName, message, type } = params;
  const bgColor = type === "create" ? "#4F46E5" : "#DC2626";

  return `
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
            background: ${bgColor};
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
          .button {
            display: inline-block;
            background: ${bgColor};
            color: white !important;
            padding: 0.75rem 1.5rem;
            text-decoration: none;
            border-radius: 6px;
            margin-top: 1rem;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            letter-spacing: 0.5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .product-name {
            color: ${bgColor};
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 style="margin:0;font-size:1.5rem;">${title}</h1>
          </div>
          <div class="content">
            <p>Hello <strong>${userName}</strong>,</p>
            <p>Regarding your inquiry for <span class="product-name">${productName}</span>: ${message}</p>
            ${
              type === "create"
                ? `
              <p>We will get back to you as soon as possible.</p>
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/inquiry" class="button" style="color: white !important; text-decoration: none !important; display: inline-block; background: ${bgColor}; padding: 0.75rem 1.5rem; border-radius: 6px; margin-top: 1rem; font-weight: bold; font-size: 16px; text-align: center; letter-spacing: 0.5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                View My Inquiries
              </a>
            `
                : ""
            }
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Westloke Amps. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

const createAdminEmailTemplate = (params: {
  productName: string;
  userName: string;
  userEmail: string;
  inquiryTime: string;
}) => {
  const { productName, userName, userEmail, inquiryTime } = params;

  return `
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
            background: #1F2937;
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
          .info-item {
            margin: 0.5rem 0;
            padding: 0.75rem;
            background: #F3F4F6;
            border-radius: 4px;
          }
          .label {
            color: #6b7280;
            font-size: 0.875rem;
          }
          .value {
            color: #111827;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1 style="margin:0;font-size:1.5rem;">New Inquiry Received</h1>
          </div>
          <div class="content">
            <div class="info-item">
              <div class="label">Product</div>
              <div class="value">${productName}</div>
            </div>
            <div class="info-item">
              <div class="label">Customer</div>
              <div class="value">${userName} (${userEmail})</div>
            </div>
            <div class="info-item">
              <div class="label">Inquiry Time</div>
              <div class="value">${inquiryTime}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

export async function createInquiry({
  amplifierId,
  email,
  name,
}: {
  amplifierId: string;
  email?: string;
  name?: string;
}) {
  try {
    const session = await auth();

    // 회원 로그인 상태인 경우
    if (session?.user?.id) {
      // 기존 문의 확인
      const existingInquiry = await prisma.inquiry.findFirst({
        where: {
          userId: session.user.id,
          amplifierId,
        },
      });

      if (existingInquiry) {
        throw new Error("Already inquired");
      }

      const inquiry = await prisma.inquiry.create({
        data: {
          amplifierId,
          userId: session.user.id,
          email: session.user.email || "",
        },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          amplifier: {
            select: {
              name: true,
            },
          },
        },
      });

      // 사용자에게 확인 메일 발송
      await sendMail({
        to: inquiry.user?.email || inquiry.email,
        subject: `Inquiry Confirmation - ${inquiry.amplifier.name}`,
        html: createEmailTemplate({
          title: "Inquiry Confirmation",
          userName: inquiry.user?.name || inquiry.name || "Customer",
          productName: inquiry.amplifier.name,
          message: "your inquiry has been received.",
          type: "create",
        }),
      });

      // 관리자에게 알림 메일 발송
      await sendMail({
        to: ADMIN_EMAIL!,
        subject: `New Inquiry - ${inquiry.amplifier.name}`,
        html: createAdminEmailTemplate({
          productName: inquiry.amplifier.name,
          userName: inquiry.user?.name || inquiry.name || "Customer",
          userEmail: inquiry.user?.email || inquiry.email,
          inquiryTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            dateStyle: "full",
            timeStyle: "long",
          }),
        }),
      });

      revalidatePath("/");
      return inquiry;
    }
    // 비회원인 경우
    else {
      if (!email) {
        throw new Error("Email is required for non-member inquiries");
      }

      // 기존 문의 확인 (이메일 + 앰프 ID로 확인)
      const existingInquiry = await prisma.inquiry.findFirst({
        where: {
          email,
          amplifierId,
        },
      });

      if (existingInquiry) {
        throw new Error("Already inquired with this email");
      }

      const amplifier = await prisma.amplifier.findUnique({
        where: { id: amplifierId },
        select: { name: true },
      });

      if (!amplifier) {
        throw new Error("Amplifier not found");
      }

      const inquiry = await prisma.inquiry.create({
        data: {
          amplifierId,
          email,
          name: name || "Guest",
        },
      });

      // 비회원 사용자에게 확인 메일 발송
      await sendMail({
        to: email,
        subject: `Inquiry Confirmation - ${amplifier.name}`,
        html: createEmailTemplate({
          title: "Inquiry Confirmation",
          userName: name || "Customer",
          productName: amplifier.name,
          message: "your inquiry has been received.",
          type: "create",
        }),
      });

      // 관리자에게 알림 메일 발송
      await sendMail({
        to: ADMIN_EMAIL!,
        subject: `New Inquiry (Non-Member) - ${amplifier.name}`,
        html: createAdminEmailTemplate({
          productName: amplifier.name,
          userName: name || "Guest",
          userEmail: email,
          inquiryTime: new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            dateStyle: "full",
            timeStyle: "long",
          }),
        }),
      });

      revalidatePath("/");
      return inquiry;
    }
  } catch (error) {
    console.error("Failed to create inquiry:", error);
    throw error;
  }
}

export async function getInquiries() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const inquiries = await prisma.inquiry.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        amplifier: {
          select: {
            id: true,
            name: true,
            name_slug: true,
            thumbnail: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return inquiries;
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    throw error;
  }
}

export async function cancelInquiry(inquiryId: string, email?: string) {
  try {
    const session = await auth();

    // 회원 로그인 상태인 경우
    if (session?.user?.id) {
      const inquiry = await prisma.inquiry.findUnique({
        where: { id: inquiryId },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          amplifier: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!inquiry || (inquiry.userId && inquiry.userId !== session.user.id)) {
        throw new Error("Unauthorized");
      }

      await prisma.inquiry.delete({
        where: { id: inquiryId },
      });

      // 사용자에게 취소 확인 메일 발송
      await sendMail({
        to: inquiry.user?.email || inquiry.email,
        subject: `Inquiry Cancelled - ${inquiry.amplifier.name}`,
        html: createEmailTemplate({
          title: "Inquiry Cancelled",
          userName: inquiry.user?.name || inquiry.name || "Customer",
          productName: inquiry.amplifier.name,
          message: "your inquiry has been cancelled.",
          type: "cancel",
        }),
      });

      revalidatePath("/inquiry");
    }
    // 비회원인 경우
    else {
      if (!email) {
        throw new Error(
          "Email is required for non-member inquiry cancellation"
        );
      }

      const inquiry = await prisma.inquiry.findUnique({
        where: { id: inquiryId },
        include: {
          amplifier: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!inquiry || inquiry.email !== email) {
        throw new Error("Unauthorized");
      }

      await prisma.inquiry.delete({
        where: { id: inquiryId },
      });

      // 비회원 사용자에게 취소 확인 메일 발송
      await sendMail({
        to: inquiry.email,
        subject: `Inquiry Cancelled - ${inquiry.amplifier.name}`,
        html: createEmailTemplate({
          title: "Inquiry Cancelled",
          userName: inquiry.name || "Customer",
          productName: inquiry.amplifier.name,
          message: "your inquiry has been cancelled.",
          type: "cancel",
        }),
      });

      revalidatePath("/inquiry");
    }
  } catch (error) {
    console.error("Failed to cancel inquiry:", error);
    throw error;
  }
}

export async function getRecentInquiries(limit = 5) {
  try {
    const inquiries = await prisma.inquiry.findMany({
      take: limit,
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        amplifier: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return inquiries;
  } catch (error) {
    console.error("Failed to fetch recent inquiries:", error);
    return [];
  }
}

export async function getAllInquiries() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        amplifier: {
          select: {
            id: true,
            name: true,
            name_slug: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return inquiries;
  } catch (error) {
    console.error("Failed to fetch all inquiries:", error);
    return [];
  }
}

export async function getInquiriesByEmail(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const inquiries = await prisma.inquiry.findMany({
      where: {
        email,
      },
      include: {
        amplifier: {
          select: {
            id: true,
            name: true,
            name_slug: true,
            thumbnail: true,
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return inquiries;
  } catch (error) {
    console.error("Failed to fetch inquiries by email:", error);
    throw error;
  }
}
