import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';

export default function useRegister() {
  const { t } = useTranslation('errors');
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [completed, setCompleted] = React.useState(false);

  function register(
    password: string,
    email: string,
    name: string,
    surname: string,
  ) {
    setError(undefined);
    setCompleted(false);
    setPending(true);
    request
      .post('/register', {
        name,
        surname,
        email,
        password,
      })
      .then(() => {
        setPending(false);
        setCompleted(true);
      })
      .catch(e => {
        setPending(false);
        setError(t(e.response.data.error));
      });
  }

  return { register, completed, error, pending };
}
