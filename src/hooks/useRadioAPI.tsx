import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

import IUseRadioAPI from '@/interfaces/IUseRadioAPI';

const URL_GET_RADIOS = 'https://de1.api.radio-browser.info/json/stations/search?';

function useRadioAPI({ name, country, language }: IUseRadioAPI) {
  const [radios, setRadios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    async function fetchRadios() {
      setLoading(true);
      try {
        const limit = 10;

        const queryParams = new URLSearchParams();

        if (name) queryParams.append('name', name);
        if (country) queryParams.append('country', country);
        if (language) queryParams.append('language', language);

        queryParams.append('limit', limit.toString());

        const response = await axios.get(`${URL_GET_RADIOS}${queryParams.toString()}`);
        const data = response.data;

        setRadios(data);
      } catch (err) {
        const error = err as AxiosError;
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRadios();
  }, [name, country, language]);

  return { radios, loading, error };
}

export default useRadioAPI;