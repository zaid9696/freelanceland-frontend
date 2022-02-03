import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';

import cover from '../assets/404-cover.svg';

const FourPageStyles = styled.div`

	grid-column: center-start / center-end;
	
	    .cover {
	    	text-align: center;
	    	img {
	    		height: 500px;
	    	}
	    }
	.content {

		position: absolute;
	    width: 95vw;
	    @media (max-width: 1190px){
	    	width: 94vw;
	    }
	    @media (max-width: 500px){
	    	width: 85vw;
	    }
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    top: 63vh;
	    @media (max-width: 1190px){
	    top: 42vh;

	    }
	    @media (max-width: 500px){
	    	top: 27vh
	    }

	    h1 {
	    	background: #634cc2e0;
		    color: #fff;
		    padding: 1rem;
		    border-radius: 3px;
		    box-shadow: var(--shadow);
		    @media (max-width: 500px){
		    	font-size: 1.5rem;
		    }
		}

		button {
			width: 100%;
		   	height: 60px;
		    font-weight: 600;
		    background: #ffffffc7;
		    border: 2px solid var(--main);
		    color: var(--main);
		    cursor: pointer;
		    font-size: 1.5rem;
		    box-shadow: var(--shadow);
		}

	}

 `

export default function Custom404() {

 return (
 		<>
 		<Head>
          <title> 404 | FreelanceLand</title>
      	</Head>
 		<FourPageStyles>
	 		<div className='cover'>
	 			<img src={cover.src} />
	 		</div>
 			<div className='content'>
 			<h1>404 - Page Not Found</h1>
 			<Link href='/'><a><button>Go Home</button></a></Link>
 			</div>
 		</FourPageStyles>
 		</>
 	)


}