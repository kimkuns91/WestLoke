import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { CancelInquiryButton } from "@/components/CancelInquiryButton";
import Image from "next/image";
import Link from "next/link";
import { getInquiries } from "@/actions/inquiry";
import { getTranslations } from "next-intl/server";

export default async function InquiryPage() {
  const t = await getTranslations("InquiryPage");
  const inquiries = await getInquiries();

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <p className="text-center text-gray-500">{t("noInquiries")}</p>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center space-x-4 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                >
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={inquiry.amplifier.thumbnail}
                      alt={inquiry.amplifier.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <Link
                      href={`/amplifiers/${inquiry.amplifier.name_slug}`}
                      className="text-lg font-medium hover:underline"
                    >
                      {inquiry.amplifier.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {t("price")}: ${inquiry.amplifier.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("inquiryDate")}:{" "}
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CancelInquiryButton inquiryId={inquiry.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
