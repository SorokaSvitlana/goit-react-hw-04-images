import PropTypes from 'prop-types'
import { GalleryItem, GalleryItemImage } from "./ImageGalleryItem.Styled"
import React, {  useState } from 'react';
import ModalPage from 'components/Modal/Modal';

function ImageGalleryItem({ largeImageURL, webformatURL, tags }) {
  const [isOpen, setIsOpen] = useState(false)
  

  const openModal = e => {
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  
    return (
        <>
      <GalleryItem onClick={openModal}>
        <GalleryItemImage  src={webformatURL} alt={tags} />
        </GalleryItem>
        {isOpen && (
           <ModalPage closeModal={closeModal}>
           <img src={largeImageURL} alt={tags} />
         </ModalPage>
         
        )}
     </>
    );
  }

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  // largeImageURL:
  // webformatURL:
  tags: PropTypes.string
}
