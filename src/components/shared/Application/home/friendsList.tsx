import { useMemo, useCallback, useRef } from 'react'
import { Container, FriendItem, FriendChatSkeleton } from '@/components/shared'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { formatTime } from '@/components/hooks/formatTime'

import {
	useChatStore,
	useAuthStore,
	useDialogStore,
} from '@/store'
import { User, Chats } from '@/types/storeType'




export const Friends = () => {
	const scrollAreaRef = useRef<HTMLDivElement>(null)

	const { authUser } = useAuthStore()
	const { setSelectedUser, setOpen } = useChatStore()
	const {
		chats,
		chatsFiltered,
		isChatsLoading,
		endMessages,
		getChatsFriend,
		updateEndMessages,
	} = useDialogStore()

	const endMessagesMap = useMemo(() => {
		if (!Array.isArray(endMessages)) return new Map()
		return new Map(endMessages.map(message => [message.roomId, message.chat]))
	}, [endMessages, getChatsFriend, updateEndMessages])

	const handleChatSelect = useCallback(
		(chat: Chats | User) => {
			console.log(chat)
			setSelectedUser(null)
			setSelectedUser(chat)
			setOpen(true)
		},
		[setSelectedUser]
	)


	const renderChatItem = useCallback(
		(chat: User | Chats) => {
			const endMessage = endMessagesMap.get(chat.roomId)
			return (
				<Button
					variant='ghost'
					key={chat._id}
					className='h-full mb-3 w-full p-0 whitespace-normal text-accent-foreground/75'
					onClick={() => handleChatSelect(chat)}
				>
					<FriendItem
						name={chat.fullName}
						avatar={chat.avatarUrl}
						dataMassage={
							endMessage?.createdAt && formatTime(endMessage.createdAt)
						}
						MassageImg={endMessage?.imgUrl || ''}
						Massage={
							endMessage?.imgUrl
								? endMessage?.text || 'фотография'
								: endMessage?.text || 'Нет сообщений'
						}
						checkYour={endMessage?.seen}
						check={
							endMessage?.senderId === authUser?._id && !endMessage?.isFirst
						}
						numberMessages={0}
					/>
				</Button>
			)
		},
		[endMessagesMap, authUser?._id, handleChatSelect]
	)

	return (
		<Container className='w-full h-full xxs:w-95 m-0 pt-4 pl-3.5 xs:pl-5 xs:pr-1.5 xs:pt-6 font-normal text-menubar rounded-lg bg-white'>
			<ScrollArea
				ref={scrollAreaRef}
				className='h-friend_xs xs:h-friend w-full pr-3.5'
			>
				{isChatsLoading
					? Array(5)
							.fill(null)
							.map((_, index) => <FriendChatSkeleton key={index} />)
					: (chatsFiltered || chats).map((chat: User | Chats) => (
							<div key={chat._id}>{renderChatItem(chat)}</div>
					  ))}
			</ScrollArea>
		</Container>
	)
}
