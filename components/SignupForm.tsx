"use client";

import React, { useState, useEffect, useActionState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LucideGithub, Loader2, CheckCircle, AppleIcon, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signUpSchema } from "@/lib/validation/auth";
import { toast } from "sonner";
import { z } from "zod";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SignInState = { error: string; status: string } | { formError: string };

export default function SignUpForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [show, setShow] = useState(false);
  const router = useRouter();

  // Auto-clear errors after 4 seconds
  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     const timer = setTimeout(() => setErrors({}), 4000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [errors]);

  // Field-level validation
  const validateField = (field: keyof FormValues, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Handle confirmPassword separately
    if (field === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value !== newValues.password ? "Passwords do not match" : undefined,
      }));
      return;
    }

    // Validate single field using Zod
    const fieldSchema = signUpSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (!result.success) {
        newErrors[field] = result.error.issues[0].message;
      } else {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  // Form submission
  const signUpAction = async (
    prevState: SignInState | undefined,
  ): Promise<SignInState> => {
    try {
      // Validate entire form on submit
      signUpSchema.parse(values);

      const res = await registerUser(values);

      if (!res?.success) {
        return { formError: res?.message || "Failed to create account" };
      }

      toast.success("User account has been created successfully");

      // Reset form (optional)
      setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTouched({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      });

      router.push("/auth/signin");
      
      return { formError: "" };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as FormErrors;
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return { formError: error.message || "An unexpected error occurred" };
    }
  };

  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: "",
    status: "INITIAL",
  });

  // Render input with tick and error
  const renderInput = (
    field: keyof FormValues,
    placeholder: string,
    type: string = "text"
  ) => (
    <div className="relative">
      {touched[field] && values[field] && !errors[field] && (
        <CheckCircle className="text-green-500 absolute right-8 top-3 h-4 w-4" />
      )}
      {field === "password" || field === "confirmPassword" ? ( 
        type === "password" ? (
          <Eye onClick={() => setShow(true)} className="absolute right-3 top-3 h-4 w-4" />
        ): (
          <EyeOff onClick={() => setShow(false)} className="absolute right-3 top-3 h-4 w-4" />
        )
      ): (
        <></>
      )}
      <input
        name={field}
        type={type}
        value={values[field]}
        onChange={(e) => validateField(field, e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, [field]: true }))}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-200 px-4 py-2"
      />
      {errors[field] && (
        <p className="text-red-600 font-medium">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account 🚀
          </h1>
          <p className="text-gray-500 mt-1">Join us and get started in minutes</p>
        </div>

        {/* OAuth */}
        <button
          onClick={() => {
            window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`
          }}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-3 rounded-lg py-3 font-medium transition"
        >
          <AppleIcon size={22} />
          Sign up with Apple
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          {renderInput("name", "Full Name")}
          {renderInput("email", "Email", "email")}
          {renderInput("password", "Password", `${show ? "text" : "password"}`)}
          {renderInput("confirmPassword", "Confirm Password", `${show ? "text" : "password"}`)}

          {state?.formError && (
            <p className="text-sm text-red-600">{state.formError}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending && <Loader2 className="animate-spin h-4 w-4" />}
            Create Account
          </button>

          <p className="text-center text-xs text-gray-600 mt-3">
            By signing up, you agree to our Terms & Privacy Policy.
          </p>
          <p className="text-center text-xs text-gray-600 mt-3">
            Already have an account?
            <Link href="/auth/login" className="text-primary font-bold">
              {" "}
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
