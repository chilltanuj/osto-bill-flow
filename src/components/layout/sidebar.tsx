import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  CreditCard,
  FileText,
  Settings,
  Shield,
  BarChart3,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: BarChart3 },
      { title: "Subscriptions", url: "/subscriptions", icon: Shield },
    ],
  },
  {
    title: "Billing",
    items: [
      { title: "Invoices", url: "/invoices", icon: FileText },
      { title: "Payment Methods", url: "/payment-methods", icon: CreditCard },
      { title: "Billing Settings", url: "/billing-settings", icon: Settings },
    ],
  },
  {
    title: "Support",
    items: [
      { title: "Payment Issues", url: "/payment-issues", icon: AlertCircle },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "w-full justify-start transition-smooth",
      isActive 
        ? "bg-primary text-primary-foreground shadow-card" 
        : "hover:bg-accent hover:text-accent-foreground"
    );

  return (
    <Sidebar className={cn(collapsed ? "w-16" : "w-64", "border-r border-border")}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-semibold text-lg">Osto</h2>
              <p className="text-xs text-muted-foreground">Billing Platform</p>
            </div>
          )}
        </div>
      </div>

      <SidebarContent className="p-2">
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="w-4 h-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}