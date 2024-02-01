import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MenuDesktop } from 'admin/components/MenuDesktop';
import { MenuMobile } from 'admin/components/MenuMobile';

const Container = styled.div`
  position: relative;
  background: black;
  width: 100vw;
  min-height: 100vh;
`;

const Header = styled.header`
  width: 100%;
`;

const SearchBox = styled.section`
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding: 1rem;
  background: transparent;
`;

export function Index() {
  const { t } = useTranslation('admin');

  return (
    <Container>
      <MenuDesktop />
      <MenuMobile />
      <div style={{ marginLeft: '9rem' }}>
        <Header>
          <SearchBox>
            <Input placeholder="Your location" sx={{ width: 300 }} />
            <Button
              variant="plain"
              color="neutral"
              startDecorator={<FontAwesomeIcon icon={faSearch} />}
            />
          </SearchBox>
          <img src="/images/avatar/onyamalimba.png" alt="user profile" />
        </Header>
      </div>
    </Container>
  );
}
