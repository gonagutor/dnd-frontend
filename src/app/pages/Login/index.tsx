import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function Login() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>{titleTranslation('login')}</title>
      </Helmet>
    </>
  );
}
