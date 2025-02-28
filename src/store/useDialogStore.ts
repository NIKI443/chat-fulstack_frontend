import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '@/lib/axios'
import { Message, EndMessages, Chats, User } from '@/types/storeType'
import { useAuthStore } from './useAuthStore'

interface DialogState {
	isChatsLoading: boolean
	isUpdateChatsLoading: boolean
	isNoChats: boolean
	chats: Chats[]
	chatsFiltered: Chats[]
	endMessages: EndMessages[]
}
interface DialogActions {
	createDialog: (UserId: string) => Promise<void>
	getChatsFriend: () => Promise<void>
	searchChat: (searchText: string) => Promise<void>
	updateEndMessages: () => void
}

export const useDialogStore = create<DialogState & DialogActions>()(
	(set, get) => ({
		isChatsLoading: false,
		isUpdateChatsLoading: false,
		endMessages: [],
		chats: [],
		chatsFiltered: [],
		isNoChats: false,

		getChatsFriend: async () => {
			set({ isChatsLoading: true })
			try {
				const { data: chatData } = await axios.get('/dialogue')
				const { data: my } = await axios.get('/user')
				const userPromises = chatData.map(async (chat: Chats) => {
					const { endMessages } = get()
					const newEndMessage = { chat: chat.lastMessage, roomId: chat._id }
					const filteredEndMessages = endMessages.filter(
						msg => msg.roomId !== chat._id
					)
					set({ endMessages: [newEndMessage, ...filteredEndMessages] })
					return Promise.all(
						chat.users.map(async (userId: string) => {
							const response = await axios.get(`/user/${userId}`)
							const { name, surname, ...resData } = response.data
							return {
								...resData,
								fullName: `${name} ${surname || ''}`.trim(),
								roomId: chat._id,
							}
						})
					)
				})

				const usersData = (await Promise.all(userPromises)).flat()
				const usersDataFilter = usersData.filter(
					(chat: User) => chat._id.toString() !== my._id.toString()
				)
				if (!usersDataFilter?.length) {
					set({ isNoChats: true })
				} else {
					set({ isNoChats: false })
				}
				set({ chats: usersDataFilter })
			} catch (error: any) {
				toast.error(error.response?.data?.message || 'Не удалось найти чаты')
				console.log(error)
			} finally {
				set({ isChatsLoading: false })
			}
		},

		createDialog: async (UserId: string) => {
			const { chats } = get()
			const { data: my } = await axios.get('/user')
			const { endMessages } = get()

			set({ isUpdateChatsLoading: true, isNoChats: false })
			try {
				const res = await axios.post('/dialogue', UserId)
				const userPromises = res.data.users.map(async (userId: string) => {
					const response = await axios.get(`/user/${userId}`)
					const { name, surname, ...resData } = response.data
					return {
						...resData,
						fullName: `${name} ${surname || ''}`.trim(),
						roomId: res.data._id,
					}
				})
				const usersData = (await Promise.all(userPromises)).flat()

				const usersDataFilter = usersData.filter(
					(chat: User) => chat._id.toString() !== my._id.toString()
				)
				chats.push(usersDataFilter[0])
				if (!usersDataFilter?.length) {
					set({ isNoChats: true })
				} else {
					set({ isNoChats: false })
				}
				set({
					endMessages: [
						{ chat: res.data.lastMessage, roomId: res.data._id },
						...endMessages,
					],
				})
			} catch (error: any) {
				console.log(error)
				toast.error(error.response?.data?.message || 'Чат уже существует')
			} finally {
				set({ isUpdateChatsLoading: false })
			}
		},

		searchChat: async (searchText?: string) => {
			set({ isUpdateChatsLoading: true })
			const { chats } = get()
			let chatsFilter
			try {
				if (searchText) {
					chatsFilter = await chats.filter(chat => {
						if (chat.fullName.toLowerCase().includes(searchText.toLowerCase()))
							return chat
					})
				}
				set({ chatsFiltered: chatsFilter })
			} finally {
				set({ isUpdateChatsLoading: false })
			}
		},

		updateEndMessages: () => {
			const socket = useAuthStore.getState().socket
			socket.on('lastMessage', (lastMessage: Message) => {
				const { endMessages } = get()
				const endMessagesFiltered = endMessages.map(message => {
					if (message.roomId === lastMessage.roomId) {
						message.chat = {
							...lastMessage,
							imgUrl: lastMessage.image?.url,
						}
					}
					return message
				})
				set({ endMessages: endMessagesFiltered })
			})
		},
	})
)
