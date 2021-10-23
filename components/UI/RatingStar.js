import Image from 'next/image';

import starIcon from '../../assets/icons/star.svg';

const RatingStar = ({width, height, rating}) => {
  return (
    <>
	{
       [1,2,3,4,5].map((item, i) => {
  
  	     return <span key={i} className={`${rating >= i + 1 ? 'active-star' : 'inactve'}`}><Image width={width} height={height} src={starIcon} alt='start icon' /></span>           
        })
		}
    </>
  )
}

export default RatingStar;