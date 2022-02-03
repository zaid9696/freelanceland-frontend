import styled from 'styled-components';
import { motion, AnimatePresence } from "framer-motion"

const ModalWrap = styled.div`

	
  &.hide{
  	visibility: hidden; 
  	opacity: 0;
  }
  	transition: all 0.5s ease-in-out;
  	opacity: 1;
	 position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: #000000b0;
    display: flex;
    justify-content: center;
    align-items: center;

`;


const ModalStyles = styled.div`

	 	position: fixed;
    z-index: 110;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
	
    .modal {
    	width: 50vw;
    	@media (max-width: 950px){
    	width: 90vw;

    	}
    	background: white;
		height: fit-content;
    	pointer-events: all;
    	border-radius: 4px;
	    min-height: 38vh;
	    display: grid;
	    grid-template-rows: 1fr 50% 1fr;
	    box-shadow: 0px 0px 16px 6px #0202022e;
	    text-align: center;

	    header, .content, footer {

	    	display: flex;
		    justify-content: center;
		    align-items: center;

	    }

	    header {

		    background: var(--main);
		    color: white;
		    font-size: 1.2rem;
		    padding: 2rem 0;

	    	h2 {

	    		margin: 0;
    			margin-bottom: -11px;
    			text-transform: capitalize

	    	}
	    }

	    .content {

	    	form {

	    		width: 96%;
    			height: 117%;

    			textarea {

    				width: 90%;
				    height: 74%;
				    position: relative;
				    top: 14px;
				    border: 1px solid #634cc273;
				    border-radius: 3px;
				    box-shadow: 0px 0px 5px 1px #02020221;
				    padding: 4px 15px;
				    padding-top: 1rem;

    			}
	    	}

    		p {
    			margin: 0;
			    line-height: 1.6;
			    padding: 0 1rem;

				}
	    	border-top: 1px solid #43434363;
		    border-bottom: 1px solid #43434363;
		    padding: 1rem 0;
		    margin: 0.5rem 0;
		    margin-top: 0;
		    font-size: 1.2rem;
    		font-weight: 500;
	    }

	    footer {

	    	padding-bottom: 3.7em;
    		padding-top: 0.6rem;
	    	button {

	    	font-size: 1.3rem;
		    text-transform: uppercase;
		    letter-spacing: 1.1px;
		    padding: 7px 14px;
			border-radius: 5px;
				&:nth-child(2){
					margin-left:1rem;
				}
	    	}

	    	button.main {

	    		background: #634cc2;
			    color: white;
			    border: 2px solid;

	    	}



	    	button.inverse {

	    		border: 2px solid;
			    background: transparent;
			    margin-right: 15px;
			    color: var(--main);
			    font-weight: 500;

	    	}


	    }

    }



`;


const Modal = ({hideModel, isVisible, footer, header, children}) => {



  		return (
  			<>
  			<ModalWrap onClick={hideModel} className={`${isVisible ? '' : 'hide'}`}>
  	  	</ModalWrap>
			    <ModalStyles>
  		  	<AnimatePresence >
  		  		{isVisible && 
  		  					(<motion.div
  		  							className={'modal-motion'}
	  		  		  			key='modal'
	  		  		  			initial={{opacity: 0, y: 50}} 
	  		  		        	animate={{opacity: 1, y: 0, transition:{duration: 0.5}}}
	  		  		        	exit={{ opacity: 0, y: -50,transition:{duration: 0.5} }}
	  		  		         >
	  		  				    	<div className={`modal`}>
	  		  				    		<header><h2>{header}</h2></header>
	  		  				    		<div className='content'>{children}</div>
	  		  				    		<footer>
	  		  				    			{footer}
	  		  				    		</footer>
	  		  				    	</div>
	  		  				</motion.div>
	  		  				)}
  		  
  		  	</AnimatePresence>
			    </ModalStyles>

  		  </>
  )
}

export default Modal;