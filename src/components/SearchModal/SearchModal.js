import React, { Component } from 'react';
import SearchCoins from '../SearchCoins/SearchCoins.js';
import './SearchModal.css';

export default class SearchModal extends Component {
  render() {
    return (
      <div className="SearchModal">
        <SearchCoins addFavorite={this.props.addFavorite} />
        <button
          className="close-button"
          onClick={this.props.closeModal}>X
        </button>
      </div>
    )
  }
}
