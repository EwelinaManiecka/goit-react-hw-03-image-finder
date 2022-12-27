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

export default ImageGallery;
