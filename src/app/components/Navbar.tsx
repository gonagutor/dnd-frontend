import * as React from 'react';
import book from 'app/assets/icons/archive-book.svg';
import glass from 'app/assets/icons/glass.svg';
import house from 'app/assets/icons/house.svg';
import people from 'app/assets/icons/people.svg';
import setting from 'app/assets/icons/settings.svg';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export default function Navbar() {
  const { t } = useTranslation('ui');
  return (
    <NavbarContainer>
      <NavbarButton to="/homebrew" src={glass} name={t('flaskIconAlt')} />
      <NavbarButton to="/character" src={people} name={t('peopleIconAlt')} />
      <NavbarButton to="/dashboard" src={house} name={t('houseIconAlt')} />
      <NavbarButton to="/campaign" src={book} name={t('bookIconAlt')} />
      <NavbarButton to="/settings" src={setting} name={t('settingIconAlt')} />
    </NavbarContainer>
  );
}

function NavbarButton({
  to,
  src,
  name,
}: {
  to: string;
  src: string;
  name: string;
}) {
  const location = useLocation();
  return (
    <Link to={to}>
      <img
        src={src}
        alt={name}
        style={{
          filter:
            location.pathname === to
              ? 'drop-shadow(0px 0px 8px var(--text-lightest))'
              : undefined,
        }}
      />
    </Link>
  );
}

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem;
  background: var(--gradient-linear-dark);
  border-radius: var(--border-radius-xxs);
  box-shadow: 0px 0px 4px 0px var(--background-dark);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;
