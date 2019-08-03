import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SearchModal from '../../components/SearchModal/SearchModal.js';
import TokenService from '../../services/token-service';
import config from '../../config.js';
import sadFace from './images/sadface.png';
import './Dashboard.css';

export default class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      loggedIn: true,
      name: '',
      favorites: [],
      modalVisible: false
    }
  }

  componentDidMount(){
    this.checkLoggedIn();
    const name = TokenService.getAuthName();
    this.setState({ name })
  }

  checkLoggedIn(){
    const token = TokenService.getAuthToken();
    if(!token){
      this.setState({ loggedIn: false },() => console.log('constructor'))
    }
  }

  showModal = () => {
    this.setState({ modalVisible: true })
  }
  
  hideModal = () => {
    this.setState({ modalVisible: false })
  }

  addToFavorites(coinID){
    const url = `${config.API_URL}/users/favorites`;
    const authToken = TokenService.getAuthToken();

    fetch(url,{
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ coinID })
    })
    .then( response => {
      console.log(response)
    })
  }

  

  render() {
    if(!this.state.loggedIn){
      return <Redirect to="/login" />
    }
    const { name, modalVisible, favorites } = this.state;
    const emptyDashboard = 
      <div className="empty">
        <h3>Dashboard much empty</h3>
        <img src={sadFace} alt="Dashboard Empty (Sad Face)"/>
        <p>Why not <a href="#" onClick={this.showModal}>add a coin</a>?</p>
      </div>

    const dashboardFavs = favorites.map( fav => (
      <div className="favorite">
        {fav}
      </div>
    ));

    return (
      <div className="Dashboard">
        <section className="intro">
          <h1>Welcome to your dashboard, {name}</h1>
          <p className="intro-subhead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur provident vero fugiat ratione recusandae libero nemo in fuga nostrum debitis, modi eaque mollitia voluptatibus ad blanditiis dolor perspiciatis inventore quisquam!</p>
        </section>
        <section className="dashboard-favorites">
         { !favorites.length ? emptyDashboard : dashboardFavs }
        </section>
        { modalVisible 
          && <SearchModal
                closeModal={() => this.hideModal()}
                addFavorite={this.addToFavorites}
              />
        }
      </div>
    )
  }
}
