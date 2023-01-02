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
    status: Status.IDLE,
    modal: { show: false, img: null, alt: null },
    alert: false,
  };

  componentDidUpdate(_, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING, alert: false });

      fetchPictures(nextName, this.state.page)
        .then(images => {
          if (images.hits.length < 1) {
            this.setState({
              showButton: false,
              status: Status.IDLE,
              alert: true,
            });

            // return alert('No images on your query');
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
      modal: { show: false, img: null, alt: null },
      status: Status.IDLE,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModalImage = e => {
    this.setState({ img: e });
  };

  handleModalAlt = e => {
    this.setState({ alt: e });
  };

  openModal = e => {
    this.setState({ modal: { show: true } });
    this.setState({ modal: { img: e.target.src } });
    this.setState({ modal: { alt: e.target.alt } });
  };
  closeModal = () => {
    this.setState({ modal: { show: false, img: null, alt: null } });
  };

  render() {
    const { images, status, modal, img, alt, showButton } = this.state;

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
        {status === 'pending' && alert === false && <Loader />}
        {images.length > 0 && (
          <ImageGallery
            showModal={this.openModal}
            images={images}
            handleModalImage={handleModalImage}
            handleModalAlt={handleModalAlt}
          />
        )}

        {showButton && <Button onClick={loadMoreImages} />}

        {modal && <Modal onClose={this.closeModal} img={img} alt={alt} />}
      </>
    );
  }
}

export default App;
