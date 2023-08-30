import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import diceLoaderImg from '../assets/dice_loader.webp';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function Loader({ translucent }: { translucent?: boolean }) {
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>Loading</title>
      </Helmet>
      <Container translucent={translucent}>
        <LoaderImage src={diceLoaderImg} alt="spinning wireframe dice" />
        <Title>{t('loading')}</Title>
      </Container>
    </>
  );
}

const Container = styled.div<{ translucent?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ translucent }) =>
    translucent
      ? `
    background: var(--loader-translucent);
  `
      : `
    background: var(--texture), var(--loader);
  `}
  backdrop-filter: var(--blur);
  height: 100vh;
`;

const LoaderImage = styled.img`
  width: 18rem;
`;

const Title = styled.h1`
  mix-blend-mode: difference;
  color: var(--loader-text);
`;
