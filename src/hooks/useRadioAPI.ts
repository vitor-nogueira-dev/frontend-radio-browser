import { useQuery } from 'react-query';
import axios from 'axios';

import IUseRadioAPI from '@/interfaces/IUseRadioAPI';
import IRadio from '@/interfaces/IRadio';

const BASE_URL = 'https://de1.api.radio-browser.info/json';
const STATIONS_URL = `${BASE_URL}/stations/search`;
const LANGUAGES_URL = `${BASE_URL}/languages`;
const COUNTRIES_URL = `${BASE_URL}/countries`;

interface Country {
  name: string;
  iso_3166_1: string;
}

interface Language {
  name: string;
}

async function fetchRadios(name?: string, country?: string, language?: string): Promise<IRadio[]> {
  const queryParams = new URLSearchParams({
    hidebroken: 'true',
    order: 'clickcount',
    reverse: 'true',
  });

  if (name) queryParams.append('name', name);
  if (country) queryParams.append('countrycode', country);
  if (language) queryParams.append('language', language);
  if (!name && !country && !language) {
    queryParams.append('limit', '10');
  }

  const response = await axios.get(`${STATIONS_URL}?${queryParams.toString()}`);
  return response.data;
}

async function fetchLanguages(): Promise<string[]> {
  const response = await axios.get(LANGUAGES_URL);
  const uniqueLanguages = [...new Set(response.data.map((language: Language) => language.name))].sort() as string[];
  return uniqueLanguages;
}

async function fetchCountries(): Promise<Country[]> {
  const response = await axios.get(COUNTRIES_URL);
  return response.data
    .filter((country: Country) => country.name && country.iso_3166_1)
    .map((country: Country) => ({
      name: country.name,
      iso_3166_1: country.iso_3166_1,
    }))
    .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
}

function useRadioAPI({ name, country, language }: IUseRadioAPI) {
  const { data: allRadios = [], isLoading: loading, error } = useQuery(
    ['radios', name, country, language],
    () => fetchRadios(name, country, language),
    {
      onError: () => {
        console.log('Error fetching radios');
      },
    }
  );

  const { data: languages = [] } = useQuery('languages', fetchLanguages, {
    onError: () => {
      console.error('Error fetching languages');
    },
  });

  const { data: countries = [] } = useQuery('countries', fetchCountries, {
    onError: () => {
      console.error('Error fetching countries');
    },
  });

  return {
    allRadios,
    loading,
    error,
    countries,
    languages,
  };
}

export default useRadioAPI;