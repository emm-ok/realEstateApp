"use client";

import React, { useActionState, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2, CheckCircle, AppleIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import { signInSchema } from "@/lib/validation/auth";
import { z } from "zod";
// import { redirect } from "next/navigation";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SignInState = { error: string; status: string } | { formError: string };

export default function SignInPage() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    email: false,
    password: false,
  })
  const router = useRouter();

  useEffect(() => {
    if(Object.keys(errors).length > 0){
      const timer = setTimeout(() => setErrors({}), 4000);
      return () => clearTimeout(timer)
    }
  }, [errors])

  const validateField = (field: keyof FormValues, value: string) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    setTouched((prev) => ({ ...prev, [field]: true }));

    const fieldSchema = signInSchema.shape[field];
    const result = fieldSchema.safeParse(value);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if(!result.success){
        newErrors[field] = result.error.issues[0].message;
      } else{
        delete newErrors[field];
      }
      return newErrors;
    })
  }


  const signInAction = async (
    prevState: SignInState | undefined,
    formData: FormData
  ): Promise<SignInState> => {
    try {
      signInSchema.parse(values);

      const res = await loginUser(values)

      if(!res?.success) {
        return { formError: res?.message || "Login failed" }
      }
      toast.success("Login successful");

      setValues({
        email: "",
        password: "",
      });
      setTouched({
        email: false,
        password: false,
      });

      router.push('/');
      
      return { formError: "" };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as FormErrors;
        setErrors(fieldErrors);
        toast.error("Please fix the errors in the form.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      return {
        formError: error.message || "Invalid email or password",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(signInAction, {
    error: "",
    status: "INITIAL",
  });


  const renderInput = (
    field: keyof FormValues,
    placeholder: string,
    type: string = "text"
  ) => (
    <div className="relative">
      {touched[field] && values[field] && !errors[field] && (
        <CheckCircle className="text-green-500 absolute right-3 top-3 h-5 w-5" />
      )}
      <input
        name={field}
        type={type}
        value={values[field]}
        onChange={(e) => validateField(field, e.target.value)}
        onBlur={() => setTouched((prev) => ({ ...prev, [field]:true }))}
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
          <AppleIcon size={22} />
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
          {renderInput("email", "Full Name") } 
          {renderInput("password", "Password", "password") } 

          {/* Error */}
          {state.formError && (
            <p className="text-red-600 font-medium">{state.formError}</p>
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
