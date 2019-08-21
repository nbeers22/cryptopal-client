import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReddit } from '@fortawesome/free-brands-svg-icons'
import PriceGraph from '../PriceGraph/PriceGraph.js'
import Converter from '../Converter/Converter.js'
import RedditFeedEntry from '../RedditFeedEntry/RedditFeedEntry.js';
import CoinLinksTable from '../CoinLinksTable/CoinLinksTable.js';
import CoinDataStats from '../CoinDataStats/CoinDataStats.js';
import config from '../../config.js'
import loader from '../../images/loading.gif'
import './CoinData.css'
import Trophy from './Trophy.js';

class CoinData extends Component {
  _isMounted = false;

  constructor(props){
    super(props);
    this.coinID = this.props.match.params.coin_id;
    this.state = {
      coinData: {
        [this.coinID]: {
          name: "",
          urls: {
            website: "",
            technical_doc: "",
            twitter: "",
            reddit: "",
            message_board: "",
            explorer: [],
            source_code: "",
            chat: [],
            announcement: []
          },
          logo: "",
          symbol: "",
          slug: "",
          description: "",
          tags: []
        }
      },
      coinMarket: {
        [this.coinID]: {
          cmc_rank: null,
          max_supply: null,
          total_supply: null,
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
          }
        }
      },
      redditFeed: [],
      loadingFeed: true
    }
  }
  
  componentDidMount(){
    this._isMounted = true;
    const urls = [
      `${config.API_URL}/coins/${this.coinID}`,
      `${config.API_URL}/coins/${this.coinID}/market`
    ];
    Promise.all(urls.map(url => fetch(url)))
      .then(responses => Promise.all(
        responses.map(response => response.json())
      ))
      .then(data => {
        if(this._isMounted){
          this.setState({
            coinData: data[0].data,
            coinMarket: data[1].data
          }, () => {
            if(this.state.coinData[this.coinID].urls.reddit[0]){
              const redditSlug = this.state.coinData[this.coinID].urls.reddit[0].split("/r/")[1]
              this.getRedditFeed(redditSlug)
            }
          })
        }
      })
  }

  getRedditFeed(slug){
    const url = `${config.API_URL}/coins/${slug}/redditFeed`
    fetch(url)
    .then( response => {
      return response.json()
    })
    .then(resJSON => {
      this.setState({
        redditFeed: resJSON
      }, this.setState({ loadingFeed: false }))
    })
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  currencyFormat(num){
    return num && '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const { name, urls, logo, symbol, slug, description } = this.state.coinData[this.coinID];
    const { cmc_rank, quote } = this.state.coinMarket[this.coinID];
    let redditHeader = urls.reddit[0];
    const redditFeed = this.state.redditFeed.map( (entry,i) => (
      <RedditFeedEntry
        title={entry.title}
        date={entry.date}
        link={entry.link}
        key={i}
      />
    ))
    
    return (
      <div className="CoinData">
        <section className="CoinData-hero">
          <div className="container">
            <img src={logo} alt=""/>
            <h1>{`${name} (${symbol})`}</h1>
            <p><span className="rank">{cmc_rank <= 3 && <Trophy rank={cmc_rank} />} {`Rank #${cmc_rank}`}</span></p>
            <h2>{ this.currencyFormat(quote.USD.price) }</h2>
            <p className="description">{description}</p>
          </div>
        </section>
        <CoinDataStats
          prices={quote.USD}
        />
        <section className="price-history">
          <div className="container">
            <center><h2>Price History</h2></center>
            <PriceGraph slug={slug} />
          </div>
        </section>

        <Converter 
          symbol={symbol}
          valueUSD={quote.USD.price}
        />

        <section className="CoinData-info">
          <div className="container">
            <CoinLinksTable
              urls={urls}
              name={name}
            />
            <aside className="reddit-feed-container">

              {
                !this.state.loadingFeed
                  ? <div className="reddit-feed">
                      <header>
                        <FontAwesomeIcon icon={faReddit} />
                        <h4>Feed from { typeof redditHeader === "string" && redditHeader.split("com/")[1] }</h4>
                      </header>
                      <div className="feed-data">
                        { redditFeed }
                      </div>
                    </div>
                  : <img src={loader} alt="Loading Reddit Feed" /> 
              }
              
            </aside>
          </div>
        </section>
      </div>
    )
  }
}

export default withRouter(CoinData);