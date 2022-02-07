import {useRef, useEffect, useState, useCallback} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import ReactCountryFlag from "react-country-flag"


import dateFormat from '../../utils/DateFormat';
import timeZoneDate from '../../utils/timeZoneDate';
import Button from '../../components/UI/Button';
import tickMessage from '../../assets/icons/tickMessage.png';
import userAvatar from '../../assets/userAvatar.jpg';
import {ChatPanelStyles, TypeingIndicatorStyles} from '../../styles/ChatPanelStyles';


const Typing = () => (
  <TypeingIndicatorStyles className='typing'>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </TypeingIndicatorStyles>
)




const ChatPanelMessages = ({item, user}) => {

	

		const {id} = item.sender;

      

	return (

			<div className={`chat-content ${user.id !== id ? 'current' : ''}`}>

				<div className='chat-avatar img-circle'>
						<Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.sender.userName !== id ? item.sender.photo : item.receiver.photo}`} width={40} height={40} alt='chat avatar' />
				</div>
				<div className='message-wrap'>
						<div className='chat-info'>
							<span className='chat-username'>{`${user.id !== item.sender.id ? 'Me' : item.sender.userName}`}</span>
							<span className='chat-time'><ReactTimeAgo date={item.timeStamp} /></span>
						</div>
						<div className='message'>
							{item.message}
						</div>
						<span className={`read-status ${item.read ? 'read' : 'unread'}`}>
								<Image src={tickMessage} alt='Tick icon' width={13} height={13} />
								<Image src={tickMessage} alt='Tick icon' width={13} height={13} />
						</span>
				</div>
			</div>

		)


}




const ChatPanel = ({messages, user,userTime,inputFieldHandler, field, messagesHandlder, isTyping, isOnline, lastSeen}) => {
	
		const chatContainer = useRef(null);
		const [timezoneLocal, setTimeZoneLocal] = useState();
	
		let lastSeenDate = null;
		// making sure that the one who disconnected is not the user
	 	lastSeen && lastSeen.userId && lastSeen.userId == user.id ? lastSeenDate = lastSeen.date : null;
		 // const lastSeenTime = dateFormat(lastSeenDate);
      
		 const timeZoneFunc = () => {

		 	setTimeZoneLocal(null);
		 	const timezoneLocalDate = timeZoneDate(userTime);
		 	
			setTimeZoneLocal(timezoneLocalDate)


		 }

		 useEffect(() => {

			let timer = setInterval( timeZoneFunc,40000);


			return () => {

					clearInterval(timer);

			}

		 }, [timezoneLocal] )

			
		
		useEffect(() => {

			
			timeZoneFunc();
			
			chatContainer.current?.scrollIntoView({ behavior: "smooth", block:'nearest', inline: "nearest"});

			

		}, [messages,userTime])

  return (
    <ChatPanelStyles>
    	<header>
    	<div className='header-user'>
    		<div className='img-circle'>
    			<Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${user.photo}`} width={50} height={50} alt='User Image' />
    		</div>
    		<div className='header-userlink'>
    			<span className={`status-circle ${isOnline ? 'online' : 'offline'}`}></span>
    			<Link href={`/${user.userName}`}><a>{user.userName}</a></Link>
    		</div>
					{isTyping && <Typing />}
    	</div>
    	<div className='header-meta'>
    		{ !isOnline ? 
    						<span className='meta-info'>
    		    				<span className='font-bold'>Last Seen:</span>	<ReactTimeAgo date={lastSeenDate || user.lastSeen} />
    		    		</span>
    		    		: <span className='text-online'>online</span>
    		  } 
    		  | 
    		  <span className='meta-info'><span className='font-bold'>Local Time:</span> {timezoneLocal}</span>
    		  |
    		 <ReactCountryFlag   
    		 			countryCode={user.countryCode}
                svg
                style={{
                    width: '40px',
                    height: '30px',
                    marginLeft: '0.5rem',
                    boxShadow: 'var(--shadow)'
                }}
                title={user.countryCode} /> 
    	</div>
    	</header>
    	<section>
    		
    		{
    			messages.map(item => <ChatPanelMessages key={item.id} item={item} user={user} />)
    		}
    		<div ref={chatContainer} />
    	</section>
    	<footer>
    			<form onSubmit={messagesHandlder}>
    					<input value={field} onChange={inputFieldHandler} type='text' placeholder='Type you message here' />
    					<Button type='submit'>Send</Button>
    			</form>
    	</footer>
    </ChatPanelStyles>
  )
}

export default ChatPanel;