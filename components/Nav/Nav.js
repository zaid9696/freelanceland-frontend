import {useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import {useContext} from 'react';

import logo from '../../assets/icons/nav/logo.png';
import searchIcon from '../../assets/icons/nav/search.svg';
import loadingIcon from '../../assets/icons/loading.svg';
import LoginRegisterBtns from './LoginRegisterBtns';
import LoggedIn from './LoggedIn';
import SearchItems from './SearchItems';
import {AuthContext} from '../../context/AuthContext';
import LoadingSpinner from '../UI/LoadingSpinner';
import useHttpAxios from '../../hooks/http-hook';

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

const Nav = (props) => {

  const auth = useContext(AuthContext);
  const {sendRequest, isLoading} = useHttpAxios();
  const [searchResult, setSearchResult] = useState([])

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
           { auth.isLogged && <LoggedIn /> }
           { !auth.isLogged && <LoginRegisterBtns /> }
        </div>
    </NavStyles>
    </>
  )
}

export default Nav;