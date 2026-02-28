"use client";

import StatCard from "@/components/dashboard/StatCard";
import {
  Heart,
  Mail,
  Calendar,
  FileText,
  Bell,
  MessageCircle,
  Search,
  Eye,
} from "lucide-react";

export default function UserDashboard() {
  // Normally these would come from API
  const stats = {
    savedProperties: 12,
    inquiries: 5,
    scheduledVisits: 3,
    offersMade: 2,
    newMatches: 6,
    messages: 4,
    savedSearches: 3,
    recentlyViewed: 18,
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* ✅ Top Row (Primary Stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Saved Properties"
          value={stats.savedProperties}
          icon={<Heart size={22} />}
          href="/dashboard/user/saved"
        />

        <StatCard
          title="Inquiries Sent"
          value={stats.inquiries}
          icon={<Mail size={22} />}
          href="/dashboard/user/inquiries"
        />

        <StatCard
          title="Scheduled Visits"
          value={stats.scheduledVisits}
          icon={<Calendar size={22} />}
          href="/dashboard/user/visits"
        />

        <StatCard
          title="Offers Made"
          value={stats.offersMade}
          icon={<FileText size={22} />}
          href="/dashboard/user/offers"
        />
      </div>

      {/* ✅ Second Row (Engagement) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Engagement</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="New Matches"
            value={stats.newMatches}
            icon={<Bell size={22} />}
            href="/dashboard/user/matches"
          />

          <StatCard
            title="Messages"
            value={stats.messages}
            icon={<MessageCircle size={22} />}
            href="/dashboard/user/messages"
          />

          <StatCard
            title="Saved Searches"
            value={stats.savedSearches}
            icon={<Search size={22} />}
            href="/dashboard/user/searches"
          />

          <StatCard
            title="Recently Viewed"
            value={stats.recentlyViewed}
            icon={<Eye size={22} />}
            href="/dashboard/user/recent"
          />
        </div>
      </div>
    </div>
  );
}