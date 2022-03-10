import styled from 'styled-components';

import InfoItems from './InfoItems';

const InfoStyles = styled.div`
	
	grid-column: center-start / center-end;
	h2 {
		text-align: center;
	    font-size: 1.8rem;
    	@media (max-width: 500px){
	    font-size: 1.1rem;
	    line-height: 1.4;
   		 }
	    margin-top: 3rem;
	    margin-bottom: 3rem;
	    
	}

	.main-color {color: var(--main)}

	a.view-video {

		z-index: 21;
	    position: relative;
	    width: 100%;
	    display: block;
	    text-align: center;
	    margin-top: 7px;
	    font-weight: 900;
	    color: var(--main);
	}



`;

const Info = (props) => {
  return (
    <InfoStyles>
    	<a className='view-video' href="/FreelancelandVideo.m4v" target="_blank">View video of features of the website</a>
    	<h2>Bring Your Ideas to Life with Perfect Freelancers from <span className='main-color'>FreelanceLand</span></h2>
    	<InfoItems />
    </InfoStyles>
  )
}

export default Info;