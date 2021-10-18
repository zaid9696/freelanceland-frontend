import styled from 'styled-components';


import bg from '../assets/background.svg';

const NewOfferAndBundleStyles = styled.div`	
	
	grid-column: center-start / center-end;
	background-image: url(${bg.src});
	height: 334px;
    background-size: contain;

    .btns {
    	display: flex;
    	place-content: center;
    	width: 100%;
    	height:100%;
    	align-items: center;
    	button {
    		padding: 1rem 3rem;
		    border-radius: 4px;
		    font-size: 1.5rem;
		    color: #fff;
		    font-weight: 600;
		    letter-spacing: 1px;
		    box-shadow: 1px 1px 4px 1px #16161652;
		    transition: var(--tranhover);
    	}
    	button:nth-child(1){
		    border: 1px solid var(--main);
    		background: var(--main);

    		&:hover {
    			box-shadow: 0px 0px 15px 6px #634cc29e
    		}
    	}
    	button:nth-child(2){
    		background: var(--green);
		    border: 1px solid var(--green);
		    margin-left: 3rem;
		    &:hover {
    			box-shadow: 0px 0px 15px 6px #2196538f
    		}

    	}
    }

`;

const NewOfferAndBundle = (props) => {
  return (
    <NewOfferAndBundleStyles>
   	 	<div className='btns'>
   	 		<button type='button'>New Offer</button>
   	 		<button type='button'>New Bundle</button>
   	 	</div>
    </NewOfferAndBundleStyles>
  )
}

export default NewOfferAndBundle;