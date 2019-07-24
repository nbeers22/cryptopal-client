import React, { Component } from 'react'
import Coin from '../Coin/Coin.js'
import './CoinList.css'

export default class CoinList extends Component {
  constructor(props){
    super(props);
    this.state = {
      coins: []
    }
  }
  
  componentDidMount(){
    const url = "http://localhost:4000";
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response.statusText)
    })
    .then( responseJson => {
      this.setState({
        coins: responseJson.data
      })
    })
    .catch( error => console.log(error))
  }

  render() {
    const coins = this.state.coins.map( coin => (
      <Coin
        name={coin.name}
        key={coin.id}
        symbol={coin.symbol}
        price={coin.quote.USD.price}
        marketCap={coin.quote.USD.market_cap}
        percentChangeDay={coin.quote.USD.percent_change_24h} />
    ));

    return (
      <section className="Coinlist">
        <div className="container">
          <div class="rTable">
            <div class="rTableHeading">
              <div class="rTableHead">
                Name (Symbol)
              </div>
              <div class="rTableHead">
                Price
              </div>
              <div class="rTableHead">
                Change (24hr)
              </div>
              <div class="rTableHead">
                Market Cap
              </div>
            </div>
            <div class="rTableBody">
              {coins}
            </div>
          </div>
        </div>
      </section>
    )
  }
}
