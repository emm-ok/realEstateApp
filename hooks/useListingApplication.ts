"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createListingApplication,
  getMyListingApplications,
  getSingleListingApplication,
  updateListingApplicationDraft,
  submitListingApplication,
  uploadListingMedia,
  deleteListingMedia,
  deleteListingApplication,
} from "@/lib/listingApplication";
import { toast } from "sonner";
import { validateListingStep } from "@/lib/validation/listingApplication";
import { apiError } from "@/lib/api";

export function useListingApplication(listingId?: string) {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);
  const [stepLoading, setStepLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [localMedia, setLocalMedia] = useState<{
    images: File[];
    videos: File[];
  }>({ images: [], videos: [] });
  const [uploading, setUploading] = useState(false);

  const [editReturnStep, setEditReturnStep] = useState<number | null>(null);
  const [currentListingId, setCurrentListingId] = useState<string | null>(
    listingId || null,
  );

  const autosaveRef = useRef<NodeJS.Timeout | null>(null);

  /* ================= LOAD OR CREATE ================= */

  useEffect(() => {
    const init = async () => {
      try {
        let listing;

        if (listingId) {
          const res = await getSingleListingApplication(listingId);
          listing = res.listing;
        } else {
          const res = await getMyListingApplications();
          listing = res.listings?.[0];
        }

        if (!listing) {
          const res = await createListingApplication();
          listing = res.newListingApplication;
        }

        setFormData(listing);
        setCurrentStep(listing.currentStep || 1);
        setCurrentListingId(listing._id);
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, [listingId]);

  /* ================= AUTO SAVE (10s) ================= */

  // useEffect(() => {
  //   if (!currentListingId || !formData) return;

  //   autosaveRef.current = setInterval(async () => {
  //     try {
  //       await updateListingApplicationDraft(currentListingId, {
  //         listing: formData,
  //         currentStep,
  //       });
  //     } catch {
  //       console.log("Autosave failed");
  //     }
  //   }, 10000);

  //   return () => {
  //     if (autosaveRef.current) clearInterval(autosaveRef.current);
  //   };
  // }, [formData, currentStep, currentListingId]);

  /* ================= UPDATE FORM ================= */

  const updateForm = (values: any) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
  };

  /* ================= NEXT STEP ================= */

  const next = async () => {
    if (!currentListingId) return;
    if (stepLoading) return;

    const error = validateListingStep(currentStep, formData, localMedia);
    if (error) return toast.error(error);

    setStepLoading(true);

    try {
      /* ---- If returning from edit jump ---- */
      if (editReturnStep) {
        await updateListingApplicationDraft(currentListingId, {
          listing: formData,
          currentStep: editReturnStep,
        });

        setCurrentStep(editReturnStep);
        setEditReturnStep(null);
        return;
      }

      const nextStep = currentStep + 1;

      await updateListingApplicationDraft(currentListingId, {
        listing: formData,
        currentStep: nextStep,
      });

      setCurrentStep(nextStep);
    } finally {
      setStepLoading(false);
    }
  };

  /* ================= BACK ================= */

  const back = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  /* ================= JUMP EDIT ================= */

  const goToStep = async (step: number) => {
    if (!currentListingId) return;

    setEditReturnStep(currentStep);
    setCurrentStep(step);

    await updateListingApplicationDraft(currentListingId, {
      listing: formData,
      currentStep: step,
    });
  };

  /* ================= SUBMIT ================= */

  const submit = async () => {
    if (!currentListingId) return;

    setSubmitLoading(true);

    try {
      await submitListingApplication(currentListingId);
      toast.success("Listing application submitted");
      router.push("/create-listing/listing-application/success");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ================= MEDIA HANDLING ================= */

  // const addMedia = (type: "images" | "videos", files: File[]) => {
  //   setLocalMedia((prev) => ({
  //     ...prev,
  //     [type]: [...prev[type], ...files],
  //   }));
  // };

  const addMedia = async (type: "images" | "videos", files: File[]) => {
    if (!currentListingId) return;

    setUploading(true);

    try {
      await uploadListingMedia(
        currentListingId,
        files,
        type === "images" ? "image" : "video",
      );

      const refreshed = await getSingleListingApplication(currentListingId);
      setFormData(refreshed.listing);
      setLocalMedia({ images: [], videos: [] });
    } finally {
      setUploading(false);
    }
  };

  const removeLocalMedia = (index: number, type: "images" | "videos") => {
    setLocalMedia((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const removeUploadedMedia = async (
    mediaId: string,
    type: "images" | "videos",
  ) => {
    if (!currentListingId) return;

    await deleteListingMedia(currentListingId, mediaId, type);

    setFormData((prev: any) => ({
      ...prev,
      [type]: prev[type].filter((m: any) => m._id !== mediaId),
    }));
  };

  /* ================= DELETE LISTING ================= */

  const deleteListing = async () => {
    if (!currentListingId) return;

    await deleteListingApplication(currentListingId);
    toast.success("Listing deleted");
    router.push("/listings");
  };

  return {
    pageLoading,
    stepLoading,
    submitLoading,
    currentStep,
    formData,
    localMedia,
    updateForm,
    next,
    back,
    goToStep,
    submit,
    addMedia,
    removeLocalMedia,
    removeUploadedMedia,
    deleteListing,
    setCurrentStep,
    setFormData,
    setLocalMedia,
    uploading,
  };
}
