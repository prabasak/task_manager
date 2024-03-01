import styled from "styled-components";

const InputGroup = styled.div`
  width: 50vw;
  margin-bottom: 15px;

  & label {
    display: block;
  }

  & input {
    background-color: #fff;
    border-radius: 5px;
    border: 2px solid #444;
    height: 20px;
    margin-bottom: 5px;
  }

  & error {
    color: red;
  }
`;

function Input({ fieldName, id, errorMsg, ...props }) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{fieldName}</label>
      <input id={id} {...props} />
      <span className="error">{errorMsg}</span>
    </div>
  );
}

export default Input;
