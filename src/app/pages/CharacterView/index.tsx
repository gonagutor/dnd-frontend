import useGetCharacter from 'app/hooks/useGetCharacter';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import Loader from '../../components/Loader';
import { useParams } from 'react-router-dom';

export function CharacterView() {
  const { characterId } = useParams();
  const { getCharacter, character, error, pending } = useGetCharacter(
    characterId!,
  );

  if (!character) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>tests</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}
