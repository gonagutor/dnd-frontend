import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';

export default function useRedeemPasswordRecovery() {
  const { t } = useTranslation('errors');
  const [success, setSuccess] = React.useState(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [pending, setPending] = React.useState(false);

  const redeemRecovery = (token: string, password: string) => {
    setPending(true);
    setError(undefined);
    setSuccess(undefined);
    request
      .post(`/recover-password`, { password, token })
      .then(response => {
        setPending(false);
        setSuccess(response.data.data);
      })
      .catch(response => {
        setPending(false);
        if (response.code === 'ERR_NETWORK') return setError(t(response.code));
        setError(t(response.response.data.error));
      });
  };

  return { redeemRecovery, success, pending, error };
}
