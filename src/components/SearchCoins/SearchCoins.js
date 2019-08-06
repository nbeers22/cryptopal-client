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
    const url = `${config.API_URL}/coins/dashboard`;
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response.statusText)
    })
    .then( responseJson => {
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

  handleCoinSearch = event => {
    const { value } = event.target;
    this.setState({ coinValue: value },
      () => this.searchCoins(this.state.coinValue)
    );
  }

  searchCoins(searchTerm){
    const foundCoins = this.state.coins.filter( coin => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    });
    this.setState({ foundCoins });
  }

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
                <img
                  src={plusSignImg}
                  alt="Add to Favorites"
                  onClick={this.favoriteCoin}
                  data-id={coin.id} 
                />
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
          <label htmlFor="search-coins">Search Coins</label>
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
