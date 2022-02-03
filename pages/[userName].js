import styled from 'styled-components';
import Head from 'next/head';


import Profile from '../components/Profile/Profile';

const ProfilePageStyles = styled.div`

	grid-column: center-start / center-end;


`;

const ProfilePage = ({result, userName}) => {

	const {bundles, reviews, user} = result;
  console.log({bundles});
	return (
     <>

     <Head>
          <title> {userName} | FreelanceLand</title>
      </Head>
	    <ProfilePageStyles>
	    	<Profile user={user} bundles={bundles} reviews={reviews} userName={userName}/>
	    </ProfilePageStyles>
      </>
	  )
}

export async function getServerSideProps(context){

      const {userName} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/users/${userName}`,{
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
                userName
            }
        }
  
  

}

export default ProfilePage;