import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';

export default function StatsSelection() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      strength: form.statsSelection.values.strength,
      dexterity: form.statsSelection.values.dexterity,
      constitution: form.statsSelection.values.constitution,
      intelligence: form.statsSelection.values.intelligence,
      wisdom: form.statsSelection.values.wisdom,
      charisma: form.statsSelection.values.charisma,
    },
  });

  const { ref: strengthRef, ...strengthControl } = register('strength', {
    required: true,
  });
  const { ref: dexterityRef, ...dexterityControl } = register('dexterity', {
    required: true,
  });
  const { ref: constitutionRef, ...constitutionControl } = register(
    'constitution',
    {
      required: true,
    },
  );
  const { ref: intelligenceRef, ...intelligenceControl } = register(
    'intelligence',
    {
      required: true,
    },
  );
  const { ref: wisdomRef, ...wisdomControl } = register('wisdom', {
    required: true,
  });
  const { ref: charismaRef, ...charismaControl } = register('charisma', {
    required: true,
  });

  const { isDirty } = useFormState({
    control,
  });

  React.useEffect(() => {
    setForm({
      ...form,
      statsSelection: {
        ...form.statsSelection,
        dirty: isDirty,
      },
    });
  }, [isDirty, setForm]);

  const calculateModifier = stat => {
    let modifier = Math.floor(stat - 10 / 2);
    if (modifier <= 0) {
      return '-';
    } else {
      return modifier;
    }
  };

  return (
    <section>
      <form
        onSubmit={handleSubmit(values =>
          setForm({
            ...form,
            statsSelection: {
              valid: true,
              dirty: false,
              values,
            },
          }),
        )}
      >
        <label>
          {t('createCharacter.strengthLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...strengthControl}
            ref={strengthRef}
            placeholder={t('createCharacter.strengthPlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.strength)}
          </span>
        </label>
        <label>
          {t('createCharacter.dexterityLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...dexterityControl}
            ref={dexterityRef}
            placeholder={t('createCharacter.dexterityPlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.dexterity)}
          </span>
        </label>
        <label>
          {t('createCharacter.constitutionLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...constitutionControl}
            ref={constitutionRef}
            placeholder={t('createCharacter.constitutionPlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.constitution)}
          </span>
        </label>
        <label>
          {t('createCharacter.intelligenceLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...intelligenceControl}
            ref={intelligenceRef}
            placeholder={t('createCharacter.intelligencePlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.intelligence)}
          </span>
        </label>
        <label>
          {t('createCharacter.wisdomLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...wisdomControl}
            ref={wisdomRef}
            placeholder={t('createCharacter.wisdomPlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.wisdom)}
          </span>
        </label>
        <label>
          {t('createCharacter.charismaLabel')}
          <input
            type="number"
            min={0}
            max={20}
            {...charismaControl}
            ref={charismaRef}
            placeholder={t('createCharacter.charismaPlaceholder')}
          />
          <span>
            {t('createCharacter.modifier')}{' '}
            {calculateModifier(form.statsSelection.values.charisma)}
          </span>
        </label>
      </form>
    </section>
  );
}
