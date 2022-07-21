import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://9b9c-2a0c-5a81-8300-8800-d0f4-fa9e-1d79-e860.ngrok.io/'
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