import React from 'react';
import PropTypes from 'prop-types';
import style from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  images,
  handleModalImage,
  handleModalAlt,
  openModal,
}) => {
  return (
    <>
      {images.map(image => (
        <li
          key={image.id}
          className={style.ImageGalleryItem}
          onClick={openModal}
        >
          <img
            src={image.webformatURL}
            alt={image.tags}
            className={style.ImageGalleryItem__image}
            onClick={() => {
              handleModalImage(image.largeImageURL);
              handleModalAlt(image.tags);
            }}
          />
        </li>
      ))}
    </>
  );
};
ImageGalleryItem.propTypes = {
  openModal: PropTypes.func,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGalleryItem;
