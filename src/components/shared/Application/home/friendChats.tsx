import { useEffect } from 'react'
import {
	Container,
	Friends,
	AddFriend,
	Search,
	AddFriendMobile,
} from '@/components/shared/index'
import { useChatStore, useDialogStore } from '@/store'

export const ChatsFriend = () => {
	const { getUsers, searchUser } = useChatStore()
	const { getChatsFriend, searchChat, updateEndMessages } = useDialogStore()

	useEffect(() => {
		searchChat()
		searchUser()
		getUsers()
		getChatsFriend()
	}, [getUsers, getChatsFriend, searchChat, searchUser])

	useEffect(() => {
		updateEndMessages()
	}, [getUsers, getChatsFriend, searchChat, searchUser, updateEndMessages])
	return (
		<Container className='h-full w-full flex items-start self-start flex-col max-w-95 '>
			<div className='w-full'>
				<Search placeholder='Поиск чата' isChatName />
				<div className='w-full flex justify-between my-2'>
					<p className='text-xl text-default xs:text-white after:block after:w-16 after:h-[3px] after:bg-secondary after:rounded-lg after:-translate-x-[10%]'>
						Чаты
					</p>
					<AddFriend />
					<AddFriendMobile />
				</div>
			</div>
			<Friends />
		</Container>
	)
}
