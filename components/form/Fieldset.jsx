import styled from "styled-components";

const FieldSet = styled.fieldset`
  display: block;

  & legend {
    background-color: #000;
    color: #fff;
    padding: 3px 6px;
  }
`;

function Fieldset({ fieldName, children }) {
  return (
    <fieldset>
      <legend>{fieldName}</legend>
      {children}
    </fieldset>
  );
}

export default Fieldset;
