import * as React from 'react';
import {
  CREATE_CHARACTER_FORM_STATE,
  CreateCharacterContext,
} from './components/CreateCharacterContext';
import CreateCharacterHeader from './components/CreateCharacterHeader';
import GeneralCharacterInfo from './steps/GeneralCharacterInfo';

const STEPS = [<GeneralCharacterInfo />];

export function CreateCharacter() {
  const [form, setForm] = React.useState(CREATE_CHARACTER_FORM_STATE);

  const onComplete = React.useCallback(state => {
    // TODO: Create character
  }, []);

  return (
    <CreateCharacterContext.Provider value={{ form, setForm }}>
      <CreateCharacterHeader />
      {STEPS[form.step]}
    </CreateCharacterContext.Provider>
  );
}
