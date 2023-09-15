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
      <BottomButtonStyle onClick={() => (available ? prev() : undefined)}>
        {name}
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
      <BottomButtonStyle onClick={() => (available ? next() : undefined)}>
        {name}
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
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
`;

const BottomButtonStyle = styled.button`
  display: flex;
  flex-grow: 1;
`;
