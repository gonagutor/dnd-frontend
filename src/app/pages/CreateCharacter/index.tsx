import * as React from 'react';
import {
  CREATE_CHARACTER_FORM_STATE,
  CreateCharacterContext,
} from './components/CreateCharacterContext';
import CreateCharacterHeader from './components/CreateCharacterHeader';
import GeneralCharacterInfo from './steps/GeneralCharacterInfo';
import ClassSelection from './steps/ClassSelection';
import RaceSelection from './steps/RaceSelection';
import StatsSelection from './steps/StatsSelection';
import CharacterDescription from './steps/CharacterDescription';
import styled from 'styled-components';

const STEPS = [
  <GeneralCharacterInfo />,
  <ClassSelection />,
  <RaceSelection />,
  <StatsSelection />,
  <CharacterDescription />,
];

export function CreateCharacter() {
  const [form, setForm] = React.useState(CREATE_CHARACTER_FORM_STATE);

  const onComplete = React.useCallback(state => {
    // TODO: Create character
  }, []);

  return (
    <CharacterCreationContainer>
      <CreateCharacterContext.Provider value={{ form, setForm }}>
        <CreateCharacterHeader />
        {STEPS[form.step]}
      </CreateCharacterContext.Provider>
    </CharacterCreationContainer>
  );
}

const CharacterCreationContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
