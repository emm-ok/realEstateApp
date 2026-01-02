"use client";

import React, { useActionState, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LucideGithub, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signUpSchema } from "@/lib/validation/auth";
import { toast } from "sonner";
import z from "zod";
import { redirect } from "next/navigation";

export default function SignUpPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  type SignInState =
  | { error: string; status: string }
  | { formError: string };

  const signUpAction = async (
    prevState: SignInState | undefined,
    formData: FormData
  ) => {
    try {
      const values = {
        name: String(formData.get("name")) as string,
        email: String(formData.get("email")) as string,
        password: String(formData.get("password")) as string,
        confirmPassword: String(formData.get("confirmPassword")) as string,
      };

      signUpSchema.parse(values);

      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 409) {
        return { formError: "Account already exists" };
      }

      if (!res.ok) {
        return { formError: "Failed to create account" };
      }

      toast.success("User account has been created successfully");
      redirect("/auth/signup");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please fix the errors in the form.");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
    //   return { ...prevState, error: 'An unexpected error occurred', status: 'ERROR'}

      return { formError: "An unexpected error occurred" };
    }
  };

  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: "",
    status: "INITIAL",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account 🚀
          </h1>
          <p className="text-gray-500 mt-1">
            Join us and get started in minutes
          </p>
        </div>

        {/* OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          Sign up with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-3 rounded-lg py-3 font-medium transition"
        >
          <LucideGithub size={22} />
          Sign up with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Full Name"
              className="w-full rounded-lg border border-stone-200 px-4 py-2"
            />
            {errors.name && (
              <p className="text-red-600 font-medium">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full rounded-lg border border-stone-200 px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-stone-200 px-4 py-2"
            />
            {errors.password && (
              <p className="text-red-600 font-medium">{errors.password}</p>
            )}
          </div>

          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-lg border border-stone-200 px-4 py-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-600 font-medium">{errors.confirmPassword}</p>
            )}
          </div>

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
            {" "}
            By signing up, you agree to our Terms & Privacy Policy.{" "}
          </p>
          <p className="text-center text-xs text-gray-600 mt-3">
            Already have an account?
            <Link href="/auth/signin" className="text-primary font-bold">
              {" "}
              SignIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
