import { create } from 'zustand'
import { useChatStore } from './useChatStore'
import { useAuthStore } from './useAuthStore'
import { useDialogStore } from './useDialogStore'
import { useMessageStore } from './useMessageStore'
import { Message, MessagesImg } from '@/types/storeType'

interface MessageActions {
	subscribeToMessages: () => void
	updateMessageSeenStatus: () => void
	updateLatestMessagesSeenStatus: () => void
	unsubscribeFromMessages: () => void
}

export const useSocketMessageStore = create<MessageActions>()(() => ({
	updateMessageSeenStatus: async () => {
		const socket = useAuthStore.getState().socket
		const selectedUser = useChatStore.getState().selectedUser
		const messages = useMessageStore.getState().messages

		const lastMessageIsFromOtherUser =
			messages.length &&
			messages[messages.length - 1]?.senderId === selectedUser?._id

		if (lastMessageIsFromOtherUser) {
			socket.emit('markMessagesAsSeen', {
				roomId: selectedUser?.roomId,
				UserId: selectedUser?._id,
			})
		}
	},

	updateLatestMessagesSeenStatus: async () => {
		const socket = useAuthStore.getState().socket
		const messages = useMessageStore.getState().messages
		const selectedUser = useChatStore.getState().selectedUser

		socket.on('messagesSeen', ({ roomId }) => {
			if (selectedUser?._id && selectedUser?.roomId === roomId) {
				const updatedMessages = messages.map(message => {
					if (!message.seen) {
						return {
							...message,
							seen: true,
						}
					}
					return message
				})
				useMessageStore.setState({ messages: updatedMessages })
			}
		})
	},

	subscribeToMessages: () => {
		const selectedUser = useChatStore.getState().selectedUser
		const endMessages = useDialogStore.getState().endMessages
		const authUser = useAuthStore.getState().authUser

		if (!selectedUser?._id) return

		const socket = useAuthStore.getState().socket

		socket.on('newMessage', (newMessage: Message) => {
			const messages = useMessageStore.getState().messages

			const endMessagesFiltered = endMessages.map(message => {
				if (message.roomId === newMessage.roomId) {
					message.chat = newMessage
				}
				return message
			})

			useDialogStore.setState({ endMessages: endMessagesFiltered })

			const isMessageSentAuthUserAndNotRepeated =
				newMessage.senderId === authUser?._id ||
				messages[messages.length - 1]._id === newMessage._id

			if (isMessageSentAuthUserAndNotRepeated) return
			useMessageStore.setState({
				messages: [...messages, newMessage],
			})
		})

		socket.on('editMessage', (updateMessage: Message, { messageId }) => {
			const messages = useMessageStore.getState().messages

			const updatedMessagesImg: MessagesImg[] = []

			const updateMessages = messages.map(message => {
				if (message._id !== messageId && message.image?.url) {
					updatedMessagesImg.push(message)
				}
				if (message._id === messageId) {
					const { text, image, ...dataMessage } = message
					const updatedMessage = {
						...dataMessage,
						text: updateMessage?.text,
						image: updateMessage?.image,
					}
					if (updateMessage?.image?.url) {
						updatedMessagesImg.push(updatedMessage)
					}
					return updatedMessage
				}
				return message
			})

			useMessageStore.setState({
				messages: updateMessages,
				messagesImg: updatedMessagesImg,
			})
		})
	},

	unsubscribeFromMessages: () => {
		const socket = useAuthStore.getState().socket
		socket.off('newMessage')
	},
}))
