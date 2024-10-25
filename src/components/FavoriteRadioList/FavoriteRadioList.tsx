import { useState, useEffect, useMemo, useCallback } from 'react';

import Pagination from '@/components/common/Pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchInput from '@/components/common/SearchInput';
import RadioNotFound from '@/components/common/RadioNotFound';
import CustomDialog from '@/components/FavoriteRadioList/FavoriteRadioCustomDialog';
import FavoriteRadioCard from '@/components/FavoriteRadioList/FavoriteRadioCard';

import { useFavorites } from '@/context/FavoritesContext';

function FavoriteRadioList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    favorites,
    stopRadio,
    updateRadio,
    confirmDelete,
    currentlyPlaying,
    isDeleting,
    isEditing,
    setIsDeleting,
    setIsEditing
  } = useFavorites();

  useEffect(() => {
    return () => {
      stopRadio();
    };
  }, [stopRadio]);

  const filteredRadios = useMemo(() => {
    return favorites.filter(radio =>
      radio.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [favorites, searchTerm]);

  const sortedRadios = useMemo(() => {
    return [...filteredRadios].sort((a, b) => {
      if (a.stationuuid === currentlyPlaying) return -1;
      if (b.stationuuid === currentlyPlaying) return 1;
      return 0;
    });
  }, [filteredRadios, currentlyPlaying]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedRadios.length / itemsPerPage);

  const paginatedRadios = useMemo(() => {
    return sortedRadios.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedRadios, currentPage, itemsPerPage]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  return (
    <div className="h-full flex flex-col items-center  w-full">
      <div className="relative mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full px-10 py-4">
        <h2 className='uppercase text-lg font-semibold mt-2 sm:text-left text-center'>Rádios Favoritas</h2>
        <SearchInput
          search={searchTerm}
          handleInputChange={handleSearch}
          clearSearch={() => setSearchTerm('')}
        />
      </div>

      <ScrollArea className="flex-grow px-4 w-full h-full">
        {sortedRadios.length === 0 ? (
          <RadioNotFound
            title="Nenhuma rádio encontrada"
            description="Adicione suas estações de rádio favoritas para ouvir aqui."
            type="searchFavorites"
          />
        ) : (
          <div className="space-y-4  pb-8">
            {paginatedRadios.map(radio => (
              <FavoriteRadioCard key={radio.stationuuid} radio={radio} isFavorite={true} />
            ))}
          </div>
        )}
      </ScrollArea>

      {sortedRadios.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={sortedRadios.length}
          className="sticky bottom-0 left-0 right-0"
        />
      )}

      <CustomDialog
        open={isEditing !== null}
        onClose={() => setIsEditing(null)}
        title="Edite as informações da Rádio"
        isEditing={true}
        onSave={updateRadio}
      />

      <CustomDialog
        open={isDeleting !== null}
        onClose={() => setIsDeleting(null)}
        title="Confirmar exclusão"
        description="Tem certeza de que deseja remover esta estação de rádio dos seus favoritos?"
        onDelete={() => isDeleting && confirmDelete(isDeleting)}
      />
    </div>
  );
}

export default FavoriteRadioList;