import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function ClassSelection() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      classId: form.classSelection.values.classId,
      subclassId: form.classSelection.values.subclassId,
    },
  });

  const { ref: classIdRef, ...classIdControl } = register('classId', {
    required: true,
  });
  const { ref: subclassIdRef, ...subclassIdControl } = register(
    'subclassId',
    {},
  );

  const { isDirty } = useFormState({
    control,
  });

  React.useEffect(() => {
    setForm({
      ...form,
      classSelection: {
        ...form.classSelection,
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
            classSelection: {
              valid: true,
              dirty: false,
              values,
            },
          }),
        )}
      >
        <label>
          {t('createCharacter.classIdLabel')}
          <input
            type="text"
            {...classIdControl}
            ref={classIdRef}
            placeholder={t('createCharacter.classIdPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.subclassIdLabel')}
          <input
            type="text"
            {...subclassIdControl}
            ref={subclassIdRef}
            placeholder={t('createCharacter.subclassIdPlaceholder')}
          />
        </label>
      </form>
    </section>
  );
}
