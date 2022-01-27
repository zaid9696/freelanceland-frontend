import {useContext, useState, useEffect} from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';
import ReactTimeAgo from 'react-timeago';

import {AuthContext} from '../../context/AuthContext';
import {LoggedInStyles, DropdownStyles} from '../../styles/LoggedInStyles';
import chatIcon from '../../assets/icons/nav/chat.svg';
import notiIcon from '../../assets/icons/nav/notification.svg';
import profileIcon from '../../assets/icons/dashboard/editProfileDrop.svg';
import dashboardIcon from '../../assets/icons/dashboard/dashboard.svg';
import requestIcon from '../../assets/icons/dashboard/myRequest.svg';
import arrowDownIcon from '../../assets/icons/nav/arrow_down.svg';
import userAvatar from '../../assets/userAvatar.jpg';
import AnimateTogggle from '../../components/UI/AnimateTogggle';
import useHttpAxios from '../../hooks/http-hook';
import ChatItems from './ChatItems';
import NotificationItems from './NotificationItems';


const LoggedIn = (props) => {

  const [showDrop, setShowDrop] = useState(false);
  const [showDropNoti, setShowDropNoti] = useState(false);
  const [showDropChat, setShowDropChat] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isReadNoti, setIsReadNoti] = useState(false);
  const [isUnreadMessage, setIsUnreadMessage] = useState(false);
  const {sendRequest} = useHttpAxios()
  const auth = useContext(AuthContext);
  const userAuth = auth.userAuth;
  console.log({usersMessages: auth.userMessages});
  const [allNotifications, setAllNotifications] = useState(auth.notification || []);

  useEffect(() => {

    setAllNotifications(auth.notification);

    const isAllNotificationsRead = allNotifications.map(item => item.read).includes(false);
    setIsReadNoti(isAllNotificationsRead);

  }, [auth.notification, allNotifications]);

  useEffect(() => {

    const isAllMessagesRead = Object.keys(auth.userMessages).map(item => {

        const data = auth.userMessages[item].countUnread;

        return Number.isInteger(data);

    }).includes(true);

    setIsUnreadMessage(isAllMessagesRead);

  }, [auth.userMessages])
  const dropdownHandler = () => setShowDrop(prev => !prev);
  const dropdownNotiHandler = () => {
      setShowDropNoti(prev => !prev);
      setShowDropChat(false)
  };
  const dropdownNotiCloseHandler = () => setShowDropNoti(false);
  const dropdownChatHandler = () => {
      setShowDropChat(prev => !prev);
      setShowDropNoti(false)
  };
  const dropdownChatCloseHandler = () => setShowDropChat(false);

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

let userOnlineIds = [];


  return (
    <LoggedInStyles>
    	<div className='icons'>
    		<div className='notification'>
        <Image onClick={dropdownNotiHandler} width={40} height={40} src={notiIcon} alt='Notification Icon' />
        <div className={`notification-unread ${isReadNoti && 'read'}`}></div>
       <AnimateTogggle show={showDropNoti} >
        <DropdownStyles>
          <ul className='notifications'>
             { allNotifications.map(item => <NotificationItems key={item.id} item={item} myId={userAuth.id} dropdownNotiCloseHandler={dropdownNotiCloseHandler} markingReadNotification={markingReadNotification} userName={userAuth.userName} />)}
          </ul>
          <Link href={`/notifications`}><a onClick={dropdownNotiCloseHandler} className='see-all'>See All Notifications</a></Link>
        </DropdownStyles>
         
       </AnimateTogggle>
        </div>
        <div className='chat'>
    		  <Image onClick={dropdownChatHandler} width={35} height={35} src={chatIcon} alt='Chat Icon' />
          <div className={`notification-unread ${isUnreadMessage && 'read'}`}></div>
          <AnimateTogggle show={showDropChat}>
            <DropdownStyles className='drop-chat'>
              <ul className='chat-list'>
                {
                 Object.keys(auth.userMessages).map(item => <ChatItems item={item} userId={userAuth.id} dropdownChatCloseHandler={dropdownChatCloseHandler} onlineUsers={auth.onlineUsers} key={auth.userMessages[item].item.id} userMessages={auth.userMessages} />)
                }
            </ul>
            <Link href={`/chat`}><a onClick={dropdownChatCloseHandler} className='see-all'>See All Chats</a></Link>
             </DropdownStyles>
          </AnimateTogggle>
        </div>
    	</div>
    	<div className='user-info'>
    		<div className='img-circle'><Image width={40} height={40} src={`${process.env.NEXT_PUBLIC_URL}/images/users/${userAuth.photo}`} alt='User Avatar' /></div>
    		<div className='user-data'>
    			<p>{userAuth.userName}</p>
    			<span>${userAuth.totalEarned}</span>
    		</div>
    	</div>
    
      <div className='dropdown-wrap'>
      	<div className={`dropdown ${showDrop ? 'active' : ''}`} onClick={dropdownHandler}>
      		<Image src={arrowDownIcon} alt='Arrow Down Icon' />
      	</div>
        <AnimateTogggle toggleClass='dropdown-content' show={showDrop}>
          
              <ul>
                <li><Link href={`/${userAuth.userName}`}><a onClick={dropdownHandler}><Image width={35} height={35} src={profileIcon} alt='Profile Icon' /><span>My Profile</span></a></Link></li>
                <li><Link href='/dashboard'><a onClick={dropdownHandler}><Image width={35} height={35} src={dashboardIcon} alt='Dashboard Icon' /><span>Dashboard</span></a></Link></li>
                <li><Link href={'/requests'}><a onClick={dropdownHandler}><Image width={35} height={35} src={requestIcon} alt='Dashboard Icon' /><span>Requests</span></a></Link></li>
              </ul>
              <button type='button' onClick={auth.logout}>Logout</button>
                    
        </AnimateTogggle>
      </div>
    </LoggedInStyles>
  )
}



export default LoggedIn;