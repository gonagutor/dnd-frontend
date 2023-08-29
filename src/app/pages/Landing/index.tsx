import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function Landing() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');

  return (
    <>
      <Helmet>
        <title>{titleTranslation('landing')}</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <span>My HomePage</span>
    </>
  );
}
