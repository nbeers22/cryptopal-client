import React, { Component } from 'react'
import config from '../../config.js'
import Favorite from '../Favorite/Favorite.js';
import './FavoriteList.css'

export default class FavoriteList extends Component {

  constructor(props){
    super(props);
    this.state = {
      favorites: []
    }
  }

  componentDidMount(){
    const { favorites } = this.props;
    this.fetchFavoritesData(favorites);
  }

  componentWillReceiveProps(props){
    const { favorites } = props;
    this.fetchFavoritesData(favorites);
  }

  fetchFavoritesData(favorites){
    const favoriteIDs = favorites.join(",");
    const urls = [
      `${config.API_URL}/coins/${favoriteIDs}`,
      `${config.API_URL}/coins/${favoriteIDs}/market`
    ];
    Promise.all(urls.map(url => fetch(url)))
      .then(responses => Promise.all(
        responses.map(response => response.json())
      ))
      .then(data => {
        const keys = Object.keys(data[0].data)
        const favorites = keys.map( key => {
          return {
            ...data[0].data[key],
            ...data[1].data[key],
          }
        });
        this.setState({
          favorites
        })
      })
  }

  removeFavorite = (coinID, authToken) => {
    
    const url = `${config.API_URL}/users/favorites`
    fetch(url,{
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ coinID })
    })
    .then( response => {
      if(response.ok){
        this.props.getUserFavorites();
      }
    })
  }

  render() {
    const favs = this.state.favorites.map( (fav,index) => {
      let decimalPlaces = fav.quote.USD.price >= .01 ? 2 : 4;
  
      return <Favorite
        key={index}
        rank={fav.cmc_rank}
        logo={fav.logo}
        name={`${fav.name} (${fav.symbol})`}
        price={+fav.quote.USD.price.toFixed(decimalPlaces)}
        change24hr={fav.quote.USD.percent_change_24h.toFixed(2)}
        id={fav.id}
        marketCap={fav.quote.USD.market_cap.toFixed(2)}
        removeFavorite={this.removeFavorite}
        slug={fav.slug}
      />
    });
    return (
      <div className="FavoriteList">
        { favs }
      </div>
    )
  }
}
