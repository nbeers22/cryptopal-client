import React, { Component } from 'react'
import Coin from '../Coin/Coin.js'
import config from '../../config.js'
import './CoinList.css'

export default class CoinList extends Component {
  constructor(props){
    super(props);
    this.state = {
      coins: []
    }
  }
  
  componentDidMount(){
    const url = `${config.API_URL}/coins`;
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
          <div className="rTable">
            <div className="rTableHeading">
              <div className="rTableHead">
                Name (Symbol)
              </div>
              <div className="rTableHead">
                Price
              </div>
              <div className="rTableHead">
                Change (24hr)
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
