import React from 'react';
import { Loader2, Play, StopCircle, Edit2, Trash2 } from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TooltipElement from '@/components/common/TooltipElement';
import RadioInfo from '@/components/common/RadioInfo';

import IRadio from "@/interfaces/IRadio";

import { useFavorites } from "@/context/FavoritesContext";

interface IFavoriteRadioCardProps {
  radio: IRadio;
  isFavorite: boolean;
  dataCy?: string;
}

function FavoriteRadioCard({ radio, isFavorite, dataCy }: IFavoriteRadioCardProps) {
  const { currentlyPlaying, isLoading, playRadio, editRadio, handleDeleteAndStop } = useFavorites()

  const isPlaying = currentlyPlaying === radio.stationuuid;

  return (
    <TooltipElement title={<RadioInfo isTooltip radio={radio} />} delayDuration={200} side="top">

      <Card
        key={radio.stationuuid}
        data-cy={dataCy ? dataCy : radio.stationuuid}
        className={`transition-all duration-300 ${currentlyPlaying && currentlyPlaying !== radio.stationuuid ? 'inactive-radios' : ''
          } hover:shadow-lg hover:inset-2 bg-white md:mx-6 cursor-pointer`}
      >
        <CardContent className="flex flex-row justify-between items-center gap-4 p-4 w-full relative">
          <div className='flex items-center space-x-4 w-full sm:w-auto'>
            <TooltipElement delayDuration={200} title={currentlyPlaying === radio.stationuuid ? 'Parar' : 'Ouvir'}>
              <Button size="icon" variant="ghost" onClick={() => playRadio(radio.stationuuid)} disabled={isLoading === radio.stationuuid} className='rounded-full relative' aria-label={currentlyPlaying === radio.stationuuid ? 'Parar' : 'Ouvir'}>
                {isLoading === radio.stationuuid ? (
                  <Loader2 className="h-4 w-4 animate-spin" data-cy="loader-station" />
                ) : currentlyPlaying === radio.stationuuid ? (
                  <StopCircle className="h-4 w-4" data-cy="stop-station" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isPlaying && (
                  <div className="absolute inset-0 border-2 border-gray-500 rounded-full animate-ping"></div>
                )}
              </Button>
            </TooltipElement>
            <RadioInfo radio={radio} isFavorite={isFavorite} />

          </div>
          <div className="flex items-center justify-center">
            <TooltipElement delayDuration={200} title="Editar">
              <Button size="icon" variant="ghost" onClick={() => editRadio(radio.stationuuid)} className='rounded-full hidden sm:flex' data-cy={`edit-${radio.stationuuid}`}>
                <Edit2 className="h-4 w-4" />
              </Button>
            </TooltipElement>
            <TooltipElement delayDuration={200} title="Excluir">
              <Button size="icon" variant="ghost" onClick={() => handleDeleteAndStop(radio.stationuuid)} className='rounded-full' data-cy={`delete-${radio.stationuuid}`}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipElement>
          </div>
        </CardContent>
      </Card>
    </TooltipElement >
  );
};

export default FavoriteRadioCard;