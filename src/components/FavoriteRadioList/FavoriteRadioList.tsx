import { useState, useEffect, useMemo, useCallback } from 'react';
import { Music2 } from 'lucide-react';

import Pagination from '@/components/common/Pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchInput from '@/components/common/SearchInput';
import RadioNotFound from '@/components/common/RadioNotFound';
import CustomDialog from '@/components/common/CustomDialog';
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
      radio.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(searchTerm.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
    );
  }, [favorites, searchTerm]);

  const sortedRadios = useMemo(() => {
    return [...filteredRadios].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }, [filteredRadios]);

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

  const currentRadio = useMemo(() => {
    return sortedRadios.find(radio => radio.stationuuid === currentlyPlaying);
  }, [sortedRadios, currentlyPlaying]);

  return (
    <div className="h-full flex flex-col items-center w-full" data-cy="favorite-stations">
      <header className="w-full text-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 z-50">
            <h1 className="text-3xl font-bold flex items-center text-black">
              Rádios Favoritas
            </h1>
            <div className="relative w-full md:w-64">
              <SearchInput search={searchTerm} handleInputChange={handleSearch} clearSearch={() => setSearchTerm('')} dataCy="search-favorites" />
            </div>
          </div>
          {currentRadio && (
            <div className="mt-6 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 shadow-lg border">
              <div className='flex sm:mx-6'>
                <Music2 className="mr-2" />
                <h2 className="text-lg font-semibold mb-2 text-black">
                  Tocando agora:
                </h2>
              </div>
              <FavoriteRadioCard radio={currentRadio} isFavorite={true} dataCy={`${currentRadio.stationuuid}-playing`} />
            </div>
          )}
        </div>
      </header>

      <ScrollArea className="flex-grow px-4 w-full h-full max-w-7xl mx-auto z-10">
        {sortedRadios.length === 0 ? (
          <section data-cy="favorite-stations-list-notfound" className="mt-8">
            <RadioNotFound
              title="Nenhuma rádio encontrada"
              description="Adicione suas estações de rádio favoritas para ouvir aqui."
              type="searchFavorites"
            />
          </section>
        ) : (
          <div className="space-y-4 py-8" data-cy="favorite-stations-list">
            {paginatedRadios.map((radio) => (
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
        dataCy="edit-radio-dialog"
      />

      <CustomDialog
        open={isDeleting !== null}
        onClose={() => setIsDeleting(null)}
        title="Confirmar exclusão"
        description="Tem certeza de que deseja remover esta estação de rádio dos seus favoritos?"
        onDelete={() => isDeleting && confirmDelete(isDeleting)}
        dataCy="delete-radio-dialog"
      />
    </div>
  );
}

export default FavoriteRadioList;