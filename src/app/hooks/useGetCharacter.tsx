import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';

export default function useGetCharacter(id: string) {
  const { t } = useTranslation('errors');
  const [character, setCharacter] = React.useState(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [pending, setPending] = React.useState(false);

  const getCharacter = () => {
    setPending(true);
    setError(undefined);
    setCharacter(undefined);
    request
      .get(`/character/${id}`)
      .then(response => {
        setPending(false);
        setCharacter(response.data.data);
      })
      .catch(response => {
        setPending(false);
        setError(t(response));
      });
  };

  return { getCharacter, character, pending, error };
}
