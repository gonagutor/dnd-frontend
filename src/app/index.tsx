import * as React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import { Landing } from './pages/Landing/Loadable';
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
import ValidateEmail from './pages/ValidateEmail';
import { RedeemPasswordRecovery } from './pages/RecoverPassword/Redeem';
import { RequestPasswordRecovery } from './pages/RecoverPassword/Request';
import { NotFound } from './pages/NotFound';
import { GlobalStyle } from 'styles/global-styles';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export function App() {
  const { i18n } = useTranslation();

  return (
    <>
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
        <Route index element={<Landing />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="validate-email" element={<ValidateEmail />} />
        <Route
          path="recover-password/request"
          element={<RequestPasswordRecovery />}
        />
        <Route
          path="recover-password/redeem"
          element={<RedeemPasswordRecovery />}
        />

        <Route
          path="character"
          element={
            <ProtectedRoute>
              <Character />
            </ProtectedRoute>
          }
        />
        <Route
          path="character/:characterId"
          element={
            <ProtectedRoute>
              <CharacterView />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="homebrew"
          element={
            <ProtectedRoute>
              <Homebrew />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="campaign"
          element={
            <ProtectedRoute>
              <Campaign />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </>
  );
}
