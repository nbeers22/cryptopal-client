import config from '../config'

const TokenService = {
  saveAuthData(data) {
    window.localStorage.setItem(config.TOKEN_KEY, data.authToken)
    window.localStorage.setItem("user_id", data.user_id)
    window.localStorage.setItem("name", data.name)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
}

export default TokenService
