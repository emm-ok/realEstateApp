"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

const messages = [
  {
    id: 1,
    name: "John Doe",
    avatar: User,
    message: "Hey, I need help with my account...",
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: User,
    message: "Can we reschedule our meeting?",
    time: "1h",
    unread: false,
  },
  {
    id: 3,
    name: "Support Bot",
    avatar: User,
    message: "Your ticket has been resolved.",
    time: "3h",
    unread: true,
  },
  {
    id: 4,
    name: "Michael",
    avatar: User,
    message: "Thanks for the update!",
    time: "Yesterday",
    unread: false,
  },
];

export default function ChatPreview() {
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 font-semibold text-sm">Messages</div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition rounded-xl
              ${msg.unread ? "bg-gray-200" : "hover:bg-gray-100"}
            `}
          >
            {/* Avatar */}
            <Avatar className="w-10 h-10">
              {/* <AvatarImage src={msg.avatar} /> */}
              <msg.avatar className="w-full h-full border border-gray-300 rounded-full p-2" />
              {/* <AvatarFallback>{msg.name[0]}</AvatarFallback> */}
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{msg.name}</span>
                <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400">{msg.time}</span>
                    {/* Unread dot */}
                {msg.unread && (
                  <span className="w-2 h-2 rounded-full bg-neutral-400 text-white"></span>
                )}
                </div>
              </div>

              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
