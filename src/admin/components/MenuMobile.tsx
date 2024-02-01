import {
  faBars,
  faBook,
  faClose,
  faCog,
  faDragon,
  faMagic,
  faPeopleGroup,
  faSackDollar,
  faStreetView,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Logo = styled.h1`
  text-shadow: 0px 0px 4px black;
  font-family: 'Inter';
  margin: 0;
  padding: 0;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;

  border-radius: 0 32px 32px 0;
  background: white;
  width: 8rem;
`;

const FloatingActionButton = styled.button`
  display: block;

  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
  width: 3rem;
  height: 3rem;

  background-color: white;
  border: none;
  border-radius: 16px;
`;

export function MenuMobile() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation('admin');

  return (
    <>
      <FloatingActionButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon size="2x" icon={isOpen ? faBars : faClose} />
      </FloatingActionButton>
      <Nav>
        <div>
          <Logo>{t('title')}</Logo>
        </div>
        <section>
          <b>{t('system')}</b>
          <Link to="/admin/user">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link to="/admin/settings">
            <FontAwesomeIcon icon={faCog} />
          </Link>
        </section>
        <section>
          <b>{t('game')}</b>
          <Link to="/admin/spell">
            <FontAwesomeIcon icon={faMagic} />
          </Link>
          <Link to="/admin/campaign">
            <FontAwesomeIcon icon={faBook} />
          </Link>
          <Link to="/admin/character">
            <FontAwesomeIcon icon={faPeopleGroup} />
          </Link>
          <Link to="/admin/item">
            <FontAwesomeIcon icon={faSackDollar} />
          </Link>
          <Link to="/admin/class">
            <FontAwesomeIcon icon={faStreetView} />
          </Link>
          <Link to="/admin/race">
            <FontAwesomeIcon icon={faDragon} />
          </Link>
        </section>
      </Nav>
    </>
  );
}
