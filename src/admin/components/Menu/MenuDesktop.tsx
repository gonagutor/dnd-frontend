import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { MenuButtonList } from './MenuButtonList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Logo = styled.h2`
  font-family: 'Inter';
  margin: 0;
  padding: 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  border-radius: 2rem;
  background: white;

  padding-block: 2rem;
  margin: 1rem;
  width: 6rem;
`;

const ButtonContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const ExitButton = styled.button`
  border: none;
  background: transparent;
`;

export function MenuDesktop() {
  const { t } = useTranslation('admin');

  return (
    <Nav>
      <Logo>{t('title')}</Logo>
      <ButtonContainer>
        <MenuButtonList />
      </ButtonContainer>
      <ExitButton>
        <FontAwesomeIcon size="2x" icon={faRightFromBracket} />
      </ExitButton>
    </Nav>
  );
}
