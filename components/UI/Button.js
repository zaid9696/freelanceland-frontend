import Link from 'next/link';
import styled from 'styled-components';

const ButtonStyles = styled.button`

		font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    background: var(--main);
    padding: 1rem 2rem;
    border: none;
    border-radius: 40px;
    cursor: pointer;
    &:disabled {
      &:hover {

        border-color: transparent;
        color: #898989;
        background: #c9c9c9;
        box-shadow: 0px 0px 4px 1px #02020221;
        cursor: not-allowed;
      }
      border-color: transparent;
      color: #898989;
      background: #c9c9c9;
      box-shadow: 0px 0px 4px 1px #02020221;

    }

    a{
      color: inherit;
    }
`


const Button = ({type, onClick, className, href,disabled ,children}) => {

  if(href){

      return (

            <ButtonStyles disabled={disabled} type={type} className={className} onClick={onClick}>
                    <Link href={href}><a>{children}</a></Link>
            </ButtonStyles>

        )

  }

  return (
    <ButtonStyles disabled={disabled} type={type} className={className} onClick={onClick}>{children}</ButtonStyles>
  )
}

export default Button;