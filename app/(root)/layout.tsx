import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AnimatedLayout from "@/components/providers/AnimatedLayout";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <Navbar />
      <AnimatedLayout>
        {children}
      </AnimatedLayout>
      <Footer />
    </main>
  );
};

export default layout;
