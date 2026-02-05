"use client";

import HomePage from "@/components/HomePage";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Page() {
  const { user } = useAuth();

  return (
    <HomePage />  
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

