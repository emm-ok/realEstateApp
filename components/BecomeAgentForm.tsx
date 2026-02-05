"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

/* =========================
   TYPES
========================= */

type PersonalInfo = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
};

type ProfessionalInfo = {
  licenseNumber: string;
  yearsExperience: number;
  specialization: string[];
  companyName: string;
  website: string;
};

type Profile = {
  bio: string;
  areasServed: string;
  languages: string;
};

type Documents = {
  idCard?: string;
  realEstateLicense?: string;
  selfie?: string;
};

type AgentFormData = {
  personal: PersonalInfo;
  professional: ProfessionalInfo;
  profile: Profile;
  documents: Documents;
};

const SPECIALIZATIONS = [
  "residential",
  "commercial",
  "luxury",
  "student",
  "shortlet",
  "land",
];

/* =========================
   COMPONENT
========================= */

export default function BecomeAgentEnterprise() {
  const { user } = useAuth();
  const userId = user?._id;

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AgentFormData>({
    personal: { fullName: "", email: "", phone: "", country: "", city: "" },
    professional: {
      licenseNumber: "",
      yearsExperience: 0,
      specialization: [],
      companyName: "",
      website: "",
    },
    profile: { bio: "", areasServed: "", languages: "" },
    documents: {},
  });

  /* =========================
     HANDLERS
  ========================= */

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, dataset } = e.target;
    const section = dataset.section as keyof AgentFormData;
    if (!section) return;

    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const toggleSpec = (spec: string) => {
    setFormData((prev) => {
      const current = prev.professional.specialization;
      return {
        ...prev,
        professional: {
          ...prev.professional,
          specialization: current.includes(spec)
            ? current.filter((s) => s !== spec)
            : [...current, spec],
        },
      };
    });
  };

  /* =========================
     BASE64 FILE UPLOAD
  ========================= */

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const uploadDocument = async (type: keyof Documents, file: File) => {
    if (!userId) return;
    try {
      const form = new FormData();
      form.append("type", type);
      form.append("file", file);

      const res = await api.post("/api/users/agent/upload-doc", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if(res.data.success){
        setFormData((prev) => ({
          ...prev,
          documents: { ...prev.documents, [type]: res.data.url },
        }));
        toast.success(`${type} uploaded`);
        
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  /* =========================
     AUTOSAVE
  ========================= */

  useEffect(() => {
    if(step === 3) return;
    const timer = setTimeout(saveDraft, 1000);
    return () => clearTimeout(timer);
  }, [formData, step]);

  const saveDraft = async () => {
    if (!userId) return;
    try {
      setSaving(true);
      await api.post("/api/users/agent/save-draft", {
        updates: 
          step === 1 ? { personal: formData.personal } :
          step === 2 ? { professional: formData.professional } :
          step === 3 ? { documents: formData.documents } :
          step === 4 ? { profile: formData.profile } :
          {},
          currentStep: step,
      });
    } catch (err) {
      console.error("Draft save error", err);
      toast.error("Draft save error");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     SUBMIT APPLICATION
  ========================= */

  const submitApplication = async () => {
    if (!userId) return;
    await saveDraft();
    try {
      const res = await api.post("/api/users/agent/submit", { userId });
      if (res.data.success) toast.success("Application submitted");
      else toast.error(res.data.message || "Submit failed");
    } catch (err) {
      console.error(err);
      toast.error("Submit failed");
    }
  };

  /* =========================
     STEP VALIDATION
  ========================= */

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return Object.values(formData.personal).every((v) => v.trim() !== "");
      case 2:
        return (
          formData.professional.licenseNumber.trim() !== "" &&
          formData.professional.yearsExperience > 0 &&
          formData.professional.specialization.length > 0
        );
      case 3:
        return (
          formData.documents.idCard &&
          formData.documents.selfie &&
          formData.documents.realEstateLicense
        );
      case 4:
        return (
          formData.profile.bio.trim() !== "" &&
          formData.profile.areasServed.trim() !== "" &&
          formData.profile.languages.trim() !== ""
        );
      default:
        return true;
    }
  };

  const progress = (step / 5) * 100;

  /* =========================
     UI
  ========================= */

  return (
    <main className="min-h-screen bg-slate-50">
      <Toaster />
      <section className="bg-gradient-to-r from-indigo-900 to-blue-800 py-20 text-center text-white">
        <h1 className="text-4xl font-bold">
          Become a Verified Real Estate Agent
        </h1>
        <p className="opacity-90 mt-2">Complete your professional profile</p>
      </section>

      <section className="max-w-4xl mx-auto -mt-16 bg-white rounded-xl shadow-xl p-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-indigo-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Step {step} of 5</p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.keys(formData.personal).map((k) => (
                  <input
                    key={k}
                    name={k}
                    data-section="personal"
                    value={formData.personal[k as keyof PersonalInfo]}
                    onChange={handleChange}
                    placeholder={k}
                    className="input"
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-4">Professional Info</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  name="licenseNumber"
                  data-section="professional"
                  value={formData.professional.licenseNumber}
                  onChange={handleChange}
                  placeholder="License Number"
                  className="input"
                />
                <input
                  name="yearsExperience"
                  data-section="professional"
                  type="number"
                  value={formData.professional.yearsExperience}
                  onChange={handleChange}
                  placeholder="Years Experience"
                  className="input"
                  min={0}
                />
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                {SPECIALIZATIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSpec(s)}
                    className={`px-3 py-1 rounded ${
                      formData.professional.specialization.includes(s)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
              {(["idCard", "selfie", "realEstateLicense"] as const).map((doc) => (
                <div key={doc} className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) await uploadDocument(doc, file);
                    }}
                  />
                  {formData.documents[doc] && (
                    <p className="text-green-600 text-sm">Uploaded</p>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <textarea
                name="bio"
                data-section="profile"
                value={formData.profile.bio}
                onChange={handleChange}
                placeholder="Short Bio"
                className="input mb-2"
              />
              <input
                name="areasServed"
                data-section="profile"
                value={formData.profile.areasServed}
                onChange={handleChange}
                placeholder="Areas Served"
                className="input mb-2"
              />
              <input
                name="languages"
                data-section="profile"
                value={formData.profile.languages}
                onChange={handleChange}
                placeholder="Languages"
                className="input"
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <pre className="bg-gray-100 p-4 rounded text-xs">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              className="btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 5 ? (
            <button
              className={`btn-primary ml-auto px-4 py-2 rounded-lg ${
                !isStepComplete() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => isStepComplete() && setStep(step + 1)}
              disabled={!isStepComplete()}
            >
              Next
            </button>
          ) : (
            <button className="btn-primary ml-auto" onClick={submitApplication}>
              Submit
            </button>
          )}
        </div>

        {saving && <p className="text-xs text-gray-400 mt-2">Saving draft...</p>}
      </section>
    </main>
  );
}
