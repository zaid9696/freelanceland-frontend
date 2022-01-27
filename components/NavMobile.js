import {useState, useContext, useEffect} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import userIcon from '../assets/user.svg';
import logoIcon from '../assets/icons/nav/logo.png';
import useHttpAxios from '../hooks/http-hook';
import HeaderLinks from './Header/HeaderLinks';
import {AuthContext} from '../context/AuthContext';

const NavMobileStyles = styled.div` 

	grid-column: full-start / full-end;	
	position: fixed;
  	width: 100%;
  	top: 0;
  	left: 0;
  	background: #fff;
  	z-index: 1;
  	padding: 1.2rem 0;
  	box-shadow: 0px 1px 7px 1px #02020226;
   @media (min-width: 1200px) {

  		display: none !important;
    		
    }

	nav {

		grid-column: center-start / center-end;
		    display: flex;
    		justify-content: space-between;
	}

	.nav-dropdown-icon {

		width: 33px;
		cursor: pointer;
		border: 1px solid var(--main);
	  padding: 0.6rem 0.6em;
	  border-radius: 5px;
	  height: 25px;
	  z-index:3;
    transition: all 0.8s cubic-bezier(1, 0.03, 0, 0.07);

	  &.open-drop {

			border: 1px solid transparent;

	  }
	  }
		span {
		
			height: 2px;
		    width: 100%;
		    background: var(--main);
		    display: block;
		    margin-bottom: 8px;
    		border-radius: 5px;
    		transition: all 0.8s cubic-bezier(1, 0.03, 0, 0.07);
    		&.open-drop:first-child {

    			transform: rotate(318deg);
    			opacity: 1;
    			box-shadow:0px 0px 9px 5px #634cc22e;
			}
    		
    		&.open-drop {opacity: 0;}
    		
    		&:last-child {

    			margin-bottom: 0;
    		}
    		&.open-drop:last-child {
    			transform: rotate(46deg) translate(-13px,-15px);
    			opacity: 1;
    			box-shadow:0px 0px 9px 5px #634cc22e;
    		}

		}

	}

	.nav-dropdown {

		

    @media (max-width: 1200px) {

    	position: fixed;
    	top: 0;
		right: 0;
	
    		ul{
    			&.right {
    				right: -100%; 
    				overflow-y: auto;
    				&::-webkit-scrollbar{
			    	width: 7px;
					  background-color: #c5c5c5;
			    }

			    &::-webkit-scrollbar-thumb {

			    	background: #3c4858;
			    	border-radius: 6px;
			    }
			 }
    			&.left {
    				 left: -100%;
    				 width: 53%;
    				 box-shadow: 3px 23px 5px 1px #02020226;
    			}
    			position: fixed;
    			top: 0;
    			transition: all 0.8s cubic-bezier(1, 0.03, 0, 0.07);
			    &.open-drop {
			    	// right: 0;
			    	box-shadow: -4px 0px 13px 0px #02020242;
			    }
			    &.open-drop.right {right: 0}
			    &.open-drop-user.left {left: 0}
			    grid-template-columns: 1fr;
			    background: white;
			    height: 100%;
			    width: 65%;
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
			    &.right {
			    	li {
			    		&:first-child {
			    			padding-top: 95px;
			    		}
			    	}
			    }
			    li {
			    		border-radius: 0;
			    		background: transparent;
			    		font-size: 1rem;
			    		border-bottom: 1px solid #634cc24f;
					    width: 80%;
					    padding: 0;
					    padding-bottom: 1.6rem;
					    padding-top: 1rem;
					    @media (max-width: 500px){
					    	a {
					    		font-size: 0.9rem;
					    	}
					    }
					    	&:hover {

					    		 a {color: var(--main)};
					    	}

					    
			    }

    		}
    }
}

	}

	.nav-user {

		.user-icon {

			cursor: pointer;

		}
	}

	.nav-dropdown.user {

		ul {

			button {

				 background: var(--main);
			    color: #fff;
			    font-weight: 500;
			    font-size: 1.3em;
			    border: none;
			    padding: 11px;
			    cursor: pointer;
			    letter-spacing: 1px;

			}

			li {
				text-align: center;
				width: 100%;
			    font-size: 1.4rem;
			    font-weight: 500;
			    text-transform: uppercase;
			    a {
			    	color: var(--main);
			    }
			}

		}

		.cancel {

			position: fixed;
		    height: 44px;
		    width: 44px;
		    right: 50%;
		    top: 10%;
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
    		transition: all 0.8s cubic-bezier(1, 0.03, 0, 0.07);
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

	.nav-user {

		.user-info {
			display: flex;
			cursor: pointer;
		}

		p {
			margin-left: 6px;
		    font-size: 1.1rem;
		    font-weight: 500;
		    margin-top: 15px;
		}

	}

	.nav-mobile-logo {

		height: 0;
	    position: relative;
	    top: -15px;

	}

 `

const NavMobile = (props) => {

	const [categories, setCategories] = useState([]);
	const [openDropDown, setOpenDropDown] = useState(false);
	const [openDropDownUser, setOpenDropDownUser] = useState(false);
	const {userAuth, isLogged, logout} = useContext(AuthContext);
	const openDropDownHandler = () => {
		setOpenDropDown(prev => !prev); 
		setOpenDropDownUser(false)
	};
	const openDropDownUserHandler = () => {
		setOpenDropDownUser(prev => !prev);
		setOpenDropDown(false);
	}

  const {sendRequest} = useHttpAxios()

  useEffect(() => {

    const fetchCategories = async () => {

          try {

              const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/categories`);
              setCategories(res.data.allCategories);
          }catch(err) {console.log(err);}

    }

    fetchCategories();

  }, []);

	

  return (
    <NavMobileStyles className='sub_container'>
    		<nav>
    			<div className='nav-user'>
    				{ isLogged && <div className='user-info' onClick={openDropDownUserHandler}>
	    						<div className='user-img img-circle'>
	    						<Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${userAuth.photo}`}  width={50} height={50}/>
	    							
	    						</div>
	    						<p>{userAuth.userName}</p>
	    				</div>
    				   }

    				{!isLogged && <div className='user-icon' onClick={openDropDownUserHandler}>
    				    <Image src={userIcon} width={50} height={50}/>
    				    				</div>
    				 }
    			</div>
    			<div className='nav-mobile-logo'>
    				<Link href='/'>
    					<a>
    					<Image src={logoIcon} width={100} height={100} />	
    					</a>
    				</Link>
    			</div>
    			<div className={`nav-dropdown-icon ${openDropDown ? 'open-drop' : ''}`} onClick={openDropDownHandler}>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    			</div>
    			<div className='nav-dropdown'>
    					<HeaderLinks categories={categories} className={`${openDropDown ? 'open-drop' : ''}`} />
    			</div>
    			<div className='nav-dropdown user'>
    					<div className={`cancel ${openDropDownUser ? 'open-drop-user' : ''}`} onClick={openDropDownUserHandler}>
    						<span className={`${openDropDownUser ? 'open-drop-user' : ''}`}></span>
    						<span className={`${openDropDownUser ? 'open-drop-user' : ''}`}></span>
    					</div>
    					<ul className={`${openDropDownUser ? 'open-drop-user' : ''} left`}>
    						{!isLogged && <> 
    						<li onClick={openDropDownUserHandler}><Link href='/login'><a>Login</a></Link></li> 
    						<li onClick={openDropDownUserHandler}><Link href='/signup'><a>Register</a></Link></li> </>}    				
    						{isLogged && <> 
	    						<li onClick={openDropDownUserHandler}><Link href={`/${userAuth.userName}`}><a>My Profile</a></Link></li> 
	    						<li onClick={openDropDownUserHandler}><Link href={`/dashboard`}><a>Dashboard</a></Link></li> 
	    						<li onClick={openDropDownUserHandler}><Link href={`/requests`}><a>Requests</a></Link></li> 
	    						<button type='button' onClick={logout}>Logout</button>
	    						</>
    						}

    					</ul>
    			</div>
    		</nav>
    </NavMobileStyles>
  )
}

export default NavMobile;