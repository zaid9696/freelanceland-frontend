import styled from 'styled-components';


const OrderedPageStyles = styled.div`          
  
  grid-column: center-start / center-end;


  .count-down, .bundle, .order-stl {

     width: 70%;
    margin: auto;
    background: var(--secondary);
    box-shadow: 0px 0px 5px 1px #0202021c;
    margin-top: 2rem;
    padding: 2rem 1rem;
    border-radius: 6px;   
    border: 1px solid #634cc23d;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .count-down {

   

    .semi-column {

      font-size: 3.1rem;
      position: relative;
      right: -14px;
      top: 0px;
      color: var(--main);

    }

    .count {

      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 1.9rem;
      font-size: 1.3rem;
      background: var(--main);
      color: #fff;
      width: 117px;  
      height: 96px;
      justify-content: center;
      border-radius: 5px;
      
      span {

        font-size: 2.5rem;

      }

    }

  }

  .bundle {

    flex-direction: column;

    &-wrap {

        display: flex;
    }

    &-img {

      
      overflow: hidden;
      margin-right: 1.5rem;
      img {
        border-radius: 6px;
      }
    }

    h2 {

      margin-top: 0.2rem;
        a {

          font-size: 1.4rem;
          line-height: 1.4;
          color: var(--black);
          transition: all 0.3s ease-in-out;
          &:hover {

            color: var(--main);

          }
        }

    }

    &-buyer {

      display: flex;
      align-items: center;
      a {
          color: var(--black);
          font-weight: 500;
          margin-left: 9px;
          transition: all 0.3s ease-in-out;

          &:hover {

            color: var(--main);

          }
      }
    }

    &-order {

        ul {

          display: flex;
          justify-content: space-between;
          margin-top: 10px;

        }
    }

    &-price {

      width: 100%;
      margin-top: 0.7rem;
      border-top: 1px solid #634cc275;
      padding-top: 1.1rem;

      ul {
        li {
          display: flex;
          justify-content:space-between;
          font-size: 1.3rem;
          font-weight: 600;
        }
      }
    }

  }

  .order-btns {

    display: flex;
    justify-content: center;
    margin-top: 2rem;

    button {
      color: #fff;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 1rem 3rem;
      background: #e93232;
      font-size: 1.2rem;
      border-radius: 5px;
      box-shadow: var(--shadow);
    }
    button:nth-child(1){
      background: var(--green);
      margin-right: 2.5rem;
    }

  }

  .order-stl {

    padding: 0;
    justify-content: start;
    width: 72%;
    overflow: hidden;
    align-items: normal;
    .icon {

      padding: 1rem;
      display: flex;
      align-items: center;    
    }

     .content {

      margin-left: 1rem;
      padding-bottom: 1.4rem;
      padding-top: 0.6rem;

      h3 {
        margin-bottom: 1rem;
      }

      &-info {

        p {
          margin-top: 0;
        }

        span {

          font-size: 0.9rem;

        }

      }
    }

  }

  .order-deliver {
    .icon {
      background: var(--main);
    }  
  }
  .order-cancelled {
    .icon {
      background: #e93232;
    }  
  }

  .order-refused {
    .icon {
      background: #e93232;
    }  
  }

  .order-accepted {
    .icon {
      background: var(--green);
    }  
  }

  .waitingAccept {

    text-align: center;
    background: var(--orange);
    width: 40%;
    margin: auto;
    margin-top: 1.3rem;
    font-size: 1.2rem;
    padding: 1.3rem 0;
    color: var(--black);
    font-weight: 500;
    letter-spacing: 1.1px;
    border-radius: 5px;

  }

  .warning {

    text-align: center;
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: 100;

  }

`;

export default OrderedPageStyles;