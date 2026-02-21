"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  getAgentApplicationById,
  approveAgentApplication,
  rejectAgentApplication,
} from "@/lib/admin";

interface AgentApplicationDetails {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  phone: string;
  address: string;
  professional: {
    companyName: string;
    licenseCountry: string;
    licenseNumber: string;
    yearsExperience: string;
    specialization: string[];
  };
  documents: {
    label: string;
    url: string[];
  }
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
}

export default function AgentApplicationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [application, setApplication] =
    useState<AgentApplicationDetails | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const data = await getAgentApplicationById(id as string);
      setApplication(data.application);
    } catch {
      toast.error("Failed to load application");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchApplication();
  }, [id]);

  const handleApprove = async () => {
    try {
      await approveAgentApplication(id as string);
      toast.success("Application approved");
      fetchApplication();
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async () => {
    if (!reason.trim()) {
      toast.error("Please provide rejection reason");
      return;
    }

    try {
      await rejectAgentApplication(id as string, reason);
      toast.success("Application rejected");
      fetchApplication();
    } catch {
      toast.error("Failed to reject");
    }
  };

  const documentsArray = Object.entries(application?.documents || {}).map(
  ([label, url]) => ({
    label,
    url,
  })
);


  if (loading) {
    return <div className="py-20 text-center">Loading details...</div>;
  }

  if (!application) {
    return <div className="py-20 text-center">Application not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold">
        Agent Application Details
      </h1>

      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Applicant Info</h2>

        <p>
          <strong>Name:</strong> {application.userId.name}
        </p>
        <p>
          <strong>Email:</strong> {application.userId.email}
        </p>
      </div>

      {/* Basic Info */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Application Info</h2>
        <p><strong>Phone:</strong> {application.phone}</p>
        <p><strong>Company Name:</strong> {application.professional.companyName}</p>
        <p><strong>License Country:</strong> {application.professional.licenseCountry}</p>
        <p><strong>License Number:</strong> {application.professional.licenseNumber}</p>
        <p><strong>Specialization:</strong> {application.professional.specialization.join(", ")}</p>
        <p><strong>Address:</strong> {application.address}</p>
        <p><strong>Specialization:</strong> {application.professional.specialization.join(", ")}</p>
        <p><strong>Experience:</strong> {application.professional.yearsExperience} years</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="capitalize p-2">{application.status}</span>
        </p>
      </div>

      {/* Documents */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Submitted Documents</h2>
        {documentsArray.length > 0 ? (
          <ul className="space-y-3">
            {documentsArray.map((doc, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{doc.label}</span>
                <a
                  href={doc.url.url}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  View Document
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No documents submitted.</p>
        )}
      </div>

      {/* Actions */}
      {application.status === "submitted" && (
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-semibold">Admin Actions</h2>

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
            className="w-full mt-4 border px-4 py-2 rounded-md"
          />
        </div>
      )}
    </div>
  );
}
