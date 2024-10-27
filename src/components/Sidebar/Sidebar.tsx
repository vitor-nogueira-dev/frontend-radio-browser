import { useState, useEffect, useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Pagination from "@/components/common/Pagination";
import SearchInput from "@/components/common/SearchInput";
import Filters from "@/components/Sidebar/Filters";
import RadioList from "@/components/RadioStationList/RadioList";
import CustomDialog from "@/components/common/CustomDialog";

import { useFavorites } from "@/context/FavoritesContext";
import { useUI } from "@/context/UIContext";

import IRadio from "@/interfaces/IRadio";

import useRadioAPI from "@/hooks/useRadioAPI";
import useDebounce from "@/hooks/useDebounce";

function Sidebar() {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isStationPlaying, setIsStationPlaying] = useState(false);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedCountries = useDebounce(selectedCountries, 300);
  const debouncedLanguages = useDebounce(selectedLanguages, 300);

  const { allRadios, loading } = useRadioAPI({
    name: debouncedSearch,
    country: debouncedCountries.join(","),
    language: debouncedLanguages.join(","),
  });

  const { isMobile, isSidebarOpen } = useUI();
  const { favorites, addToFavorites, removeFromFavorites, currentlyPlaying } = useFavorites();

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, debouncedCountries, debouncedLanguages]);

  const paginatedRadios = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allRadios.slice(startIndex, startIndex + itemsPerPage);
  }, [allRadios, currentPage, itemsPerPage]);

  const localPaginationInfo = useMemo(() => ({
    totalPages: Math.ceil(allRadios.length / itemsPerPage),
    totalItems: allRadios.length,
  }), [allRadios, itemsPerPage]);

  const toggleFavorite = (radio: IRadio) => {
    const isFavorite = favorites.some((f) => f.stationuuid === radio.stationuuid);
    if (isFavorite) {
      if (currentlyPlaying === radio.stationuuid) {
        setIsStationPlaying(true);
        return;
      }
      removeFromFavorites(radio.stationuuid);
    } else {
      addToFavorites(radio);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => setSearch("");

  const removeSelectedItem = (type: "country" | "language", value: string) => {
    if (type === "country") {
      setSelectedCountries((prev) => prev.filter((c) => c !== value));
    } else {
      setSelectedLanguages((prev) => prev.filter((l) => l !== value));
    }
  };

  const handleStopAndRemove = () => {
    setIsStationPlaying(false);
    removeFromFavorites(currentlyPlaying || '');
  }

  return (
    <section
      className={`${isSidebarOpen ? 'flex' : 'hidden'} bg-white border-r border-gray-200 flex-col h-full w-72 ${isMobile && 'w-full'}`}
      data-cy="sidebar"
    >
      <div className="p-4 space-y-4 flex-shrink-0">
        <SearchInput
          search={search}
          handleInputChange={handleInputChange}
          clearSearch={clearSearch}
          dataCy="search-input"
        />
        <Filters
          selectedCountries={selectedCountries}
          selectedLanguages={selectedLanguages}
          setSelectedCountries={setSelectedCountries}
          setSelectedLanguages={setSelectedLanguages}
          removeSelectedItem={removeSelectedItem}
        />
      </div>
      <ScrollArea className={`flex-grow w-72 ${isMobile && 'w-full'}`}>
        <div className="space-y-2 p-4 py-6">
          <RadioList
            paginatedRadios={paginatedRadios}
            loading={loading}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </ScrollArea>
      {localPaginationInfo.totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={localPaginationInfo.totalPages}
          onPageChange={setCurrentPage}
          totalItems={localPaginationInfo.totalItems}
          className="sticky bottom-0 left-0 right-0"
        />
      )}

      {isStationPlaying && (
        <CustomDialog
          open={isStationPlaying}
          onDelete={handleStopAndRemove}
          title="Rádio em reprodução"
          description="Sua rádio está tocando. Deseja parar a rádio e remover dos favoritos?"
          onClose={() => setIsStationPlaying(false)}
          dataCy="station-playing-dialog"
          textConfirm="Parar e remover"
        />
      )}
    </section>
  );
}

export default Sidebar;