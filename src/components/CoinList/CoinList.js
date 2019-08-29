import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
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
      currentPage: 1,
      currentSort: 'market_cap',
      currentSortText: "Market Cap",
      currentSortRange: "100"
    }
  }
  
  componentDidMount(){
    // set doc title
    document.title = "List of top 100 coins by Market Cap";
    // Check if a user is logged in
    if(TokenService.getAuthToken()){
      this.setState({ loggedIn: true }, () => {
        // Get user's favorites if logged in
        this.getUserFavorites()
      })
    }
    // Get list of all coins
    this.getCoins()
  }

  getCoins(start = 1, limit = 100){
    const url = `${config.API_URL}/coins?start=${start}&limit=${limit}&sort=${this.state.currentSort}`;
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

  changeActiveSort(button){
    // remove active-sort class from table heads
    const activeHeading = document.getElementsByClassName('active-sort')[0]
    activeHeading.classList.remove('active-sort')
    // remove .caretDown from current sorted element
    document.getElementsByClassName('caretDown')[0].remove()
    // add .active-sort to button's parent
    button.parentElement.classList.add('active-sort')
    // add arrow down to button text
    this.setState({
      currentSortText: button.innerText,
      currentSortRange: '100'
    })
    button.innerHTML = `${button.innerText} <span class="caretDown">&#9660;</span>`
  }

  handleChangeSort = (target,sortBy) => {
    this.setState({
      currentSort: sortBy,
      currentPage: 1
    }, () => {
      this.getCoins()
      setTimeout( () => {
        this.changeActiveSort(target)
      },500)
    })
  }

  scrolltoTop(){
    window.scrollTo(0,0);
  }

  handlePagination = (direction) => {
    const currentPage = direction === "up" 
                        ? this.state.currentPage + 1
                        : this.state.currentPage - 1 
    this.scrolltoTop()
    this.setState({
      currentPage
    }, () => {
      const limit = this.state.currentPage * 100
      const start = limit - 99
      this.getCoins(start)
      const range = this.state.currentPage === 1 ? "100" : `${start} - ${limit}`
      this.setState({
        currentSortRange: range
      })
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
        loggedIn={this.state.loggedIn}
      />
    ));

    const { currentPage, currentSortText, currentSortRange } = this.state;

    return (
      <section className="Coinlist">
        <div className="container">
          <center><h1>Top { currentSortRange } Coins by { currentSortText }</h1></center>
          <div className="table-container">
          
            <div className="rTable">
              <div className="rTableHeading">
                {
                  this.state.loggedIn &&
                    <div className="rTableHead" role="columnheader">
                      Favorite
                    </div>
                }
                <div className="rTableHead" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'name')}
                    aria-label="Sort by name">Name (Symbol)
                  </button>
                </div>
                <div className="rTableHead" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'price')}
                    aria-label="Sort by price">Price
                  </button>
                </div>
                <div className="rTableHead" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'percent_change_1h')}
                    aria-label="Sort by Percent Change 1 hour">1hr
                  </button>
                </div>
                <div className="rTableHead" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'percent_change_24h')}
                    aria-label="Sort by Percent Change 24 hours">24hr
                  </button>
                </div>
                <div className="rTableHead" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'percent_change_7d')}
                    aria-label="Sort by Percent Change 7 days">7d
                  </button>
                </div>
                <div className="rTableHead active-sort" role="columnheader">
                  <button
                    className="btn-sort"
                    onClick={(e) => this.handleChangeSort(e.target,'market_cap')}
                    aria-label="Sort by market cap">Market Cap <span className="caretDown">&#9660;</span>
                  </button>
                </div>
              </div>
              <div className="rTableBody">
                {coins}
              </div>
            </div>
            </div>

          <div className="paginate-links">
              { currentPage !== 1 
                && <button className="btn-cta" onClick={() => this.handlePagination("down")}><FontAwesomeIcon icon={faLongArrowAltLeft} /> Previous 100</button>
              }
              <button className="btn-cta" onClick={() => this.handlePagination("up")}>Next 100 <FontAwesomeIcon icon={faLongArrowAltRight} /></button>
          </div>
        </div>
      </section>
    )
  }
}
