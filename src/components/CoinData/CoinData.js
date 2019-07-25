import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'
import config from '../../config.js'
import './CoinData.css'

class CoinData extends Component {
  state = {
    coinData: {
      1: {
        name: "",
        urls: {
          website: "",
          technical_doc: "",
          twitter: "",
          reddit: "",
          message_board: "",
          explorer: [],
          source_code: ""
        },
        logo: "",
        symbol: "",
        description: "",
        tags: []
      }
    },
    coinMarket: {
      1: {
        cmc_rank: null,
        max_supply: null,
        circulating_supply: null,
        quote: {
          USD: {
            market_cap: null,
            percent_change_1h: null,
            percent_change_24h: null,
            percent_change_7d: null,
            price: null,
            volume_24h: null
          }
        },
        
      }
    }
  }
  
  componentDidMount(){
    const coinID = this.props.match.params.coin_id;
    const urls = [
      `${config.API_URL}/coins/${coinID}`,
      `${config.API_URL}/coins/${coinID}/market`
    ];
    Promise.all(urls.map(url => fetch(url)))
      .then(responses => Promise.all(
        responses.map(response => response.json())
      ))
      .then(data => {
        this.setState({
          coinData: data[0].data,
          coinMarket: data[1].data
        })
      })
  }

  render() {
    const { name, urls, logo, symbol, description, tags } = this.state.coinData[1];
    const { cmc_rank, max_supply, quote } = this.state.coinMarket[1];
    console.log(this.state.coinMarket[1])
    return (
      
      <div className="CoinData">
        <div className="container">
          <section className="CoinData-hero">
            <img src={logo} alt=""/>
            <h1>{name}</h1>
            <p>{`Rank #${cmc_rank}`}</p>
            <p className="description">{description}</p>
          </section>
          <section className="CoinData-info">
            <div className="container">
              <aside className="coin-links">
                <h3>Links</h3>
                <p><a href={urls.website} target="_blank">Website</a></p>
                <ul>
                  <li><a href={urls.reddit} target="_blank"><FontAwesomeIcon icon={faReddit} /></a></li>
                  <li><a href={urls.twitter} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
                </ul>
                <p><a href={urls.website}>Website</a></p>
                <p><a href={urls.website}>Website</a></p>
                <p><a href={urls.website}>Website</a></p>
              </aside>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(CoinData);