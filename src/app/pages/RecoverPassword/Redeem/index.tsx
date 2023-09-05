import * as React from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'app/components/Loader';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useRedeemPasswordRecovery from 'app/hooks/useRedeemPasswordRecovery';

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export function RedeemPasswordRecovery() {
  const { t: titleTranslation } = useTranslation('titles');
  const { search } = useLocation();
  const { t } = useTranslation('ui');
  const navigate = useNavigate();
  const { redeemRecovery, error, pending, success } =
    useRedeemPasswordRecovery();

  const [password, setPassword] = React.useState<string>('');
  const [repeatPassword, setRepeatPassword] = React.useState<string>('');

  const [passwordError, setPasswordError] = React.useState<string | undefined>(
    undefined,
  );
  const [repeatPasswordError, setRepeatPasswordError] = React.useState<
    string | undefined
  >(undefined);

  const validateAll = () => {
    const errors: {
      password?: string;
      repeatPassword?: string;
    } = {};

    const checkEmptyOrTooLong = (val: string) => {
      if (val.length < 1)
        return t('requestPasswordRecovery.fieldCannotBeEmpty');
      if (val.length > 256) return t('requestPasswordRecovery.fieldTooLong');
    };

    errors.password = checkEmptyOrTooLong(password);
    errors.repeatPassword = checkEmptyOrTooLong(repeatPassword);

    if (errors.password !== undefined && PASSWORD_REGEX.test(password))
      errors.password = t('requestPasswordRecovery.notAValidEmail');
    if (password !== repeatPassword)
      errors.password = t('requestPasswordRecovery.passwordsAreNotEqual');

    setPasswordError(undefined);
    setRepeatPasswordError(undefined);
    setPasswordError(errors.password);
    setRepeatPasswordError(errors.repeatPassword);
    return errors.password === undefined && errors.repeatPassword === undefined;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const isCorrect = validateAll();

    if (!isCorrect) return;
    const token = new URLSearchParams(search).get('token') || '';
    redeemRecovery(token, password);
  };

  React.useEffect(() => {
    if (success) navigate('/dashboard', { replace: true });
  }, [success, navigate]);

  return (
    <>
      <Helmet>
        <title>{titleTranslation('requestPasswordRecovery')}</title>
      </Helmet>
      {pending ? <Loader translucent={true} /> : null}
      <Container>
        <TitleRow>
          <BackButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </BackButton>
          <Title>{t('requestPasswordRecovery.title')}</Title>
        </TitleRow>
        <RequestPasswordRecoveryForm onSubmit={onSubmit}>
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
          <Submit>{t('requestPasswordRecovery.submit')}</Submit>
        </RequestPasswordRecoveryForm>
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

const RequestPasswordRecoveryForm = styled.form`
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
