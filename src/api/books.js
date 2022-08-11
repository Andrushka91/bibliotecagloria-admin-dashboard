import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://2ceb-2a0c-5a81-8300-8800-ccdb-6433-b19e-3b23.ngrok.io/'
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