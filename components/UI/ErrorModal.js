import Modal from './Modal';


const ErrorModal = ({error, onCancel}) => {
  return (
    <>	

	    <Modal isVisible={!!error} header='An Error Occured' hideModel={onCancel} footer={<button className='main' onClick={onCancel}>Ok</button>}>
	    	<p>{error}</p>
	    </Modal>

    </>
  )
}

export default ErrorModal;