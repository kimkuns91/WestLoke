import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatDate } from "@/lib/utils";
import { getAllUsers } from "@/actions/user";

export async function UserTable() {
  const users = await getAllUsers();

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>유저</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>구독 상태</TableHead>
            <TableHead>가입일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={user.image || "/default-avatar.png"}
                    alt={user.name || ""}
                  />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span>{user.name}</span>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                {user.isSubscribed ? (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                    구독중
                  </span>
                ) : (
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    미구독
                  </span>
                )}
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
