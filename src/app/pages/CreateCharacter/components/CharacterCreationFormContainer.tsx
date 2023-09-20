import * as React from 'react';
import styled from 'styled-components';

export default function CharacterCreationFormContainer({ children }) {
  return <Section>{children}</Section>;
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 1rem;
`;
