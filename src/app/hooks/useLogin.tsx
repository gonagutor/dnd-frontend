import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';

export default function useLogin() {
  const { t } = useTranslation('errors');
  const [pending, setPending] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [error, setError] = React.useState(false);

  const login = (email: string, password: string) => {
    setPending(true);
    setError(false);
    setCompleted(false);
    request
      .post('/login', { email, password })
      .then(() => {
        setPending(false);
        setCompleted(true);
      })
      .catch(e => {
        setPending(false);
        setError(t(e.response.data.error));
      });
  };

  return { login, completed, error, pending };
}
