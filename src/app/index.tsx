import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { GlobalStyle } from 'styles/global-styles';

import { Landing } from './pages/Landing/Loadable';
import { NotFound } from './pages/NotFound/Loadable';
import { CharacterView } from './pages/CharacterView/Loadable';
import { CharacterList } from './pages/CharacterList/Loadable';
import { Login } from './pages/Login/Loadable';
import { Register } from './pages/Register/Loadable';

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

        <Route path="/character" element={<CharacterList />} />
        <Route path="/character/:characterId" element={<CharacterView />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
