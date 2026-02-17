import AnimatedLayout from "@/components/providers/AnimatedLayout";
import React from "react";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main>
      <AnimatedLayout>
        {children}
      </AnimatedLayout>
    </main>
  );
};

export default layout;
