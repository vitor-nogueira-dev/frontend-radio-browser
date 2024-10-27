import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TooltipElement from '@/components/common/TooltipElement';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  ariaLabel: string;
}

function FavoriteButton({ isFavorite, onClick, ariaLabel }: FavoriteButtonProps) {
  return (
    <TooltipElement title={isFavorite ? 'Remover favorito' : 'Adicionar favorito'} delayDuration={200} side='right'>
      <div className="flex items-center space-x-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={onClick}
          aria-label={ariaLabel}
          data-cy='favorite-button'
          className='rounded-full'
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
        </Button>
      </div>
    </TooltipElement >
  );
}

export default FavoriteButton;
