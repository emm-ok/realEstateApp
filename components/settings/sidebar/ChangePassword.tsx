"use client";

import { useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { changePasswordSchema } from "@/lib/validation/changePassword";
import { z } from "zod";
import { changePassword } from "@/lib/user";
import Input from "@/components/ui/Input";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function ChangePassword() {
  const [values, setValues] = useState<FormValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const validateField = (field: keyof FormValues, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    setTouched((prev) => ({ ...prev, [field]: true }));

    try {
      changePasswordSchema.parse(newValues);
      setErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as FormErrors;
        setErrors(fieldErrors);
      }
    }
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      changePasswordSchema.parse(values);

      setLoading(true);
      const res = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      console.log(res.message);
      toast.success(res.message || "Password updated");

      setValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTouched({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
      });
      router.push("/login");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as FormErrors;
        setErrors(fieldErrors);
        toast.error("Please fix the form errors");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    field: keyof FormValues,
    placeholder: string
  ) => {
    const isPassword = true;
    const type = showPassword[field] ? "text" : "password";

    return (
      <div className="relative">
        {touched[field] && values[field] && !errors[field] && (
          <CheckCircle className="text-green-500 absolute right-10 top-3 h-5 w-5" />
        )}

        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => ({
              ...prev,
              [field]: !prev[field],
            }))
          }
          className="absolute right-3 top-3"
        >
          {showPassword[field] ? (
            <EyeOff className="h-4 w-4 text-gray-500" />
          ) : (
            <Eye className="h-4 w-4 text-gray-500" />
          )}
        </button>

        <Input
          type={type}
          value={values[field]}
          onChange={(e) => validateField(field, e.target.value)}
          onBlur={() =>
            setTouched((prev) => ({ ...prev, [field]: true }))
          }
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 px-4 py-2"
        />

        {errors[field] && (
          <p className="text-red-600 text-sm mt-1">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={submit}>
      <h1 className="text-xl font-semibold mb-4">
        Change Password
      </h1>

      <div className="space-y-4">
        {renderInput("currentPassword", "Current Password")}
        {renderInput("newPassword", "New Password")}
        {renderInput("confirmPassword", "Confirm New Password")}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader text="Updating..." /> : "Change Password"}
        </button>
      </div>
    </form>
  );
}
