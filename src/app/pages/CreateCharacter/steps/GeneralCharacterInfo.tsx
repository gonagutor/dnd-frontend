import * as React from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { CreateCharacterContext } from '../components/CreateCharacterContext';
import { useTranslation } from 'react-i18next';
import CharacterCreationFormContainer from '../components/CharacterCreationFormContainer';
import styled from 'styled-components';
import check from '../../../assets/icons/check.svg';

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
        <CharacterInfoTitle>{t('createCharacter.welcome')}</CharacterInfoTitle>
        <CharacterNameLabel>
          <CharacterNameTitle>
            {t('createCharacter.nameLabel')}
          </CharacterNameTitle>
          <CharacterNameInput
            type="text"
            {...nameControl}
            ref={nameRef}
            placeholder={t('createCharacter.namePlaceholder')}
          />
        </CharacterNameLabel>
        <CharacterContentContainer>
          <CharacterContentTitle>
            {t('createCharacter.homebrewContentLabel')}
          </CharacterContentTitle>
          <CharacterContentInfo>
            {t('createCharacter.homebrewInfo')}
          </CharacterContentInfo>
          <CharacterContentInputs>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
            <CharacterContentCell>
              <CharacterContentInput
                type="checkbox"
                {...homebrewContentControl}
                ref={homebrewContentRef}
                placeholder={t('createCharacter.homebrewContentPlaceholder')}
              />
              {t('createCharacter.homebrew')}
            </CharacterContentCell>
          </CharacterContentInputs>
        </CharacterContentContainer>
      </form>
    </CharacterCreationFormContainer>
  );
}

const CharacterInfoTitle = styled.h1`
  color: var(--text-lightest, #e7d8b0);
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterNameLabel = styled.label`
  width: 24.875rem;
  height: 5.5rem;
  flex-shrink: 0;

  color: var(--text-lighter, #d3bb7c);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterNameInput = styled.input`
  display: flex;
  width: 100%;
  height: 3.5rem;
  align-items: center;
  margin: 0.5rem 0;
  border: none;
  outline: none;
  padding: 1rem;

  border-radius: var(--Border-Radius-XXS, 1rem);
  background: var(
    --gradient-linear-translucent-light,
    linear-gradient(180deg, #65563f 0%, rgba(101, 86, 63, 0.6) 100%)
  );
`;

const CharacterNameTitle = styled.p`
  color: var(--text-lightest, #e7d8b0);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterContentContainer = styled.div`
  width: 24.875rem;
  height: 15.625rem;
  flex-shrink: 0;
`;

const CharacterContentTitle = styled.p`
  color: var(--text-dark, #301005);
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterContentInfo = styled.p`
  color: var(--background-dark, #65563f);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterContentInputs = styled.div`
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: var(--Border-Radius-XXXS, 0.5rem) 0rem;
  flex-wrap: wrap;
`;
const CharacterContentCell = styled.label`
  display: flex;
  padding-right: 0px;
  align-items: center;
  gap: 0.5625rem;

  color: #000;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CharacterContentInput = styled.input`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;

  border-radius: 0.25rem;
  background: var(
    --gradient-linear-dark,
    linear-gradient(180deg, #362016 0%, #0b0906 100%)
  );
`;
