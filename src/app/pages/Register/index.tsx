import Loader from 'app/components/Loader';
import useRegister from 'app/hooks/useRegister';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import RegistrationComplete from './components/RegistrationComplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function Register() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');
  const navigate = useNavigate();
  const { register, completed, error, pending } = useRegister();

  const [name, setName] = React.useState<string>('');
  const [surname, setSurname] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');

  const [nameError, setNameError] = React.useState<string | undefined>(
    undefined,
  );
  const [surnameError, setSurnameError] = React.useState<string | undefined>(
    undefined,
  );
  const [emailError, setEmailError] = React.useState<string | undefined>(
    undefined,
  );
  const [passwordError, setPasswordError] = React.useState<string | undefined>(
    undefined,
  );
  const [repeatPasswordError, setRepeatPasswordError] = React.useState<
    string | undefined
  >(undefined);

  const clearErrors = () => {
    setNameError(undefined);
    setSurnameError(undefined);
    setEmailError(undefined);
    setPasswordError(undefined);
    setRepeatPasswordError(undefined);
  };

  const validateAll = () => {
    const errors: {
      name?: string;
      surname?: string;
      email?: string;
      password?: string;
      repeatPassword?: string;
    } = {};

    const checkEmptyOrTooLong = (val: string) => {
      if (val.length < 1) return t('register.fieldCannotBeEmpty');
      if (val.length > 256) return t('register.fieldTooLong');
    };

    errors.name = checkEmptyOrTooLong(name);
    errors.surname = checkEmptyOrTooLong(surname);
    errors.email = checkEmptyOrTooLong(email);
    errors.password = checkEmptyOrTooLong(password);
    errors.repeatPassword = checkEmptyOrTooLong(repeatPassword);

    if (errors.email !== undefined && EMAIL_REGEX.test(password))
      errors.email = t('register.notAValidEmail');
    if (errors.password !== undefined && PASSWORD_REGEX.test(email))
      errors.password = t('register.passwordNotValid');
    if (password !== repeatPassword)
      errors.repeatPassword = t('register.passwordsNotEqual');

    clearErrors();
    setNameError(errors.name);
    setSurnameError(errors.surname);
    setEmailError(errors.email);
    setPasswordError(errors.password);
    setRepeatPasswordError(errors.repeatPassword);
    return (
      errors.name === undefined &&
      errors.surname === undefined &&
      errors.email === undefined &&
      errors.password === undefined &&
      errors.repeatPassword === undefined
    );
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const isCorrect = validateAll();

    if (!isCorrect) return;
    register(password, email, name, surname);
  };

  React.useEffect(() => {
    if (completed) setTimeout(() => navigate('/login'), 3000);
  }, [completed, navigate]);

  return (
    <>
      <Helmet>
        <title>{titleTranslation('register')}</title>
      </Helmet>
      {pending ? <Loader translucent={true} /> : null}
      {completed ? <RegistrationComplete /> : null}
      <Container>
        <TitleRow>
          <BackButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </BackButton>
          <Title>{t('register.title')}</Title>
        </TitleRow>
        <LoginForm onSubmit={onSubmit}>
          <Label>
            {t('register.nameLabel')}
            <Input
              id="name"
              onChange={e => setName(e.currentTarget.value)}
              value={name}
              error={!!nameError}
              placeholder={t('register.namePlaceholder')}
              type="text"
              autoComplete="given-name"
            ></Input>
            <Error>{nameError}</Error>
          </Label>

          <Label>
            {t('register.surnameLabel')}
            <Input
              id="surname"
              onChange={e => setSurname(e.currentTarget.value)}
              value={surname}
              error={!!surnameError}
              placeholder={t('register.surnamePlaceholder')}
              type="text"
              autoComplete="family-name"
            ></Input>
            <Error>{surnameError}</Error>
          </Label>

          <Label>
            {t('register.emailLabel')}
            <Input
              id="email"
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              error={!!emailError}
              placeholder={t('register.emailPlaceholder')}
              type="email"
              autoComplete="email"
            ></Input>
            <Error>{emailError}</Error>
          </Label>

          <Label>
            {t('register.passwordLabel')}
            <Input
              id="password"
              onChange={e => setPassword(e.currentTarget.value)}
              value={password}
              error={!!passwordError}
              placeholder={t('register.passwordPlaceholder')}
              type="password"
              autoComplete="new-password"
            ></Input>
            <Error>{passwordError}</Error>
          </Label>

          <Label>
            {t('register.repeatPasswordLabel')}
            <Input
              id="repeatPassword"
              onChange={e => setRepeatPassword(e.currentTarget.value)}
              value={repeatPassword}
              error={!!repeatPasswordError}
              placeholder={t('register.repeatPasswordPlaceholder')}
              type="password"
              autoComplete="new-password"
            ></Input>
            <Error>{repeatPasswordError}</Error>
          </Label>

          {error ? (
            <span style={{ color: 'var(--error)' }}>{error}</span>
          ) : null}
          <Submit>{t('register.submit')}</Submit>
        </LoginForm>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  padding: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  color: var(--text-lighter);
`;

const BackButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  color: var(--text-light);
`;

const Title = styled.h1`
  text-shadow: 0px 0px 4px var(--text-lightest);
  margin: 0;
  padding: 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 100%;
`;

const Label = styled.label`
  color: var(--text-dark);
  display: flex;
  flex-direction: column;

  text-transform: uppercase;
  font-weight: bold;
`;

const Input = styled.input<{ error?: boolean }>`
  color: var(--text-dark);
  background: var(--gradient-linear-light-translucent);
  border-radius: var(--border-radius-xxs) var(--border-radius-xxs)
    var(--border-radius-s) var(--border-radius-xxs);

  font-size: 1rem;
  padding: 1rem;

  transition: box-shadow 150ms;
  :focus {
    box-shadow: 0 0 4px 4px var(--text-lightest);
    outline: none;
  }

  ${({ error }: any) =>
    error
      ? `margin-top: 0.5rem; border: 2px solid var(--error);`
      : `margin: calc(0.5rem + 2px) 2px 2px 2px; border: none;`}
`;

const Error = styled.span`
  display: inline-block;

  color: var(--error);
  min-height: 0.75rem;
  font-size: 0.75rem;
  line-height: 0.75rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

const Submit = styled.button`
  color: var(--text-lighter);
  background: var(--gradient-linear-dark);
  backdrop-filter: var(--blur);
  border: none;
  border-radius: var(--border-radius-xxs);

  font-size: 1rem;
  font-weight: bold;
  padding: 1rem;
  margin-top: 0.5rem;
`;
