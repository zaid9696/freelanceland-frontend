import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import facebookIcon from '../../assets/icons/social_media/facebook.svg';
import twitterIcon from '../../assets/icons/social_media/twitter.svg';
import instagramIcon from '../../assets/icons/social_media/instagram.svg';
import linkedinIcon from '../../assets/icons/social_media/linkedin.svg';
import youtubeIcon from '../../assets/icons/social_media/youtube.svg';

import mastercardIcon from '../../assets/icons/payment_icons/mastercard.svg';
import paypalIcon from '../../assets/icons/payment_icons/paypal.svg';
import visaIcon from '../../assets/icons/payment_icons/visa.svg';

const FooterContentStyles = styled.div`

	grid-column: center-start / center-end;
	display: grid;
  grid-template-columns: 62% 1fr;
  @media (max-width: 777px){
  grid-template-columns:1fr;

  }
  margin-bottom: 1.5rem;

    .footer-lists {
    	display: grid;
    	grid-template-columns: repeat(3, 1fr);
        @media (max-width: 500px){
        grid-template-columns: repeat(1, 1fr);
            justify-items: center;
        }

    	h4 {
    		font-size: 1.2rem;
		    letter-spacing: 1px;
		    color: #634cc2fc;
		    width: fit-content;
		    border-top: 1px solid #634cc273;
		    border-bottom: 1px solid #634cc273;
		    padding: 8px 0;
		    margin-bottom: 1rem;
    	}

    	ul {

    		li {
    			margin-bottom: 1rem;
    			font-size: 0.8rem;
    			a {
    				color: var(--black);
    				transition: all 0.3s ease-in-out;
    				&:hover {
    					color: var(--main);
    				}
    			}
    		}
    	}
    }

    .footer-info {

    margin-top: 1.7rem;
    	.footer-social {
    		text-align: center;
    		a {
    			margin-left: 1rem;
                @media (max-width: 500px) {

                     img {
                    width: 30px;
                        }
                }
    		}
    	}

    	.footer-payment {
    		text-align: center;
		    font-size: 1.2rem;
		    color: var(--green);
		    &-icons {
		    	display: flex;
		    	justify-content: center;
		    	margin-top: -40px;
		    }
    	}
    }

`

const FooterContent = (props) => {
  return (
    <FooterContentStyles>
    	<div className='footer-lists'>
    		<div className='footer-list'>
    			<h4>Categories</h4>
    			<ul>
    				<li>
    					<Link href='/categories/programming-and-it'><a>Programming & IT</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/graphics-and-design'><a>Graphics & Design</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/digital-marketing'><a>Digital Marketing</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/writing-and-translation'><a>Writing & Translation</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/video-and-animation'><a>Video & Animation</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/music-and-audio'><a>Music & Audio</a></Link>
    				</li>
    				<li>
    					<Link href='/categories/business'><a>Business</a></Link>
    				</li>
    			</ul>
    		</div>

    		<div className='footer-list'>
    			<h4>About</h4>
    			<ul>
    				<li>
    					<Link href='#'><a>About Us</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Blogs</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Referral Program</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Testimonials</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Privacy Policy</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Terms of Service</a></Link>
    				</li>
    			</ul>
    		</div>

    		<div className='footer-list'>
    			<h4>Help</h4>
    			<ul>
    				<li>
    					<Link href='#'><a>How it works</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Levels</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Support</a></Link>
    				</li>
    				<li>
    					<Link href='#'><a>Sitemap</a></Link>
    				</li>
    			
    				<li>
    					<Link href='#'><a>Feedback</a></Link>
    				</li>
    			</ul>
    		</div>

    	</div>

    	<div className='footer-info'>
    		<div className='footer-social'>
    			
    			<a href='#'><Image src={facebookIcon} alt='Facebook Icon' /></a>
    			
    			<a href='#'><Image src={twitterIcon} alt='Twitter Icon' /></a>
    			
    			<a href='#'><Image src={instagramIcon} alt='Instagram Icon' /></a>
    			
    			<a href='#'><Image src={linkedinIcon} alt='Linkedin Icon' /></a>
    			
    			<a href='#'><Image src={youtubeIcon} alt='Youtube Icon' /></a>
    		
    		</div>
    		<div className='footer-payment'>
    			<h3>Secure Payment By:</h3>
    			<div className='footer-payment-icons'>
    				<Image height={40} width={150} src={mastercardIcon} alt='Mastercard Icon' />
    				<Image height={40} width={90} src={visaIcon} alt='Visa Icon' />
    				<Image height={110} width={150} src={paypalIcon} alt='Paypal Icon' />
    			</div>
    		</div>
    	</div>
    </FooterContentStyles>
  )
}

export default FooterContent;