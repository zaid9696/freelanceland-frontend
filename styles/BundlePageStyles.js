import styled from 'styled-components';



const BundlePageStyles = styled.div`

    grid-column: center-start / center-end;
    display: grid;
    grid-template-columns: 26% 1fr;
    @media (max-width: 1095px){
    grid-template-columns: 1fr;
    }
    @media (max-width: 1000px){
      margin-top: 7rem;
    }
    gap: 2rem;
    margin-top: 2rem;

    .header {

      display: grid;
      grid-template-columns: 74% 1fr;
      @media (max-width: 950px){
      grid-template-columns: 1fr;

      }

      gap: 1rem;

      .title {

        h1 {
          font-size: 1.7rem;
          line-height: 1.4;
        }

        span a {
          font-size: 1.2rem;
          color: var(--main);
          font-weight: 500;
        }

      }

       div.rate-stars {

          display: flex;
          color: var(--orange);
          & span.num {

            position: relative;
            left: -6px;

          }
        }

      .rate-reviews {
        display: flex;
      }

      .rate {

        margin-top: 1.6rem;
      }

      .rate-icons {

        display: grid;
        grid-template-columns: 1fr 1fr;
        margin-top: 1rem;
        .icon {

          background: #fff;
          display: flex;
          border: 1px
          solid var(--main);
          width: 100px;
          padding: 7px 5px;
          justify-content: center;
          color: var(--main);
          padding-top: 9px;
          border-radius: 3px;
          span {margin-left: 7px;}
          cursor: pointer;
          @media (max-width: 950px){

            &:last-child {justify-self: end;}

          }


        }

      }

    }

    .bundle-cover {

        width: 100%;
        height: 383px;
        margin-top: 2rem;
        background-attachment: fixed;
        background-repeat: no-repeat;
        background-size: cover;


    }

    .bundle-description {

      background: whitesmoke;
      box-shadow: 0px 1px 6px 1px #02020224;
      margin-top: 2rem;
      margin-bottom: 2rem;
      padding: 1rem;
      ul {

        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #43434333;
        padding-bottom: 7px;
        padding-top: 5px;

        li {
          font-size: 1.4rem;
          @media (max-width: 500px){
          font-size: 1rem;
          }
        }

      }

      p {

        font-size: 1.1rem;
        line-height: 1.5;
        font-weight: 100;

      }

    }

    .revisions {

        text-align: center;
        font-size: 1.4rem;
        border-top: 1px solid #43434333;
        padding-top: 14px;

    }


    .bundle-btns {

      display: flex;
      justify-content: space-between;
        @media (max-width: 500px) {

          display: grid;
          grid-template-columns: 1fr;

        }

      button {

        font-size: 1.3rem;
        @media (max-width: 500px) {
        font-size: 1.1rem;

        }
        text-transform: uppercase;
        letter-spacing: 1px;
        width: 47%;
        @media (max-width: 500px) {
          width: 100%;
          margin-bottom: 1rem;
        }
        padding: 15px 1px;
        border-radius: 4px;
        border: none;
        color: #fff;
        font-weight: 600;
        &:nth-child(1){
          background: var(--green);
        }

        &:nth-child(2){
          background: var(--main);
        }

      }

    }


    .my-bundle {

      text-align: center;
      background: #13181c;
      color: #fff;
      padding: 19px;
      border-radius: 45px;
      font-size: 1.2rem;
      font-weight: 700;
      text-transform: uppercase;
      cursor: not-allowed;
      width: 90%;
       @media (max-width: 500px){
          font-size: 1rem;
          }
    }

    .bundle-images {

      width: 100%;
      margin-top: 40px;
      img {border-radius: 3px; width: 100vw !important}
    }

`

export default BundlePageStyles