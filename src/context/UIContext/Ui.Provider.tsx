"use client";
import { useState, useMemo, useCallback } from "react";

import { UiContext } from "@/context/UIContext/Ui.Context";

import useMediaQuery from "@/hooks/useMediaQuery";

export function UiProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isSearchView, setIsSearchView] = useState<boolean>(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSearch = useCallback(() => {
    if (isMobile) {
      setIsSearchView(prev => !prev);
    }
  }, [isMobile]);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSearchView(prev => !prev);
    } else {
      setIsSidebarOpen(prev => !prev);
    }
  }, [isMobile]);

  const value = useMemo(() => ({
    isSidebarOpen,
    isSearchView,
    toggleSearch,
    toggleSidebar,
    setIsSearchView,
    setIsSidebarOpen,
    isMobile,
    isLoadingInitial,
    setIsLoadingInitial,
  }), [isSidebarOpen, isSearchView, isMobile, isLoadingInitial, toggleSearch, toggleSidebar]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}
