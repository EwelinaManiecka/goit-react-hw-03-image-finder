import React from 'react';
import PropTypes from 'prop-types';
import style from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, showModal }) => {
  return (
    <>
      {images.map(image => (
        <li
          key={image.id}
          className={style.ImageGalleryItem}
          onClick={showModal}
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={style.ImageGalleryItem__image}
            onClick={showModal}
          />
        </li>
      ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  showModal: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGalleryItem;
