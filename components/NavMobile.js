import {useState} from 'react';
import styled from 'styled-components';


import HeaderLinks from './Header/HeaderLinks';

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
   @media (min-width: 1000px) {

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

		

    @media (max-width: 1000px) {

    	position: fixed;
    	top: 0;
			right: 0;

    		ul {

    			position: fixed;
    			top: 0;
			    right: 0;
			    right: -100%;
    			transition: all 0.8s cubic-bezier(1, 0.03, 0, 0.07);
			    &.open-drop {
			    	right: 0;
			    	box-shadow: -4px 0px 13px 0px #02020242;
			    }
			    grid-template-columns: 1fr;
			    background: white;
			    height: 100%;
			    width: 65%;
			    display: flex;
			    flex-direction: column;
			    justify-content: center;
			    li {
			    		border-radius: 0;
			    		background: transparent;
			    		font-size: 1rem;
			    		border-bottom: 1px solid #634cc24f;
					    width: 80%;
					    padding: 0;
					    padding-bottom: 1.6rem;
					    padding-top: 1rem;

					    

					    	&:hover {

					    		 a {color: var(--main)};
					    	}

					    
			    }

    		}
    }
}

	}

 `

const NavMobile = (props) => {

	const [openDropDown, setOpenDropDown] = useState(false);

	const openDropDownHandler = () => setOpenDropDown(prev => !prev);

	

  return (
    <NavMobileStyles className='sub_container'>
    		<nav>
    			<div className='nav-user'>user</div>
    			<div className={`nav-dropdown-icon ${openDropDown ? 'open-drop' : ''}`} onClick={openDropDownHandler}>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    					<span className={`${openDropDown ? 'open-drop' : ''}`}></span>
    			</div>
    			<div className='nav-dropdown'>
    					<HeaderLinks className={`${openDropDown ? 'open-drop' : ''}`} />
    			</div>
    		</nav>
    </NavMobileStyles>
  )
}

export default NavMobile;