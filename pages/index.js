import {useContext} from 'react';
import Head from 'next/head';
import Image from 'next/image';

import Hero from '../components/Hero';
import NewOfferAndBundle from '../components/NewOfferAndBundle';
import BundleFilters from '../components/BundleFilters';
import Info from '../components/Info/Info';
import Bundles from '../components/Bundles/Bundles';
import BundleCategory from '../components/BundleCategory';
import Dashboard from '../components/Dashboard/Dashboard';
import Profile from '../components/Profile/Profile';
import Panel from '../components/Panel/Panel';
import {AuthContext} from '../context/AuthContext';

import userAvatar from '../assets/userAvatar.jpg';
import userAvatar2 from '../assets/userAvatar2.png';
import bundleImage from '../assets/bundleImage.png';
import image2 from '../assets/image2.png';


export default function Home({topRated, bunldesLatest}) {
 
  const {isLogged} = useContext(AuthContext);
  const {latestBundles}  = bunldesLatest;
  const {topRatedBundles} = topRated;


  return (
      <>
        <Head>
          <title>FreelanceLand | Bring Your Ideas to Life with Perfect Freelancers from FreelanceLand</title>
        </Head>
        {!isLogged && <Hero />} 
        {isLogged && <NewOfferAndBundle />}
       
        <Info />
        {<Bundles hide title='Top Rated Bundles' desc='- Best Sellers' bundleItems={topRatedBundles} /> } 
        {<Bundles hide title='Latest Bundles' desc='- New Arrivals' bundleItems={latestBundles} /> } 
      </>
  )
}


export async function getServerSideProps(context){

      // const {userName} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('=')[1] : null;

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/topRated`,{
          method: 'GET',
          headers: myHeaders
        });
      const resLatest = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/latestBundles`,{
          method: 'GET',
          headers: myHeaders
        });
        
      const topRated = await res.json();
      const bunldesLatest = await resLatest.json();
        

      return {
            props: {
                topRated,
                bunldesLatest
            }
      }
  
  

}


