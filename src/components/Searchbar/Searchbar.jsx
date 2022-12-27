import { Component } from 'react';

import style from './Searchbar.modal.css';

class Searchbar extends Component {
  state = {
    searchImage: '',
  };

  handleImageChange = e => {
    this.setState({ searchImage: e.currentTarget.value.toLowerCase() });
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

export default Searchbar;
