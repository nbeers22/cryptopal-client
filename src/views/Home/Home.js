import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faIdCardAlt } from '@fortawesome/free-solid-svg-icons'
import { faBtc } from '@fortawesome/free-brands-svg-icons'
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <section className="intro">
          <div className="container">
          <h1>CryptoPal</h1>
          <p className="intro-subhead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, fugiat! Commodi, blanditiis ipsa provident illum consectetur explicabo repudiandae molestias consequuntur quos, dicta cumque necessitatibus sint labore unde illo pariatur tempore?</p>
          <p className="intro-subhead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa illum consectetur explicabo repudiandae molestias consequuntur quos, dicta cumque necessitatibus sint labore unde illo pariatur tempore?</p>
          </div>
        </section>
        <section className="features">
          <div className="feature-container">
            <aside className="feature">
              <FontAwesomeIcon icon={faIdCardAlt} />
              <h2>Personalized Dashboard</h2>
              <p>Add your favorite cryptocurrencies to your personalized dashboard so you can track all your assets in one easy-to-manage area.</p>
            </aside>
            <aside className="feature">
              <FontAwesomeIcon icon={faBtc} />
              <h2>2500+ Cryptocurrencies Tracked</h2>
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
          <div className="feature-container">
            <aside className="cta">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem natus voluptates cupiditate autem itaque quas tempora pariatur, distinctio, nostrum earum maiores repellendus illo ipsa est cumque nulla placeat reprehenderit veritatis.</p>
              <Link to="/coins" className="btn-cta">View coins</Link>  
            </aside>
            <aside className="cta">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem natus voluptates cupiditate autem itaque quas tempora pariatur, distinctio, nostrum earum maiores repellendus illo ipsa est cumque nulla placeat reprehenderit veritatis.</p>
              <Link to="/signup" className="btn-cta">Sign up</Link>  
            </aside>
          </div>
        </section>
      </div>
    )
  }
}
