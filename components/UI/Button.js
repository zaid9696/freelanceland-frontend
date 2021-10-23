import Link from 'next/link';
import styled from 'styled-components';


const HrefStyles = styled.a`

	background: rebeccapurple

`

const Button = ({href, link, children, onClick, type}) => {

	if(href && !link) {

		return (

			<a>{children}</a>
		)
	}

	if(href && link) {

		return (

			<Link href={href}><HrefStyles>{children} wiw</HrefStyles></Link>
		)
	}


  return (
    <button type={type} onClick={onClick}>{children}</button>
  )
}

export default Button;