import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { request } from 'utils/axios';
import ValidationComplete from './components/ValidationComplete';
import ValidationFailed from './components/ValidationFailed';
import Loader from 'app/components/Loader';
import constants from 'utils/constants';

let didInit = false;
export default function ValidateEmail() {
  const { search } = useLocation();
  const { t } = useTranslation('errors');
  const [result, setResult] = React.useState<string>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (didInit) return;
    didInit = true;

    const token = new URLSearchParams(search).get('token');
    request
      .get(`${constants.ENDPOINTS.validateEmail}?token=${token}`)
      .then(result => setResult(result.data.code))
      .catch(error => setError(t(error.response.data.error)));
  });

  if (!result && !error) {
    return <Loader translucent={true} />;
  }

  return error ? <ValidationFailed error={error} /> : <ValidationComplete />;
}
