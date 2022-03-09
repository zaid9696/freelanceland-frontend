import {useEffect, useContext, useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import ReactTimeAgo from 'react-timeago';
import ReactCountryFlag from 'react-country-flag';
import {useRouter} from 'next/router';

import Carousel from 'nuka-carousel';

const SocialShare = styled.div` 


      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      text-align: center;
      width: 100%;
    span {



      &.twitter {color: #00acee};
      &.facebook {color:  #3b5998};
      &.email {color: #c71610};
      button {

        text-transform: uppercase;
        font-weight: 600 !important;
        font-size: 1.5rem !important;
        @media (max-width: 950px){
        font-size: 1rem !important;
        }
        letter-spacing: 1.2px;

      }

    }


 `

import BundlePageStyles from '../../../styles/BundlePageStyles';
import bundleCover from '../../../assets/image2.png';
import fullHeart from '../../../assets/icons/full-heart.svg';
import heart from '../../../assets/icons/heart.svg';
import share from '../../../assets/icons/share.svg';
import RatingStar from '../../../components/UI/RatingStar';
import userAvatar from '../../../assets/userAvatar.jpg';
import Reviews from '../../../components/Profile/Reviews';
import BundleReviews from '../../../components/BundleReviews';
import DashboardUserStyles from '../../../styles/DashboardUserStyles';
import useHttpAxios from '../../../hooks/http-hook';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';
import Modal from '../../../components/UI/Modal.js';
import ErrorModal from '../../../components/UI/ErrorModal';
import Button from '../../../components/UI/Button';
import Bundles from '../../../components/Bundles/Bundles';
import {AuthContext} from '../../../context/AuthContext';
import dateFormat from '../../../utils/DateFormat';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton
} from "react-share";



const BundlePage = ({result, allBundles}) => {

  const router = useRouter();
  const {userAuth} = useContext(AuthContext);
  const {isLoading, sendRequest} = useHttpAxios();
  const [hideModel, setHideModal] = useState(false);
  const [hideBundles, setHideBundles] = useState(false);
  const [favouriteArr, setFavouriteArr] = useState(userAuth.favourites || []);
  const [isFavourite, setIsFavourite] = useState(false);
  const {bundle, reviews} = result;

  let isFavouriteTrue
 
 useEffect(() => {

  userAuth && setFavouriteArr(userAuth.favourites);
  allBundles.bundles.length > 0 ? setHideBundles(false) : setHideBundles(true);


 }, [userAuth])

  useEffect(() => {
    
    if(userAuth){
      
      
    isFavouriteTrue = favouriteArr.map(item => item.includes(bundle.id)).includes(true);

    }


 setIsFavourite(isFavouriteTrue);

  }, [userAuth,bundle, favouriteArr])

    const addFavouriteHandler = async () => {

        try {

            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/addFavourite/${userAuth.id}`, 'PATCH', {
              bundleId: bundle.id
            });
              setFavouriteArr([...favouriteArr, bundle.id]);
            if(res.status === 200){
              setIsFavourite(true)
            }
            

        }catch(err) {console.log(err);}

    }

    const removeFavourites = async () => {

        try {

            const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/users/addFavourite/${userAuth.id}`, 'DELETE', {
              bundleId: bundle.id
            });
            const newArr = favouriteArr.filter(item => item !== bundle.id);
            setFavouriteArr(newArr);
            if(res.status === 200){
              setIsFavourite(false)
            }
            

        }catch(err) {console.log(err);}

    }

    const hideModelHandler = () =>  setHideModal(prev => !prev);
    const openModelHandler = () =>  setHideModal(true);


  return (
    <>
      <Head>
          <title> {bundle.title} | FreelanceLand</title>
      </Head>
    {isLoading && <LoadingSpinner />}
    <Modal hideModel={hideModelHandler} isVisible={hideModel} header='Share This Bundle'>
      <SocialShare className='social-share'>
        <span className='facebook'>
            <FacebookShareButton url={`${process.env.NEXT_PUBLIC_PATH}${router.asPath}`}>Facebook</FacebookShareButton>
        </span>
         <span className='twitter'>
            <TwitterShareButton url={`${process.env.NEXT_PUBLIC_PATH}${router.asPath}`}>Twitter</TwitterShareButton>
        </span>
         <span className='email'>
            <EmailShareButton url={`${process.env.NEXT_PUBLIC_PATH}${router.asPath}`}>Email</EmailShareButton>
        </span>
      </SocialShare>
    </Modal>
    <BundlePageStyles>

      <DashboardUserStyles>
      <div className='user-info'>
        <div className='user-avatar img-circle'>
            <Image src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/users/${bundle.user.photo}`} alt='user avatar' width={80} height={80} />
        </div>
        <div className='user-profile'>
            <Link href={`/${bundle.user.userName}`}>{bundle.user.userName}</Link>
        </div>
        
        <div className='user-country'>
            <span>
            <ReactCountryFlag countryCode={bundle.user.countryCode} 
                svg
                style={{
                    width: '40px',
                    height: '30px',
                    marginLeft: '0.5rem',
                    boxShadow: 'var(--shadow)'
                }}
                title={bundle.user.countryCode}
            />
            </span>
        </div>
        <div className='user-data'>
              <div className='user-imgs'>
              
              <RatingStar width={15} height={15} rating={bundle.user.userRatingAverage} />
              
              </div>
              <div className='user-reviews'>
                  {bundle.user.userRatingAverage && bundle.user.userRatingAverage.toFixed(1)} <span> {bundle.user.userTotalReviews} Reviews</span>
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
            <p>{bundle.user.aboutMe}</p>
        </div>

        <div className='user-add-info'>
            <h5>Info</h5>
            <div className='user-add-info-wrap'>
              <span>Member Since</span> <p>{dateFormat(bundle.user.createdAt, true)}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Recent Delivery</span> <p><ReactTimeAgo date={bundle.user.recentDelivery} /></p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Local Time</span> <p>{new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
              })}</p>
            </div>

            <div className='user-add-info-wrap'>
              <span>Languages</span> <p>{bundle.user.preferredLang && bundle.user.preferredLang}{bundle.user.additionalLang &&  ` ,${bundle.user.additionalLang}`}</p>
            </div>
        </div>

        {
          userAuth ? <button className='user-edit-profile contact'>
                <Link href={`/chat/${bundle.user.userName}`}>
                    <a>Contact</a>
                </Link>
            </button>  :
            <div className='my-bundle'> Log in to contact</div>
        }
      </DashboardUserStyles>   	

      <div className='content'>
          <div className='header'>
              <div className='title'>
            
                <h1>{bundle.title}</h1>
                <span><Link href={`/categories/${bundle.category.categorySlug}`}><a>{bundle.category.category}</a></Link></span>

              </div>

              <div className='rate'> 

                <div className='rate-reviews'>
                  <div className='rate-stars'><RatingStar width={15} height={15} rating={bundle.ratingsAverage}  /> <span className='num'>{bundle.ratingsAverage && bundle.ratingsAverage.toFixed(1)}</span>  </div>
                  <span>({bundle.ratingsQuantity})</span>
                </div>

                <div className='rate-icons'>
                    <button onClick={isFavourite ? removeFavourites : addFavouriteHandler} type='button' className='icon'><Image src={isFavourite ? fullHeart : heart} width={20} height={20} alt='heart icon' /> <span>Save</span> </button>
                    <button type='button' onClick={openModelHandler} className='icon'><Image src={share} width={20} height={20} alt='Share icon' /> <span>Share</span> </button>
                </div>

              </div>
          </div>

          <div className='bundle-images'>
          <Carousel transitionMode="fade"  renderBottomCenterControls={null} wrapAround={true}>
              {
                bundle.images.map((item, i) => <Image key={i} tabIndex={null}  key={i} src={`${process.env.NEXT_PUBLIC_URL_PATH_IMAGES}/bundles/${item}`}  width={1200} height={670} alt='Bundle Image' />)
              }
          </Carousel>
          </div>
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
            
{ userAuth ? (<> <Button type='button' href={`/order/checkout/${bundle.id}`}>Buy now for ${bundle.price}</Button>
           <Button type='button' href={`/chat/${bundle.user.userName}`}>Ask for custom offer</Button> </>) : <div className='my-bundle'>You Need Login To Buy This Bundle </div>}
                        </div> :
                    <div className='my-bundle'>This is your bundle</div>
              }
            {reviews && <BundleReviews reviews={reviews} totalCount={bundle.ratingsQuantity} avgRating={bundle.ratingsAverage} />}
      </div>
    </BundlePageStyles>
    {!hideBundles && <Bundles title='Other Bundles By' desc={bundle.user.userName} hide bundleItems={allBundles.bundles}/> }
    </>
  )
}


export async function getServerSideProps(context){

      const {bundleId} = context.query;
      const token = context.req.headers.cookie ? context.req.headers.cookie.split('token=')[1] : null;

      const tokenPure = token.split(';')[0];

      const myHeaders = new Headers();

      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${tokenPure}`);
       
       const res = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/${bundleId}`,{
          method: 'GET',
          headers: myHeaders
        });
 
 

        const data = await res.json();
        console.log({data});
        const resAll = await fetch(`${process.env.NEXT_PUBLIC_URL_PATH}/bundles/all/${data.bundle.user.id}/${data.bundle.id}`,{
          method: 'GET',
          headers: myHeaders
        });
        const allBundles = await resAll.json();
        
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
                allBundles
            }
        }
  
  

}



export default BundlePage;