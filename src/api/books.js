import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://21d2-2a0c-5a81-8300-8800-79b8-e09c-5f7e-eb55.ngrok.io/'
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