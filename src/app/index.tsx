import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GlobalStyle } from 'styles/global-styles';

import { Landing } from './pages/Landing/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { CharacterView } from './pages/CharacterView/Loadable';
import { Login } from './pages/Login/Loadable';
import { Register } from './pages/Register/Loadable';
import { Dashboard } from './pages/Dashboard/Loadable';
import { Character } from './pages/Character/Loadable';
import { Homebrew } from './pages/Homebrew/Loadable';
import { Settings } from './pages/Settings/Loadable';
import { Campaign } from './pages/Campaign/Loadable';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - D&D"
        defaultTitle="D&D"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta
          name="description"
          content="A D&D character administration site"
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/character" element={<Character />} />
        <Route path="/character/:characterId" element={<CharacterView />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/homebrew" element={<Homebrew />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/campaign" element={<Campaign />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <GlobalStyle />
    </BrowserRouter>
  );
}
