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



`;

const Info = (props) => {
  return (
    <InfoStyles>
    	<h2>Bring Your Ideas to Life with Perfect Freelancers from <span className='main-color'>FreelanceLand</span></h2>
    	<InfoItems />
    </InfoStyles>
  )
}

export default Info;