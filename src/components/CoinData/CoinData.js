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
    }
  }
  
  componentDidMount(){
    const coinID = this.props.match.params.coin_id;
    const url = `${config.API_URL}/coins/${coinID}`;
    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : console.log(response.statusText)
    })
    .then( responseJson => {
      this.setState({
        coinData: responseJson.data
      })
    })
    .catch( error => console.log(error))
  }

  render() {
    const { name, urls, logo, symbol, description, tags  } = this.state.coinData[1];

    return (
      <section className="CoinData">
        <div className="container">
          <section className="CoinData-hero">
            <img src={logo} alt=""/>
            <h1>{name}</h1>
            <p className="description">{description}</p>
          </section>
          <aside className="coin-links">
            <h3>Links</h3>
            <p><a href={urls.website} target="_blank">Website</a></p>
            <ul>
              <li><a href={urls.reddit} target="_blank"><FontAwesomeIcon icon={faReddit} /></a></li>
              <li><a href={urls.reddit} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a></li>
            </ul>
            <p><a href={urls.website}>Website</a></p>
            <p><a href={urls.website}>Website</a></p>
            <p><a href={urls.website}>Website</a></p>
          </aside>
        </div>
      </section>
    )
  }
}

export default withRouter(CoinData);