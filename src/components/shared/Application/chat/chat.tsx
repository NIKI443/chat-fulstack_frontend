import { FC, useEffect, useRef, useState } from 'react'
import {
	ChatHeader,
	MassageField,
	MessageComponent,
	Container,
} from '@/components/shared/'
import {
	useChatStore,
	useAuthStore,
	useMessageStore,
	useSocketMessageStore,
} from '@/store'
import { cn } from '@/lib/utils'
import { UpdateOfMessage } from '@/types/storeType'

interface Props {
	className?: string
}

export const Chat: FC<Props> = ({ className }) => {
	const { selectedUser } = useChatStore()
	const { onlineUsers } = useAuthStore()
	const { messages } = useMessageStore()
	const {
		subscribeToMessages,
		unsubscribeFromMessages,
		updateMessageSeenStatus,
		updateLatestMessagesSeenStatus,
	} = useSocketMessageStore()
	const messageEndRef = useRef<HTMLDivElement | null>(null)
	const [updateMessage, setUpdatedMessage] = useState<UpdateOfMessage | null>(
		null
	)

	const LastMassage = messages[messages.length - 1]

	useEffect(() => {
		updateMessageSeenStatus()
		updateLatestMessagesSeenStatus()
	}, [
		selectedUser?._id,
		LastMassage,
		updateMessageSeenStatus,
		updateLatestMessagesSeenStatus,
		onlineUsers,
	])

	useEffect(() => {
		setTimeout(() => {
			if (messageEndRef.current) {
				messageEndRef.current?.scrollIntoView({
					behavior: 'smooth',
				})
			}
		}, 100)
		subscribeToMessages()

		return () => {
			unsubscribeFromMessages()
		}
	}, [messages, subscribeToMessages, unsubscribeFromMessages, selectedUser?._id])

	return (
		<Container
			className={cn(
				'm-0 w-full h-full flex items-center flex-col flex-1 font-normal text-menubar rounded-lg justify-between bg-white ',
				className
			)}
		>
			<ChatHeader
				name={selectedUser?.fullName}
				checkOnline={
					selectedUser?._id ? onlineUsers.includes(selectedUser?._id) : false
				}
				avatar={selectedUser?.avatarUrl}
			/>
			<MessageComponent
				messageEndRef={messageEndRef}
				updateMessage={setUpdatedMessage}
			/>
			<MassageField
				updateOfMessage={updateMessage}
				setUpdatedOfMessage={setUpdatedMessage}
			/>
		</Container>
	)
}
