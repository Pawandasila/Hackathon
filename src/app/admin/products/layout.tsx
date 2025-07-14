"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine page context based on pathname
  const getPageInfo = () => {
    if (pathname === "/admin/products") {
      return {
        title: "Product Management",
        buttonText: "Add Product",
        buttonAction: () => router.push("/admin/products/add"),
        showBackButton: false
      };
    } else if (pathname === "/admin/products/categories") {
      return {
        title: "Product Categories",
        buttonText: "Add Category",
        buttonAction: () => {},
        showBackButton: true,
        backUrl: "/admin/products"
      };
    } else if (pathname === "/admin/products/add") {
      return {
        title: "Product Categories", 
        buttonText: "save Changes",
        buttonAction: () => {}, 
        showBackButton: true,
        backUrl: "/admin/products"
      };
    } else {
      return {
        title: "Products",
        buttonText: "Add Product",
        buttonAction: () => router.push("/admin/products/new"),
        showBackButton: false
      };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex flex-col h-full">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <SidebarTrigger className="mr-4" />
          <div className="flex items-center space-x-4 flex-1">
            {pageInfo.showBackButton && pageInfo.backUrl && (
              <Link href={pageInfo.backUrl}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            )}
            <h1 className="text-2xl font-bold">{pageInfo.title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {pathname !== "/admin/products/new" && pathname !== "/admin/products/add" && (
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={pageInfo.buttonAction}
              >
                <Plus className="w-4 h-4 mr-2" />
                {pageInfo.buttonText}
              </Button>
            )}
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
