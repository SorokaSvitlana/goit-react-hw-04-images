import PropTypes from 'prop-types'
import React, {useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Modal } from './Modal.Styled';

const modalRoot = document.querySelector('#modal-root');

function ModalPage({ closeModal, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <Modal>{children}</Modal>
    </Overlay>,
    modalRoot
  );
}

export default ModalPage;

ModalPage.propTypes = {
  closeModal: PropTypes.func,
}


















// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import Loader from 'components/Loader/Loader';

// class Modal extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         isImageLoading: true,
//         useLoader: true,
//       };
//       this.imageRef = React.createRef();
//     }
  
//     componentDidMount() {
//       window.addEventListener('keydown', this.handleKeyDown);
//       this.loadImage();
//     }
  
//     componentWillUnmount() {
//       window.removeEventListener('keydown', this.handleKeyDown);
//     }
  
//     handleKeyDown = event => {
//       if (event.key === 'Escape') {
//         this.props.onClose();
//       }
//     };
  
//     handleBackdropClick = event => {
//       if (event.target === event.currentTarget) {
//         this.props.onClose();
//       };
//     };
  
//     loadImage = () => {
//       const image = new Image();
//       image.onload = this.handleImageLoad;
//       image.onerror = this.handleImageError;
//       image.src = this.props.largeImageURL;
//     };
  
//     handleImageLoad = () => {
//       this.setState({ isImageLoading: false });
//     };
  
//     handleImageError = () => {
//       this.setState({ useLoader: false });
//     };
  
//     render() {
//       const { isImageLoading, useLoader } = this.state;
//       const { largeImageURL } = this.props;
  
//       return ReactDOM.createPortal(
//         <div  onClick={this.handleBackdropClick}>
//           <div >
//             {useLoader && isImageLoading && <Loader />}
//             {!isImageLoading && (
//               <img
//                 src={largeImageURL}
//                 alt="img"
//               />
//             )}
//           </div>
//         </div>,
//         document.getElementById('root')
//       );
//     }
//   }
  
//   export default Modal;