import { create } from 'zustand'
import axios from '@/lib/axios.ts'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'
import { User, UserAuthData, Error } from '@/types/storeType'

const BASE_URL =
	import.meta.env.MODE === 'development' ? 'http://localhost:4444' : '/'

interface AuthState {
	authUser: User | null
	socket: any | null
	isSigningUp: boolean
	isLoggingIn: boolean
	isUpdatingProfile: boolean
	isCheckingAuth: boolean
	onlineUsers: User[]
}

interface AuthActions {
	AuthMe: () => Promise<void>
	signup: (data: UserAuthData) => Promise<void>
	login: (data: UserAuthData) => Promise<void>
	logout: () => Promise<void>
	updateProfile: (data: UserAuthData) => Promise<void>
	connectSocket: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
	authUser: null,
	isSigningUp: false,
	isLoggingIn: false,
	isUpdatingProfile: false,
	isCheckingAuth: true,
	socket: null,
	onlineUsers: [],

	AuthMe: async () => {
		try {
			const res = await axios.get('/user')
			set({ authUser: res.data })
			get().connectSocket()
		} catch (error: Error) {
			set({ authUser: null })
		} finally {
			set({ isCheckingAuth: false })
		}
	},

	signup: async data => {
		set({ isSigningUp: true })
		try {
			const res = await axios.post('/auth/signup', data)
			set({ authUser: res.data })
			if ('token' in res.data) {
				window.localStorage.setItem('token', res.data.token)
			}
			get().connectSocket()
			toast.success('Аккаунт успешно создан')
		} catch (error: Error) {
			toast.error(
				error.response.data.message || 'Не удалось зарегистрироваться'
			)
		} finally {
			set({ isSigningUp: false })
		}
	},

	login: async data => {
		set({ isLoggingIn: true })
		try {
			const res = await axios.post('/auth/login', data)
			set({ authUser: res.data })
			if ('token' in res.data) {
				window.localStorage.setItem('token', res.data.token)
			}
			get().connectSocket()
			toast.success('Вы вошли в аккаунт')
		} catch (error: Error) {
			toast.error(error.response.data.message || 'Не удалось авторизоваться')
		} finally {
			set({ isLoggingIn: false })
		}
	},

	logout: async () => {
		try {
			set({ authUser: null })
			toast.success('Вы вышли из аккаунта')
		} catch (error: Error) {
			toast.error(
				error.response?.data?.message ||
					'Произошла ошибка при выходе из аккаунта'
			)
		}
	},

	updateProfile: async data => {
		set({ isUpdatingProfile: true })
		try {
			const res = await axios.patch('/user/update', data)
			set({ authUser: res.data.userData })
			toast.success('Профиль обновлен')
		} catch (error: Error) {
			console.log('error in update profile:', error)
			toast.error(
				error.response?.data?.message ||
					'Произошла ошибка при обновлении профиля'
			)
		} finally {
			set({ isUpdatingProfile: false })
		}
	},

	connectSocket: () => {
		const { authUser } = get()
		if (!authUser || get().socket?.connected) return

		const socket = io(BASE_URL, {
			query: {
				userId: authUser._id,
			},
		})
		socket.connect()
		set({ socket: socket })

		socket.on('getOnlineUsers', userIds => {
			set({ onlineUsers: userIds })
		})
	},
	disconnectSocket: () => {
		if (get().socket?.connected) get().socket.disconnect()
	},
}))
