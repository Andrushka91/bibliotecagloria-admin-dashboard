import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://e871-2a0c-5a81-8103-5e00-305e-49a-f44d-754c.ngrok.io'
})

instance.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem('token')
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance