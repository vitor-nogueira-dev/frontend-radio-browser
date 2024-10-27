import React from 'react';
import { Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TooltipElement from '@/components/common/TooltipElement';

interface SearchInputProps {
  search: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  dataCy: string;
}

function SearchInput({ search, handleInputChange, clearSearch, dataCy }: SearchInputProps) {
  return (
    <div className="relative">
      <Input
        className="pl-10 pr-4 h-10"
        placeholder="Pesquise por nome"
        value={search}
        data-cy={dataCy}
        onChange={handleInputChange}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      {search && (
        <TooltipElement title="Limpar pesquisa" delayDuration={200} side="top">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            onClick={clearSearch}
            data-cy={`${dataCy}-clear`}
          >
            <X className="h-4 w-4" />
          </Button>
        </TooltipElement>
      )}
    </div>
  );
}

export default SearchInput;