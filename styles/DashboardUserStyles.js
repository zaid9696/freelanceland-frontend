import styled from 'styled-components';



const DashboardUserStyles = styled.div`
  
    box-shadow: 0px 1px 6px 1px #02020224;
    background: var(--secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    height: fit-content;
    .user-info {
        text-align: center;
    }

    .user-avatar {
        text-align: center;
    }
    .profile-link {
      margin: 0.6rem 0;
    }

    .user-profile {
      margin: 0.6rem 0;
      a {
          color: var(--black);
          font-weight: 500;
          font-size: 1.1rem;
      }

    }

    .user-data {
        display: flex;
        .user-imgs{
            margin-right: 0.5rem;
            span.inactve {
                filter: grayscale(1);
            }
        }
    }

    .user-reviews {
      font-size:0.9rem;
    }
	 
   .user-numbers {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      width: 100%;
      gap: 0.3rem;
      .user-progress-wrap {
          display: flex;
          align-items: center;
          
        .user-progress {

          width: 100%;
          height: 10px;
          background: #e1e1e1;
          border-radius: 3px;
          .progress-bar {
              height: 100%;
              background: var(--main);
              border-radius: 3px;

          }
        
        }
        span{
              font-size: 0.8rem;
              display: block;
              margin-left: 4px;
              color: var(--main);
        }
      }
      p {
        font-size: 0.79rem;
      }
   }

   .user-profit {

      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 5px;
      p {
         font-size: 0.9rem;
         margin: 0.3rem 0;
      }
      span {
        font-size: 0.97rem;
        font-weight: 500;
      }
   }

      h5 {
          margin-top: 5px;
          font-size: 1rem;
          margin-bottom: 8px;
      }
   .user-about {

      p {

          margin-top: 0px;
          font-size: 0.9rem;
          line-height: 1.5;
          font-weight: 100;
      }
   }

   .user-edit-profile {

      background: var(--main);
      color: #fff;
      font-size: 1rem;
      padding: 0.6rem 1.2rem;
      border: navajowhite;
      border-radius: 3px;
      a {
         color: inherit;
      }

   }

   .user-add-info {
      width: 100%;

      &-wrap {

          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          span{

            font-size: 0.9rem;
            font-weight: 100;
          }

          p {
              font-size: 0.9rem;
              margin: 0;
          }
      }

   }

   .user-skills {

      width: 100%;
      ul.skills {

          display: flex;
          flex-wrap: wrap;
          li {
              font-size: 0.9rem;
              margin-right: 6px;
              background: var(--main);
              padding: 4px 7px;
              border-radius: 2px;
              color: #fff;
              margin-bottom: 8px;
          }
      }
   }

`;

export default DashboardUserStyles;