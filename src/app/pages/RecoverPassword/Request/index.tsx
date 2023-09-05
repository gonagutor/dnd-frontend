import * as React from 'react';

import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from 'app/components/Loader';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useRequestPasswordRecovery from 'app/hooks/useRequestPasswordRecovery';
import RequestComplete from './components/RequestComplete';

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$$/;

export function RequestPasswordRecovery() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');
  const navigate = useNavigate();
  const { requestRecovery, error, pending, success } =
    useRequestPasswordRecovery();

  const [email, setEmail] = React.useState<string>('');

  const [emailError, setEmailError] = React.useState<string | undefined>(
    undefined,
  );

  const validateAll = () => {
    const errors: {
      email?: string;
    } = {};

    const checkEmptyOrTooLong = (val: string) => {
      if (val.length < 1)
        return t('requestPasswordRecovery.fieldCannotBeEmpty');
      if (val.length > 256) return t('requestPasswordRecovery.fieldTooLong');
    };

    errors.email = checkEmptyOrTooLong(email);

    if (errors.email !== undefined && EMAIL_REGEX.test(errors.email))
      errors.email = t('requestPasswordRecovery.notAValidEmail');

    setEmailError(errors.email);
    return errors.email === undefined;
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const isCorrect = validateAll();

    if (!isCorrect) return;
    requestRecovery(email);
  };

  React.useEffect(() => {
    if (success)
      setTimeout(() => navigate('/dashboard', { replace: true }), 5000);
  }, [success, navigate]);

  return (
    <>
      <Helmet>
        <title>{titleTranslation('requestPasswordRecovery')}</title>
      </Helmet>
      {pending ? <Loader translucent={true} /> : null}
      {success ? <RequestComplete /> : null}
      <Container>
        <TitleRow>
          <BackButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon size="2x" icon={faChevronLeft} />
          </BackButton>
          <Title>{t('requestPasswordRecovery.title')}</Title>
        </TitleRow>
        <RequestPasswordRecoveryForm onSubmit={onSubmit}>
          <Label>
            {t('requestPasswordRecovery.emailLabel')}
            <Input
              id="email"
              onChange={e => setEmail(e.currentTarget.value)}
              value={email}
              error={!!emailError}
              placeholder={t('requestPasswordRecovery.emailPlaceholder')}
              type="email"
              autoComplete="email"
            ></Input>
            <Error>{emailError}</Error>
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
