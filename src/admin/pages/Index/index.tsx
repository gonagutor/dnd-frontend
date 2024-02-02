import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MenuDesktop } from 'admin/components/Menu/MenuDesktop';
import { MenuMobile } from 'admin/components/Menu/MenuMobile';
import { useWindowSize } from 'common/hooks/useWindowSize';

const Container = styled.div`
  position: relative;

  width: 100vw;
  min-height: 100vh;

  background: black;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;

  width: 100%;

  background: white;
`;

const SearchBox = styled.section`
  display: grid;
  grid-template-columns: 5fr 1fr;

  max-width: 320px;
  padding: 1rem;

  background: transparent;
`;

export function Index() {
  const { t } = useTranslation('admin');
  const { width } = useWindowSize();

  return (
    <Container>
      {width < 640 ? <MenuMobile /> : <MenuDesktop />}
      <div style={{ marginLeft: '9rem' }}>
        <Header>
          <SearchBox>
            <Input placeholder={t('search')} />
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
