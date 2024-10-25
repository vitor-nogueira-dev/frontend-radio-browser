"use client";
import { useEffect } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import FavoriteRadioList from "@/components/FavoriteRadioList/FavoriteRadioList";
import Header from "@/components/Header/Header";
import RadioLoading from "@/components/common/RadioLoading";

import { useUI } from "@/context/UIContext";

export default function RadioBrowser() {
  const { isMobile, isSidebarOpen, setIsSearchView, setIsSidebarOpen, isSearchView, isLoadingInitial, setIsLoadingInitial } = useUI();

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(true)
      setIsSearchView(false)
    }
  }, [isMobile, setIsSearchView, setIsSidebarOpen])


  useEffect(() => {
    setTimeout(() => setIsLoadingInitial(false), 1000)
  }, [setIsLoadingInitial]);

  if (isLoadingInitial) {
    return <RadioLoading />;
  }

  return (
    <div className="flex h-screen w-[100vw] text-gray-900">
      {!isMobile && (isSidebarOpen || !isMobile) && (
        <Sidebar />
      )}
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <main className={`flex-1 overflow-hidden ${isMobile ? 'p-0' : 'pt-4'} w-full max-w-7xl m-auto`}>
          {isMobile ? (
            isSearchView ? (
              <Sidebar />
            ) : (
              <FavoriteRadioList />
            )
          ) : (
            <FavoriteRadioList />
          )}
        </main>
      </div>
    </div>
  )
}