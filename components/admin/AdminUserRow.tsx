import { User } from "@/types/auth";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AdminUserRowProps {
  user: User;
}

export default function AdminUserRow({ user }: AdminUserRowProps) {
  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <tr className="text-xs grid grid-cols-6 p-4 items-center">
      <td className="">
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10">
            {user?.image ? (
              <Image
                src={user?.image}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full object-cover w-full h-full"
              />
            ) : (
              <Avatar className="w-10 h-10 font-bold shadow-md">
                <AvatarImage
                  src={user?.image || ""}
                  alt={`${initials || ""}`}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="p-5">{initials}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="hidden md:block">
            <div className="font-bold">{user?.name}</div>
            {/* <div>{user?.email}</div> */}
          </div>
        </div>
      </td>

      <td>
        <span>{user?.role}</span>
      </td>
      <td>
        <span>{user?.googleId ? "Google" : "Email"}</span>
      </td>
      <td>
        <span>{user?.isActive ? "active" : "null"}</span>
      </td>
      <td className="flex items-center gap-4">
        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
        <button>
          <MoreVertical size={14} className="text-on-surface/70" />
        </button>
      </td>
      {/* <td>
      </td> */}
    </tr>
  );
}
