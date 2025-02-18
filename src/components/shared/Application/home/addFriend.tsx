import AddFriendLogo from '~/appsPicture/add.svg?react'
// import AddGroupLogo from '~/appsPicture/add-group.svg?react' // На backend добавить функционал
// import AddBurgerLogo from '~/appsPicture/burger.svg?react'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	FriendItemAdd,
	Search,
	Container,
	FriendSkeleton,
} from '@/components/shared/'
import { useChatStore, useDialogStore } from '@/store'

export const AddFriend = () => {
	const { isUsersLoading, filteredUsers, users } = useChatStore()
	const { createDialog } = useDialogStore()
	const fullName = (name: string, surname: string) => {
		return `${name} ${surname || ''}`
	}
	return (
		<Container className='m-0 h-full font-normal text-menubar hidden xs:block'>
			<Popover>
				<PopoverTrigger asChild className='p-0'>
					<Button
						size='icon'
						variant='link'
						className='w-7 h-7 [&_svg]:size-7 mr-1'
						type='submit'
					>
						<AddFriendLogo className='stroke-addFriend' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-60 bg-addFriend -translate-x-1/3'>
					<div className='grid gap-2.5 '>
						<div>
							<Search
								placeholder='ID Друга'
								className='border border-[#D8D8D8] rounded-2xl border-solid '
								isUserID
							/>
						</div>
						{/* <Button
							variant='ghost'
							className='w-full h-14 p-0 pl-2.5 justify-start [&_svg]:size-11 hover:bg-default/10'
						>
							<div className='flex items-center gap-3'>
								<AddGroupLogo className='py-2 px-2 rounded-full h-11 w-11 bg-default' />
								<h2>Новая группа</h2>
							</div>
						</Button> */}
						{/* На backend добавить функционал*/}
						<div>
							<ScrollArea className='h-72 pr-3 -mr-3'>
								{(isUsersLoading ? [...Array(4)] : filteredUsers || users).map(
									(user, index) =>
										isUsersLoading ? (
											<FriendSkeleton key={index} />
										) : (
											<Button
												variant='ghost'
												className='h-full w-full p-0 whitespace-normal hover:bg-transparent'
												key={index}
												onClick={() => createDialog(user)}
											>
												<FriendItemAdd
													name={fullName(user.name, user.surname)}
													className='w-full'
												/>
											</Button>
										)
								)}
							</ScrollArea>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</Container>
	)
}
