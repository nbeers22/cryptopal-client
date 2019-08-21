import React, { Component } from 'react'
import './CoinDataStats.css'

export default class CoinDataStats extends Component {
  state = {
    market_cap: 0,
    percent_change_1h: 0,
    percent_change_24h: 0,
    percent_change_7d: 0,
    volume_24h: 0
  }

  componentWillReceiveProps(props){
    this.setState({ ...props.prices })
  }

  currencyFormat(num){
    return num && '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  percentClass(percent){
    return percent > 0 ? 'green' : 'red';
  }

  render() {
    const { 
      market_cap,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
      volume_24h
    } = this.state

    return (
      <section className="CoinData-stats">
      <div className="container">
        <div className="stats-table">
          <aside>
            <p><strong>Market Cap</strong></p>
            { this.currencyFormat(market_cap) }
          </aside>
          <aside>
            <p><strong>Change 1hr</strong></p>
            <span className={this.percentClass(percent_change_1h)}>{ percent_change_1h.toFixed(2) + '%' }</span>
          </aside>
          <aside>
            <p><strong>Change 24hr</strong></p>
            <span className={this.percentClass(percent_change_24h)}>{ percent_change_24h.toFixed(2) + '%' }</span>
          </aside>
          <aside>
            <p><strong>Change 7d</strong></p>
            <span className={this.percentClass(percent_change_7d)}>{ percent_change_7d.toFixed(2) + '%' }</span>
          </aside>
          <aside>
            <p><strong>Volume 24hr</strong></p>
            { this.currencyFormat(volume_24h) }
          </aside>
        </div>
      </div>
    </section>
    )
  }
}
