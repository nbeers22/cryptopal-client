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
    this.checkLoggedIn();
    const name = TokenService.getAuthName();
    this.setState({ name }, this.getUserFavorites )
  }
  
  componentWillUnmount(){
    this.removeModalBackground();
  }

  checkLoggedIn(){
    const token = TokenService.getAuthToken();
    if(!token){
      this.setState({ loggedIn: false },() => console.log('constructor'))
    }
  }

  showModal = () => {
    const div = document.createElement("div");
    div.classList.add('modal-open')
    document.body.insertBefore(div, document.body.firstChild);
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
      method: 'PATCH',
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
      if(res.error === "Token Expired"){
        this.props.history.push('/login')
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
      if(data.favorites !== null){
        this.setState({
          favorites: data.favorites
        })
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
        <h3>Dashboard much empty</h3>
        <img src={sadFace} alt="Dashboard Empty (Sad Face)"/>
        <p>Why not <a href="#" onClick={this.showModal}>add a coin</a>?</p>
      </div>

    return (
      <div className="Dashboard">
        <section className="intro">
          <h1>Welcome to your dashboard, {name}</h1>
          <p className="intro-subhead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur provident vero fugiat ratione recusandae libero nemo in fuga nostrum debitis, modi eaque mollitia voluptatibus ad blanditiis dolor perspiciatis inventore quisquam!</p>
          {
            favorites.length && <button onClick={this.showModal}>Add Favorite</button>
          }
        </section>
        <section className="dashboard-favorites">
         {  !favorites.length
            ? emptyDashboard
            : <FavoriteList favorites={favorites} getUserFavorites={this.getUserFavorites} /> 
         }
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

export default withRouter(Dashboard);