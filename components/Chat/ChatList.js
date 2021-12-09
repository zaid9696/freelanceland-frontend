import {useContext} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';

import {AuthContext} from '../../context/AuthContext';
import userAvatar from '../../assets/userAvatar.jpg';

const ChatListStyles = styled.div`

    ul {

      box-shadow: var(--shadow);
      border-radius: 2px;
      height: 66vh;
      border: 1px solid #9d9d9d7a;
      overflow-y: auto;
       &::-webkit-scrollbar{
        width: 7px;
        background-color: #c5c5c5;
      }

    &::-webkit-scrollbar-thumb {

      background: #3c4858;
      border-radius: 6px;
    }
      li {

        
          border-bottom: 1px solid #9d9d9d7a;
          padding: 1rem;
          transition: var(--tranhover);
          &:hover {background: #e3e3e3}
          .wrap {

              display: flex;
              align-items: center;
              .user-avatar {

                margin-top: 7px;
              }

            .user-avatar {
              position: relative;
              .online-status {
                background: var(--red);
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 69%;
                top: 1px;
                right: 5px;
              }
              .online-status.online {background: var(--green)}

            }
              .info {

                margin-left: 8px;
                margin-top: 5px;
                width: 100%;
                .info-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                color: var(--black);
              }
              span.message-user {
                font-size: 1.08rem;
                font-weight: 500;
              }
              span.message-date {
                font-size: 0.89rem;
              }

              .message-content {

                display: flex;
                justify-content: space-between;
                align-items: end;

                .message {
                    margin-top: 0.7rem;
                    font-weight: 600;

                  }

                  span {

                    background: var(--main);
                    color: #fff;
                    width: 28px;
                    height: 28px;
                    border-radius: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    top: 6px;
                    &.hide {display: none}

                  }

              }

          }

      }

    }


 `

const ItemList = ({item, usersMessages, onlineUsers, userAuth, user}) => {

      const data = usersMessages[item].item;
      const userLoaded = item === user.userName;
      const unreadCount = usersMessages[item].countUnread;
      const isOnline = Object.values(onlineUsers).map(elem =>  {
      // console.log({item});
      let notCurrentUser;

      usersMessages[item].item.sender.id === userAuth.id ? notCurrentUser = usersMessages[item].item.receiver.id : notCurrentUser = usersMessages[item].item.sender.id;

          return elem.includes(notCurrentUser);

      }).includes(true)
      console.log({isOnline});
      return (

            <li>
                <Link href={`/chat/${item}`}>
                  <a>
                    <div className='wrap'>
                        <div className='img-circle user-avatar'>
                          <Image src={userAvatar} width={65} height={65} alt="User's Image" />
                          <div className={`online-status ${isOnline ? 'online' : 'offline'}`}></div>
                        </div>
                        <div className='info'>
                          <div className='info-header'>
                            <span className='message-user'>{item}</span>
                            <span className='message-date'><ReactTimeAgo date={data.timeStamp} /></span>
                          </div>
                          <div className='message-content'>
                            <div className='message'>
                                {data.message}
                            </div>
                            <span className={`${unreadCount && !userLoaded ? '' : 'hide'}`}>{unreadCount && !userLoaded ? unreadCount : ''}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                </Link>
            </li>
        )
}


const ChatList = ({usersMessages, onlineUsers, user}) => {
  const {userAuth} = useContext(AuthContext);
  console.log({usersMessages}, ' From ChatList');
  return (
    <ChatListStyles>
      <ul>
          {Object.keys(usersMessages).map(item => <ItemList key={usersMessages[item].item.id} user={user} item={item} onlineUsers={onlineUsers} usersMessages={usersMessages}  userAuth={userAuth}/>)}
      </ul>
    </ChatListStyles>
  )
}

export default ChatList;