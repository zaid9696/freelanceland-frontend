import {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import uploadImageIcon  from '../../assets/icons/imageUploadIcon.svg';

const UploadImageStyles = styled.div` 

	margin: 1rem;

	.preview {

		width: 145px;
    	text-align: center;
    	margin-bottom: 3px;
	}

	p {

		color: var(--red);
    	font-weight: 600;
    	width:145px;
	}

	button {

		width: 145px;
	    height: 59px;
	    background: var(--main);
	    color: #fff;
	    font-size: 1rem;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	    padding: 3px;
	    border: 1px solid #2196f38f;
	    border-radius: 4px;
	    box-shadow: var(--shadow);
	    cursor: pointer;

	}


  `

const UploadImage = ({setImageFile, user}) => {

	const [fileValue, setfileValue] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(true);
    const filePickInput = useRef();

    useEffect(() => {

      if(!fileValue) return;

      const fileReader = new FileReader();

	   fileReader.onload = () => {
	        setPreviewUrl(fileReader.result);
	    };

        fileReader.readAsDataURL(fileValue);

    }, [fileValue]);

    const pickImage = (e) => {

        if(e.target.files && e.target.files.length === 1 && e.target.files[0].type.startsWith('image')){
            const pickedFile = e.target.files[0];
            console.log({previewUrl});
            setfileValue(pickedFile);
            setIsValid(true);
        	setImageFile(fileValue);
        }else {
        	
        	setPreviewUrl('');
            setIsValid(false)
        }
    }

    const pickImageHandler = () => {

        filePickInput.current.click();
    }

  return (
    <UploadImageStyles> 
        <div className='upload-content'> 
            <input ref={filePickInput} type='file' accept='jpg, png, jpeg' onChange={pickImage}  style={{display: 'none'}}/>
            {previewUrl && <div className={`preview ${user && 'img-circle'}`}><Image width={100} height={100} alt='preview image of the user' src={previewUrl}/> </div>}
            <button type='button' onClick={pickImageHandler} >
            	 <Image src={uploadImageIcon} width={30} height={30} alt='Image Icon' />
            	 Pick Image
            </button>
        </div>
        <p>{!isValid && `Please Provide an Image`}</p>
    </UploadImageStyles>
  )
}

export default UploadImage;