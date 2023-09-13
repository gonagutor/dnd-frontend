import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import CharacterCreationFormContainer from '../components/CharacterCreationFormContainer';

export default function GeneralCharacterInfo() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      name: form.generalInfo.values.name,
      homebrewContent: form.generalInfo.values.homebrewContent,
    },
  });

  const { ref: nameRef, ...nameControl } = register('name', { required: true });
  const { ref: homebrewContentRef, ...homebrewContentControl } = register(
    'homebrewContent',
    {},
  );

  const { isDirty } = useFormState({
    control,
  });

  console.log(isDirty);

  React.useEffect(() => {
    console.log(form);
    setForm({
      ...form,
      generalInfo: {
        ...form.generalInfo,
        dirty: isDirty,
      },
    });
  }, [isDirty, setForm]);

  return (
    <CharacterCreationFormContainer>
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
        <label>
          {t('createCharacter.homebrewContentLabel')}
          <input
            type="checkbox"
            {...homebrewContentControl}
            ref={homebrewContentRef}
            placeholder={t('createCharacter.homebrewContentPlaceholder')}
          />
        </label>
      </form>
    </CharacterCreationFormContainer>
  );
}
