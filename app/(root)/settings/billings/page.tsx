"use client";

import CancelSubscription from "./section/CancelSubscripion";
import CurrentPlan from "./section/CurrentPlan";
import Invoices from "./section/Invoices";
import PaymentMethods from "./section/PaymentMethods";


export default function BillingPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Billing</h1>

      <CurrentPlan />
      <PaymentMethods />
      <Invoices />
      <CancelSubscription />
    </div>
  );
}
