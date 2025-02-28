import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '@/lib/axios'
import { User, Chats } from '@/types/storeType'

interface ChatState {
	users: User[]
	filteredUsers: User[]
	selectedUser: Chats | User | null
	isUsersLoading: boolean
	isActiveSidMenu: boolean
	open: boolean
}
interface ChatActions {
	getUsers: () => Promise<void>
	searchUser: (search: string) => Promise<void>
	setSelectedUser: (selectedUser: Chats | User | null) => void
	setOpen: (isOpen: boolean) => void
}

export const useChatStore = create<ChatState & ChatActions>()((set, get) => ({
	users: [],
	filteredUsers: [],
	selectedUser: null,
	isUsersLoading: false,
	isActiveSidMenu: true,
	open: false,

	setOpen: (isOpen: boolean) => set({ open: isOpen }),

	searchUser: async (searchText: string) => {
		set({ isUsersLoading: true })
		const { users } = get()
		let usersFilter
		try {
			if (searchText) {
				usersFilter = await users.filter(user => {
					if (user.UserID.toLowerCase().includes(searchText.toLowerCase())) {
						return user
					}
				})
			}
			set({ filteredUsers: usersFilter })
		} finally {
			set({ isUsersLoading: false })
		}
	},

	getUsers: async () => {
		set({ isUsersLoading: true })
		try {
			const res = await axios.get('/users')

			set({ users: res.data })
		} catch (error: any) {
			toast.error(error.response.data.message)
		} finally {
			set({ isUsersLoading: false })
		}
	},

	setSelectedUser: selectedUser => set({ selectedUser }),
}))
