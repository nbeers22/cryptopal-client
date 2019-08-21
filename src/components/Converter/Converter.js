import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import './Converter.css'

export default class Converter extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      symbol: '',
      valueUSD: null
    }
  }

  componentWillReceiveProps(props){
    const { symbol, valueUSD } = props

    this.setState({
      symbol,
      valueUSD
    })
  }

  convertToUSD = event => {
    const { value } = event.target;
    const convertedValue = value * this.state.valueUSD;
    const totalUSD = value ? convertedValue.toFixed(2) : ""

    document.getElementById('currency-input').value = totalUSD;
  }
  
  convertToCoin = event => {
    const { value } = event.target;
    const convertedValue = value / this.state.valueUSD;
    const totalCoins = value ? convertedValue : ""

    document.getElementById('coin-input').value = totalCoins;
  }

  render() {
    const { symbol } = this.state;

    return (
      <section className="Converter">
        <form>
          <div className="Converter-block">
            <label htmlFor="coin-input">{ symbol }</label>
            <input id="coin-input" type="number" onChange={this.convertToUSD} />
          </div>
          <div className="Converter-block" style={{ alignItems: "center" }}>
            <span className="hide-mobile"><FontAwesomeIcon icon={faArrowsAltH} /></span>
            <span className="show-mobile"><FontAwesomeIcon icon={faArrowsAltV} /></span>
          </div>
          <div className="Converter-block">
            <label htmlFor="currency-input">USD</label>
            <input id="currency-input" type="number" onChange={this.convertToCoin} />
          </div>
        </form>
      </section>
    )
  }
}
