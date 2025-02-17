import ExitPageLogo from '~/appsPicture/exit-page.svg?react'
import AddGroupLogo from '~/appsPicture/add-group.svg?react' // На backend добавить функционал
import AddBurgerLogo from '~/appsPicture/burger.svg?react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
	SheetDescription,
	SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	FriendItemAdd,
	Search,
	Container,
	FriendSkeleton,
} from '@/components/shared/'
import { useChatStore, useDialogStore } from '@/store'

export const AddFriendMobile = () => {
	const { isUsersLoading, filteredUsers, users } = useChatStore()
	const { createDialog } = useDialogStore()
	const fullName = (name: string, surname: string) => {
		return `${name} ${surname || ''}`
	}
	return (
		<Container className='m-0 h-full font-normal text-menubar block xs:hidden'>
			<Sheet>
				<SheetTrigger asChild className='p-0 absolute bottom-3 right-5'>
					<Button
						size='icon'
						variant='link'
						className='[&_svg]:size-16 w-18 h-18 z-50 rounded-full bg-default'
						type='submit'
					>
						<AddBurgerLogo className='py-5 px-5' />
					</Button>
				</SheetTrigger>
				<SheetContent className='w-full bg-white p-5 data-[state=closed]:duration-700 data-[state=open]:duration-700'>
					<SheetTitle />
					<SheetDescription />
					<SheetClose asChild>
						<Button
							size='icon'
							variant='link'
							className='[&_svg]:size-10 w-6 h-5 mt-3 mb-8 xxs:my-7 xxs:ml-8'
							type='submit'
						>
							<ExitPageLogo />
						</Button>
					</SheetClose>
					<div className='grid gap-2.5  xxs:w-87.5 mx-auto'>
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
							<ScrollArea className='h-addFriend pr-3 -mr-3'>
								{(isUsersLoading ? [...Array(4)] : filteredUsers || users).map(
									(user, index) =>
										isUsersLoading ? (
											<FriendSkeleton key={index} />
										) : (
											<Button
												variant='ghost'
												className='h-full w-full p-0 whitespace-normal hover:bg-transparent'
												key={user._id}
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
				</SheetContent>
			</Sheet>
		</Container>
	)
}
