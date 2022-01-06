import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import starIcon from '../../assets/icons/star.svg';
import bundleImage from '../../assets/bundleImage.png';
import userAvatar from '../../assets/userAvatar.jpg';
import RatingStar from '../UI/RatingStar';

const BundlesItemsStyles = styled.div`
  
  
  box-shadow:0px 3px 5px 1px #02020238;
	border-radius: 5px;
  overflow: hidden; 

  a{
    color: var(--black);
     transition: all 0.3s ease-in-out;
     &:hover{
      color: var(--main) !important;
     } 
  }

  .line{
      border-bottom: 1px solid #634cc285;
      margin-bottom: 12px;
  }

  h3 {
    font-size: 0.92rem;
    font-weight: 500;
    padding: 0px 8px;
    line-height: 1.4;
  }

  .bundle-wrap {
      display: flex;
      justify-content: space-between;
      padding: 0px 8px;
  }

  .bundle-user {
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    img {
      border-radius: 50%;
    }

  .bundle-user-name {

    a {
        font-size: 0.8rem;
        padding-left: 6px;

    }

  }

  }

.bundle-reviews {
    display: flex;
    justify-content: flex-end;
    .bundle-reviews-wrap{

        display: flex;
        align-items: center;
    }
    .rating{
        color: var(--orange);
        position: relative;
        top: -2.4px;
        left: -5px;
        font-size: 0.93rem;

    }

    .reviews-num {
        font-weight: 100;
        font-size: 0.88rem;
        position: relative;
        top: 1px;

    }

  }

  .category {

    font-size: 0.8rem;
    display: block;
    margin-top: 7px;

    }

  .bundle-price {
    text-align: center;
    font-size: 1.1rem;
    color: var(--green);
    font-weight: 500;
    p {
      margin: 1rem;
    }
  }

`;


const BundlesItems = ({item}) => {

  console.log({item});

  return (
    <BundlesItemsStyles>
    	<div className='bundle-img'>
    		<Image height={180} width={303}  src={bundleImage} alt='Bunlde Image' />
    	</div>
      <div className='line'>
    	   <Link href={`/bundle/${item.id}/${item.slug}`}><a><h3>{item.title}</h3></a></Link>
      </div>
    	<div className='bundle-content'>
        <div className='line'>
         <div className='bundle-wrap'>
      		<div className='bundle-user'>
      			<div className='bundle-user-img'>
      				<Image width={40} height={40} src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${item.user.photo}`} />
      			</div>
            <div className='bundle-user-name'> 
        			<Link href={`/${item.user.userName}`}>
        				<a>{item.user.userName}</a>
        			</Link>
            </div>
      		</div>
        
        		<div className='bundle-info'> 
        			<div className='bundle-reviews'>
        				<div className='bundle-reviews-wrap'><RatingStar width={17} height={17} rating={item.ratingsAverage} /> <span className='rating'>{item.ratingsAverage && item.ratingsAverage.toFixed(1)}</span> </div>
        				<span className='reviews-num'>({item.ratingsQuantity})</span>
        			</div>
        			<span className='category'>
        				<Link href='/'>
        					<a>{'Web Programming'}</a>
        				</Link>
        			</span>
        		</div>
          </div>  
      </div>

    		<div className='bundle-price'>
    			<p>${item.price}</p>
    		</div>
    	</div>
    </BundlesItemsStyles>
  )
}

export default BundlesItems;