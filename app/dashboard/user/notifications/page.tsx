"use client";

import EmailNotifications from "./sections/EmailNotifications";
import MarketingPreferences from "./sections/MarketingPreference";
import ProductUpdates from "./sections/ProductUpdates";
import PushNotifications from "./sections/PushNotifications";

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <EmailNotifications />
      <PushNotifications />
      <ProductUpdates />
      <MarketingPreferences />
    </div>
  );
}
