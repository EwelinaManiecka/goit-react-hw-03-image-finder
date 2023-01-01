import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={style.Overlay} onClick={this.handleBackdropClick}>
        <div className={style.Modal}>
          <img src={this.props.modalImage} alt={this.props.imageAlt} />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  onClick: PropTypes.func,
};

export default Modal;
