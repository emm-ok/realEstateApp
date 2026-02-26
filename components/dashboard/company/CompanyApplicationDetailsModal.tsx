"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getCompanyApplicationById,
  approveCompanyApplication,
  rejectCompanyApplication,
} from "@/lib/admin";
import Loader from "@/components/ui/Loader";

interface Props {
  applicationId: string | null;
  onClose: () => void;
  onActionComplete: () => void;
}

interface CompanyApplicationDetails {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  company: {
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    address: string;
    registrationNumber: string;
    description: string;
  };
  documents: Record<string, { url: string }>;
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
}

export default function CompanyApplicationDetailsModal({
  applicationId,
  onClose,
  onActionComplete,
}: Props) {
  const [application, setApplication] =
    useState<CompanyApplicationDetails | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchApplication = async () => {
    if (!applicationId) return;

    try {
      setLoading(true);
      const data = await getCompanyApplicationById(applicationId);
      setApplication(data.application);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  const handleApprove = async () => {
    if (!applicationId) return;
    await approveCompanyApplication(applicationId);
    toast.success("Company approved");
    fetchApplication();
    onActionComplete();
  };

  const handleReject = async () => {
    if (!applicationId) return;

    if (!reason.trim()) {
      toast.error("Please provide rejection reason");
      return;
    }

    await rejectCompanyApplication(applicationId, reason);
    toast.success("Company rejected");
    fetchApplication();
    onActionComplete();
  };

  if (!applicationId) return null;

  const documentsArray = Object.entries(application?.documents || {}).map(
    ([label, value]) => ({
      label,
      url: value?.url,
    }),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {loading ? (
          <div className="py-10 text-center">
            <Loader text="Loading details..." />
          </div>
        ) : !application ? (
          <div className="py-10 text-center">
            <p>Application not found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <h1 className="text-2xl font-bold">
              Company Application Details
            </h1>

            {/* Applicant Info */}
            <div className="space-y-2">
              <h2 className="font-semibold">Applicant Info</h2>
              <p><strong>Name:</strong> {application.userId.name}</p>
              <p><strong>Email:</strong> {application.userId.email}</p>
            </div>

            {/* Company Info */}
            <div className="space-y-2">
              <h2 className="font-semibold">Company Information</h2>
              <p><strong>Company Name:</strong> {application.company.name}</p>
              <p><strong>Email:</strong> {application.company.email}</p>
              <p><strong>Phone:</strong> {application.company.phone}</p>
              <p><strong>License Number:</strong> {application.company.licenseNumber}</p>
              <p><strong>Registration Number:</strong> {application.company.registrationNumber}</p>
              <p><strong>Address:</strong> {application.company.address}</p>
              <p><strong>Description:</strong> {application.company.description}</p>
              <p><strong>Status:</strong> <span className="capitalize">{application.status}</span></p>
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <h2 className="font-semibold">Submitted Documents</h2>
              {documentsArray.length > 0 ? (
                <ul className="space-y-2">
                  {documentsArray.map((doc, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{doc.label}</span>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents submitted.</p>
              )}
            </div>

            {/* Admin Actions */}
            {application.status === "submitted" && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleApprove}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>

                  <button
                    onClick={handleReject}
                    className="bg-rose-600 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </div>

                <textarea
                  placeholder="Rejection reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}