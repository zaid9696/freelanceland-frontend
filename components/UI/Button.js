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

    a{
      color: inherit;
    }
`


const Button = ({type, onClick, className, href ,children}) => {

  if(href){

      return (

            <ButtonStyles  type={type} className={className} onClick={onClick}>
                    <Link href={href}><a>{children}</a></Link>
            </ButtonStyles>

        )

  }

  return (
    <ButtonStyles type={type} className={className} onClick={onClick}>{children}</ButtonStyles>
  )
}

export default Button;