"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "@/components/ui/Input";
import { toast } from "sonner";
import { getCurrentUser, updateCurrentUser } from "@/lib/user";
import { Delete, Eye, Recycle, User as UserIcon, X } from "lucide-react";
import Image from "next/image";
import { EditProfileSkeleton } from "../skeletons/EditProfileSkeleton";
import { useConfirm } from "../confirm/ConfirmProvider";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  image?: string;
};

const EditProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
    image: "",
  });
  const confirm = useConfirm();

  /* Load user */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          location: data.location || "",
          bio: data.bio || "",
          image: data.image || "",
        });
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* Handlers */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", "photography_profile_upload");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dyliae7ie/image/upload",
        { method: "POST", body: uploadData },
      );
      const data = await res.json();
      setFormData((p) => ({ ...p, image: data.secure_url }));
      toast.success("Photo updated");
    } catch {
      toast.error("Image upload failed");
    } finally {
      setImageLoading(false);
    }
  };
  const handleRemoveImage = () => {
    setImageLoading(true);

    try {
      const uploadData = new FormData();
      uploadData.delete("file");
      setFormData((p) => ({ ...p, image: "" }));
      toast.success("Photo removed");
    } catch {
      toast.error("Image removal failed");
    } finally {
      setImageLoading(false);
    }
  };

  const removeImage = () => {
    confirm({
      title: "Remove Image",
      description: "Your profile image will be removed",
      confirmText: "Remove",
      variant: "info",
      onConfirm: handleRemoveImage,
    });
  };

  const handleSubmit = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const isDirty =
        formData.name !== user.name ||
        formData.phone !== user.phone ||
        formData.location !== user.location ||
        formData.bio !== user.bio ||
        formData.image !== user.image;

      if (!isDirty) {
        toast("No changes to save");
        setSaving(false);
        return;
      }

      const updated = await updateCurrentUser(formData);
      setUser(updated);
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditProfileSkeleton />;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="rounded-2xl p-6 space-y-6 bg-background">
        {/* Avatar + Preview */}
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 group">
            {formData.image ? (
              <>
                <Image
                  src={formData.image}
                  alt="Profile"
                  width={60}
                  height={60}
                  loading="eager"
                  className="w-full h-full rounded-full object-cover border dark:border-zinc-700 cursor-pointer"
                  onClick={() => setPreviewImage(formData.image)}
                />
              </>
            ) : (
              <div
                className="w-24 h-24 flex items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 cursor-pointer"
                onClick={() => toast("Upload a profile image")}
              >
                <UserIcon className="text-zinc-500" size={48} />
              </div>
            )}
            <button className="absolute inset-0 rounded-full bg-black/40 hidden group-hover:flex transition-all duration-700 items-center justify-center">
                <X size={18} color="white" onClick={removeImage} />
                {user.image && (
                  <Eye size={18} color="white" onClick={() => setPreviewImage(formData.image)} />
                )}
            </button>
            {imageLoading && (
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          <label
            className="px-4 py-2 rounded-full text-sm border-gray-400 border  font-medium cursor-pointer
            bg-background text-foreground"
          >
            Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
            />
          </label>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (saving) return;

            confirm({
              title: "Save changes",
              description: "Your profile will be updated",
              confirmText: "Save",
              variant: "info",
              onConfirm: handleSubmit,
            });
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input label="Email" value={user.email} disabled />
          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full mt-1 rounded-xl border border-gray-300 p-4 text-sm
                text-neutral-800
                focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={saving}
              className="px-4 py-2 rounded-xl font-medium cursor-pointer
                bg-background text-foreground border border-border
                disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* ===========================
          Image Preview Modal
      =========================== */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full h-3/4 rounded-xl overflow-hidden"
          >
            <Image
              src={previewImage}
              alt="Preview"
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
            <button
              className="absolute top-3 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
              onClick={() => setPreviewImage(null)}
            >
              <X size={20} />
            </button>
            <button
              onClick={() => {
                removeImage()
                setPreviewImage(null);
              }}
              className="absolute top-15 right-3 text-white bg-black/50 p-2 rounded-full hover:bg-black/70"
            >
              Remove image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
