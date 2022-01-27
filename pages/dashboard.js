import styled from 'styled-components';

import Dashboard from '../components/Dashboard/Dashboard';


const DashboardStylePage = styled.div`

	grid-column: center-start / center-end;

 `

const dashboard = ({result}) => {

	const {user, cancelNum, completedNum, activeNum} = result;
	// console.log({result});

  return (
    <DashboardStylePage>
    	<Dashboard user={user} cancelNum={cancelNum} completedNum={completedNum} activeNum={activeNum} />
    </DashboardStylePage>
  )
}


export async function getServerSideProps(context){

      // const {bundleId} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/users/dashboard`,{
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


export default dashboard;