import * as React from 'react';
import Navbar from 'app/components/Navbar';
import Title from 'app/components/Title';
import Characters from 'app/components/Characters';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Character() {
  const { t } = useTranslation('ui');
  return (
    <div>
      <Title />
      <Characters />
      <Link to={'/character/create'}>
        <CharcaterCreateCharacterButton>
          {t('character.createCharacter')}
        </CharcaterCreateCharacterButton>
      </Link>

      <Navbar />
    </div>
  );
}

const CharcaterCreateCharacterButton = styled.div`
  display: inline-flex;
  padding: 1.25rem 0;
  width: 24rem;
  justify-content: center;
  align-items: center;
  margin: 1rem;

  border-radius: var(--Border-Radius-XXS, 1rem);
  background: var(--gradient-dark, --gradient-middle-light);

  color: var(--text-lightest, #e7d8b0);
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
