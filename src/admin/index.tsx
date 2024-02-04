import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import '@fontsource/inter';

import { Index } from './pages/Index/Loadable';

export function Admin() {
  const { i18n } = useTranslation();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <Helmet
        titleTemplate="%s - D&D Admin"
        defaultTitle="D&D Admin"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="A D&D character administration site"
        />
      </Helmet>

      <Routes>
        <Route index element={<Index />} />
        <Route path="/test" element={<h2>test</h2>} />
      </Routes>
    </>
  );
}
