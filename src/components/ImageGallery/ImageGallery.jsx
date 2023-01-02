import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

export const ImageGallery = ({
  images,
  handleModalImage,
  handleModalAlt,
  showModal,
}) => {
  return (
    <div>
      <h2>Gallery</h2>
      <ul className={style.ImageGallery}>
        <ImageGalleryItem
          images={images}
          handleModalImage={handleModalImage}
          handleModalAlt={handleModalAlt}
          showModal={showModal}
        />
      </ul>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func,
  handleModalImage: PropTypes.func,
  handleModalAlt: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
