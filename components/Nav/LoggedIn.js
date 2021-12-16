import {useContext, useState, useEffect} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';
import ReactTimeAgo from 'react-timeago';

import {AuthContext} from '../../context/AuthContext';
import {LoggedInStyles, DropdownStyles} from '../../styles/LoggedInStyles';
import chatIcon from '../../assets/icons/nav/chat.svg';
import notiIcon from '../../assets/icons/nav/notification.svg';
import profileIcon from '../../assets/icons/dashboard/editProfileDrop.svg';
import dashboardIcon from '../../assets/icons/dashboard/dashboard.svg';
import arrowDownIcon from '../../assets/icons/nav/arrow_down.svg';
import userAvatar from '../../assets/userAvatar.jpg';
import acceptIcon from '../../assets/icons/accept.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import refuseIcon from '../../assets/icons/refuse.svg';
import deliverIcon from '../../assets/icons/deliver.svg';
import purchaseIcon from '../../assets/icons/purchase.svg';
import AnimateTogggle from '../../components/UI/AnimateTogggle';
import truncateLetters from '../../utils/truncateLetters';
import useHttpAxios from '../../hooks/http-hook';


const notificationIcons = (iconName) => {

   switch(iconName){

    case 'Delivered': return deliverIcon;
    case 'Accepted':  return acceptIcon;
    case 'Refused':   return refuseIcon;
    case 'Cancelled': return cancelIcon;
    case 'Purchased': return purchaseIcon;


  }

}



const NotificationItems = ({item, myId, userName, markingReadNotification, dropdownNotiCloseHandler}) => {

      let readStatus = item.read;
  
    return (

        <Link href={`/ordered/${item.orderId}`}>
            <a onClick={() => {
              markingReadNotification(item.id);
              dropdownNotiCloseHandler();
            }}>
              <li>
                <div className={`notification-icons ${item.status}`}>
                  <Image src={notificationIcons(item.status)} width={30} height={30} alt={`${item.status} Icon`} />
                </div>
                <div className='notification-content'>
                  <p>{item.creator == myId ? 'You' : item.buyer == userName  ? 'Seller' : item.status == 'Purchased' ? item.buyer : 'Buyer'} {item.status} the Order {item.orderId} {truncateLetters(item.title, 25)}
                  </p>
                  <span className='notification-date'><ReactTimeAgo date={item.createdAt} /></span>
                  <span className={`notification-unread ${readStatus && 'read'}`}></span>

                </div>
              </li>
            </a>
        </Link>

      )

}

const LoggedIn = (props) => {

  const [showDrop, setShowDrop] = useState(false);
  const [showDropNonti, setShowDropNoti] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isReadNoti, setIsReadNoti] = useState(false);
  const {sendRequest} = useHttpAxios()
  const auth = useContext(AuthContext);
  const userAuth = auth.userAuth;
  const [allNotifications, setAllNotifications] = useState(auth.notification || []);

  useEffect(() => {

    setAllNotifications(auth.notification);

    const isAllNotificationsRead = allNotifications.map(item => item.read).includes(false);
    setIsReadNoti(isAllNotificationsRead);

  }, [auth.notification, allNotifications]);

  const dropdownHandler = () => setShowDrop(prev => !prev);
  const dropdownNotiHandler = () => setShowDropNoti(prev => !prev);
  const dropdownNotiCloseHandler = () => setShowDropNoti(false);

  const markingReadNotification = async (notificationId) => {

    const isNotificationRead = allNotifications.map(item => item.id.includes(notificationId) && item.read === true).includes(true);
    
    if(isNotificationRead) return;
   
      try{

        const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/notifications/${notificationId}`, 'PATCH');

          const notification = res.data.updateNotification;
          allNotifications.map(item => {

            if(item.id === notification.id){

                  item.read = notification.read;
              }

          })

          const newNotifications = [...allNotifications];
          setAllNotifications(newNotifications);

        console.log({res});

    }catch(err) {console.log(err);}

}

  return (
    <LoggedInStyles>
    	<div className='icons'>
    		<div className='notification'>
        <Image onClick={dropdownNotiHandler} width={40} height={40} src={notiIcon} alt='Notification Icon' />
        <div className={`notification-unread ${isReadNoti && 'read'}`}></div>
       <AnimateTogggle show={showDropNonti}>
        <DropdownStyles>
          <ul className='notifications'>
             { allNotifications.map(item => <NotificationItems key={item.id} item={item} myId={userAuth.id} dropdownNotiCloseHandler={dropdownNotiCloseHandler} markingReadNotification={markingReadNotification} userName={userAuth.userName} />)}
          </ul>
          <Link href={`/notifications`}><a onClick={dropdownNotiCloseHandler} className='see-all'>See All Notifications</a></Link>
        </DropdownStyles>
         
       </AnimateTogggle>
        </div>
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
        <AnimateTogggle toggleClass='dropdown-content' show={showDrop}>
          
              <ul>
                <li><Link href='#'><a><Image width={35} height={35} src={profileIcon} alt='Profile Icon' /><span>My Profile</span></a></Link></li>
                <li><Link href='#'><a><Image width={35} height={35} src={dashboardIcon} alt='Dashboard Icon' /><span>Dashboard</span></a></Link></li>
    
              </ul>
              <button type='button' onClick={auth.logout}>Logout</button>
                    
        </AnimateTogggle>
      </div>
    </LoggedInStyles>
  )
}



export default LoggedIn;