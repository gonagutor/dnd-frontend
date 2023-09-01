import * as React from 'react';
import menuImg from '../assets/icons/menu.svg';
import styled from 'styled-components';

export default function Title() {
  return (
    <TitleContainer>
      <TitleText>DND</TitleText>
      <div>
        <TitleImage src="" alt="" />
        <TitleButton>
          <img src={menuImg} alt="menu" />
        </TitleButton>
      </div>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-lighter);
`;

const TitleText = styled.h1`
  color: var(--text-lighter, #e7d8b0);
  text-shadow: 0px 0px 4px #e7d8b0;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const TitleImage = styled.img`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  border-radius: var(--Border-Radius-S, 4rem);
`;

const TitleButton = styled.button`
  padding: 0;
  margin-left: 1rem;
  flex-shrink: 0;
  background-color: transparent;
  border: none;
`;
