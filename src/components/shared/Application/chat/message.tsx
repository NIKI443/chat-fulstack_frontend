import React, { useEffect, useCallback, RefObject } from 'react'
import { MessageItem } from '@/components/shared/'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	useChatStore,
	useAuthStore,
	useMessageStore,
} from '@/store'
import { formatTime } from '@/components/hooks/formatTime'
import { Message, UpdateOfMessage } from '@/types/storeType'

interface Props {
	messageEndRef: RefObject<HTMLDivElement>
	updateMessage: React.Dispatch<React.SetStateAction<UpdateOfMessage | null>>
}

export const MessageComponent: React.FC<Props> = ({ messageEndRef, updateMessage }) => {
	const { selectedUser } = useChatStore()
	const { authUser } = useAuthStore()
	const { getMessages, messages } = useMessageStore()

	useEffect(() => {
		if (selectedUser) getMessages(selectedUser.roomId)
	}, [getMessages, selectedUser?.roomId])
	const isMessageFromAuthUser = useCallback(
		(senderId: string) => senderId === authUser?._id,
		[authUser?._id]
	)

	return (
		<ScrollArea className='max-h-chat h-full w-full px-2.5'>
			{messages.map((message: Message) => (
				<MessageItem
					key={message._id}
					messageId={message._id}
					messageText={message.text}
					checkYour={isMessageFromAuthUser(message.senderId)}
					time={formatTime(message.createdAt)}
					messageImg={message.image?.url}
					messageEndRef={messageEndRef}
					check={message.seen}
					updateMessage={updateMessage}
				/>
			))}
		</ScrollArea>
	)
}
