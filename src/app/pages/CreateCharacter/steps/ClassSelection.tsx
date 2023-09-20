import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import CharacterCreationFormContainer from '../components/CharacterCreationFormContainer';
import styled from 'styled-components';

export default function ClassSelection() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);
  const ClassesId = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  const Classes = () => {
    const cls: JSX.Element[] = [];
    for (let id in ClassesId) {
      cls.push(<ClassContainer></ClassContainer>);
    }

    return <div>{cls}</div>;
  };

  return (
    <CharacterCreationFormContainer>
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
        <Classes />
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
    </CharacterCreationFormContainer>
  );
}

const ClassContainer = styled.div`
  display: flex;
  width: 23.875rem;
  height: 10.5rem;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin: 0.5rem;

  border-radius: var(--Border-Radius-XXS, 1rem);
  background: var(
    --gradient-linear-dark,
    linear-gradient(180deg, #362016 0%, #0b0906 100%)
  );
`;
