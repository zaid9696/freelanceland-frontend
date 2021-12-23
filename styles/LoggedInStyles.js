import styled from 'styled-components';


export const LoggedInStyles = styled.div`

	  display: flex;
    align-items: center;
	  
    .dropdown-wrap {

      position: relative;
      .dropdown {
        background: var(--main);
        padding: 0.7rem;
        display: flex;
        border-radius: 3px;
        cursor: pointer;
        img {
          cursor: pointer;
          transform: rotate(0deg);
          transition: all 0.5s ease-in-out;
        }

        &.active {
           img {

            transform: rotate(180deg);

           }
        }
      }

     

      .dropdown-content {

        position: absolute;
        background: #fff;
        padding: 1rem;
        right: -57%;
        box-shadow: 0px 1px 5px 1px #02020238;
        z-index: 29;
        width: 245px; 
        border-radius: 4px;

        ul {margin-top: 0.3rem;}
        li {

          margin-bottom: 1.2rem;
          border-bottom: 1px solid #634cc242;
          padding-bottom: 0.4rem;
          a {
            display: flex;
            align-items: center;
            span {
              margin-left: 0.4rem;
              font-size: 1.1rem;
              font-weight: 500;
            }
          }

        }

         button {

            width: 100%;
            padding: 0.7rem;
            font-size: 1.2rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: var(--main);
            border: navajowhite;
            border-radius: 4px;
            color: #fff;

          }

      }


  }

    .user-info {

        display: flex;
        align-items: center;
        margin: 0rem 1.5rem;
        margin-left: 15px;

      .user-data {
          margin-left: 9px;
      }

        p {
            padding: 0;
            margin: 0;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 0.3px;
        }
        span{ font-size: 0.8rem; color: #00893a; font-weight: 600;}
    }

    .icons {
        display: flex;
        align-items: self-start;
        position: relative;
        top: 5px;
        .notification {
          margin-right: 14px;
          position: relative;
          cursor: pointer;
        }
    }

    .notification-unread {

      background: var(--red);
      width: 10px;
      height: 10px;
      display: block;
      position: absolute;
      top: 1px;
      right: 1px;
      border-radius: 50%;
      display: none;
      pointer-events: none;
      &.read {display: block}

    }

    .chat{

      cursor: pointer;

    }


`;


export const DropdownStyles = styled.div`           

      position: absolute;
      background: #f9f9f9;
      width: 390px;
      height: 315px;
      left: -196px;
      top: 49px;
      box-shadow: 0px 0px 5px 1px #02020238;
      padding:1rem;
      padding-bottom: 2.5rem;
      z-index:30;
      &.drop-chat {
        left: -150px;
      }
      &::before {
          position: absolute;
          top: -21px;
          right: 182px;
          content: '';
          width: 0;
          height: 0;
          border-left: 18px solid transparent;
          border-right: 18px solid transparent;
          border-bottom: 19px solid #f9f9f9;
          z-index: 2;
      }

      cursor: auto;

    ul {

      width: 100%;
      height: 100%;
      overflow-y: auto;
      cursor: auto;
        &::-webkit-scrollbar{
        width: 7px;
        background-color: #c5c5c5;
      }

      &::-webkit-scrollbar-thumb {

        background: #3c4858;
        border-radius: 6px;
      }

    }

    ul.notifications {
      li {
        display: flex;
        margin-bottom: 0.7rem;
        border-bottom: 1px solid #634cc26b;
        padding-bottom: 0.6rem;
        .notification-icons {
            width: 25%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          &.Delivered {background: var(--main);}
          &.Cancelled {background: #e93232;}
          &.Accepted {background: var(--green);}
          &.Refused {background: #e93232;}
          &.Reviewed {background: #FFC107;}
          &.Purchased {background: #8acfff;}

        }

        .notification-content {

          margin-left: 1rem;
          position: relative;
          p {
              margin: 0;
              font-size: 13px;
              line-height: 1.4;
              font-weight: 500;
              border-bottom: 1px solid #dddada;
              padding-bottom: 7px;
              color: var(--black);
              transition: var(--tranhover);
              &:hover{color: var(--main)}
          }

          span.notification-date {
            font-size: 13px;
            color: var(--black);
            font-weight: 100;
          }

          span.notification-unread {
              background: var(--red);
              width: 15px;
              height: 15px;
              display: block;
              position: absolute;
              top: 68px;
              right: 10px;
              border-radius: 50%;
              &.read {display: none}
          }
        }

      }

    }

    ul.chat-list {

      li {

        margin-bottom: 1.1rem;
        border-bottom: 1px solid #634cc26b;
        padding-bottom: 7px;
        &:hover {
           h3,p {
              color: var(--main);
           }
        }
        a {

          display: flex;
          justify-content: center;
          align-items: center;
        }

        .message-avatar {

          position: relative;

          span.online-status {

            background: var(--red);
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 69%;
            top: 1px;
            right: 5px;
            &.online {background: var(--green);}

          }

        }

        .user-message-content {

          display: flex;
          flex-direction: column;
          width: 100%;
          margin-left: 12px;
          color: var(--black);
        }

        .user-message-header {

          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          h3 {
            transition: var(--tranhover);
            margin: 0;
            font-size: 1rem;
          }
          span {
            font-size: 0.9rem;
            font-weight: 100;
            margin-right: 7px;

          }

        }

        .user-message-footer {
          margin-top: 0.7rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
            margin: 0;
            transition: var(--tranhover);

          }
          span {

              margin-right: 7px;
              background: var(--main);
              color: #fff;
              width: 30px;
              text-align: center;
              height: 30px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 50%;

          }
        }


      }

    }


    .see-all {

      font-size: 1.1rem;
      text-align: center;
      display: block;
      margin-top: 9px;
      color: var(--main);
      text-decoration: underline

    }

`