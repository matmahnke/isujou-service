import Axios from 'axios'

const Api = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-type': 'application/json'
    }
  }
  return Axios.create(defaultOptions)
}
export default Api()