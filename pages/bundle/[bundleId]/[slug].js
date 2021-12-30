import {useEffect, useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';


import BundlePageStyles from '../../../styles/BundlePageStyles';
import bundleCover from '../../../assets/image2.png';
import fullHeart from '../../../assets/icons/full-heart.svg';
import heart from '../../../assets/icons/heart.svg';
import share from '../../../assets/icons/share.svg';
import RatingStar from '../../../components/UI/RatingStar';
import userAvatar from '../../../assets/userAvatar.jpg';
import Reviews from '../../../components/Profile/Reviews';
import DashboardUserStyles from '../../../styles/DashboardUserStyles';
import useHttpAxios from '../../../hooks/http-hook';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import ErrorModal from '../../../components/UI/ErrorModal';
import Button from '../../../components/UI/Button';
import Bundles from '../../../components/Bundles/Bundles';
import {AuthContext} from '../../../context/AuthContext';


const BundlePage = ({result, allBundles ,params}) => {

  const router = useRouter();
  const {userAuth} = useContext(AuthContext);
  const {bundle} = result;
  if(router.isFallback){

      return <LoadingSpinner />
  }




  console.log({bundle, allBundles});
  
  return (
    <>

    <BundlePageStyles>

      <DashboardUserStyles>
      <div className='user-info'>
        <div className='user-avatar img-circle'>
            <Image src={userAvatar} alt='user avatar' width={80} height={80} />
        </div>
        <div className='user-profile'>
            <Link href='#'>Zaid96</Link>
        </div>
        
        <div className='user-country'>
            <span>Saudi Arabia</span>
        </div>
        <div className='user-data'>
              <div className='user-imgs'>
              
              <RatingStar width={15} height={15} rating={3} />
              
          
              </div>
              <div className='user-reviews'>
                  3.0 <span>4 Reviews</span>
              </div>
          </div>

          <div className='profile-link'>
          {/*<Link href='#'>
                        <a> View My Profile </a>
                    </Link> */}       
          </div>
        </div>

        <div className='user-about'>
            <h5>About Me</h5>
            <p>I have more than 3 years experience in web development. I develop and design a website on WordPress. I develop a special template according to the client's desire</p>
        </div>

        <div className='user-add-info'>
            <h5>Info</h5>
            <div className='user-add-info-wrap'>
              <span>Member Since</span> <p>June 15, 2020</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Recent Delivery</span> <p>5 Days Ago</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Local Time</span> <p>{new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Languages</span> <p>Arabic, English</p>
            </div>
        </div>

        <button className='user-edit-profile contact'>
                <Link href='#'>
                    <a>Contact</a>
                </Link>
            </button> 
      </DashboardUserStyles>   	

      <div className='content'>
          <div className='header'>
              <div className='title'>
            
                <h1>{bundle.title}</h1>
                <span><Link href='#'>Web Programming</Link></span>

              </div>

              <div className='rate'> 

                <div className='rate-reviews'>
                  <div className='rate-stars'><RatingStar width={15} height={15} rating={bundle.ratingsAverage}  /> <span className='num'>{bundle.ratingsAverage && bundle.ratingsAverage.toFixed(1)}</span>  </div>
                  <span>({bundle.ratingsQuantity})</span>
                </div>

                <div className='rate-icons'>
                    <button type='button' className='icon'><Image src={heart} width={20} height={20} alt='heart icon' /> <span>Save</span> </button>
                    <button type='button' className='icon'><Image src={share} width={20} height={20} alt='Share icon' /> <span>Share</span> </button>
                </div>

              </div>
          </div>

          <div className='bundle-cover' style={{backgroundImage: `url(${bundleCover.src})`}}></div>
            <div className='bundle-description'>
                <ul>
                  <li> Description </li>
                  <li> {bundle.deliverDays} Days </li>
                </ul>
                <p>
                  {bundle.description}
                  </p>
                <div className='revisions'>
                    Revisions {bundle.revisions}
                </div>
            </div>  
            { bundle.user.id !== userAuth.id ? <div className='bundle-btns'>
            
                         <Button type='button' href={`/order/checkout/${bundle.id}`}>Buy now for ${bundle.price}</Button>
                        <button type='button'>Ask for custom offer</button>
                        </div> :
                    <div className='my-bundle'>This is your bundle</div>
              }
            <Reviews />
      </div>
    </BundlePageStyles>
    <Bundles title='Other Bundles' desc='Zaid96' hide bundleItems={allBundles.bundles}/>
    </>
  )
}


export async function getStaticProps({preview, params }){

   try {

       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/${params.bundleId}`);
       const allBundlsRes = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles`);
       const result = await res.json();    
       const allBundles = await allBundlsRes.json();    

    if(!result){

        return {
          notFound: true
        }
    }

    return {
      props: {
        result,
        allBundles,
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
    console.log(result.bundles[0].slug);
    const paths = result.bundles.map(item => ({params: {slug: `${item.slug}`, bundleId: item.id}}));

    return {
      paths,
      fallback: true
    }

}


export default BundlePage;