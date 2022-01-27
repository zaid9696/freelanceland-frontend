import styled from 'styled-components';
import Link from 'next/link';
// import {useRouter} from 'next/router';

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
	    top: 68%;
    	left: 36%;

	    h1 {
	    	background: #634cc2e0;
		    color: #fff;
		    padding: 1rem;
		    border-radius: 3px;
		    box-shadow: var(--shadow);

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

 		<FourPageStyles>
	 		<div className='cover'>
	 			<img src={cover.src} />
	 		</div>
 			<div className='content'>
 			<h1>404 - Page Not Found</h1>
 			<Link href='/'><a><button>Go Home</button></a></Link>
 			</div>
 		</FourPageStyles>

 	)


}