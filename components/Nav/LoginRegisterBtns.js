import {useContext} from 'react';
import styled from 'styled-components';

import {AuthContext} from '../../context/AuthContext';

const LoginRegisterBtnsStyles = styled.div`

	display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    padding: 0.5rem 2rem;
    font-size: 1.2rem;
    font-weight: 500;
    margin-left: 1rem;
    border-radius: 5px;
    transition: var(--tranhover);
    &:nth-child(1){
      color: var(--main);
      background: transparent;
      border: 2px solid;
      &:hover {
          background: var(--main);
          color: #fff;
      }
    }
    &:nth-child(2){
        color: #fff;
        background: var(--main);
        border: 2px solid;
        &:hover {
          background: transparent;
          color: var(--main);
      }
    }
  }

`;

const LoginRegisterBtns = (props) => {

  const auth = useContext(AuthContext);

  return (
    <LoginRegisterBtnsStyles>
    	<button type='button' onClick={auth.logout}>Login</button>
    	<button type='button'>Register</button>
    </LoginRegisterBtnsStyles>
  )
}

export default LoginRegisterBtns;