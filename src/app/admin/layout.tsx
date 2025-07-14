"use client";

import { useState, useEffect } from "react";
import { 
  Package, 
  Users, 
  BarChart3, 
  Settings, 
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Upload
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarItems = [
  {
    title: "Products",
    icon: Package,
    url: "/admin/products",
    isActive: false,
    items: [
      {
        title: "All Products",
        url: "/admin/products",
      },
      {
        title: "Add Product",
        url: "/admin/products/add",
      },
      {
        title: "Categories",
        url: "/admin/products/categories",
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    url: "/admin/users",
    isActive: false,
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
    isActive: false,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isAuthPage = pathname === '/admin/login' || pathname === '/admin/signup';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full relative">
        <Sidebar className="fixed left-0 top-0 z-50 h-full border-r shadow-lg " variant="floating">
          <SidebarHeader className="border-b px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">EcoTrack360</h2>
                <p className="text-sm text-muted-foreground">Admin Panel</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {sidebarItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild
                      isActive={pathname.startsWith(item.url)}
                      className="w-full"
                    >
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.items && (
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground truncate">admin@ecotrack360.com</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content - Full Width */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
