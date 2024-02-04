import * as React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBook,
  faCog,
  faDragon,
  faHome,
  faMagic,
  faPeopleGroup,
  faSackDollar,
  faStreetView,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

type MenuItemLabel = { label: string };
type MenuItemButton = { icon: IconProp; to: string };
type MenuItemSpacer = { height: number | string };
type MenuItem = MenuItemLabel | MenuItemButton | MenuItemSpacer;

const menuContents: Array<MenuItem> = [
  { label: 'system' },
  { to: '/admin', icon: faHome },
  { to: '/admin/user', icon: faUser },
  { to: '/admin/settings', icon: faCog },
  { height: '2rem' },
  { label: 'game' },
  { to: '/admin/spell', icon: faMagic },
  { to: '/admin/campaign', icon: faBook },
  { to: '/admin/character', icon: faPeopleGroup },
  { to: '/admin/item', icon: faSackDollar },
  { to: '/admin/class', icon: faStreetView },
  { to: '/admin/race', icon: faDragon },
];

const ButtonLink = styled(Link)<{ current: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: black;
  height: 2.5rem;
  width: 2.5rem;

  ::before {
    content: '';
    position: absolute;
    width: 0.25rem;
    height: 1rem;
    left: 0;

    background-color: ${props => (props.current ? 'black' : 'white')};
    border-radius: 0 0.2rem 0.2rem 0;
  }
`;

function MenuButton({ to, icon }: Readonly<{ to: string; icon: IconProp }>) {
  const { pathname } = useLocation();
  return (
    <ButtonLink to={to} current={pathname.includes(to)}>
      <FontAwesomeIcon size="2x" icon={icon} />
    </ButtonLink>
  );
}

const Label = styled.span`
  font-family: Inter;
  font-weight: 100;
  color: #3f3f3f;
`;

export function MenuButtonList({
  hideLabels = false,
  hideSpacers = false,
}: {
  hideLabels?: boolean;
  hideSpacers?: boolean;
}) {
  const { t } = useTranslation('admin');

  return (
    <>
      {menuContents.map(element => {
        const menuLabel: MenuItemLabel = element as MenuItemLabel;
        if (menuLabel.label && !hideLabels)
          return (
            <Label key={menuLabel.label}>
              {t(`navbar.${menuLabel.label}`)}
            </Label>
          );

        const menuSpacer: MenuItemSpacer = element as MenuItemSpacer;
        if (menuSpacer.height && !hideSpacers)
          return <div style={{ height: menuSpacer.height }} />;

        const menuButton: MenuItemButton = element as MenuItemButton;
        if (menuButton.icon)
          return (
            <MenuButton
              key={menuButton.to}
              to={menuButton.to}
              icon={menuButton.icon}
            />
          );

        return <></>;
      })}
    </>
  );
}
