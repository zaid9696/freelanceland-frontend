import styled from 'styled-components';

import PanelRequest from '../components/Panel/PanelRequest';

const OffersPageStyles = styled.div`
	
	grid-column: center-start / center-end;
	width: 85%;
    margin: auto;
    margin-top: 2.5rem;

`

const OffersPage = ({result}) => {

	const {allOffers} = result;
	console.log({result});

  return (
    <OffersPageStyles>
    	<PanelRequest offers={allOffers}/>
    </OffersPageStyles>
  )
}


export async function getServerSideProps(context){

      // const {bundleId} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
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