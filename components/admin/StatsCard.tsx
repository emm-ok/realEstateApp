"use client"

import { getAllUsers } from "@/lib/admin";
import { User } from "@/types/auth";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import AdminUserRow from "./AdminUserRow";
import { useAuth } from "@/context/AuthContext";

const StatsCard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const {user} = useAuth();

  const fetchAllUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log(data)
      setUsers(data?.users || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const filteredUsers = users.filter((u) => 
      u.email.toLowerCase().includes(search.toLowerCase()) || 
      u.name.toLowerCase().includes(search.toLowerCase()) 
  );

  if(user?.role !== "admin") return;
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
        {loading ? (
            <Skeleton className="h-10 rounded-xl" />
        ) : (
            <input 
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl px-4 py-2 text-sm border"
            />
        )}

      <div className="md:block overflow-x-auto overflow-y-auto rounded-3xl shadow-sm">
        <table className="w-screen">
          <thead className="">
            <tr className="grid grid-cols-6 p-4">
              <th className="text-left text-xs">Name</th>
              <th className="text-left text-xs">Role</th>
              <th className="text-left text-xs">LoginType</th>
              <th className="text-left text-xs">
                Status
              </th>
              <th className="text-left text-xs">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <SkeletonTableRow key={i} />
              ))}
            {!loading && filteredUsers.length === 0 && (
                <tr>
                    <td colSpan={6} className="p-6 text-center">
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

export default StatsCard;


const SkeletonTableRow = () => (
  <tr className="border-b last:border-none border-border">
    <td className="p-4">
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
    <td><Skeleton className="h-4 w-20" /></td>
    <td className="pr-4"><Skeleton className="h-8 w-8 rounded-md" /></td>
  </tr>
);
