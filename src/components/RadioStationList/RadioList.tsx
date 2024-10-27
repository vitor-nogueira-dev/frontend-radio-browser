import RadioCard from '@/components/RadioStationList/RadioListCard';
import RadioNotFound from '@/components/common/RadioNotFound';
import { RadioSkeleton } from '@/components/Skeletons/RadioSkeleton';

import IRadio from '@/interfaces/IRadio';

interface RadioListProps {
  paginatedRadios: IRadio[];
  loading: boolean;
  favorites: IRadio[];
  toggleFavorite: (radio: IRadio) => void;
}

function RadioList({ paginatedRadios, loading, favorites, toggleFavorite }: RadioListProps) {
  if (loading) {
    return (
      <section className='w-full min-w-[260px]'>
        {Array(10).fill(0).map((_, index) => <RadioSkeleton key={index} />)}
      </section>
    );
  }

  if (paginatedRadios.length === 0) {
    return (
      <section data-cy="search-list-notfound">
        <RadioNotFound
          title="Nenhuma rádio encontrada"
          description="Tente novamente com outra pesquisa."
          type='searchRadios'
        />
      </section>
    );
  }

  return (
    <section className='w-full' data-cy="search-list">
      {paginatedRadios.map((radio) => (
        <RadioCard
          key={radio.stationuuid}
          radio={radio}
          isFavorite={favorites.some(f => f.stationuuid === radio.stationuuid)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </section>
  );
}

export default RadioList;
