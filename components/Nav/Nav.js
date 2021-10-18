import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../assets/icons/nav/logo.png';
import searchIcon from '../../assets/icons/nav/search.svg';
import LoginRegisterBtns from './LoginRegisterBtns';
import LoggedIn from './LoggedIn';

const NavStyles = styled.nav`

  display: grid;
  grid-column: full-start / full-end;
  
  & .nav {
    display: grid;
    grid-template-columns: 1fr 50% 1fr;
    grid-column: center-start / center-end;
  }

  & .nav_search {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    input {
        width: 85%;
        height: 40px;
        border-radius: 6px;
        border: 2px solid #634CC2;
        padding: 15px;
        color: var(--black);
        outline: transparent;
        transition:all 0.3s ease-in-out; 
        &:focus {
          box-shadow: 1px 0px 9px 2px #634cc29e;
        }
    }
    .search-icon{

        position: absolute;
        left: 67.5%;
        background-color: #634CC2;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
    }
    img {
      width: 29px;
    }
  }

  a {
    cursor: pointer
  }



`;

const Nav = (props) => {
  return (
    <NavStyles className='sub_container'>
        <div className='nav'>
            <Link className='img' href='/'>
              <a>
              <Image src={logo} alt='Logo' width={150} height={150} />
              </a>
            </Link>
            <div className='nav_search'>
                <input type='search' placeholder='Search here, what you are looking for?' id='search' name='search' />
                <div className='search-icon'>
                  <img src={searchIcon.src} alt='Search icon' />
                </div>
            </div>
           { /* <LoggedIn /> */}
            {<LoginRegisterBtns /> }
        </div>
    </NavStyles>
  )
}

export default Nav;