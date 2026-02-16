import { User } from "@/types/auth";
import { MoreVertical } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AdminUserRow({ user }: { user: User }) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* User */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 w-10 h-10">
          {user.image ? (
            <Image
              src={user.image}
              alt="User avatar"
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Avatar className="w-10 h-10 font-bold">
              <AvatarImage src="" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}

          <div>
            <div className="">{user.name}</div>
            {/* <div className="text-xs text-gray-500">{user.email}</div> */}
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-4 capitalize">{user.role}</td>

      {/* Login */}
      <td className="px-4 py-4">
        {user.googleId ? "Google" : "Email"}
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              user.isActive
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }
          `}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 text-right">
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}
