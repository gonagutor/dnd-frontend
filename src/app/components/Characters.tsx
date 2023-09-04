import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function Characters() {
  const { t } = useTranslation('titles');
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
`;

function CharacterList({ characters }: { characters: number }) {
  const pjs: JSX.Element[] = [];
  for (let i = 0; i < characters; i++) {
    pjs.push(<div>{i}</div>);
  }

  return <CharacterListContainer>{pjs}</CharacterListContainer>;
}
