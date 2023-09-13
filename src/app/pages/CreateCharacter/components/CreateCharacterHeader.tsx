import * as React from 'react';
import { CreateCharacterContext } from './CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import arrowBack from '../../../assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';

export default function CreateCharacterHeader() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const next = React.useCallback(
    () =>
      setForm({
        ...form,
        step: form.step + 1,
      }),
    [setForm, form],
  );

  const prev = React.useCallback(
    () =>
      setForm({
        ...form,
        step: form.step - 1,
      }),
    [setForm, form],
  );

  const setSelectedIndex = React.useCallback(
    (index: number) =>
      setForm({
        ...form,
        step: index,
      }),
    [setForm, form],
  );

  const CharacterCreationButton = ({
    index,
    src,
    name,
  }: {
    index: number;
    src: string;
    name: string;
  }) => {
    const currentIndex = form.step;
    return (
      <CharacterCreationNavigationButton
        style={{
          background:
            currentIndex === index
              ? 'var(--gradient-linear-light, linear-gradient(180deg, #65563F 0%, #DECA9D 100%))'
              : 'var(--gradient-linear-translucent-dark, linear-gradient(180deg, rgba(54, 32, 22, 0.60) 0%, rgba(11, 9, 6, 0.60) 100%))',
        }}
      ></CharacterCreationNavigationButton>
    );
  };

  return (
    <CharacterCreationHeaderContainer>
      <CharacterCreationNavigation>
        <Link to={'/character'}>
          <CharacterCreationBackImage src={arrowBack} alt="back" />
        </Link>
        <CharacterCreationTitle>
          {t('createCharacter.title')}
        </CharacterCreationTitle>
      </CharacterCreationNavigation>
      <CharacterCreationHeader>
        <button onClick={() => prev()}>{t('createCharacter.previous')}</button>
        <button onClick={() => setSelectedIndex(0)}>
          {t('createCharacter.generalInfo')}
        </button>
        <button onClick={() => setSelectedIndex(1)}>
          {t('createCharacter.class')}
        </button>
        <button onClick={() => setSelectedIndex(2)}>
          {t('createCharacter.race')}
        </button>
        <button onClick={() => setSelectedIndex(3)}>
          {t('createCharacter.stats')}
        </button>
        <button onClick={() => setSelectedIndex(4)}>
          {t('createCharacter.description')}
        </button>
        <button onClick={() => next()}>{t('createCharacter.next')}</button>
      </CharacterCreationHeader>
    </CharacterCreationHeaderContainer>
  );
}

const CharacterCreationHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CharacterCreationNavigation = styled.div`
  display: inline-flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const CharacterCreationTitle = styled.h1`
  color: var(--text-lighter, #d3bb7c);
  text-shadow: 0px 0px 4px #e7d8b0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const CharacterCreationBackImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const CharacterCreationNavigationButton = styled.button`
  display: flex;
  padding: var(--Border-Radius-XXXS, 0.5rem);
  justify-content: center;
  align-items: center;
  gap: var(--Border-Radius-XXXS, 0.5rem);
  border-radius: var(--Border-Radius-XXS, 1rem) var(--Border-Radius-XXS, 1rem)
    var(--Border-Radius-XXXS, 0.5rem) var(--Border-Radius-XXS, 1rem);
`;

const CharacterCreationHeader = styled.header`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 0 1rem;
`;
