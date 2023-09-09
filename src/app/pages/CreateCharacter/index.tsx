import * as React from 'react';
import { useTranslation } from 'react-i18next';

export function GeneralInformationStep({
  values,
  setters,
  errors,
  errorSetters,
}) {
  const { t } = useTranslation('ui');
  const { name, surname } = values;
  const { setName, setSurname } = setters;
  const { nameError, surnameError } = errors;
  const { setNameError, setSurnameError } = errorSetters;

  const validateForm = () => {
    if (!/^[a-zA-Z0-9_]*$/.test(name)) {
      setNameError(t('nameMustBeAlphanum'));
    } else {
      setNameError(undefined);
    }
  };

  return (
    <div>
      General Info
      <form
        onSubmit={e => {
          e.preventDefault();
          validateForm();
        }}
      >
        <label>
          Name{' '}
          <input value={name} onChange={e => setName(e.currentTarget.value)} />
          <span>{nameError}</span>
        </label>
        <label>
          Surname{' '}
          <input
            value={surname}
            onChange={e => setSurname(e.currentTarget.value)}
          />
          <span>{surnameError}</span>
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export function ClassStep() {
  return (
    <div>
      Class
      <input></input>
    </div>
  );
}

export function CreateCharacter() {
  const [step, setStep] = React.useState<number>(0);

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');

  const [nameError, setNameError] = React.useState<string>('');
  const [surnameError, setSurnameError] = React.useState<string>('');

  const getStateComponent = () => {
    switch (step) {
      case 0:
        return (
          <GeneralInformationStep
            values={{ name, surname }}
            setters={{ setName, setSurname }}
            errors={{ nameError, surnameError }}
            errorSetters={{ setNameError, setSurnameError }}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
      <header>
        <button type="button" onClick={() => setStep(step - 1)}>
          BACK
        </button>
        {step}
        <button type="button" onClick={() => setStep(step + 1)}>
          NEXT
        </button>
      </header>
      <section>{getStateComponent()}</section>
    </div>
  );
}
