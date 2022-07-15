import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://3be1-2a0c-5a81-8300-8800-8dfc-eee7-9ba8-70b0.ngrok.io/'
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