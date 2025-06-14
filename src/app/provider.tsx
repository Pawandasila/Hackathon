import Navbar from "@/components/custom/Navbar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import React from "react";


interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  return (
    <div className="bg-[#f6eee8]">
      <SmoothCursor />
      <Navbar />
      
      <main className="pt-16 md:pt-20">
        {children}
      </main>
    </div>
  );
};

export default Provider;
