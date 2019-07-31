import config from '../config'

const TokenService = {
  saveAuthData(data) {
    window.sessionStorage.setItem(config.TOKEN_KEY, data.authToken)
    window.sessionStorage.setItem("user_id", data.user_id)
    window.sessionStorage.setItem("name", data.name)
    window.sessionStorage.setItem("gravatar", data.gravatar)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  getAuthName() {
    return window.sessionStorage.getItem("name")
  },
  getAuthUserID() {
    return window.sessionStorage.getItem("user_id")
  },
  getAuthGravatar() {
    return window.sessionStorage.getItem("gravatar")
  },
  clearAuthData() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
    window.sessionStorage.removeItem("user_id")
    window.sessionStorage.removeItem("gravatar")
    window.sessionStorage.removeItem("name")
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
}

export default TokenService
