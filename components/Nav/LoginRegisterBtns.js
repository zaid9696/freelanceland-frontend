import {useContext} from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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
    cursor: pointer;
    &.login{
      color: var(--main);
      background: transparent;
      border: 2px solid;
      &:hover {
          background: var(--main);
          color: #fff;
      }
    }
    &.signup{
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


  return (
    <LoginRegisterBtnsStyles>
    <Link href='/login'>
      <a>
    	<button type='button' className='login'>Login</button>
      </a>
    </Link>
    <Link href='/signup'>
      <a>
    	<button type='button' className='signup'>Register</button>
      </a>
    </Link>
    </LoginRegisterBtnsStyles>
  )
}

export default LoginRegisterBtns;