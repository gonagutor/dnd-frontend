import * as React from 'react';

export default function useGetCharacter(id: string) {
  const [character, setCharacter] = React.useState(null);

  return character;
}
