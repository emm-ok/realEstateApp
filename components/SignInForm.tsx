"use client";

import React, { useActionState, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LucideGithub, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { signInSchema } from "@/lib/validation/auth";
import z from "zod";
import { redirect } from "next/navigation";

export default function SignInPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  type SignInState =
  | { error: string; status: string }
  | { formError: string };


  const signInAction = async (
    prevState: SignInState | undefined,
    formData: FormData
  ) => {
    try {
      const values = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      };

      signInSchema.parse(values);

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if(!res?.ok){
        return { formError: res?.error || 'Invalid credentials'}
      }

      toast.success("Login successful");
      redirect('/auth/signin')
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast.error("Please fix the errors in the form.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return {
        formError: "Invalid email or password",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(signInAction, {
    error: "",
    status: "INITIAL",
  });

  useEffect(() => {
  if (state?.formError) {
    toast.error(state.formError);
  }
}, [state?.formError]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back 👋</h1>
          <p className="text-gray-500 mt-1">
            Sign in to continue to your account
          </p>
        </div>

        {/* OAuth */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-100 transition"
        >
          <FcGoogle size={22} />
          Continue with Google
        </button>

        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-3 rounded-lg py-3 font-medium transition"
        >
          <LucideGithub size={22} />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Email / Password */}
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
            {errors.email && (
              <p className="text-red-600 font-medium">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
            {errors.password && (
              <p className="text-red-600 font-medium">{errors.password}</p>
            )}
          </div>

          {/* Error */}
          {errors.formError && (
            <p className="text-red-600 font-medium">{errors.formError}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Signing you in…" : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-black cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
