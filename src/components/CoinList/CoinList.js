import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Coin from '../Coin/Coin.js'
import config from '../../config.js'
import TokenService from '../../services/token-service.js'
import './CoinList.css'

export default class CoinList extends Component {
  constructor(props){
    super(props);
    this.state = {
      coins: [],
      favorites: [],
      loggedIn: false,
    }
  }
  
  componentDidMount(){
    // Check if a user is logged in
    if(TokenService.getAuthToken()){
      this.setState({ loggedIn: true })
    }
    // Get user's favorites
    this.getUserFavorites()
    // Get list of all coins
    const url = `${config.API_URL}/coins`;
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response.statusText)
    })
    .then( responseJson => {
      let queryString = ""
      responseJson.data.forEach( (coin, index) => {
        index === responseJson.data.length - 1
          ? queryString += `${coin.id}`
          : queryString += `${coin.id},`
      })
      // Get the icons for each coin and merge with coinData object
      this.fetchIcons(queryString)
        .then(logosJson => {
          const dataWithLogos = responseJson.data.map( coinData => {
            return {
              ...coinData,
              logo: logosJson.data[coinData.id].logo
            }
          })
          this.setState({
            coins: dataWithLogos
          })
        })
    })
    .catch( error => console.log(error))
  }

  async fetchIcons(coins){
    const url = `${config.API_URL}/coins/${coins}`
    const res = await fetch(url);
    return await res.json();
  }

  addToFavorites = coinID => {
    const url = `${config.API_URL}/users/favorites`;
    const authToken = TokenService.getAuthToken();

    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ coinID })
    })
    .then( response => {
      if(response.ok){
        this.getUserFavorites();
      }else{
        alert("An error occurred when adding to favorites. Please try again.")
      }
    })
  }

  getUserFavorites = () => {
    const userID = TokenService.getAuthUserID();
    const url = `${config.API_URL}/users/${userID}/favorites`;

    fetch(url)
    .then( response => {
      return response.ok && response.json()
    })
    .then( data => {
      if(data){
        if(data.favorites !== null){
          this.setState({
            favorites: data.favorites
          })
        }
      }
    })
  }

  render() {
    const coins = this.state.coins.map( coin => (
      <Coin
        name={coin.name}
        logo={coin.logo}
        id={coin.id}
        key={coin.id}
        symbol={coin.symbol}
        price={coin.quote.USD.price}
        marketCap={coin.quote.USD.market_cap}
        percentChangeDay={coin.quote.USD.percent_change_24h}
        percentChangeHour={coin.quote.USD.percent_change_1h} 
        percentChangeSevenDays={coin.quote.USD.percent_change_7d}
        favIcon={<FontAwesomeIcon icon={faStar} onClick={() => this.addToFavorites(coin.id)} />}
        favoritesList={this.state.favorites}
      />
    ));

    return (
      <section className="Coinlist">
        <div className="container">
          <div className="rTable">
            <div className="rTableHeading">
              {
                this.state.loggedIn &&
                  <div className="rTableHead">
                    Add Fav
                  </div>
              }
              <div className="rTableHead">
                Name (Symbol)
              </div>
              <div className="rTableHead">
                Price
              </div>
              <div className="rTableHead">
                1hr
              </div>
              <div className="rTableHead">
                24hr
              </div>
              <div className="rTableHead">
                7d
              </div>
              <div className="rTableHead">
                Market Cap
              </div>
            </div>
            <div className="rTableBody">
              {coins}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
