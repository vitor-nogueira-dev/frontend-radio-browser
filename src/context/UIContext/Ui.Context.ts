"use client";
import { createContext } from "react";

interface UIContextProps {
  isSidebarOpen: boolean;
  isSearchView: boolean;
  toggleSearch: () => void;
  toggleSidebar: () => void;
  isMobile: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSearchView: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingInitial: boolean;
  setIsLoadingInitial: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UiContext = createContext<UIContextProps | undefined>(undefined);
