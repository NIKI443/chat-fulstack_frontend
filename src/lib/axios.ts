import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: import.meta.env.BACKEND_URI || 'http://localhost:4444',
	withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
	config.headers.Authorization = window.localStorage.getItem('token')
	return config
})

export default axiosInstance
