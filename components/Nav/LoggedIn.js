import styled from 'styled-components';
import Image from 'next/image';

import chatIcon from '../../assets/icons/nav/chat.svg';
import notiIcon from '../../assets/icons/nav/notification.svg';
import arrowDownIcon from '../../assets/icons/nav/arrow_down.svg';
import userAvatar from '../../assets/userAvatar.jpg';

const LoggedInStyles = styled.div`

	  display: flex;
    align-items: center;
	  
    .dropdown {
      background: var(--main);
      padding: 0.7rem;
      display: flex;
      border-radius: 3px;
      cursor: pointer
      img {
        cursor: pointer
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
  return (
    <LoggedInStyles>
    	<div className='icons'>
    		<div className='notification'><Image width={40} height={40} src={notiIcon} alt='Notification Icon' /></div>
    		<Image width={35} height={35} src={chatIcon} alt='Chat Icon' />
    	</div>
    	<div className='user-info'>
    		<div className='img-circle'><Image width={40} height={40} src={userAvatar} alt='User Avatar' /></div>
    		<div className='user-data'>
    			<p>Zaid96</p>
    			<span>$900</span>
    		</div>
    	</div>
    	<div className='dropdown'>
    		<Image src={arrowDownIcon} alt='Arrow Down Icon' />
    	</div>
    </LoggedInStyles>
  )
}



export default LoggedIn;