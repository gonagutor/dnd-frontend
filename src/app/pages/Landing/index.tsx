import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DruidImage from '../../assets/druid.webp';
import BarbarianImage from '../../assets/barbarian.png';

export function Landing() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>{titleTranslation('landing')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container>
        <TitleRow>
          <Title>{t('title')}</Title>
        </TitleRow>
        <ContentColumn>
          <CharacterContainer>
            <Character style={{ backgroundImage: `url(${BarbarianImage})` }}>
              <CharacterClass>{t('barbarian')}</CharacterClass>
              <CharacterName>{t('landing.characterName.0')}</CharacterName>
            </Character>
            <Character style={{ backgroundImage: `url(${DruidImage})` }}>
              <CharacterClass>{t('druid')}</CharacterClass>
              <CharacterName>{t('landing.characterName.1')}</CharacterName>
            </Character>
          </CharacterContainer>
          <div>
            <PrimaryText>
              Administra todos tus personajes desde el móvil, tenlos en todos
              sitios
            </PrimaryText>
            <CTA>Regístrate o inicia sesión para continuar</CTA>
          </div>
        </ContentColumn>
        <ButtonContainer>
          <RegisterButton to="/register">
            {t('landing.register')}
          </RegisterButton>
          <OrDivider>{t('landing.orDivider')}</OrDivider>
          <LoginButton to="/login">{t('landing.login')}</LoginButton>
        </ButtonContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  padding: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;

  color: var(--text-lighter);
`;

const Title = styled.h1`
  text-shadow: 0px 0px 4px var(--text-lightest);
  margin: 0;
  padding: 0;
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
  height: 100%;
  padding-block: 1rem;
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  overflow: hidden;
  margin-right: -1rem;
`;

const Character = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: var(--border-radius-xs) var(--border-radius-xs)
    var(--border-radius-s) var(--border-radius-xs);
  background-size: cover;

  padding: 1rem;
  max-width: 60%;
  min-width: 60%;
  text-transform: uppercase;
  aspect-ratio: 3/4;
`;

const CharacterClass = styled.span`
  text-shadow: 0px 0px 4px var(--text-dark);
  font-size: 0.75rem;
`;

const CharacterName = styled.span`
  text-shadow: 0px 0px 4px var(--text-dark);
  font-size: 1.25rem;
`;

const PrimaryText = styled.h2`
  color: var(--text-dark);

  padding: 0;
  margin: 0;
`;

const CTA = styled.h3`
  color: var(--text-dark);

  padding: 0;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const LoginButton = styled(Link)`
  cursor: pointer;
  font-size: 1.5rem;
  text-align: start;
  text-decoration: none;

  background: var(--texture), var(--background-darker);
  color: var(--text-lightest);
  border: 2px solid var(--text-lightest);
  border-radius: var(--border-radius-xxs) var(--border-radius-xxs)
    var(--border-radius-xs) var(--border-radius-xxs);

  width: 100%;
  padding: 1rem;
`;

const OrDivider = styled.span`
  color: var(--text-lighter);
  font-weight: bold;
`;

const RegisterButton = styled(Link)`
  cursor: pointer;
  font-size: 1.5rem;
  text-align: start;
  text-decoration: none;

  background: var(--texture), var(--background-light);
  color: var(--text-dark);
  border: 2px solid var(--text-dark);
  border-radius: var(--border-radius-xxs) var(--border-radius-xxs)
    var(--border-radius-xs) var(--border-radius-xxs);

  width: 100%;
  padding: 1rem;
`;
