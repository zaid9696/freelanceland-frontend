import styled from 'styled-components';

const CheckoutPageStyles = styled.div`

  
  grid-column: center-start / center-end;
  @media(max-width: 1090px){

    margin-top: 7rem;
     
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .content {

    padding: 1.5rem 0;
    background: whitesmoke;
    box-shadow: var(--shadow);
    width: 75%;
    @media(max-width: 1090px){
    width: 98%;


    }
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    border-radius: 3px;
    border: 1px solid #442da724;

    header {

      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid var(--color-grey80);
      padding-bottom: 8px;
      margin-bottom: 1rem;

      .header-content {

          margin-right: 1.2rem;
          margin-left: 1.2rem;
          text-align: center;
          line-height: 1.4;
        @media(max-width: 500px){

          h2 {
            font-size: 0.9rem;
          }

        }

      }
      
      .header-img {

        overflow: hidden;
        border-radius: 5px 5px 9px 9px;

      }

      .header-user {
          display: flex;
          align-items: center;
          justify-content: center;

          span {
              a {
                  color: var(--black);
                  font-size: 1.1rem;
                  font-weight: 500;
                  margin-left: 0.6rem;
                  transition: var(--tranhover);
                  &:hover {
                    color: var(--main)
                  }
              }
          }
      }

    }

    ul {
        width: 100%;

        li {
          
            display: flex;
            justify-content: space-between;
            border-bottom: 1px dashed var(--color-grey80);
            padding: 0.6rem 16px;
            margin-bottom: 1.1rem;
            span.title {
              font-size: 1.3rem; 
              font-weight: 400;
             @media(max-width: 500px){
              font-size: 0.9rem; 

             }

            }
            span.desc {
              font-size: 1.2rem; 
              font-weight: 500;
              @media(max-width: 500px){
                font-size: 0.7rem; 

              }
            }

            &:last-child {

              margin-bottom: 0;
              border-bottom: none;
              font-weight: 600;
              span{font-weight: 600; color: var(--green)}
              span.desc{font-size: 1.4rem}

            }
          }
    
    }

  }

.paypal-btn {width: 50%}

button.checkout-btn {

  color: #fff;
  border: 2px solid var(--main);
  transition: var(--tranhover);
  &:hover {

    background: transparent;
    color: var(--main);

  }
}

.dummy-info {

  p {

    @media(max-width: 500px){
      font-size: 0.7rem; 

    }

  }

  h4 {

    margin-top: 0px;
    @media(max-width: 500px){
      font-size: 0.8rem; 

    }

  }
}

`

export default CheckoutPageStyles;