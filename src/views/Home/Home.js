import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
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
              <FontAwesomeIcon icon={faCoffee} />
              <h2>Feature Name</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure architecto exercitationem facere nesciunt beatae omnis quibusdam eligendi voluptas iusto alias quod, quo, ullam </p>
            </aside>
            <aside className="feature">
              <FontAwesomeIcon icon={faCoffee} />
              <h2>Feature Name</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure architecto exercitationem facere nesciunt beatae omnis quibusdam eligendi voluptas iusto alias quod, quo, ullam </p>
            </aside>
            <aside className="feature">
              <FontAwesomeIcon icon={faCoffee} />
              <h2>Feature Name</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure architecto exercitationem facere nesciunt beatae omnis quibusdam eligendi voluptas iusto alias quod, quo, ullam </p>
            </aside>
          </div>
        </section>
        <section className="ctas">
          <div className="feature-container">
            <aside className="cta">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem natus voluptates cupiditate autem itaque quas tempora pariatur, distinctio, nostrum earum maiores repellendus illo ipsa est cumque nulla placeat reprehenderit veritatis.</p>
              <button type="button">
                <Link to="/coins">View coins</Link>  
              </button>              
            </aside>
            <aside className="cta">
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem natus voluptates cupiditate autem itaque quas tempora pariatur, distinctio, nostrum earum maiores repellendus illo ipsa est cumque nulla placeat reprehenderit veritatis.</p>
              <button type="button">
                <Link to="">Sign up</Link>  
              </button>              
            </aside>
          </div>
        </section>
      </div>
    )
  }
}
