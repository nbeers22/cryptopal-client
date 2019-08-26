import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import SearchModal from '../../components/SearchModal/SearchModal.js';
import TokenService from '../../services/token-service';
import config from '../../config.js';
import sadFace from './images/sadface.png';
import './Dashboard.css';
import FavoriteList from '../../components/FavoriteList/FavoriteList.js';

class Dashboard extends Component {

  constructor(){
    super();
    this.getUserFavorites = this.getUserFavorites.bind(this);
    this.state = {
      loggedIn: true,
      name: '',
      favorites: [],
      modalVisible: false
    }
  }

  componentDidMount(){
    document.title = "Cryptopal User Dashboard"
    this.checkLoggedIn();
    const name = TokenService.getAuthName();
    this.setState({ name }, this.getUserFavorites )
  }
  
  componentWillUnmount(){
    this.state.modalVisible && this.removeModalBackground()
  }

  checkLoggedIn(){
    const token = TokenService.getAuthToken();
    if(!token){
      this.setState({ loggedIn: false })
    }
  }

  showModal = event => {
    event.preventDefault()
    const div = document.createElement("div")
    div.classList.add('modal-open')
    document.body.insertBefore(div, document.body.firstChild);
    div.addEventListener('click',this.hideModal)
    this.setState({ modalVisible: true })
  }
  
  hideModal = () => {
    this.removeModalBackground();
    this.setState({ modalVisible: false })
  }

  removeModalBackground(){
    const div = document.getElementsByClassName('modal-open')[0];
    div.remove();
  }

  addToFavorites = coinID => {
    const url = `${config.API_URL}/users/favorites`;
    const authToken = TokenService.getAuthToken();

    fetch(url,{
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ coinID })
    })
    .then( response => {
      if(response.ok){
        this.getUserFavorites();
      }else{
        return response.json()
      }
    })
    .then(res => {
      if(res){
        if(res.error === "Token Expired"){
          this.props.history.push('/login')
        }
      }
    })
  }

  getUserFavorites = () => {
    const userID = TokenService.getAuthUserID();
    const url = `${config.API_URL}/users/${userID}/favorites`;

    fetch(url)
    .then( response => {
      return response.ok
        ? response.json()
        : alert(response.statusText)
    })
    .then( data => {
      if(data){
        if(data.favorites !== null){
          this.setState({
            favorites: data.favorites
          })
        }
      }
    })
  }

  render() {
    if(!this.state.loggedIn){
      return <Redirect to="/login" />
    }
    const { name, modalVisible, favorites } = this.state;
    const emptyDashboard = 
      <div className="empty">
        <h3>Your dashboard looks empty</h3>
        <p>Why not <a href="/#" onClick={this.showModal} style={{ borderBottom: '1px solid #333' }}>add a coin</a>?</p>
        <img src={sadFace} alt="Dashboard Empty (Sad Face)"/>
      </div>

    return (
      <div className="Dashboard">
        <section className="intro">
          <div className="container">
            <h1>Welcome to your dashboard, {name}</h1>
            <p className="intro-subhead">Here you can keep up with all your favorite coins in one place without having to sift through hundreds of others. Click below if you would like to add favorites to your dashboard.</p>
            {
              favorites.length > 0
                && <button className="btn-cta add-coin-btn" onClick={this.showModal}>Add Favorite</button>
            }
          </div>
        </section>
        <section className="dashboard-favorites">
         <div className="container">
          { !favorites.length
              ? emptyDashboard
              : <FavoriteList
                  favorites={favorites}
                  getUserFavorites={this.getUserFavorites}
                  showModal={this.showModal}
                /> 
          }
         </div>
        </section>

        { modalVisible 
          && <SearchModal
                class={modalVisible ? " open" : undefined}
                closeModal={() => this.hideModal()}
                addFavorite={this.addToFavorites}
              />
        }
      </div>
    )
  }
}

export default withRouter(Dashboard);