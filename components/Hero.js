import styled from 'styled-components';
import Link from 'next/link';

const HeroContentStyles = styled.div` 

	position: absolute;
    top: 67%;
    width: 100%;
    height: 99.1%;
    @media (max-width: 1000px){
   		top: 28%;
   		// width: auto;
  	}
    text-align: center;
    z-index: 20;

	h1 {
    	color: #fff;
  		font-size: 2.4rem;
  		@media (max-width: 1000px){
  			font-size:1.4rem;
  			margin-bottom:26px;
  			line-height: 1.4;
  		}
	    }
	    p {
	    	@media (max-width: 1000px){
  			font-size:1rem;
  			line-height: 1.4;
  			}
	    	font-size: 1.5rem;
		    color: #fff;
		    font-weight: 100;
		    margin-top: -11px;
	    }
	    button {
	    	font-size: 1.5rem;
		    font-weight: 700;
		    background: var(--main);
		    color: #fff;
		    padding: 1rem 1.7em;
		    border-radius: 43px;
		    border: 2px solid var(--main);
		    letter-spacing: 1px;
		    margin-top: 2rem;
		    cursor: pointer;
		    transition: var(--tranhover);
		    &:hover {
		    		border: 2px solid;
		    		background: transparent;
		    }
	    }


	.text {

		padding: 0 1rem;
	}


  `

const HeroStyles = styled.div`
	
	grid-column: full-start / full-end;
	position: relative;
	z-index: -1;
	.hero-vid {
		width: 100%;
		height: 500px;
    	object-fit: cover;
	}

	.hero-cover {
		  position: absolute;
	    top: 0;
	    width: 100%;
	    height: 99.1%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    text-align: center;
	    background: #211943d9;
	    
	}



`

const Hero = (props) => {
  return (
  	<>
    <HeroStyles>
    	<video className='hero-vid' autoPlay loop muted>
    		<source src={'./bg-vid.webm'} type='video/webm' />
    		<source src={'./bg-vid.mp4'} type='video/mp4' />
    		 Sorry, your browser doesn't support embedded videos.
    	</video>
    	<div className='hero-cover'>
    	</div>
    </HeroStyles>
			<HeroContentStyles className='content'>
					<div className='text'>
						<h1>Hire the World’s Best & Most Affordable Freelancers!</h1>
						<p>Communicate, Collaborate, and Create with the Freelancer of Your Choice…</p>
					</div>
					<Link href='/signup'>
						<a>
					<button type='button'>Join Now</button>
						</a>
					</Link>
			</HeroContentStyles>
			</>
  )
}

export default Hero;