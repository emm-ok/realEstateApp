"use client";

import { getAllUsers } from "@/lib/admin";
import { User } from "@/types/auth";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import AdminUserRow from "./AdminUserRow";

const UserTable = ({ user }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsers(data?.users || []);
      setLoading(false);
    })();
  }, []);
  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  if (user?.role !== "admin") return null;

  return (
    <div className="max-w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Users</h2>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg px-3 py-2 border border-gray-300 bg-white outline-none"
        />
      </div>

      {/* Table Card */}
      <div className="w-full overflow-x-auto rounded-xl bg-white shadow-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-left text-gray-500">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Login</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium"></th>
            </tr>
          </thead>

          <tbody>
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}

            {!loading && filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  No users found
                </td>
              </tr>
            )}

            {!loading &&
              filteredUsers.map((user) => (
                <AdminUserRow key={user._id} user={user} />
              ))}
          </tbody>
        </table>      
      </div>
    </div>
  );
};

export default UserTable;

const SkeletonRow = () => (
  <tr>
    <td className="px-4 py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
    </td>
    <td><Skeleton className="h-4 w-16" /></td>
    <td><Skeleton className="h-4 w-12" /></td>
    <td><Skeleton className="h-4 w-16" /></td>
    <td className="text-right pr-4"><Skeleton className="h-6 w-6" /></td>
  </tr>
);
