import { Input } from '@/components/ui/input'
import { Container } from '@/components/shared/container'
import SearchLogo from '~/appsPicture/search.svg?react'
import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useChatStore, useDialogStore } from '@/store'

interface Props {
	className?: string
	placeholder?: string
	isUserID?: boolean
	isChatName?: boolean
}

export const Search: React.FC<Props> = ({
	className,
	placeholder,
	isUserID,
	isChatName,
}) => {
	const [searchText, setSearchText] = useState('')
	const { isUsersLoading, searchUser } = useChatStore()
	const { isChatsLoading, searchChat } = useDialogStore()

	const handleSearch = useCallback(() => {
		if (isUserID) searchUser(searchText)
		if (isChatName) searchChat(searchText)
	}, [searchText, isUserID, isChatName, searchUser, searchChat])

	useEffect(() => {
		const timer = setTimeout(() => {
			handleSearch()
		}, 300)

		return () => clearTimeout(timer)
	}, [handleSearch, searchText])

	return (
		<Container className='m-0 w-full h-12 font-normal text-menubar flex flex-1 relative '>
			<form className='w-full' onSubmit={handleSearch}>
				<Button
					variant='link'
					type='submit'
					disabled={isUsersLoading || isChatsLoading}
					className='p-0 absolute -top-3.5 [&_svg]:size-5 translate-y-[50%] left-3.5'
				>
					<SearchLogo />
				</Button>
				<Input
					placeholder={placeholder}
					type='text'
					onClick={() => useChatStore.setState({ isActiveSidMenu: false })}
					onBlur={() => useChatStore.setState({ isActiveSidMenu: true })}
					onChange={e => setSearchText(e.target.value)}
					className={cn(
						'bg-backDefault border-none rounded-2xl outline-none w-full pl-11 placeholder:text-black/75 active:border-none h-11',
						className
					)}
				/>
			</form>
		</Container>
	)
}
