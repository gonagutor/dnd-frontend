import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export default function ValidationFailed({ error }: { error: string }) {
  const { t } = useTranslation('ui');

  return (
    <>
      <Container>
        <Title>{t('emailValidation.oops')}</Title>
        <SubTitle>{t('emailValidation.couldNotValidate')}</SubTitle>
        <SubTitleTwo>{error}</SubTitleTwo>
      </Container>
    </>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 199;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: var(--texture), var(--background-darker-translucent);
  backdrop-filter: var(--blur);
  padding: 1rem;
  overflow: hidden;
  text-align: center;
`;

const Title = styled.h1`
  color: var(--text-lightest);
`;

const SubTitle = styled.h2`
  margin: 0.25rem;
  color: var(--text-lighter);
`;

const SubTitleTwo = styled.h3`
  margin: 0.25rem;
  color: var(--text-light);
`;
