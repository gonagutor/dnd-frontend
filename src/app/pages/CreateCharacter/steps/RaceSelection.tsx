import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function RaceSelection() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      raceId: form.raceSelection.values.raceId,
      subraceId: form.raceSelection.values.subraceId,
    },
  });

  const { ref: raceIdRef, ...raceIdControl } = register('raceId', {
    required: true,
  });
  const { ref: subraceIdRef, ...subraceIdControl } = register('subraceId', {});

  const { isDirty } = useFormState({
    control,
  });

  React.useEffect(() => {
    setForm({
      ...form,
      raceSelection: {
        ...form.raceSelection,
        dirty: isDirty,
      },
    });
  }, [isDirty, setForm]);

  return (
    <section>
      <form
        onSubmit={handleSubmit(values =>
          setForm({
            ...form,
            raceSelection: {
              valid: true,
              dirty: false,
              values,
            },
          }),
        )}
      >
        <label>
          {t('createCharacter.raceIdLabel')}
          <input
            type="text"
            {...raceIdControl}
            ref={raceIdRef}
            placeholder={t('createCharacter.raceIdPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.subraceIdLabel')}
          <input
            type="text"
            {...subraceIdControl}
            ref={subraceIdRef}
            placeholder={t('createCharacter.subraceIdPlaceholder')}
          />
        </label>
      </form>
    </section>
  );
}
