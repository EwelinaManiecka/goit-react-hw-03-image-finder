import { Component } from 'react';

import fetchPictures from './API/PixabayAPI';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    imageName: '',
    images: [],
    page: 1,
    showButton: false,
    showModal: false,
    status: Status.IDLE,
    modalImage: '',
    imageAlt: '',
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });

      fetchPictures(nextName, this.state.page)
        .then(images => {
          if (images.hits.length < 1) {
            this.setState({
              showButton: false,
              status: Status.IDLE,
            });
            return alert('No images on your query');
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
          }));

          this.setState({
            status: Status.RESOLVED,
            showButton:
              this.state.page < Math.ceil(images.total / 12) ? true : false,
          });
        })
        .catch(error => console.log(error));
    }
  }

  handleFormSumbit = imageName => {
    if (imageName === this.state.imageName) {
      return;
    }
    this.setState({
      imageName,
      page: 1,
      images: [],
      showButton: false,
      showModal: false,
      status: Status.IDLE,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalImage = e => {
    this.setState({ modalImage: e });
  };

  handleModalAlt = e => {
    this.setState({ imageAlt: e });
  };

  openModal = e => {
    this.setState({ showModal: true });
    this.setState({ modalImage: e.target.src });
    this.setState({ imageAlt: e.target.alt });
    console.log(e.target.src);
    console.log(e.target.alt);
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, status, showModal, modalImage, imageAlt, showButton } =
      this.state;

    const {
      handleFormSumbit,
      handleModalImage,
      handleModalAlt,
      loadMoreImages,
    } = this;

    return (
      <>
        <Searchbar onSubmit={handleFormSumbit} />
        {status === 'idle' && <h2>Search something</h2>}
        {status === 'pending' && <Loader />}

        {images.length > 0 && (
          <ImageGallery
            showModal={this.openModal}
            images={images}
            handleModalImage={handleModalImage}
            handleModalAlt={handleModalAlt}
          />
        )}

        {showButton && <Button onClick={loadMoreImages} />}

        {showModal && (
          <Modal
            onClose={this.closeModal}
            modalImage={modalImage}
            imageAlt={imageAlt}
          ></Modal>
        )}
      </>
    );
  }
}

export default App;
