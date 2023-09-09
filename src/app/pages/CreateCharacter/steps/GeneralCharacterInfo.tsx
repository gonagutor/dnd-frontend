import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function GeneralCharacterInfo() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: form.generalInfo.values.name,
    },
  });

  const { ref: nameRef, ...nameControl } = register('name', { required: true });

  const { isDirty } = useFormState({
    control,
  });

  React.useEffect(() => {
    setForm({
      ...form,
      generalInfo: {
        ...form.generalInfo,
        dirty: isDirty,
      },
    });
  }, [isDirty, setForm, form]);

  return (
    <section>
      <form
        onSubmit={handleSubmit(values =>
          setForm({
            ...form,
            generalInfo: {
              valid: true,
              dirty: false,
              values,
            },
          }),
        )}
      >
        <label>
          {t('createCharacter.nameLabel')}
          <input
            type="text"
            {...nameControl}
            ref={nameRef}
            placeholder={t('createCharacter.namePlaceholder')}
          />
        </label>
      </form>
    </section>
  );
}
