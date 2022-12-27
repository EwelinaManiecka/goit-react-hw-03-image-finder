import React from 'react';
import style from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  images,
  handleModalImage,
  handleModalAlt,
  showModal,
}) => {
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

export default ImageGalleryItem;
