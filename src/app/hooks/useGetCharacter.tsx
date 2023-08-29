import * as React from 'react';
import { request } from 'utils/axios';

export default function useGetCharacter(id: string) {
  const [character, setCharacter] = React.useState(null);
  const [error, setError] = React.useState(null);

  request
    .get(`/character/${id}`)
    .then(response => {
      setCharacter(response.data.data);
    })
    .catch(response => {
      setError(response);
    });

  return [character, error];
}
