import * as React from 'react';
import styled from 'styled-components/macro';
import diceLoaderImg from '../../assets/dice_loader.webp';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>{titleTranslation('notFound')}</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <Title>
          4
          <Image src={diceLoaderImg} alt="spinning wireframe dice" />4
        </Title>
        <P>{t('notFound')}</P>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  background-color: black;
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: white;
  font-size: 3.375rem;
`;

const Image = styled.img`
  mix-blend-mode: difference;
  height: 8rem;
`;

const P = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: white;
  margin: 0.625rem 0 1.5rem 0;
`;
