"use client";

import Navbar from "@/components/custom/Navbar";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { usePathname } from "next/navigation";
import React from "react";


interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const pathname = usePathname();
  
  // Hide navbar on authentication pages and admin pages
  const hideNavbar = pathname === "/login" || 
                    pathname === "/signup" || 
                    pathname === "/admin/login" || 
                    pathname === "/admin/signup" ||
                    pathname.startsWith("/admin/");
  
  return (
    <div className="bg-transparent" >
      <SmoothCursor />
      {!hideNavbar && <Navbar />}
      
      <main className={hideNavbar ? "pt-0" : "pt-16 md:pt-16"}>
        {children}
      </main>
    </div>
  );
};

export default Provider;
