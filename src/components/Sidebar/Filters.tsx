import { X } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import FilterSelect from '@/components/Sidebar/FilterSelect';

import useRadioAPI from '@/hooks/useRadioAPI';

interface FiltersProps {
  selectedCountries: string[];
  selectedLanguages: string[];
  setSelectedCountries: (countries: string[]) => void;
  setSelectedLanguages: (languages: string[]) => void;
  removeSelectedItem: (type: 'country' | 'language', value: string) => void;
}

function Filters({ selectedCountries, selectedLanguages, setSelectedCountries, setSelectedLanguages, removeSelectedItem }: FiltersProps) {
  const { loading, countries, languages } = useRadioAPI({});

  const countryOptions = countries.map(country => ({
    value: country.iso_3166_1,
    label: country.name
  }));

  const getCountryNameByCode = (code: string) => {
    const country = countries.find(c => c.iso_3166_1 === code);
    return country ? country.name : code;
  };

  return loading ? (
    <>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </>
  ) : (
    <>
      {countryOptions.length > 0 && (
        <FilterSelect
          options={countryOptions}
          placeholder="Selecione os países"
          selectedValues={selectedCountries}
          onSelect={setSelectedCountries}
        />
      )}
      {languages && languages.length > 0 && (
        <FilterSelect
          options={languages.map(lang => ({ value: lang, label: lang }))}
          placeholder="Selecione os idiomas"
          selectedValues={selectedLanguages}
          onSelect={setSelectedLanguages}
        />
      )}
      {(selectedCountries.length > 0 || selectedLanguages.length > 0) && (
        <div className="flex gap-2 flex-wrap">
          {selectedCountries.map(countryCode => (
            <Button
              key={countryCode}
              variant="secondary"
              size="sm"
              onClick={() => removeSelectedItem('country', countryCode)}
              className='text-wrap'
            >
              {getCountryNameByCode(countryCode)} <X className="ml-2 h-4 w-4" />
            </Button>
          ))}
          {selectedLanguages.map(language => (
            <Button
              key={language}
              variant="secondary"
              size="sm"
              onClick={() => removeSelectedItem('language', language)}
              className='text-wrap'
            >
              {language} <X className="ml-2 h-4 w-4" />
            </Button>
          ))}
        </div>
      )}
    </>
  );
}

export default Filters;