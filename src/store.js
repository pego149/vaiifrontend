import Vue from 'vue'
import Vuex from 'vuex'
import {axiosBase} from './api/axios-base'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
    username: localStorage.getItem('username') || null,
    first_name: localStorage.getItem('first_name') || null,
    last_name: localStorage.getItem('last_name') || null,
    id: localStorage.getItem('id') || null,
    title: localStorage.getItem('title') || null,
    dob: localStorage.getItem('dob') || null,
    address: localStorage.getItem('address') || null,
    country: localStorage.getItem('country') || null,
    city: localStorage.getItem('city') || null,
    zip: localStorage.getItem('zip') || null,
    photo: localStorage.getItem('photo') || null,
    rooms: localStorage.getItem('rooms') || null,
    messagelist: localStorage.getItem('messagelist') || null,
    userlist: localStorage.getItem('userlist') || null,
    APIData: '' // received data from the backend API is stored here.
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null
    },
    loggedInUsername(state) {
      return state.username
    },
    userList(state) {
      return state.userlist
    },
    loggedInId(state) {
      return state.id
    },
  },
  mutations: {
    updateLocalStorage(state, {access, refresh, username, first_name, last_name, id, title, dob, address, country, city, zip, photo}) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      localStorage.setItem('username', username)
      localStorage.setItem('first_name', first_name)
      localStorage.setItem('last_name', last_name)
      localStorage.setItem('id', id)
      localStorage.setItem('title', title)
      localStorage.setItem('dob', dob)
      localStorage.setItem('address', address)
      localStorage.setItem('country', country)
      localStorage.setItem('city', city)
      localStorage.setItem('zip', zip)
      localStorage.setItem('photo', photo)
      state.accessToken = access
      state.refreshToken = refresh
      state.username = username
      state.first_name = first_name
      state.last_name = last_name
      state.id = id
      state.title = title
      state.dob = dob
      state.address = address
      state.country = country
      state.city = city
      state.zip = zip
      state.photo = photo
    },
    updateAccess(state, access) {
      state.accessToken = access
    },
    destroyToken(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    updateArrayOfRooms(state, rooms) {
      localStorage.setItem('rooms', rooms)
      state.rooms = rooms
    },
    updateArrayOfMessagesList(state, messagelist) {
      localStorage.setItem('messagelist', messagelist)
      state.messagelist = messagelist
    },
    updateArrayOfUsers(state, userlist) {
      localStorage.setItem('userlist', userlist)
      state.userlist = userlist
    }
  },
  actions: {
    // run the below action to get a new access token on expiration
    refreshToken(context) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/token/refresh/', {
          refresh: context.state.refreshToken
        }) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            console.log('New access successfully generated')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    },
    registerUser(context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/users/', data, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'image/png'
          }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logoutUser(context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {
          axiosBase.get('api/logout/')
            .then(() => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('username');
              localStorage.removeItem('first_name');
              localStorage.removeItem('last_name');
              localStorage.removeItem('id');
              localStorage.removeItem('title');
              localStorage.removeItem('dob');
              localStorage.removeItem('address');
              localStorage.removeItem('country');
              localStorage.removeItem('city');
              localStorage.removeItem('zip');
              localStorage.removeItem('photo');
              localStorage.removeItem('messagelist');
              context.commit('destroyToken');
            })
            .catch(err => {
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('username');
              localStorage.removeItem('first_name');
              localStorage.removeItem('last_name');
              localStorage.removeItem('id');
              localStorage.removeItem('title');
              localStorage.removeItem('dob');
              localStorage.removeItem('address');
              localStorage.removeItem('country');
              localStorage.removeItem('city');
              localStorage.removeItem('zip');
              localStorage.removeItem('photo');
              localStorage.removeItem('messagelist');
              context.commit('destroyToken');
              resolve(err)
            })
        })
      }
    },
    loginUser(context, credentials) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/token/', {
          username: credentials.username,
          password: credentials.password
        })
          //if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', {
              access: response.data.access,
              refresh: response.data.refresh,
              username: response.data.username,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              id: response.data.id,
              title: response.data.title,
              dob: response.data.dob,
              address: response.data.address,
              country: response.data.country,
              city: response.data.city,
              zip: response.data.zip,
              photo: response.data.photo,
            })
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    loadRooms(context) {
      return new Promise((resolve, reject) => {
        axiosBase.get('/api/miestnosti/')
          //if successful update local storage:
          .then(response => {
            context.commit('updateArrayOfRooms', response.data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    loadMessageList(context) {
      return new Promise((resolve, reject) => {
        axiosBase.get('/api/messageslist/' + context.state.id)
          //if successful update local storage:
          .then(response => {
            context.commit('updateArrayOfMessagesList', response.data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    loadUsersList(context) {
      return new Promise((resolve, reject) => {
        axiosBase.get('/api/users/')
          //if successful update local storage:
          .then(response => {
            context.commit('updateArrayOfUsers', response.data)
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  }
})
