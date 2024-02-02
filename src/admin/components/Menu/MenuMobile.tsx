import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';
import { MenuButtonList } from './MenuButtonList';

const Container = styled.nav<{ isOpen: boolean }>`
  display: block;

  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;

  background-color: white;
  border: none;
  border-radius: 16px;
`;

const FloatingActionButton = styled.button`
  display: block;
  width: 3rem;
  height: 3rem;

  background-color: transparent;
  border: none;
  border-radius: 16px;
`;

const Menu = styled.section<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  transition: max-height ease-in-out 0.25s, padding-block ease-in-out 0.25s;
  padding-block: ${props => (props.isOpen ? '0.5rem' : 0)};
  max-height: ${props => (props.isOpen ? '100vh' : '0')};

  overflow: hidden;
`;

export function MenuMobile() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Container isOpen={isOpen}>
      <Menu isOpen={isOpen}>
        <MenuButtonList hideLabels />
      </Menu>
      <FloatingActionButton onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon size="2x" icon={isOpen ? faClose : faBars} />
      </FloatingActionButton>
    </Container>
  );
}
