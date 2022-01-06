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

import userAvatar from '../assets/userAvatar.jpg';
import userAvatar2 from '../assets/userAvatar2.png';
import bundleImage from '../assets/bundleImage.png';
import image2 from '../assets/image2.png';

const Dummy_Bundles = [

  {
    userName: 'Zaid96',
    reviews: 3,
    rating: '5.0',
    id: 1,
    title: 'I create a modern and responsive website using the best technology',
    image: bundleImage,
    userAvatar,
    price: 100,
    category: 'Web Development'
  },

  {
    userName: 'Ricky_Visuals',
    reviews: 5,
    rating: '4.5',
    id: 2,
    title: 'I create a modern and I will edit your youtube video',
    image: image2,
    userAvatar: userAvatar2,
    price: 400,
    category: 'Web Development'
  }
  

]



export default function Home({topRated, bunldesLatest}) {
 
  console.log({topRated, bunldesLatest});
  const {latestBundles}  = bunldesLatest;
  const {topRatedBundles} = topRated;
//   const handleSocialLogin = (user) => {
//   console.log(user);
// };

// const handleSocialLoginFailure = (err) => {
//   console.error(err);
// };
  // console.log(data.bundles[0]._id);
  return (
      <>
        {<Hero />}
       
        {/*<NewOfferAndBundle />*/}
        {/*<BundleFilters /> */}
        {/*<BundleCategory title={'Web Programming'} items={Dummy_Bundles} /> */}
        {/* <Dashboard /> */}
        {/*<Panel />*/}
        <Info />
        <Bundles hide title='Top Rated Bundles' desc='- Best Sellers' bundleItems={topRatedBundles} /> 
        <Bundles hide title='Latest Bundles' desc='- New Arrivals' bundleItems={latestBundles} /> 
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


