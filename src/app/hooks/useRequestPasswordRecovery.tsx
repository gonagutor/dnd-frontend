import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';

export default function useRequestPasswordRecovery() {
  const { t } = useTranslation('errors');
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [pending, setPending] = React.useState(false);

  const requestRecovery = (email: string) => {
    setPending(true);
    setError(undefined);
    setSuccess(false);
    request
      .post('/recover-password-request', { email })
      .then(response => {
        setPending(false);
        setSuccess(true);
      })
      .catch(response => {
        setPending(false);
        if (response.code === 'ERR_NETWORK') return setError(t(response.code));
        setError(t(response.response.data.error));
      });
  };

  return { requestRecovery, success, pending, error };
}
