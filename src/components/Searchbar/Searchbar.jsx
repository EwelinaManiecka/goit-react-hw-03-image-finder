import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handleImageChange = e => {
    this.setState({ searchImage: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImage.trim() === '') {
      return alert('Please, enter image name.');
    }

    this.props.onSubmit(this.state.searchImage);
    this.setState({ searchImage: '' });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.SearchForm__button}>
            <FcSearch size={25} />
            <span className={style.SearchForm__button__label}>Search</span>
          </button>
          <input
            className={style.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            id="searchInput"
            name="image"
            value={this.state.searchImage}
            onChange={this.handleImageChange}
          ></input>
        </form>
      </header>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  searchImage: PropTypes.func,
};

export default Searchbar;
