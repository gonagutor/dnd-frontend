import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import PlaceholderUser from 'admin/assets/placeholder-user.svg';
import { MenuDesktop } from 'admin/components/Menu/MenuDesktop';
import { MenuMobile } from 'admin/components/Menu/MenuMobile';
import { useWindowSize } from 'common/hooks/useWindowSize';
import constants from 'utils/constants';

const Container = styled.div`
  position: relative;
  font-family: Inter;

  width: 100vw;
  min-height: 100vh;

  background: black;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  @media (max-width: ${constants.MOBILE_BREAKPOINT}px) {
    flex-direction: row-reverse;
  }

  gap: 1rem;
  width: 100%;
  padding: 1rem;
  color: white;
`;

const SearchBox = styled.section`
  display: grid;
  grid-template-columns: 8fr 1fr;
  max-width: 480px;

  background: transparent;
`;

const Input = styled.input`
  margin-right: 0.5rem;
  padding-inline: 1rem;

  color: white;
  background: #2f2f2f;
  border: none;
  border-radius: 4rem;
`;

const Button = styled.button`
  height: 3rem;
  width: 3rem;

  color: white;
  background: #2f2f2f;
  border: none;
  border-radius: 100%;
`;

const ProfilePic = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
`;

export function DashboardPage({
  children,
  currentPage,
}: {
  children: JSX.Element;
  currentPage: string;
}) {
  const { t } = useTranslation('admin');
  const { width } = useWindowSize();

  return (
    <Container>
      {width < constants.MOBILE_BREAKPOINT ? <MenuMobile /> : <MenuDesktop />}
      <div
        style={{ marginLeft: width < constants.MOBILE_BREAKPOINT ? 0 : '8rem' }}
      >
        <Header>
          {width > constants.MOBILE_BREAKPOINT && (
            <h3 style={{ margin: 0 }}>{t(currentPage)}</h3>
          )}
          <SearchBox>
            <Input placeholder={t('search')} />
            <Button>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </SearchBox>
          <ProfilePic src={PlaceholderUser} alt="user profile" />
        </Header>
        {children}
      </div>
    </Container>
  );
}
