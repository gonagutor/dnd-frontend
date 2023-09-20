import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import defaultImage from '../assets/druid.webp';

export default function Characters() {
  const { t } = useTranslation('titles');

  const CharacterList = ({ characters }: { characters: number }) => {
    const pjs: JSX.Element[] = [];
    for (let i = 0; i < characters; i++) {
      pjs.push(
        <Character
          style={{
            background: `url(${defaultImage})`,
            backgroundSize: 'cover',
          }}
        >
          <CharacterClass>Clase del pj</CharacterClass>
          <CharacterName>Nombre del pj</CharacterName>
        </Character>,
      );
    }

    return <CharacterListContainer>{pjs}</CharacterListContainer>;
  };

  return (
    <CharactersContainer>
      <CharacterTitle>{t('characterList')}</CharacterTitle>
      <CharacterList characters={10} />
    </CharactersContainer>
  );
}

const CharactersContainer = styled.div`
  flex-shrink: 0;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const CharacterTitle = styled.h2`
  color: var(--text-lighter, #d3bb7c);
  text-shadow: 0px 0px 4px #301005;
  font-size: 1rem;
  font-weight: 400;
`;

const CharacterListContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

const Character = styled.div`
  display: flex;
  padding: 1rem 7rem 1rem 1rem;
  margin-right: 1rem;
  width: 15rem;
  height: 20rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: var(--Border-Radius-XS, 2rem) var(--Border-Radius-XS, 2rem)
    var(--Border-Radius-S, 4rem) var(--Border-Radius-XS, 2rem);
`;

const CharacterClass = styled.p`
  text-shadow: 0px 0px 4px #301005;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: normal;
`;

const CharacterName = styled.p`
  text-shadow: 0px 0px 4px #301005;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: normal;
`;
