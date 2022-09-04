import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://5cdf-2a0c-5a81-8304-bc00-98a5-1ffe-186b-1b2a.eu.ngrok.io/'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance