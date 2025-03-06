import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getRecentInquiries } from "@/actions/inquiry";

export default async function InquiryList() {
  const inquiries = await getRecentInquiries();

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="flex items-center gap-4">
          <div className="flex-1">
            <p className="font-medium">문의 #{inquiry.id.slice(-4)}</p>
            <p className="text-sm text-gray-500">
              {inquiry.user?.email || inquiry.email || "이메일 없음"}
            </p>
          </div>
          <Badge
            variant={inquiry.status === "PENDING" ? "destructive" : "default"}
          >
            {inquiry.status === "PENDING" ? "대기중" : "해결됨"}
          </Badge>
          <div className="text-sm text-gray-500">
            {formatDate(inquiry.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
