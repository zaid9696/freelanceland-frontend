import styled from 'styled-components';
import Link from 'next/link';

import bg from '../assets/background.svg';

const NewOfferAndBundleStyles = styled.div`	
	
	grid-column: center-start / center-end;
	background-image: url(${bg.src});
	height: 334px;
    background-size: contain;
    @media (max-width: 1090px) {
        margin-top: 5rem;
    }

    .btns {
    	display: flex;
    	place-content: center;
    	width: 100%;
    	height:100%;
    	align-items: center;
        @media (max-width: 650px) {
            display: grid;
            grid-template-columns: 1fr;
            justify-items: center;
            gap: 2rem;
        }
    	button {
            cursor: pointer;
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
    	button.btn-bundle{
    		background: var(--green);
		    border: 1px solid var(--green);
		    margin-left: 3rem;
        @media (max-width: 650px) {
            margin-left: 0rem;

        }
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
   	 		<Link href='/newRequest'><a><button type='button'>New Request</button></a></Link>
   	 		<Link href='newBundle'><a><button type='button' className='btn-bundle'>New Bundle</button></a></Link>
   	 	</div>
    </NewOfferAndBundleStyles>
  )
}

export default NewOfferAndBundle;