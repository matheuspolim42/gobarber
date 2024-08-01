import styled, { css } from "styled-components";
import { shade } from "polished";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 16px;
  border-radius: 10px;
  margin-top: 8px;
  flex-direction: row;
  position: relative;
  max-width: 400px;
  background-color: ${shade(0.3, '#312e38')};
  border: ${props => props.hasError ? '1px solid #c53030' : '1px solid #312e38'};

  ${props => props.isFocused && css`
    border-color: #ff9000;
  `}

  input {
    flex: 1;
    margin-left: 10px;
    margin-right: 30px;
    border: 0;
    outline: 0;
    height: 35px;
    font-size: 16px;
    background: transparent;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    display: flex;
    margin-left: 2px;
    color: #969696;
    font-size: 24px;

    ${props => props.isFocused && css`
      color: #ff9000;
    `}

    ${props => props.isFilled && css`
      color: #ff9000;
    `}
  }
`;

export const Error = styled.div`
  display: flex;
  flex-direction: column;

  div {
    svg {
      position: absolute;
      top: 25px;
      margin-left: -15px;
      font-size: 22px;
      color: #c53030;
    }

    svg:hover + span {
      opacity: 1;
      visibility: visible;
    }

    span {
      position: absolute;
      width: 160px;
      color: #eee;
      background-color: #c53030;
      font-size: 14px;
      font-weight: 400;
      top: -5px;
      right: -60px;
      border-radius: 5px;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s ease;

      div {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid  #c53030;

        top: 15px;
        left: 70px;
      }
    }
  }
`;
