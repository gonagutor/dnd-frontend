import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'styled-components';

type CheckboxProps = {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  id: string;
  className?: string;
};

export default function Checkbox({
  label,
  checked,
  setChecked,
  className,
  id,
}: CheckboxProps) {
  return (
    <Label htmlFor={id}>
      <CheckboxContainer className={className}>
        <HiddenCheckbox
          id={id}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <StyledCheckbox checked={checked}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              visibility: checked ? 'visible' : 'hidden',
              color: 'var(--text-light)',
            }}
          />
        </StyledCheckbox>
      </CheckboxContainer>
      {label}
    </Label>
  );
}

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: var(--text-dark);
  margin-bottom: 1.25rem;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-inline: 0.5rem;
  background: ${props =>
    props.checked ? 'var(--background-dark)' : 'var(--background-light)'};
  border-radius: 0.2rem;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 4px 4px var(--text-lightest);
  }
`;
