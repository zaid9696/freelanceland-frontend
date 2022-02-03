import {useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {useContext} from 'react';

import logo from '../../assets/icons/nav/logo.png';
import searchIcon from '../../assets/icons/nav/search.svg';
import loadingIcon from '../../assets/icons/loading.svg';
import chatIcon from '../../assets/icons/nav/chat.svg';
import notiIcon from '../../assets/icons/nav/notification.svg';
import searchNav from '../../assets/search.svg';
import LoginRegisterBtns from './LoginRegisterBtns';
import LoggedIn from './LoggedIn';
import SearchItems from './SearchItems';
import {AuthContext} from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttpAxios from '../../hooks/http-hook';
import AnimateTogggle from '../../components/UI/AnimateTogggle';


const NavStyles = styled.nav`

  display: grid;
  grid-column: full-start / full-end;
  
  @media (max-width: 1200px) {

        display: none !important;
        
  }

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
        width: 547px;
        @media (max-width: 1200px) { 
          width: 480px;
        }
        position: relative;
        z-index:3;
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
        left: 66.8vw;
         @media (max-width: 1100px) { 
          left: 62.4vw;
        }
        background-color: #634CC2;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        z-index: 4
    }
    img {
      width: 29px;
    }
  }

  a {
    cursor: pointer
  }

  .loading-search {

    position: absolute;
    top: 59px;
    left: 64%;
    z-index: 8;

  }




`;

const NavFooterStyles = styled.div` 

    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0px -1px 7px 1px #02020226;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    padding: 1rem 0;
    z-index:24;
    display: none;
    @media (max-width: 1200px) { 
        display: grid;
        
    }

      .notification {

      position: relative;
  }


  .notification-unread {

      background: var(--red);
      width: 10px;
      height: 10px;
      
      position: absolute;
      top: 1px;
      right: 1px;
      border-radius: 50%;
      display: none;
      pointer-events: none;
      &.read {display: block}

    }

    .search-nav {cursor: pointer}

 `

 const NavFooterSearch = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000202d9;
    z-index: 25;
    display: none;
    @media (max-width: 1200px) {

      display: block;
    }
    .nav_search {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    input {
        margin-top: 4rem;
        width: 95%;
        position: relative;
        z-index:3;
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
        left: 92.8%;
        @media (max-width:500px) {

            left: 87.5%;
        }
        top:66px;
        background-color: #634CC2;
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        z-index: 4
    }
    img {
      width: 29px;
    }
  }

  a {
    cursor: pointer
  }

  .loading-search {

    position: absolute;
    top: 67px;
    left: 79%;
    z-index: 8;

  }

  .search-item-nav-footer {

    width: 86%;
    top:104px;

  }


    .cancel {

      position: fixed;
        height: 44px;
        width: 44px;
        right: 2%;
        top: 5%;
        z-index: 5;
        cursor: pointer;
        pointer-events: none;
        &.open-drop-user {
          pointer-events: all;
        }
      span {
      height: 2px;
        width: 100%;
        background: var(--main);
        display: block;
        margin-bottom: 8px;
        border-radius: 5px;
        transition: all 1.8s cubic-bezier(1, 0.03, 0, 0.07);
        opacity: 0;
        pointer-events: none;
    &.open-drop-user:first-child {

          transform: rotate(318deg);
          opacity: 1;
          pointer-events: all;
          box-shadow:0px 0px 9px 5px #634cc22e;
    }

    &.open-drop-user:last-child {
          transform: rotate(46deg) translate(-6px,-8px);
          opacity: 1;
          pointer-events: all;
          box-shadow:0px 0px 9px 5px #634cc22e;
        }

      }

    }
  }


  `

const Nav = (props) => {

  const auth = useContext(AuthContext);
  const {sendRequest, isLoading} = useHttpAxios();
  const [searchResult, setSearchResult] = useState([]);
  const [isNotificationRead, setIsNotificatoinRead] = useState();
  const [isMessageRead, setIsMessageRead] = useState();
  const [openDropDown, setOpenDropDown] = useState(false);

  const openDropDownHandler = () => setOpenDropDown(prev => !prev);
  console.log({isMessageRead, isNotificationRead});
  const hideBarHandler = () => {

    setSearchResult([]);

  };

  const searchBundlesHandler = async (e) => {

      const {value} = e.target;
      console.log({value});
        try {

            if(value !== ''){
            const  res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/search/${value}`);
            setSearchResult(res.data.searchedBundles);
            console.log({res});

          }else {
            setSearchResult([]);
          }
        }catch(err) {console.log(err)}

  }

  return (
    <>
    {auth.isLoggedLoading && <LoadingSpinner />}
     <AnimateTogggle show={openDropDown}>
          <NavFooterSearch>
         <div className='nav_search'>
          <div onClick={openDropDownHandler} className={`cancel ${openDropDown ? 'open-drop-user' : ''}`} >
              <span className={`${openDropDown ? 'open-drop-user' : ''}`}></span>
              <span className={`${openDropDown ? 'open-drop-user' : ''}`}></span>
          </div>
                <input type='search' onChange={searchBundlesHandler} placeholder='Search here, what you are looking for?' id='search' name='search' />
                <div className='search-icon'>
                  <img src={searchIcon.src} alt='Search icon' />
                </div>
                {searchResult.length > 0 && <SearchItems clsName={'search-item-nav-footer'} hideBar={hideBarHandler} items={searchResult} />}
            </div>
            {isLoading && <div className='loading-search'>
                            <Image src={loadingIcon} alt='loading icon' width={33} height={33} />
                        </div>}
    </NavFooterSearch>
     </AnimateTogggle >
    
    {auth.isLogged && <NavFooterStyles>
        <Link href='/notifications'>
            <a>
              <div className='notification'>
                <Image width={40} height={40} src={notiIcon} alt='Notification Icon' />
                <div className={`notification-unread ${isNotificationRead && 'read'}`}></div>
              </div>
            </a>
        </Link>
            <div className='search-nav' onClick={openDropDownHandler}>
              <Image src={searchNav} width={40} height={40} />
            </div>
        <Link href='/chat'>
          <a>
          <div className='notification'>
              <Image width={35} height={35} src={chatIcon} alt='Chat Icon' />
              <div className={`notification-unread ${isMessageRead && 'read'}`}></div>
          </div>
          </a>
        </Link>
        </NavFooterStyles>}
    <NavStyles className='sub_container'>
        <div className='nav'>
            <Link className='img' href='/'>
              <a>
              <Image src={logo} alt='Logo' width={150} height={150} />
              </a>
            </Link>
            <div className='nav_search'>
                <input type='search' onChange={searchBundlesHandler} placeholder='Search here, what you are looking for?' id='search' name='search' />
                <div className='search-icon'>
                  <img src={searchIcon.src} alt='Search icon' />
                </div>
                {searchResult.length > 0 && <SearchItems hideBar={hideBarHandler} items={searchResult} />}
            </div>
            {isLoading && <div className='loading-search'>
                            <Image src={loadingIcon} alt='loading icon' width={33} height={33} />
                        </div>}
           { auth.isLogged && <LoggedIn setIsMessageRead={setIsMessageRead} setIsNotificatoinRead={setIsNotificatoinRead} /> }
           { !auth.isLogged && <LoginRegisterBtns /> }
        </div>
    </NavStyles>
    </>
  )
}

export default Nav;