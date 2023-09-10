import * as React from 'react';

export const CREATE_CHARACTER_FORM_STATE = {
  step: 0,
  generalInfo: {
    valid: false,
    dirty: false,
    values: {
      name: '',
      homebrewContent: false,
    },
  },
  classSelection: {
    valid: false,
    dirty: false,
    values: {
      classId: '',
      subclassId: '',
    },
  },
  raceSelection: {
    valid: false,
    dirty: false,
    values: {
      raceId: '',
      subraceId: '',
    },
  },
  statsSelection: {
    valid: false,
    dirty: false,
    values: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  },
  characterDescription: {
    valid: false,
    dirty: false,
    values: {
      background: '',
      alignment: '',
      faith: '',
      lifestyle: '',
      hair: '',
      skin: '',
      eyes: '',
      height: '',
      weight: '',
      age: 0,
      gender: '',
      traits: '',
      ideals: '',
      bonds: '',
      flaws: '',
      organizations: '',
      allies: '',
      enemies: '',
      backstory: '',
      other: '',
    },
  },
};

export const CreateCharacterContext = React.createContext({
  form: CREATE_CHARACTER_FORM_STATE,
  setForm: (
    form:
      | typeof CREATE_CHARACTER_FORM_STATE
      | ((
          form: typeof CREATE_CHARACTER_FORM_STATE,
        ) => typeof CREATE_CHARACTER_FORM_STATE),
  ) => {},
});
