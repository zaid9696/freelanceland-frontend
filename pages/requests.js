import styled from 'styled-components';
import Head from 'next/head';

import PanelRequest from '../components/Panel/PanelRequest';

const OffersPageStyles = styled.div`
	
	grid-column: center-start / center-end;
  @media (max-width: 1090px){
    width: 100%;
    margin-top:7rem;
  }
	width: 85%;
    margin: auto;
    margin-top: 2.5rem;

`

const OffersPage = ({result}) => {

	const {allOffers} = result;
	
  return (
    <>
     <Head>
          <title> All Requests | FreelanceLand</title>
      </Head>
    <OffersPageStyles>
    	<PanelRequest offers={allOffers}/>
    </OffersPageStyles>
    </>
  )
}


export async function getServerSideProps(context){

      // const {bundleId} = context.query;
        const token = context.req.headers.cookie ? context.req.headers.cookie.split('token=')[1] : null;
        const tokenPure = token.split(';')[0];
      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokenPure}`);
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/offers/`,{
          method: 'GET',
          headers: myHeaders
        });
 
 
        const data = await res.json();
        
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
            }
        }
  
  

}


export default OffersPage;