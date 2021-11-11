import Image from 'next/image';
import styled from 'styled-components';

import starIcon from '../../assets/icons/star.svg';



const RatingStarStyles = styled.div`

    display: flex;

    margin-right: 0.5rem;
    span.inactve {
        filter: grayscale(1);
    }
  

`

const RatingStar = ({width, height, rating}) => {
  return (
    <>
    <RatingStarStyles>

	   {
       [1,2,3,4,5].map((item, i) => {
  
  	     return  <span key={i} className={`${rating >= i + 1 ? 'active-star' : 'inactve'}`}><Image width={width} height={height} src={starIcon} alt='start icon' /></span>        
        })
		  }
      
    </RatingStarStyles>
    </>
  )
}

export default RatingStar;