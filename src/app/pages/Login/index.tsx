import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export function Login() {
  const { t: titleTranslation } = useTranslation('titles');
  const { t } = useTranslation('ui');

  const onLogin: React.FormEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>{titleTranslation('login')}</title>
      </Helmet>
      <Wrapper>
        <h1>Login</h1>
        <form>
          <input type="mail" placeholder="email@example.com" />
          <input type="password" placeholder="········" />
          <button onSubmit={onLogin}>{t('login')}</button>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
