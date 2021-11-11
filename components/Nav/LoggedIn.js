import {useContext, useState} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

import {AuthContext} from '../../context/AuthContext';
import chatIcon from '../../assets/icons/nav/chat.svg';
import notiIcon from '../../assets/icons/nav/notification.svg';
import profileIcon from '../../assets/icons/dashboard/editProfileDrop.svg';
import dashboardIcon from '../../assets/icons/dashboard/dashboard.svg';
import arrowDownIcon from '../../assets/icons/nav/arrow_down.svg';
import userAvatar from '../../assets/userAvatar.jpg';

const LoggedInStyles = styled.div`

	  display: flex;
    align-items: center;
	  
    .dropdown-wrap {

      position: relative;
      .dropdown {
        background: var(--main);
        padding: 0.7rem;
        display: flex;
        border-radius: 3px;
        cursor: pointer;
        img {
          cursor: pointer;
          transform: rotate(0deg);
          transition: all 0.5s ease-in-out;
        }

        &.active {
           img {

            transform: rotate(180deg);

           }
        }
      }

     

      .dropdown-content {

        position: absolute;
        background: #fff;
        padding: 1rem;
        right: -57%;
        box-shadow: 0px 1px 5px 1px #02020238;
        z-index: 29;
        width: 245px; 
        border-radius: 4px;

        ul {margin-top: 0.3rem;}
        li {

          margin-bottom: 1.2rem;
          border-bottom: 1px solid #634cc242;
          padding-bottom: 0.4rem;
          a {
            display: flex;
            align-items: center;
            span {
              margin-left: 0.4rem;
              font-size: 1.1rem;
              font-weight: 500;
            }
          }

        }

         button {

            width: 100%;
            padding: 0.7rem;
            font-size: 1.2rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: var(--main);
            border: navajowhite;
            border-radius: 4px;
            color: #fff;

          }

      }


  }

    .user-info {

        display: flex;
        align-items: center;
        margin: 0rem 1.5rem;
        margin-left: 15px;

      .user-data {
          margin-left: 9px;
      }

        p {
            padding: 0;
            margin: 0;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 0.3px;
        }
        span{ font-size: 0.8rem; color: #00893a; font-weight: 600;}
    }

    .icons {
        display: flex;
        align-items: self-start;
        position: relative;
        top: 5px;
        .notification {
          margin-right: 14px;
        }
    }

    

`;

const LoggedIn = (props) => {

  const [showDrop, setShowDrop] = useState(false);
  const auth = useContext(AuthContext);
  const userAuth = auth.userAuth;

  const dropdownHandler = () => setShowDrop(prev => !prev);


  return (
    <LoggedInStyles>
    	<div className='icons'>
    		<div className='notification'><Image width={40} height={40} src={notiIcon} alt='Notification Icon' /></div>
    		<Image width={35} height={35} src={chatIcon} alt='Chat Icon' />
    	</div>
    	<div className='user-info'>
    		<div className='img-circle'><Image width={40} height={40} src={userAvatar} alt='User Avatar' /></div>
    		<div className='user-data'>
    			<p>{userAuth.userName}</p>
    			<span>$900</span>
    		</div>
    	</div>
    
      <div className='dropdown-wrap'>
      	<div className={`dropdown ${showDrop ? 'active' : ''}`} onClick={dropdownHandler}>
      		<Image src={arrowDownIcon} alt='Arrow Down Icon' />
      	</div>
        <AnimatePresence>
          {showDrop && 
            <motion.div className='dropdown-content'

            initial={{opacity: 0, y: 50}} 
            animate={{opacity: 1, y: 0, transition:{duration: 0.5}}}
            exit={{ opacity: 0, y: -50,transition:{duration: 0.5} }}

            >
          
              <ul>
                <li><Link href='#'><a><Image width={35} height={35} src={profileIcon} alt='Profile Icon' /><span>My Profile</span></a></Link></li>
                <li><Link href='#'><a><Image width={35} height={35} src={dashboardIcon} alt='Dashboard Icon' /><span>Dashboard</span></a></Link></li>
    
              </ul>
                    <button type='button' onClick={auth.logout}>Logout</button>
                      
                    </motion.div>}
        </AnimatePresence>
      </div>
    </LoggedInStyles>
  )
}



export default LoggedIn;