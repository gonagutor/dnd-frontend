import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from 'app/components/Checkbox';
import Loader from 'app/components/Loader';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthActions from 'store/actions/auth';
import styled from 'styled-components';
import { RootState } from 'types';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$$/;

export function Login() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pending, error, isLoggedIn } = useSelector(
    (state: RootState) => state.auth,
  );

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const [emailError, setEmailError] = React.useState<string | undefined>(
    undefined,
  );
  const [passwordError, setPasswordError] = React.useState<string | undefined>(
    undefined,
  );

  const clearErrors = () => {
    setEmailError(undefined);
    setPasswordError(undefined);
  };

  const validateAll = () => {
    const errors: {
      email?: string;
      password?: string;
    } = {};

    const checkEmptyOrTooLong = (val: string) => {
      if (val.length < 1) return t('login.fieldCannotBeEmpty');
      if (val.length > 256) return t('login.fieldTooLong');
    };

    errors.email = checkEmptyOrTooLong(email);
    errors.password = checkEmptyOrTooLong(password);

    if (errors.email !== undefined && EMAIL_REGEX.test(password))
      errors.email = t('login.notAValidEmail');
    if (errors.password !== undefined)
      errors.password = t('login.passwordNotValid');

    clearErrors();
    setEmailError(errors.email);
    setPasswordError(errors.password);
    return errors.email === undefined && errors.password === undefined;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const isCorrect = validateAll();

    if (!isCorrect) return;
    dispatch({
      type: AuthActions.LOGIN,
      payload: { login: { email, password, rememberMe } },
    });
  };

  React.useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Helmet>
        <title>{titleTranslation('login')}</title>
      </Helmet>
      {pending ? <Loader translucent={true} /> : null}
      <Container>
        <TitleRow>
          <BackButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </BackButton>
          <Title>{t('login.title')}</Title>
        </TitleRow>
        <LoginForm onSubmit={onSubmit}>
          <Label>
            {t('login.emailLabel')}
            <Input
              id="email"
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              error={!!emailError}
              placeholder={t('login.emailPlaceholder')}
              type="email"
              autoComplete="email"
            ></Input>
            <Error>{emailError}</Error>
          </Label>

          <Label>
            {t('login.passwordLabel')}
            <Input
              id="password"
              onChange={e => setPassword(e.currentTarget.value)}
              value={password}
              error={!!passwordError}
              placeholder={t('login.passwordPlaceholder')}
              type="password"
              autoComplete="new-password"
            ></Input>
            <Error>{passwordError}</Error>
          </Label>

          <Checkbox
            id="remeberMe"
            label={t('login.rememberMe')}
            checked={rememberMe}
            setChecked={checked => setRememberMe(checked)}
          />
          {error ? (
            <span style={{ color: 'var(--error)' }}>{error}</span>
          ) : null}
          <Submit>{t('login.submit')}</Submit>
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
