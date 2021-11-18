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



export default function Home({data}) {
 
  // console.log(data.bundles);
  // console.log(data.bundles[0]._id);
  return (
      <>
        {<Hero />}
        {/*<NewOfferAndBundle />*/}
        {/*<BundleFilters /> */}
        {/*<BundleCategory title={'Web Programming'} items={Dummy_Bundles} /> */}
        {/* <Dashboard /> */}
        { <Profile bundles={data.bundles} /> }
        {/*<Panel />*/}
        <Info />
        <Bundles  title='Top Rated Bundles' desc='- Best Sellers' bundleItems={data.bundles} />
        <Bundles title='Latest Bundles' desc='- New Arrivals' bundleItems={data.bundles} />
      </>
  )
}


export async function getStaticProps(context) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles`);
    const result = await res.json();

    return {

      props: {
        data: result
      }
    }

}
