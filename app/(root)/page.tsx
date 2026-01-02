import { getAuthSession } from "@/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getAuthSession();

  return (
    <>
      {!session ? (
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-4xl font-bold">Find verified properties & agents</h1>
          <p className="mt-4 text-gray-600">
            Sign up to save properties, contact agents, and more.
          </p>

          <div className="mt-6 flex gap-4">
            <Link  href="/auth/signin" className="bg-black text-white px-6 py-3 rounded-lg">
              Sign In
            </Link>
            <Link href="/auth/signup" className="border px-6 py-3 rounded-lg">
              Create Account
            </Link>
          </div>
        </section>
      ) : (
        <section className="p-8">
          <h2 className="text-2xl font-bold">
            Welcome back, {session.user?.name}
          </h2>
          <p className="text-gray-600 mt-2">
            Continue exploring properties and agents.
          </p>
        </section>
      )}
    </>
  );
}
