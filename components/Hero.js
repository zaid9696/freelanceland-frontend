import styled from 'styled-components';

const HeroStyles = styled.div`
	
	grid-column: full-start / full-end;
	position: relative;
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
	    	
	    h1 {
	    	color: #fff;
    		font-size: 2.4rem;
	    }
	    p {

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

	}

`

const Hero = (props) => {
  return (
    <HeroStyles>
    	<video className='hero-vid' autoPlay loop muted>
    		<source src={'./bg-vid.mp4'} type='video/mp4' />
    	</video>
    	<div className='hero-cover'>
    			<div className='content'>
    					<div className='text'>
    						<h1>Hire the World’s Best & Most Affordable Freelancers!</h1>
    						<p>Communicate, Collaborate, and Create with the Freelancer of Your Choice…</p>
    					</div>
    					<button type='button'>Join Now</button>
    			</div>
    	</div>
    </HeroStyles>
  )
}

export default Hero;