import styled from 'styled-components';
import Head from 'next/head';

import DashboardLinks from '../../components/Dashboard/DashboardLinks';
import DashboardUser from '../../components/Dashboard/DashboardUser';
import BundleItems from '../../components/Bundles/BundleItems';
import PanelRequest from '../../components/Panel/PanelRequest';
import {ReviewItems} from '../../components/Profile/Reviews';

const DashboardLinksContentStyles = styled.div` 


  grid-column: center-start / center-end;
  display: grid;
  grid-template-columns: 1fr 55% 1fr;
  @media (max-width: 1200px){
    grid-template-columns: 1fr;
    margin-top: 7rem;
  }
  gap: 1rem;
  margin-top: 2rem;

  .dashboard-bundles {

  	display: grid;
    grid-template-columns: 1fr 1fr;
  @media (max-width: 670px){
    grid-template-columns: 1fr;
  }
    gap: 2rem;

  }

  .dashboard-review {
    	box-shadow: var(--shadow);
    	padding: 1rem;
    }

          .review {

        	display: flex;
        	margin-bottom: 2.3000000000000007rem;
		    border-bottom: 1px solid #634cc252;
		    padding-bottom: 5px;
            &.sub-review {margin-top: 1.5rem;}
        	&-info {
        		display: flex;
        		flex-direction: column;
        		width: 100%;
        		&-rating {
        		display: flex;
				    justify-content: space-between;
				    width: 100%;	

            .review-stars{display: flex;}

				    a {
				    	font-size: 1.1rem;
               @media (max-width: 500px){
                font-size: 0.8rem;
              }
					    margin-left: 9px;
					    color: var(--black);
					    transition: var(--tranhover);
					    &:hover {
					    	color: var(--main);
					    }
        			}
        		span.num {
        			font-size: 16px;
				    font-weight: 100;
				    margin-left: -5px;
				    margin-right: 14px;
        		}

        	}
			&-message {
                p.review-bundle {
                    position: relative;
                    // top: -11px;
                }
				p {
					margin-left: 10px;
					font-weight: 100;
          @media (max-width: 500px){
            font-size: 0.7rem;
          }
				}
				span {

				margin-left: 10px;
			    font-weight: 100;
			    font-size: 0.8rem;
        @media (max-width: 500px){
            font-size: 0.7rem;
          
				}
			}

			.review-stars {

				display: flex;

			}


    }


  
	

 `

const DashboardBundles = ({bundles}) => {

	return (

			<div className='dashboard-bundles'>
    		{
    		  bundles.map(item => <BundleItems key={item.id} item={item}/>)
    		}
    	</div>

		)

}


const DashboardLinksContent = ({bundles, result, query, offers, reviews, allOffers, favBundles}) => {
	
	const {user} = result;

  return (
    <>
      <Head>
          <title> Dashboard {query} | FreelanceLand</title>
      </Head>
    <DashboardLinksContentStyles>
    	<DashboardLinks />
    	{query == 'myBundles' && <DashboardBundles bundles={bundles.bundles} />}
    	{query == 'myFavourites' && <DashboardBundles bundles={favBundles.favBundles} />}
    	{query == 'myRequests' && <PanelRequest offers={offers.allRequests} />}
    	{query == 'buyersRequests' && <PanelRequest offers={allOffers.allOffers} />}
    	{
    	 query == 'myReviews' && <div className='dashboard-review'> {reviews.reviews.map(item => <ReviewItems key={item.id} item={item} />)}</div>
    	}
    	<DashboardUser user={user}/>
    </DashboardLinksContentStyles>
    </>
  )
}

export async function getServerSideProps(context){

      const {name} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('token=')[1] : null;
      const tokenPure = token.split(';')[0];

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokenPure}`);
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/users/dashboard`,{
          method: 'GET',
          headers: myHeaders
        });

        const resFavBundles = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/users/dashboard/favBundles`,{
          method: 'GET',
          headers: myHeaders
        });

       const resBundles = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/dashboard`,{
          method: 'GET',
          headers: myHeaders
        });

       const resOffers = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/offers/dashboard`,{
          method: 'GET',
          headers: myHeaders
        });

        const resOffersBuyers = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/offers/dashboard/buyers`,{
          method: 'GET',
          headers: myHeaders
        });

       const resReviews = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/reviews/dashboard`,{
          method: 'GET',
          headers: myHeaders
        });
 
 
        const data = await res.json();
        const bundles = await resBundles.json();
        const offers = await resOffers.json();
        const reviews = await resReviews.json();
        const allOffers = await resOffersBuyers.json();
        const favBundles = await resFavBundles.json();

        let error = data.error ? data.error.statusCode : null;
    
        if(error || !data){

          return {
            redirect: {
              destination: '/',
              permanent: false
            }
          }
       }

        return {
            props: {
                result: data,
                bundles,
                offers,
                reviews,
                allOffers,
                favBundles,
                query: name
            }
        }
  
  

}

export default DashboardLinksContent;