import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltDown, faLongArrowAltUp, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import TokenService from '../../services/token-service.js'
import './Favorite.css'

class Favorite extends Component {

  getClosest(elem, selector) {
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
      if ( elem.matches( selector ) ) return elem;
    }
    return null;
  };

  handleRemoveFavorite = event => {
    event.preventDefault();
    const authToken = TokenService.getAuthToken();
    const parentLink = this.getClosest(event.target,'.removeFav')
    const id = parentLink.dataset.id;
    this.props.removeFavorite(id,authToken);
  }

  render(){

    const { rank, logo, name, price, change24hr, id, marketCap } = this.props;
    let arrow, color;
    if(+change24hr > 0){
      arrow = faLongArrowAltUp
      color = "green"
    }else{
      arrow = faLongArrowAltDown
      color = "red"
    }

    return (
      <div id={`Favorite-${id}`} className="Favorite">
        <div className="Favorite-options">
          <aside className="options-left">
            <Link to={`/coins/${id}`} title={`More information about ${name}`}>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Link>
          </aside>
          <aside className="options-right">
            <Link to="#" onClick={this.handleRemoveFavorite} className="removeFav" data-id={id} title="Remove from favorites"><FontAwesomeIcon icon={faTimesCircle} /></Link>
          </aside>
        </div>
        <Link to={`/coins/${id}`} title={`More information about ${name}`}>
          <img className="Favorite-logo" src={logo} alt={name} />
        </Link>
        <h2>{ name }</h2>
        <h3>${ price }</h3>
        <p className={color}>%{ change24hr } <FontAwesomeIcon icon={arrow} /></p>
      </div>
    )
  }
}

export default Favorite;