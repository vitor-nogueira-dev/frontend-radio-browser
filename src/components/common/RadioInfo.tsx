import IRadio from '@/interfaces/IRadio';

interface RadioInfoProps {
  radio: IRadio;
  isTooltip?: boolean;
  isFavorite?: boolean;
}

function RadioInfo({ radio, isTooltip }: RadioInfoProps) {
  return (
    <div className={`${isTooltip ? 'w-full' : 'flex-1 max-w-44 sm:max-w-48'}`}>
      <h3 className={`text-sm font-semibold ${isTooltip ? '' : 'truncate'}`}>{radio.name}</h3>
      <p className="text-xs text-gray-500 truncate">
        {radio.country && radio.country}
        {radio.country && radio.language ? `, ${radio.language}` : radio.language && radio.language}
      </p>
    </div>
  );
}

export default RadioInfo;