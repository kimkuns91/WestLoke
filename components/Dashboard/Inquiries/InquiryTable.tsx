import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { getAllInquiries } from "@/actions/inquiry";

export async function InquiryTable() {
  const inquiries = await getAllInquiries();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>상태</TableHead>
            <TableHead>제품</TableHead>
            <TableHead>문의자</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>문의일시</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell>
                <Badge
                  variant={
                    inquiry.status === "PENDING" ? "destructive" : "default"
                  }
                >
                  {inquiry.status === "PENDING" ? "대기중" : "해결됨"}
                </Badge>
              </TableCell>
              <TableCell>{inquiry.amplifier.name}</TableCell>
              <TableCell>
                {inquiry.user?.name || inquiry.name || "게스트"}
              </TableCell>
              <TableCell>
                {inquiry.user?.email || inquiry.email || "이메일 없음"}
              </TableCell>
              <TableCell>{formatDateTime(inquiry.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
