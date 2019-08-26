import React, { Component } from 'react';
import config from '../../config.js';
import plusSignImg from './images/plus-sign.png';

export default class SearchCoins extends Component {

  state = {
    coins: [],
    coinValue: '',
    foundCoins: []
  }

  componentDidMount(){
    // add initial focus to input element
    document.getElementById("search-coins").focus()
    // Get dashboard coins from server
    const url = `${config.API_URL}/coins/dashboard`;
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response.statusText)
    })
    .then( responseJson => {
      if(responseJson)
        this.mapCoinData(responseJson.data)
    })
    .catch( error => alert(error))
  }

  mapCoinData(coins){
    const coinList = coins.map( coin => {
      return {
        id: coin.id,
        name: `${coin.name} (${coin.symbol})`
      }
    });
    this.setState({
      coins: coinList
    })
  }

    // set input value to state, then perform search
  handleCoinSearch = event => {
    const { value } = event.target;
    this.setState({ coinValue: value },
      () => this.searchCoins(this.state.coinValue)
    );
  }

    // filter results by input value
  searchCoins(searchTerm){
    const foundCoins = this.state.coins.filter( coin => {
      return coin.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
    });
    this.setState({ foundCoins });
  }

  // add coin to favorites
  favoriteCoin = event => {
    event.preventDefault();
    const { id } = event.target.dataset;
    this.props.addFavorite(id);
  }

  render() {
      const coinsList = this.state.foundCoins.map( coin => {
        if(this.state.coinValue){
          return(
            <li
              className="found-coin"
              key={coin.id}
            >
              <span className="found-coin-name">{ coin.name }</span>
              <span className="found-coin-fav">
                <button aria-label={`Add ${coin.name} to favorites`}>
                  <img
                    src={plusSignImg}
                    alt="Add to Favorites"
                    onClick={this.favoriteCoin}
                    data-id={coin.id} 
                  />
                </button>
              </span>
            </li>
          )
        }else{
          return "";
        }
      });

    return (
      <div className="SearchCoins">
        <form>
          <label htmlFor="search-coins"><h3>Search Coins</h3></label>
          <input
            id="search-coins"
            type="text"
            placeholder="e.g. bitcoin or btc"
            name="coinValue"
            onChange={this.handleCoinSearch}
          />
          <ul className="coin-list">
            { coinsList }
          </ul>
        </form>
      </div>
    )
  }
}
