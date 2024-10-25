import { Menu, Search, SidebarClose, SidebarOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import TooltipElement from "@/components/common/TooltipElement";

import { useUI } from "@/context/UIContext";

export default function Header() {
  const { toggleSidebar, toggleSearch, isSearchView, isMobile, isSidebarOpen } = useUI();

  return (
    <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      {!isMobile && (
        <TooltipElement delayDuration={200} side="right" title={isSidebarOpen ? "Fechar Sidebar" : "Abrir Sidebar"}>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? <SidebarClose className="!h-5 !w-5" /> : <SidebarOpen className="!h-5 !w-5" />}
          </Button>
        </TooltipElement>
      )}
      <h1 className="text-2xl font-bold text-center w-full">Radio Browser</h1>
      {isMobile && (
        <TooltipElement delayDuration={200} side="left" title={isSearchView ? "Ver Favoritos" : "Pesquisar Rádios"}>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={isSearchView ? toggleSidebar : toggleSearch}>
              {isSearchView ? <Menu className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
          </div>
        </TooltipElement>
      )}
    </header>
  )
}