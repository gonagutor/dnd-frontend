import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { useSelector } from 'react-redux';
import { RootState } from 'types';

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

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

        <Route
          path="/character"
          element={
            <ProtectedRoute>
              <Character />
            </ProtectedRoute>
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <ProtectedRoute>
              <CharacterView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/homebrew"
          element={
            <ProtectedRoute>
              <Homebrew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaign"
          element={
            <ProtectedRoute>
              <Campaign />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <GlobalStyle />
    </BrowserRouter>
  );
}
