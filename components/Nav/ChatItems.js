import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactTimeAgo from 'react-timeago';
import userAvatar from '../../assets/userAvatar.jpg';


const ChatItems = ({item, userMessages, onlineUsers, userId,dropdownChatCloseHandler}) => {
  	
  	  const data = userMessages[item].item;
      const unreadCount = userMessages[item].countUnread;
      let userOnlineIdsMatched = [];
      console.log({data, item});
      Object.values(onlineUsers).map(elem => {

          if(elem !== userId){
            userOnlineIdsMatched.push(elem);
          }

      })

      let isOnline;
      const isOnlineSender = userOnlineIdsMatched.includes(data.sender.id);
      const isOnlineReceive = userOnlineIdsMatched.includes(data.receiver.id);
      
    return (

        <li>
            <Link href={`/chat/${item}`}>
              <a onClick={() => {
                  dropdownChatCloseHandler();
              }}>
                  <div className='message-avatar img-circle'>
                    <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${data.sender.userName == item ? data.sender.photo : data.receiver.photo}`} width={75} height={75} alt='user avatar' />
                    <span className={`online-status ${isOnlineReceive || isOnlineSender ? 'online' : 'offline'}`}></span>
                  </div>
                  <div className='user-message-content'>
                      <div className='user-message-header'>
                        <h3>{item}</h3>
                        <span><ReactTimeAgo date={data.timeStamp} /></span>
                      </div>
                      <div className='user-message-footer'>
                        <p>{data.message}</p>
                        {unreadCount && <span className='unread'>{unreadCount}</span>}
                      </div>
                  </div>
              </a>
            </Link>
        </li>

      )

}

export default ChatItems;