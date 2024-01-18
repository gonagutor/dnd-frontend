import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export function CreateCharacterCancel() {
  const { t } = useTranslation('ui');
  return (
    <CharacterCancelBackground>
      <CharacterCancelContainer>
        <CharacterCancelTitle>
          {t('characterCancel.title')}
        </CharacterCancelTitle>
        <CharacterCancelText>{t('characterCancel.text')}</CharacterCancelText>
        <CharacterCancelButtonContainer>
          <Link to={'/character/create'}>
            <CancelButton>{t('characterCancel.cancel')}</CancelButton>
          </Link>
          <Link to={'/character'}>
            <AcceptButton>{t('characterCancel.continue')}</AcceptButton>
          </Link>
        </CharacterCancelButtonContainer>
      </CharacterCancelContainer>
    </CharacterCancelBackground>
  );
}

const CharacterCancelBackground = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  background: var(--gradient-linear-dark);
`;

const CharacterCancelContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1rem 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  flex-shrink: 0;

  border-radius: var(--border-radius-xxs);
  /* background: linear-gradient(to bottom, #4d3319, #b3865e, #4d3319); */
  background: var(--texture), var(--gradient-middle-light);
`;

const CharacterCancelTitle = styled.h1`
  color: var(--text-lightest, #e7d8b0);
  text-align: center;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterCancelText = styled.p`
  color: var(--text-lighter, #d3bb7c);
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const CharacterCancelButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  padding: 1.0625rem 0rem;
  width: 10.1875rem;

  border: none;
  border-radius: var(--Border-Radius-XXS, 1rem);
  background: var(
    --gradient-linear-dark,
    linear-gradient(180deg, #362016 0%, #0b0906 100%)
  );

  color: var(--text-lightest, #e7d8b0);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
`;

const AcceptButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;
  padding: 1.0625rem 0rem;
  width: 10.1875rem;

  border: none;
  border-radius: var(--Border-Radius-XXS, 1rem);
  background: var(
    --gradient-linear-light,
    linear-gradient(180deg, #65563f 0%, #deca9d 100%)
  );

  color: var(--text-dark, #301005);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
`;
