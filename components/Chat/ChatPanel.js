import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../components/UI/Button';
import TimeAgo from 'react-timeago';


import userAvatar from '../../assets/userAvatar.jpg';

const TypeingIndicatorStyles = styled.div`

		
	position: absolute;
  top: 40px;
  left: 58px;
  width: 5em;
  height: 2em;
  padding: 10px;
  margin-left: 5px;
  border-radius: 20px;


.typing__dot {
  float: left;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  background: var(--main);
  border-radius: 50%;
  opacity: 0;
  animation: loadingFade 1s infinite;
}

.typing__dot:nth-child(1) {
  animation-delay: 0s;
}

.typing__dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing__dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loadingFade {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}

`;

const Typing = () => (
  <TypeingIndicatorStyles className='typing'>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
    <div className="typing__dot"></div>
  </TypeingIndicatorStyles>
)


const ChatPanelStyles = styled.div`  


	
	
    box-shadow: 0px 1px 9px 1px #0202022b;
    height: 60vh;
    background: #FEFEFE;
    border-radius: 2px;
    padding-bottom: 3rem;
    header {

    	display: flex;
	    justify-content: space-between;
	    padding: 1rem;
	    align-items: center;
	    border-bottom: 1px solid #634cc26b;
	    box-shadow:0px 5px 6px -3px #0202022b;
	    .header-user {

	    	display: flex;
    		align-items: center;
    		position: relative;
    		&link {

    			display: flex;
			    margin-left: 0.6rem;
			    align-items: center;
			    justify-content: center;
    		}
    		a {

    			margin-left: 4px;
			    color: var(--main);
			    font-size: 1.1rem;
			    font-weight: 500;
    		}
	    }


    .status-circle {

        width: 13px;
        height: 13px;
        background: var(--green);
        display: block;
        border-radius: 50%;

    }

	    .header-meta {

	    	font-size: 0.86rem;
	    }



    }

   section {

   	height: 60%;
    overflow-y: auto;
    padding: 1rem;

    &::-webkit-scrollbar{
    	width: 7px;
		  background-color: #c5c5c5;
    }

    &::-webkit-scrollbar-thumb {

    	background: #3c4858;
    	border-radius: 6px;
    }

    .chat-content {

    	display: flex;
    	margin-bottom: 1.2rem;

    	
    	&.current {

    		justify-content: end;

    		.chat-avatar {
    			order: 1;
    		}

    		.chat-info{

    			margin-left: 0px;
    			margin-right: 10px;
    			text-align: end;
    		}

    		.message-wrap {

    			display: flex;
    			flex-direction: column;
    			align-items: end;
    		

    		}

    		.message {

    			  text-align: end;
    				margin-left: 0px;
    				margin-right: 8px;
    				background: #3c4858;
    		}

    	} 

    	.chat-info {

    		margin-left: 10px;

    	}

    	.chat-username {

    		margin-right: 10px;
		    font-weight: 500;
		    color: #686868;

    	}

    	.chat-time {

    		font-size: 0.88rem;
    		font-weight: 100;

    	}

    	.message {

    		margin-left: 8px;
		    margin-top: 9px;
		    background: var(--main);
		    color: #fff;
		    padding: 10px;
		    border-radius: 3px;
		    width: fit-content;
    	}

    }

   }

   footer {

   	padding: 0rem 1rem;
   	text-align: center;
   	box-shadow:0px -5px 6px -3px #0202022b;
   	form {

   		position: relative;
    	top: 17px;

   	}

   	button {
   		color: #fff;
   		box-shadow: var(--shadow);
   	}
   	input{

   		  width: 80%;
		    margin-right: 1rem;
		    padding: 14px 15px;
		    border: 3px solid #b3b3b3;
		    border-radius: 43px;
		    outline: transparent;
		    transition: var(--tranhover);
		    &:focus{

		    	border: 3px solid transparent;
		    	box-shadow: 0px 0px 6px 2px #634cc2b0;

		    }

   	}


   }


 `;

const ChatPanelMessages = ({item, user}) => {

		// console.log({sender: item.sender.id});

		const {id} = item.sender;

	return (

			<div className={`chat-content ${user.id !== id ? 'current' : ''}`}>

				<div className='chat-avatar img-circle'>
						<Image src={userAvatar} width={40} height={40} alt='chat avatar' />
				</div>
				<div className='message-wrap'>
						<div className='chat-info'>
							<span className='chat-username'>{`${user.id !== item.sender.id ? 'Me' : item.sender.userName}`}</span>
							<span className='chat-time'><TimeAgo date={item.timeStamp} /></span>
						</div>
						<div className='message'>
							{item.message}
						</div>
				</div>
			</div>

		)


}

const ChatPanel = ({messages, user, inputFieldHandler, field, messagesHandlder, isTyping}) => {
	// console.log('from ChatPanel', {messages});
  return (
    <ChatPanelStyles>
    	<header>
    	<div className='header-user'>
    		<div className='img-circle'>
    			<Image src={userAvatar} width={50} height={50} alt='User Image' />
    		</div>
    		<div className='header-userlink'>
    			<span className='status-circle'></span>
    			<Link href={`#`}><a>{user.userName}</a></Link>
    		</div>
					{isTyping && <Typing />}
    	</div>
    	<div className='header-meta'>
    		<span>Last Seen: 3 months ago</span>
    	</div>
    	</header>
    	<section>
    		
    		{
    			messages.map(item => <ChatPanelMessages key={item.id} item={item} user={user} />)
    		}
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