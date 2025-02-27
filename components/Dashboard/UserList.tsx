import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate } from "@/lib/utils";
import { getRecentUsers } from "@/actions/user";

export default async function UserList() {
  const users = await getRecentUsers();

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={user.image || "/default-avatar.png"}
              alt={user.name || ""}
            />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="ml-auto text-sm text-gray-500">
            {formatDate(user.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
