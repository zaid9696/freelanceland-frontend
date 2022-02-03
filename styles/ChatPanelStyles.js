import styled from 'styled-components';



export const TypeingIndicatorStyles = styled.div`

		
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


export const ChatPanelStyles = styled.div`  

	
    box-shadow: 0px 1px 9px 1px #0202022b;
    height: 60vh;
    @media (max-width: 970px){
    height: 90vh;


    }
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
      @media (max-width: 670px){
        flex-direction: column;
      }
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

	    .header-meta {

	    	.meta-info {
	    		margin: 0px 6px;
	    	}

        @media (max-width: 500px){

          img {
              width: 20px !important;
              height: 16px !important;
          }

        }
    		
    		.font-bold {

    				font-weight:600;
    			}
    		}

    	span.text-online {
    			margin-right: 6px;
    			font-weight: 500;
    	}
    .status-circle {

        &.offline {background: var(--red)};
        width: 13px;
        height: 13px;
        background: var(--green);
        display: block;
        border-radius: 50%;

    }

	    .header-meta {

	    	font-size: 0.86rem;
        @media (max-width: 500px){
          font-size: 0.56rem;
        }
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

      .message {

          @media (max-width: 500px){

              font-size: 0.7rem;

            }
      }
    	
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

    		.read-status {

    			margin-right: 10px;
    			display: block;
    			&:not(.read) {

    				img {
    				filter: grayscale(1);
    				opacity: 0.5;
    				margin-right: 5px;
    				}

    			}
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
        @media (max-width: 500px){
          font-size: 0.8rem;
        }

    	}

    	.chat-time {

    		font-size: 0.88rem;
    		font-weight: 100;
        @media (max-width: 500px){
          font-size: 0.7srem;
        }
    	}

    	.message {

    		margin-left: 8px;
		    margin-top: 9px;
		    margin-bottom: 4px;
		    background: var(--main);
		    color: #fff;
		    padding: 10px;
		    border-radius: 3px;
		    width: fit-content;
    	}

    	.read-status {display: none};

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
    @media (max-width: 970px){
      margin-top: 11px;
    }
   	}
   	input{

   		  width: 80%;
    @media (max-width: 970px){
        width: 90%;
        margin-right: 0px;

    }

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

