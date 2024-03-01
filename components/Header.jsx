import styled from "styled-components";
import Button from "./Button";

const HeaderStyle = styled.header`
  width: 100%;
  height: 70px;
  background-color: #444;
  display: flex;
  justify-content: space-between;

  & p {
    margin: 0 2rem;
    order: 2;
    align-self: center;
    color: #fff;
    font-size: 2rem;
  }

  & .login {
    margin: 0 2rem;
    order: 2;
    align-self: center;

    & label {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      color: #fff;
    }
    & input[type="email"] {
      margin-right: 2px;
      height: 25px;
      border-radius: 5px;
      border: none;
    }
  }
`;

const Header = () => {
  return (
    <HeaderStyle>
      <p>Profile Manager</p>
      <aside className="login">
        <label>Email: </label>
        <input type="email" name="" id="" />
        <Button>Login</Button>
        <Button>Register</Button>
      </aside>
    </HeaderStyle>
  );
};

export default Header;
