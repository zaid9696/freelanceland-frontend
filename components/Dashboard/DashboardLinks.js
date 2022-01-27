import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import buyersReq from '../../assets/icons/dashboard/buyersRequests.svg';
import dashboard from '../../assets/icons/dashboard/dashboard.svg';
import favorites from '../../assets/icons/dashboard/favorites.svg';
import myBundle from '../../assets/icons/dashboard/myBundles.svg';
import myRequest from '../../assets/icons/dashboard/myRequest.svg';
import myReview from '../../assets/icons/dashboard/myReviews.svg';
import mySale from '../../assets/icons/dashboard/mySales.svg';
import myShopping from '../../assets/icons/dashboard/myShopping.svg';

const DashboardLinksStyles = styled.div`
	 
        box-shadow: 0px 1px 6px 1px #02020224;
        padding: 1.2rem;
        height: fit-content;
        .icons {

          display: flex;
          align-items: center;
          border-bottom: 1px solid #634cc224;
          margin-bottom: 1rem;
          transition: all 0.3 ease-in-out;
          &:hover {
            transition: all 0.3 ease-in-out;
            border-right: 3px solid var(--main);
          }

          p {

            margin-left: 0.5rem;
          }
        }
   

`

const DashboardLinks = (props) => {
  return (
    	
    	<DashboardLinksStyles>
    		  <Link className='dashboard-options' href={`/dashboard`}>
              <a> <div className='icons'>
                    <Image src={dashboard} alt='Dashboard Icon' width={35} height={35} />
                    <p>Dashboard</p>
                  </div> 
              </a>  
          </Link>

           <Link className='dashboard-options' href={`/dashboard/myBundles`}>
              <a> <div className='icons'>
                    <Image alt='My Bundles Icon' src={myBundle} width={35} height={35} />
                    <p>My Bundles</p>
                  </div> 
              </a>  
          </Link>

           <Link className='dashboard-options' href={`/dashboard/myRequests`}>
              <a> <div className='icons'>
                    <Image alt='My Requests Icon' src={myRequest} width={35} height={35} />
                    <p>My Requests</p>
                  </div> 
              </a>  
          </Link>

           <Link className='dashboard-options' href={`/dashboard/myReviews`}>
              <a> <div className='icons'>
                    <Image alt='My Reviews Icon' src={myReview} width={35} height={35} />
                    <p>My Reviews</p>
                  </div> 
              </a>  
          </Link>

           <Link className='dashboard-options' href={`/dashboard/buyersRequests`}>
              <a> <div className='icons'>
                    <Image alt='Buyers Requests Icon' src={buyersReq} width={35} height={35} />
                    <p>Buyers Requests</p>
                  </div> 
              </a>  
          </Link>

           <Link className='dashboard-options' href={`/dashboard/myFavourites`}>
              <a> <div className='icons'>
                    <Image alt='Favorites Icon' src={favorites} width={35} height={35} />
                    <p>Favorites</p>
                  </div> 
              </a>  
          </Link>
    	</DashboardLinksStyles>
  )
}

export default DashboardLinks;