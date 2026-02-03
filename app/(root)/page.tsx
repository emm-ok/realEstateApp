"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <>
      {!user ? (
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-4xl font-bold">
            Find verified properties & agents
          </h1>
          <p className="mt-4 text-gray-600">
            Sign up to save properties, contact agents, and more.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="/login"
              // onClick={() => setModalOpen("login")}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              // onClick={() => setModalOpen("signup")}
              className="border px-6 py-3 rounded-lg"
            >
              Create Account
            </Link>
          </div>

        </section>
      ) : (
        <section className="p-8">
          <h2 className="text-2xl font-bold">Welcome back, {user?.name}</h2>
          <p className="text-gray-600 mt-2">
            Continue exploring properties and agents.
          </p>
        </section>
      )}
    </>
  );
}

{/* Modal */}
{/* <AnimatePresence>
  {modalOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.8, y: -100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg p-8 max-w-md relative"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => setModalOpen(null)}
        >
          ✕
        </button>
        {modalOpen === "login" ? <LoginForm /> : <SignUpForm />}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence> */}

