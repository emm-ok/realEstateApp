"use client";

import React, { useActionState, useEffect, useState } from "react";
import { CheckCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { signInSchema } from "@/lib/validation/auth";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "./ui/Loader";
import GoogleAppleButton from "./ui/GoogleAppleButton";
import PageLoader from "./ui/PageLoader";

type FormValues = {
  email: string;
  password: string
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type SignInState = { error: string; status: string } | { formError: string };

export default function LoginForm() {
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

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
      setRedirecting(true)
      signInSchema.parse(values);

      await login(values)
      
      setValues({
        email: "",
        password: "",
      });
      setTouched({
        email: false,
        password: false,
      });
      
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo)
      toast.success("Login successful");
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
    } finally{
      setRedirecting(false);
    }
  };

  
  const [state, formAction, isPending] = useActionState(signInAction, {
    error: "",
    status: "INITIAL",
  });
  
  if (redirecting) {
  return <PageLoader text="Redirecting..." />;
}
  
  const renderInput = (
    field: keyof FormValues,
    placeholder: string,
    type: string = "text"
  ) => (
    <div className="relative">
      {touched[field] && values[field] && !errors[field] && (
        <CheckCircle className="text-green-500 absolute right-8 top-3 h-5 w-5" />
      )}
      {field === "password" ? ( 
              type === "password" ? (
                <Eye onClick={() => setShowPassword(true)} className="absolute right-3 top-3 h-4 w-4" />
              ): (
                <EyeOff onClick={() => setShowPassword(false)} className="absolute right-3 top-3 h-4 w-4" />
              )
            ): (
              <></>
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
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-1">
            Sign in to continue to your account
          </p>
        </div>
        <GoogleAppleButton />

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* Email / Password */}
        <form action={formAction} className="space-y-4">
          {renderInput("email", "Full Name") } 
          {renderInput("password", "Password", `${showPassword ? "text" : "password"}`) } 

          {/* Error */}
          {state.formError && (
            <p className="text-red-600 font-medium">{state.formError}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white rounded-lg py-3 font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            { isPending ? <Loader text="Signing you in..." /> : "Sign in" }
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-black cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
