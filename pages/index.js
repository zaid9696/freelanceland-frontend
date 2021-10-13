import Head from 'next/head';
import Image from 'next/image';

import Hero from '../components/Hero';
import NewOfferAndBundle from '../components/NewOfferAndBundle';
import Info from '../components/Info/Info';
import Bundles from '../components/Bundles/Bundles';

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
    name: 'I create a modern and responsive website using the best technology',
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
    name: 'I create a modern and I will edit your youtube video',
    image: image2,
    userAvatar: userAvatar2,
    price: 400,
    category: 'Web Development'
  }
  

]

export default function Home() {
  return (
      <>
        {/*<Hero /> */}
        <NewOfferAndBundle />
        <Info />
        <Bundles title='Top Rated Bundles' desc='- Best Sellers' bundleItems={Dummy_Bundles} />
        <Bundles title='Latest Bundles' desc='- New Arrivals' bundleItems={Dummy_Bundles} />
      </>
  )
}
