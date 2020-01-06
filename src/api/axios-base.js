import axios from 'axios'
const APIUrl = 'http://pego149.pythonanywhere.com/'

const axiosBase = axios.create({
  baseURL: APIUrl,
  headers: { 'content-type': 'application/json' }
})
export { axiosBase }
