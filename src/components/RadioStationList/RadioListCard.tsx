import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import TooltipElement from '@/components/common/TooltipElement';
import FavoriteButton from '@/components/common/FavoriteButton';
import RadioInfo from '@/components/common/RadioInfo';

import { useUI } from '@/context/UIContext';

import IRadio from '@/interfaces/IRadio';

interface RadioCardProps {
  radio: IRadio;
  isFavorite: boolean;
  toggleFavorite: (radio: IRadio) => void;
}

function RadioListCard({ radio, isFavorite, toggleFavorite }: RadioCardProps) {
  const { isMobile } = useUI();

  return (
    <TooltipElement
      title={<RadioInfo isTooltip radio={radio} />}
      delayDuration={200}
      side={isMobile ? 'top' : 'right'}
    >
      <Card className="mb-2 w-full min-w-[260px] cursor-pointer hover:shadow-lg transition-all" data-cy={radio.stationuuid}>
        <CardContent className="flex items-center justify-between p-4">
          <RadioInfo radio={radio} />
          <FavoriteButton
            ariaLabel={isFavorite ? 'Remover favorito' : 'Adicionar favorito'}
            isFavorite={isFavorite}
            onClick={() => toggleFavorite(radio)}
          />
        </CardContent>
      </Card>
    </TooltipElement >
  );
}

export default RadioListCard;