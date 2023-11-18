import React from "react";
import { CiLock as Lock } from "react-icons/ci";
import {
  AiTwotoneEye as ShowEye,
  AiOutlineEyeInvisible as ShowEyeSlash,
} from "react-icons/ai";

import styled from "styled-components";
function PasswordInput({
  error,
  showPassword = false,
  togglePassword = null,
  children,
}) {
  return (
    <InputWrapper>
      <Lock size="1.5rem" />
      {children}
      <TogglePassword type="button" onClick={togglePassword}>
        {showPassword ? (
          <ShowEyeSlash size="1.5rem" />
        ) : (
          <ShowEye size="1.5rem" />
        )}
      </TogglePassword>
      {error && <span>{error}</span>}
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--green-100);
  padding-inline-start: var(--spacing-40);
  border-radius: 0.5rem;
  gap: var(--spacing-20);
  position: relative;
  input {
    width: 100%;
    &:focus {
      outline: 2px solid var(--green-500);
    }
  }

  span {
    position: absolute;
    right: 3rem;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 500;
    transform: translateY(50%);
    bottom: 50%;
  }
`;
const TogglePassword = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  position: absolute;
  width: 3rem;
  right: 0;
  padding-inline: var(--spacing-20);
  background: var(--green-100) !important;
  &:hover {
    cursor: pointer;
  }
  svg {
    color: var(--green-800);
  }
`;
export default PasswordInput;
