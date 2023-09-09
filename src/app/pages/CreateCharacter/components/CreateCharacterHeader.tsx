import * as React from 'react';
import { CreateCharacterContext } from './CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function CreateCharacterHeader() {
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

  const setSelectedIndex = React.useCallback(
    (index: number) =>
      setForm({
        ...form,
        step: index,
      }),
    [setForm, form],
  );

  return (
    <header>
      <button onClick={() => prev()}>{t('createCharacter.previous')}</button>
      <button onClick={() => setSelectedIndex(0)}>
        {t('createCharacter.generalInfo')}
      </button>
      <button onClick={() => setSelectedIndex(1)}>
        {t('createCharacter.class')}
      </button>
      <button onClick={() => setSelectedIndex(2)}>
        {t('createCharacter.race')}
      </button>
      <button onClick={() => setSelectedIndex(3)}>
        {t('createCharacter.stats')}
      </button>
      <button onClick={() => next()}>{t('createCharacter.next')}</button>
    </header>
  );
}
