import {useState , useEffect, useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import uniqid from 'uniqid';

import CheckoutPageStyles from '../../../styles/CheckoutPageStyles';
import bundleImage from '../../../assets/bundleImage.png';
import userAvatar from '../../../assets/userAvatar.jpg';
import Button from '../../../components/UI/Button.js';
import useHttpAxios from '../../../hooks/http-hook';
import {AuthContext} from '../../../context/AuthContext';
import ErrorModal from '../../../components/UI/ErrorModal';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';


const CheckoutPage = ({result}) => {
  
  const router = useRouter();
  const {bundle} = result;
  console.log()
  const [randomId, setRandomId] = useState('');
  const auth = useContext(AuthContext);

  useEffect(() => {

      setRandomId(uniqid.process('ID' +  Math.random().toString(12).slice(2)));

  }, [])

  // console.log(uniqid.process());

  const {isLoading, sendRequest, error ,clearError} = useHttpAxios();


      // console.log(auth.userAuth.id);
  const orderBundleHandler =  async () => {


      const deliverDate = new Date(Date.now() + bundle.deliverDays * 24 * 60 * 60 * 1000);

      const values = {

              orderId: randomId,
              active: true,
              deliverDate,
              bundle: bundle.id,
              user: auth.userAuth.id,
              seller: bundle.user.id

          }

          try{

          
              const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/orders/`, 'POST', values);
              console.log(res);
              router.push(`/ordered/${randomId}`, null, {shallow: true});

          }catch(err) {

              console.log(err);

          }

  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {isLoading && <LoadingSpinner />}
      <CheckoutPageStyles>
        <div className='content'>
            <header>
                <div className='header-img'>
                    <Image src={bundleImage} width={350} height={250} alt="Bundle's Image" />
                </div>
                <div className='header-content'>
                    <h2>{bundle.title}</h2>
                    <div className='header-user'>
                        <div className='img-circle shadow'><Image src={userAvatar} width={60} height={60} alt="User's Image" /></div>
                        <span><Link href='#'><a>Zaid96</a></Link></span>
                    </div>
                </div>
            </header>
            <ul>
                <li>
                  <span className='title'>Revisions:</span>
                  <span className='desc'>{bundle.revisions}</span>
                </li>

                <li>
                  <span className='title'>Delivery Days:</span>
                  <span className='desc'>{bundle.deliverDays} Days</span>
                </li> 

                <li>
                  <span className='title'>Order ID:</span>
                  <span className='desc'>#{randomId}</span>
                </li> 
                
                <li>
                  <span className='title'>Price:</span>
                  <span className='desc'>${bundle.price}</span>
                </li> 
            </ul>
        </div>
        <Button type='button' className='checkout-btn' onClick={orderBundleHandler}>Buy This Shit</Button>
      </CheckoutPageStyles>
      </>
  )
}

export async function getStaticProps({preview, params }){

   try {

       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/${params.bundleId}`);
       const result = await res.json();    

    if(!result){

        return {
          notFound: true
        }
    }

    return {
      props: {
        result,
        params
      }
    }
   }catch(err){

      return {
          props: {
            err
          }
      }

   }



}

export async function getStaticPaths() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles`);
    const result = await res.json();

    const paths = result.bundles.map(item => ({params: {bundleId: item.id}}));

    return {
      paths,
      fallback: true
    }

}

export default CheckoutPage;