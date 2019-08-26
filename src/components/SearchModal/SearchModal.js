import React, { Component } from 'react';
import SearchCoins from '../SearchCoins/SearchCoins.js';
import './SearchModal.css';

export default class SearchModal extends Component {

  render() {
    return (
      <div className={"SearchModal" + this.props.class} aria-modal="true" aria-labelledby="Search Modal" tabIndex="-1">
        <div className="md-content">
          <SearchCoins addFavorite={this.props.addFavorite} />
          <button
            className="close-button"
            onClick={this.props.closeModal}
            aria-label="Close Modal">X
          </button>
        </div>
      </div>
    )
  }
}
