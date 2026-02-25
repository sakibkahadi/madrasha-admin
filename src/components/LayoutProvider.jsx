// components/LayoutProvider.jsx
"use client";


import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function LayoutProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisible, setSidebarVisible] = useState(true); // Default visible on desktop
  const [isCollapsed, setCollapsed] = useState(false);

  // Handle screen resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // 768px is md breakpoint in Tailwind
      setIsMobile(mobile);
      
      // If transitioning to desktop, always show sidebar
      if (!mobile && !isSidebarVisible) {
        setSidebarVisible(true);
      }
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarVisible]);

  // Mobile toggle sidebar function
  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarVisible(!isSidebarVisible);
    }
  };

  // Desktop collapse sidebar function
  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <>
          <Header toggleSidebar={toggleSidebar} isMobile={isMobile} />
          <div className="flex flex-1 relative">
            {/* Sidebar - always visible on desktop, toggleable on mobile */}
            {(isSidebarVisible || !isMobile) && (
              <div className="relative">
                <Sidebar isCollapsed={isCollapsed} />
                
                {/* Collapse button - only on desktop */}
                {!isMobile && (
                  <button 
                    onClick={toggleCollapse} 
                    className="absolute top-4 right-0 transform translate-x-1/2 bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  >
                    {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                  </button>
                )}
              </div>
            )}
            <main className="flex-1 p-6 overflow-auto bg-background">
              {children}
            </main>
          </div>
        </>
      )}
      {!isAuthenticated && <>{children}</>}
    </div>
  );
}