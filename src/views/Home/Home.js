import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faIdCardAlt } from '@fortawesome/free-solid-svg-icons'
import { faBtc } from '@fortawesome/free-brands-svg-icons'
import hero from './images/home-hero.jpg'
import freeAccountBG from './images/free-account.jpg'
import signUpBG from './images/sign-up.jpg'
import freeAccountMobile from './images/free-account-mobile.jpg'
import signUpMobile from './images/sign-up-mobile.jpg'
import './Home.css';

export default class Home extends Component {
  state = {
    windowWidth: window.innerWidth
  }

  componentDidMount(){
    document.title = "CryptoPal links and features"
    window.addEventListener( "resize", this.updateWindowWidth );
  }

  updateWindowWidth = () => {
    this.setState({ windowWidth: window.innerWidth })
  }

  render() {
    const heroBG = this.state.windowWidth < 768
                    ? `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${hero}) center center / cover no-repeat`
                    : `url(${hero}) center center / cover no-repeat`
    return (
      <div className="Home">
        <section className="intro" style={{ background: heroBG }}>
          <div className="container">
            <div className="right-col">
              <h1>CryptoPal is the source for all your crypto information.</h1>
            </div>
          </div>
        </section>
        <section className="features">
          <div className="container">
            <center>
              <h1>Features</h1>
              <p>As cryptocurrency traders, watchers, and holders we need the ability to get all of our information quickly and in one place. This saves us time and money. At Cryptopal, we understand this because we are just as invested in cryptocurrency as you. That is why we developed a solution where you can view information about every coin on the market. From current pricing and historic graph data to up-to-date web information and official social links, we provide you with everything you need to stay informed.</p>
            </center>
          </div>
          <div className="feature-container">
            <aside className="feature">
              <FontAwesomeIcon icon={faIdCardAlt} />
              <h2>Personalized Dashboard</h2>
              <p>Add your favorite cryptocurrencies to your personalized dashboard so you can track all your assets in one easy-to-manage area.</p>
            </aside>
            <aside className="feature">
              <FontAwesomeIcon icon={faBtc} />
              <h2>2500+ Cryptocurrencies</h2>
              <p>CryptoPal currently tracks over 2500 different cryptocurrencies, so you can be sure you will find any currency you are looking for from the most popular down to many you have likely never heard of.</p>
            </aside>
            <aside className="feature">
              <FontAwesomeIcon icon={faChartLine} />
              <h2>Real-time Price Graphs</h2>
              <p>We provide real-time price history graphs for every coin we track ranging from the last 24 hours to 30 days, so you can track price trends in the market.</p>
            </aside>
          </div>
        </section>
        <section className="ctas">
          <aside className="cta" style={{ background: `url(${signUpBG}) center center / cover no-repeat` }}>
          <img src={signUpMobile} alt="Coin List" className="mobile-only" />
            <div className="container">
              <div className="right-col">
                <header>
                  <h2>Coin List</h2>
                </header>
                <p>View every cryptocurrency you can think of in a easy-to-read list view. You can click on any currency in the list to view more in-depth information about it, including the all-important price history graphs.</p>
                <button className="btn-cta"><Link to="/coins">View coins</Link></button>
              </div>
            </div>
          </aside>
          <aside className="cta" style={{ background: `url(${freeAccountBG}) center center / cover no-repeat` }}>
            <img src={freeAccountMobile} alt="Free Account" className="mobile-only" />
            <div className="container">
              <div className="left-col">
                <header>
                  <h2>Free Account</h2>
                </header>
                <p>Sign up for a free account get extra benefits like being able to personalize your dashboards to contain the only the coins you want to see. When you login, you will be immediately taken to your dashboard where you can see the latest trends about the coins you care about.</p>
                <button className="btn-cta"><Link to="/signup">Sign up</Link></button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    )
  }
}
