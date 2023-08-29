import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import diceLoaderImg from '../assets/dice_loader.webp';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function Loader() {
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <Container>
        <LoaderImage src={diceLoaderImg} alt="spinning wireframe dice" />
        <Title>{t('loading')}</Title>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: black;
  height: 100vh;
`;

const LoaderImage = styled.img`
  width: 18rem;
  mix-blend-mode: difference;
`;

const Title = styled.h1`
  mix-blend-mode: difference;
  color: white;
`;
