import * as React from 'react';
import { CreateCharacterContext } from './CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import arrowBack from '../../../assets/icons/arrow-left.svg';
import { Link } from 'react-router-dom';

import gears from '../../../assets/icons/gears 1.svg';
import stabbedNote from '../../../assets/icons/stabbed-note 1.svg';
import wizardFace from '../../../assets/icons/wizard-face 1.svg';
import dice from '../../../assets/icons/dice-twenty-faces-twenty 1.svg';
import notebook from '../../../assets/icons/notebook 1.svg';

export default function CreateCharacterHeader() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

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
    return (
      <CharacterCreationNavigationButton
        style={{
          background:
            form.step === index
              ? 'var(--gradient-linear-light, linear-gradient(180deg, #65563F 0%, #DECA9D 100%))'
              : 'var(--gradient-linear-translucent-dark, linear-gradient(180deg, rgba(54, 32, 22, 0.60) 0%, rgba(11, 9, 6, 0.60) 100%))',
        }}
        onClick={() => setSelectedIndex(index)}
      >
        <img src={src} alt={name} />
        {name}
      </CharacterCreationNavigationButton>
    );
  };

  return (
    <CharacterCreationHeaderContainer>
      <CharacterCreationNavigation>
        <Link to={'/character/create/cancel'}>
          <CharacterCreationBackImage src={arrowBack} alt="back" />
        </Link>
        <CharacterCreationTitle>
          {t('createCharacter.title')}
        </CharacterCreationTitle>
      </CharacterCreationNavigation>
      <CharacterCreationHeader>
        <CharacterCreationButton
          index={0}
          src={gears}
          name={t('createCharacter.generalInfo')}
        />
        <CharacterCreationButton
          index={1}
          src={stabbedNote}
          name={t('createCharacter.class')}
        />
        <CharacterCreationButton
          index={2}
          src={wizardFace}
          name={t('createCharacter.race')}
        />
        <CharacterCreationButton
          index={3}
          src={dice}
          name={t('createCharacter.stats')}
        />
        {/*
        <CharacterCreationButton
          index={4}
          src={notebook}
          name={t('createCharacter.description')}
        />
        */}
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
  margin: 0;
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
  border: none;
  margin-right: 0.5rem;
`;

const CharacterCreationHeader = styled.header`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  padding: 0 1rem;
`;
