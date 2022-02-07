import {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import Button from '../../components/UI/Button';
import starIcon from '../../assets/icons/star.svg';
import useHttpAxios from '../../hooks/http-hook';
import {AuthContext} from '../../context/AuthContext';

const ReviewFieldsStyles = styled.div`

    display: flex;
    justify-content: center;

    form {

      display: flex;
      flex-direction: column;
      width: 37%;
      @media(max-width:1000px) {
        width: 90%;
        button {width: 100% !important;}
      }
      margin-top: 2rem;

      textarea {

        margin-bottom: 1rem;
        height: 110px;
        border: 2px solid #3f51b59e;
        border-radius: 4px;
        box-shadow: 0px 1px 5px 1px #02020238;
        padding: 15px;

      }

      button {

         width: 145px;
         height: 47px;
         font-size: 13px;
         padding: 0;
         color: #fff;
         font-weight: 600;
         transition: var(--tranhover);
         &:hover {
            background: transparent;
            color: var(--main);
            border: 1px solid;
         }

      }

    }

    .review-ratings {

      margin-bottom: 5px;
     span.inactve {
        filter: grayscale(1);
      }


    }


  `


const ReviewFields = ({orders,updateOrderState, updateNotificationState,text, sellerRev}) => {

  const [reviewTxt, setReviewTxt] = useState('');
  const {sendRequest} = useHttpAxios();
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [isFormTrue, setIsFormTrue] = useState(true);
  const {userAuth} = useContext(AuthContext);

  const submitReviewHandler = async (e) => {

    e.preventDefault();

    const values = {

      review: reviewTxt,
      buyer: orders.user.id,
      seller: orders.seller,
      rating,
      bundle: orders.bundle.id,
      creator: userAuth.id,
      createdAt: Date.now()

    }

    setReviewTxt('');

    try {

        if(sellerRev){
          
          const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/reviews`, 'POST', values);
          const body = {
            reply: res.data.newReview.id
          }
    
          const addToBuyerReview = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/reviews/${sellerRev}`, 'PATCH', body);
           updateOrderState({sellerReview: res.data.newReview.id});
           updateNotificationState('Reviewed');
            return
        }

        const res = await sendRequest(`${process.env.NEXT_PUBLIC_URL_PATH}/reviews`, 'POST', values);
        updateOrderState({buyerReview: res.data.newReview.id});
        updateNotificationState('Reviewed');

        
    }catch(err) {console.log(err);}


  }

  const ratingHandler = (num) => {

    setRating(num + 1);
    setIsRated(true);

  }

  
useEffect(() => {

  if(rating >= 1 && reviewTxt){

      setIsFormTrue(false)

    }else {

      setIsFormTrue(true)

    }


}, [reviewTxt, rating])

  

  return (
    <ReviewFieldsStyles>
     
        <form onSubmit={submitReviewHandler}>
           <div className='review-ratings'>
               {
           [1,2,3,4,5].map((item, i) => {
                
             return  <span onClick={() => ratingHandler(i)} onMouseEnter={() => { !isRated && setRating(i + 1)}} onMouseLeave={() => {!isRated && setRating(0)}} key={i} className={`${rating >= i + 1 ? 'active-star' : 'inactve'}`}><Image width={30} height={30} src={starIcon} alt='star icon' /></span>        
            })
          }
          </div>
          <textarea placeholder='Write your review here' onChange={(e) => setReviewTxt(e.target.value)}/>
          <Button type='submit' disabled={isFormTrue}>Submit Review</Button>
        </form>
    </ReviewFieldsStyles>
  )
}

export default ReviewFields;