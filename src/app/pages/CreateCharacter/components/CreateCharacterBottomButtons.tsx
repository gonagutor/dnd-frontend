import * as React from 'react';
import styled from 'styled-components';
import { CreateCharacterContext } from './CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function CreateCharacterBottomButtons() {
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

  const PrevButton = ({
    name,
    available,
  }: {
    name: string;
    available: boolean;
  }) => {
    return (
      <BottomButtonStyle
        onClick={() => (available ? prev() : undefined)}
        style={{
          background: available
            ? 'var(--gradient-linear-dark, linear-gradient(180deg, #362016 0%, #0B0906 100%))'
            : 'var(--gradient-linear-translucent-dark, linear-gradient(180deg, rgba(54, 32, 22, 0.60) 0%, rgba(11, 9, 6, 0.60) 100%))',
        }}
      >
        <ButtonText>{name}</ButtonText>
      </BottomButtonStyle>
    );
  };

  const NextButton = ({
    name,
    available,
  }: {
    name: string;
    available: boolean;
  }) => {
    return (
      <BottomButtonStyle
        onClick={() => (available ? next() : undefined)}
        style={{
          background: available
            ? 'var(--gradient-linear-dark, linear-gradient(180deg, #362016 0%, #0B0906 100%))'
            : 'var(--gradient-linear-translucent-dark, linear-gradient(180deg, rgba(54, 32, 22, 0.60) 0%, rgba(11, 9, 6, 0.60) 100%))',
        }}
      >
        <ButtonText>{name}</ButtonText>
      </BottomButtonStyle>
    );
  };

  return (
    <BottonButtonsContainer>
      <PrevButton
        name={t('createCharacter.previous')}
        available={form.step === 0 ? false : true}
      />
      <NextButton
        name={t('createCharacter.next')}
        available={form.step === 5 ? false : true}
      />
    </BottonButtonsContainer>
  );
}

const BottonButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 0.625rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
`;

const BottomButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1 0 0;
  border-radius: var(--Border-Radius-XXS, 1rem);
  padding: 1rem 0;
  border: none;
`;

const ButtonText = styled.span`
  color: var(--text-lightest, #e7d8b0);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
