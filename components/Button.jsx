import styled from "styled-components";

const ActionButton = styled.button`
  flex-shrink: 1;
  flex-grow: 1;
  font-size: 14px;
  padding: 5px 10px;
  margin: 0 2px;
  border: none;
  border-radius: 4px;
  

  &:hover,
  &:focus {
    background-color: transparent;
  }
`;

export default function Button({ children, ...props }) {
  return <ActionButton {...props}>{children}</ActionButton>;
}
