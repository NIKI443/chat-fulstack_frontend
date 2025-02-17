import { create } from 'zustand'
import toast from 'react-hot-toast'
import axios from '@/lib/axios'
import { useChatStore } from './useChatStore'
import { useDialogStore } from './useDialogStore'
import { Message, MessagesImg, Error } from '@/types/storeType'

interface MessageState {
	messages: Message[]
	messagesImg: MessagesImg[]
	isMessagesLoading: boolean
	updatedMessages: Message[]
}

interface MessageActions {
	getMessages: (userId: string) => Promise<void>
	editMessage: (messageId: string, messageData: Message) => Promise<void>
	deleteOfMessage: (messageId: string) => Promise<void>
	sendMessage: (messageData: { content: string }) => Promise<void>
}

export const useMessageStore = create<MessageState & MessageActions>()(
	(set, get) => ({
		messages: [],
		messagesImg: [],
		updatedMessages: [],
		isMessagesLoading: false,

		deleteOfMessage: async messageId => {
			const { messages } = get()
			const endMessages = useDialogStore.getState().endMessages
			const selectedUser = useChatStore.getState().selectedUser

			try {
				const res = await axios.delete(
					`/massage/${messageId}/${selectedUser?._id}`
				)
				if (res.data.success) {
					const updatedMessages = messages.filter(message => {
						if (message._id !== messageId) {
							return message
						}
					})

					const updatedEndMessages = endMessages.map(chatEndMessage => {
						if (
							chatEndMessage.roomId ===
							updatedMessages[updatedMessages.length - 1].roomId
						) {
							const { roomId } = chatEndMessage
							return {
								chat: updatedMessages[updatedMessages.length - 1],
								roomId,
							}
						}
						return chatEndMessage
					})
					useDialogStore.setState({ endMessages: updatedEndMessages })
					set({ messages: updatedMessages })
				}
			} catch (error: Error) {
				toast.error(
					error.response?.data?.message || 'Не удалось удалить сообщение'
				)
			}
		},

		editMessage: async (messageId, messageData) => {
			const selectedUser = useChatStore.getState().selectedUser
			const { messages } = get()
			const endMessages = useDialogStore.getState().endMessages

			try {
				const res = await axios.post(
					`/massage/${messageId}/${selectedUser?._id}`,
					messageData
				)
				const updatedMessagesImg: MessagesImg[] = []

				const updatedMessages = messages.map(message => {
					if (message._id !== messageId && message.image?.url) {
						updatedMessagesImg.push(message)
					}
					if (message._id === messageId) {
						const { text, image, ...dataMessage } = message
						const updatedMessage = {
							...dataMessage,
							text: messageData?.text,
							image: {
								url: messageData?.imgUrl,
								width: messageData?.width,
								height: messageData?.height,
							},
						}
						if (messageData?.imgUrl) {
							updatedMessagesImg.push(updatedMessage)
						}
						return updatedMessage
					}
					return message
				})

				const updatedLastMessage = updatedMessages[updatedMessages.length - 1]
				const updatedEndMessages = endMessages.map(chatEndMessage => {
					if (chatEndMessage.roomId === updatedLastMessage.roomId) {
						const { roomId } = chatEndMessage
						const { image, ...dataLastMessage } = updatedLastMessage
						return {
							chat: {
								...dataLastMessage,
								imgUrl: image?.url,
							},
							roomId,
						}
					}
					return chatEndMessage
				})

				useDialogStore.setState({ endMessages: updatedEndMessages })

				set({ messages: updatedMessages, messagesImg: updatedMessagesImg })
			} catch (error: Error) {
				toast.error(
					error.response?.data?.message || 'Не удалось изменить сообщение'
				)
			}
		},

		getMessages: async roomId => {
			set({ isMessagesLoading: true })
			try {
				const res = await axios.get(`/massage/${roomId}`)
				const messagesImage = res.data.filter(
					(message: MessagesImg) => message.image?.url
				)
				set({ messages: res.data, messagesImg: messagesImage })
			} catch (error: Error) {
				toast.error(error.response.data.message)
			} finally {
				set({ isMessagesLoading: false })
			}
		},

		sendMessage: async messageData => {
			const { messages, messagesImg } = get()
			const selectedUser = useChatStore.getState().selectedUser
			const endMessages = useDialogStore.getState().endMessages

			try {
				const res = await axios.post(
					`/massage/${selectedUser?.roomId}/${selectedUser?._id}`,
					messageData
				)
				const endMessagesFiltered = endMessages.map(message => {
					if (message.roomId === res.data.roomId) {
						message.chat = res.data
					}
					return message
				})
				useDialogStore.setState({ endMessages: endMessagesFiltered })

				if (res.data?.image?.url) {
					set({ messagesImg: [...messagesImg, res.data] })
				}
				set({ messages: [...messages, res.data] })
			} catch (error: Error) {
				toast.error(error.response.data.message)
			}
		},
	})
)
