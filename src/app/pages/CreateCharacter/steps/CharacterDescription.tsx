import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import CharacterCreationFormContainer from '../components/CharacterCreationFormContainer';

export default function CharacterDescription() {
  const { t } = useTranslation('ui');
  const { form, setForm } = React.useContext(CreateCharacterContext);

  const { register, handleSubmit, control } = useForm({
    shouldUseNativeValidation: true,
    defaultValues: {
      background: form.characterDescription.values.background,
      alignment: form.characterDescription.values.alignment,
      faith: form.characterDescription.values.faith,
      lifestyle: form.characterDescription.values.lifestyle,
      hair: form.characterDescription.values.hair,
      skin: form.characterDescription.values.skin,
      eyes: form.characterDescription.values.eyes,
      height: form.characterDescription.values.height,
      weight: form.characterDescription.values.weight,
      age: form.characterDescription.values.age,
      gender: form.characterDescription.values.gender,
      traits: form.characterDescription.values.traits,
      ideals: form.characterDescription.values.ideals,
      bonds: form.characterDescription.values.bonds,
      flaws: form.characterDescription.values.flaws,
      organizations: form.characterDescription.values.organizations,
      allies: form.characterDescription.values.allies,
      enemies: form.characterDescription.values.enemies,
      backstory: form.characterDescription.values.backstory,
      other: form.characterDescription.values.other,
    },
  });

  const { ref: backgroundRef, ...backgroundControl } = register('background', {
    required: true,
  });
  const { ref: alignmentRef, ...alignmentControl } = register('alignment', {
    required: true,
  });
  const { ref: faithRef, ...faithControl } = register('faith', {});
  const { ref: lifestyleRef, ...lifestyleControl } = register('lifestyle', {});
  const { ref: hairRef, ...hairControl } = register('hair', {});
  const { ref: skinRef, ...skinControl } = register('skin', {});
  const { ref: eyesRef, ...eyesControl } = register('eyes', {});
  const { ref: heightRef, ...heightControl } = register('height', {});
  const { ref: weightRef, ...weightControl } = register('weight', {});
  const { ref: ageRef, ...ageControl } = register('age', {});
  const { ref: genderRef, ...genderControl } = register('gender', {});
  const { ref: traitsRef, ...traitsControl } = register('traits', {});
  const { ref: idealsRef, ...idealsControl } = register('ideals', {});
  const { ref: bondsRef, ...bondsControl } = register('bonds', {});
  const { ref: flawsRef, ...flawsControl } = register('flaws', {});
  const { ref: organizationsRef, ...organizationsControl } = register(
    'organizations',
    {},
  );
  const { ref: alliesRef, ...alliesControl } = register('allies', {});
  const { ref: enemiesRef, ...enemiesControl } = register('enemies', {});
  const { ref: backstoryRef, ...backstoryControl } = register('backstory', {});
  const { ref: otherRef, ...otherControl } = register('other', {});

  const { isDirty } = useFormState({
    control,
  });

  React.useEffect(() => {
    setForm({
      ...form,
      characterDescription: {
        ...form.characterDescription,
        dirty: isDirty,
      },
    });
  }, [isDirty, setForm]);

  const AlignmentOption = ({ alignment }: { alignment: string }) => {
    return (
      <AligmentValue
        onClick={() => {
          form.characterDescription.values.alignment = alignment;
        }}
      >
        {alignment}
      </AligmentValue>
    );
  };

  return (
    <CharacterCreationFormContainer>
      <form
        onSubmit={handleSubmit(values =>
          setForm({
            ...form,
            characterDescription: {
              valid: true,
              dirty: false,
              values,
            },
          }),
        )}
      >
        <label>
          {t('createCharacter.backgroundLabel')}
          <input
            type="text"
            {...backgroundControl}
            ref={backgroundRef}
            placeholder={t('createCharacter.backgroundPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.alignmentLabel')}
          <input
            type="text"
            {...alignmentControl}
            ref={alignmentRef}
            placeholder={t('createCharacter.alignmentPlaceholder')}
          />
          <AlignmentGrid>
            <AlignmentOption alignment="Lawful Good" />
            <AlignmentOption alignment="Lawful Neutral" />
            <AlignmentOption alignment="Lawful Evil" />
            <AlignmentOption alignment="Neutral Good" />
            <AlignmentOption alignment="True Neutral" />
            <AlignmentOption alignment="Neutral Evil" />
            <AlignmentOption alignment="Chaotic Good" />
            <AlignmentOption alignment="Chaotic Neutral" />
            <AlignmentOption alignment="Chaotic Evil" />
          </AlignmentGrid>
        </label>
        <label>
          {t('createCharacter.faithLabel')}
          <input
            type="text"
            {...faithControl}
            ref={faithRef}
            placeholder={t('createCharacter.faithPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.lifestyleLabel')}
          <textarea
            {...lifestyleControl}
            ref={lifestyleRef}
            placeholder={t('createCharacter.lifestylePlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.hairLabel')}
          <input
            type="text"
            {...hairControl}
            ref={hairRef}
            placeholder={t('createCharacter.hairPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.skinLabel')}
          <input
            type="text"
            {...skinControl}
            ref={skinRef}
            placeholder={t('createCharacter.skinPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.eyesLabel')}
          <input
            type="text"
            {...eyesControl}
            ref={eyesRef}
            placeholder={t('createCharacter.eyesPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.heightLabel')}
          <input
            type="text"
            {...heightControl}
            ref={heightRef}
            placeholder={t('createCharacter.heightPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.weightLabel')}
          <input
            type="text"
            {...weightControl}
            ref={weightRef}
            placeholder={t('createCharacter.weightPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.ageLabel')}
          <input
            type="text"
            {...ageControl}
            ref={ageRef}
            placeholder={t('createCharacter.agePlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.genderLabel')}
          <input
            type="text"
            {...genderControl}
            ref={genderRef}
            placeholder={t('createCharacter.genderPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.traitsLabel')}
          <textarea
            {...traitsControl}
            ref={traitsRef}
            placeholder={t('createCharacter.traitsPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.idealsLabel')}
          <textarea
            {...idealsControl}
            ref={idealsRef}
            placeholder={t('createCharacter.idealsPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.bondsLabel')}
          <textarea
            {...bondsControl}
            ref={bondsRef}
            placeholder={t('createCharacter.bondsPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.flawsLabel')}
          <textarea
            {...flawsControl}
            ref={flawsRef}
            placeholder={t('createCharacter.flawsPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.organizationsLabel')}
          <textarea
            {...organizationsControl}
            ref={organizationsRef}
            placeholder={t('createCharacter.organizationsPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.alliesLabel')}
          <textarea
            {...alliesControl}
            ref={alliesRef}
            placeholder={t('createCharacter.alliesPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.enemiesLabel')}
          <textarea
            {...enemiesControl}
            ref={enemiesRef}
            placeholder={t('createCharacter.enemiesPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.backstoryLabel')}
          <textarea
            {...backstoryControl}
            ref={backstoryRef}
            placeholder={t('createCharacter.backstoryPlaceholder')}
          />
        </label>
        <label>
          {t('createCharacter.otherLabel')}
          <textarea
            {...otherControl}
            ref={otherRef}
            placeholder={t('createCharacter.otherPlaceholder')}
          />
        </label>
      </form>
    </CharacterCreationFormContainer>
  );
}

const AlignmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 15rem;
  width: 15rem;

  margin-left: 25%;
`;

const AligmentValue = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  border: 1px solid black;
`;
