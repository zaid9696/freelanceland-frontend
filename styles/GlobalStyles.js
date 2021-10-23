import {createGlobalStyle} from 'styled-components';


const GlobalStyles = createGlobalStyle`

	:root{
		--red: #e30000;
		--main: #634CC2;
		--secondary: #F8F8F9
		--third: #FEFEFE;
		--black: #434343;
		--green: #219653;
		--orange: #F79E1B;
		--tranhover: all 0.6s cubic-bezier(0.42, 0, 0, 0.63);
		--shadow: 0px 3px 5px 1px #02020238;
	}

	html {
		font-family: 'Poppins', BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    					Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;;
		fon-size: 10px;
	}

	.sub_container {
		
		display: grid;
  		grid-template-columns: [full-start] minmax(2rem, 1fr) [center-start] repeat(8, [col-start] minmax(min-content, 15rem) [col-start]) [center-end]  minmax(2rem, 1fr) [full-end];
	}

	body{
		color: var(--black);
	}

	img {
		max-width: 100%;
	}

	ul {
		list-style: none;
	    margin: 0;
	    padding: 0;
	}

	a{
		text-decoration: none;
		&:active{
			color: #2d7ce3;
		}
	}

	.img-circle {

		img {
			border-radius: 50%;
		}
	}

	
    div.error {

    	color: red;
    	margin-top: 5px;
    	margin-left: 2rem;
    	position: relative;
    	top: -14px;
    }

`;


export default GlobalStyles;