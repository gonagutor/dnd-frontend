import * as React from 'react';

export const CREATE_CHARACTER_FORM_STATE = {
  step: 0,
  generalInfo: {
    valid: false,
    dirty: false,
    values: {
      name: '',
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
