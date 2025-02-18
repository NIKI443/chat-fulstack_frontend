import { Dispatch, FC, RefObject, SetStateAction, useRef, useState } from 'react'
import AddFriendLogo from '~/appsPicture/add.svg?react'
import { ActionConfirm } from '@/components/shared'
import { useMessageStore } from '@/store'
import { Slide } from './slide'
import {
	Menu,
	MenuItem,
	MenuOverlay,
	MenuContent,
} from '@/components/ui/context-menu_floating'
import { Data, UpdateOfMessage } from '@/types/storeType'

interface Props {
	messageText?: string
	messageImg?: string
	checkYour: boolean
	check?: boolean
	time: string
	messageEndRef: RefObject<HTMLDivElement>
	messageId: string
	updateMessage: Dispatch<SetStateAction<UpdateOfMessage | null>>
}

export const MessageItem: FC<Props> = ({
	messageText,
	messageImg,
	checkYour = true,
	check = false,
	time,
	messageEndRef,
	messageId,
	updateMessage,
}) => {
	const { deleteOfMessage } = useMessageStore()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const messageRef = useRef<HTMLDivElement>(null)
	const messageImageRef = useRef<HTMLImageElement>(null)
	const handleDelete = () => {
		setIsMenuOpen(false)
		deleteOfMessage(messageId)
	}
	const handleItemSelect = (data: Data) => {
		setIsMenuOpen(false)

		if (data?.do === 'update') {
			updateMessage({
				text: data?.text ?? '',
				messageId: data.id,
				imgUrl: data?.imgUrl ?? '',
			})
		}
	}

	return (
		<Menu
			open={isMenuOpen}
			onOpenChange={setIsMenuOpen}
			itemRef={messageRef}
			excludeRef={messageImageRef}
		>
			{isMenuOpen && <MenuOverlay />}
			<div ref={messageRef}>
				<div
					className={`my-4 grid${
						checkYour ? ' place-content-end' : ' place-content-start'
					}`}
					ref={messageEndRef}
				>
					<div
						className={`max-w-72 pt-3 pb-4 px-3.5 text-sm rounded-md break-words 
						${checkYour ? 'text-white bg-default' : 'text-foreground bg-default/20'}`}
					>
						{messageImg && (
							<Slide imageUrl={messageImg}>
								<img
									src={messageImg}
									alt={'errorIMG'}
									className='rounded-xl mb-1.5'
									ref={messageImageRef}
								/>
							</Slide>
						)}
						<p className='select-text'>{messageText}</p>
					</div>
					<div
						className={`bg-[#F1F1F1] rounded-[0.5rem] w-20 mt-2 flex justify-center gap-1.5 py-1 text-xs 
          					${checkYour && 'place-self-end'}`}
					>
						<time>{time}</time>
						{checkYour && (
							<img
								src={`appsPicture/check-${check ? 'true' : 'false'}.svg`}
								alt={check ? 'true' : 'false'}
							/>
						)}
					</div>
				</div>
			</div>
			{checkYour && (
				<MenuContent className='w-52 rounded-xl -translate-y-full'>
					<MenuItem
						className='[&_svg]:size-5 '
						onItemSelect={handleItemSelect}
						dataValue={{
							id: messageId ,
							do: 'update',
							text: messageText ,
							imgUrl: messageImg,
						}}
						message
					>
						<AddFriendLogo className='stroke-neutral-700 mr-2.5' /> Изменить
					</MenuItem>
					<ActionConfirm
						title='Удалить сообщение'
						description='Вы уверены что хотите удалить сообщение?'
						cancel='Отмена'
						action='Удалить'
						clickAction={handleDelete}
						classAction='bg-transparent text-default hover:bg-default/5'
						classCancel='border-none text-neutral-600 hover:bg-neutral-100'
					>
						<MenuItem
							onItemSelect={handleItemSelect}
							dataValue={{ id: messageId, do: 'delete' }}
							message
						>
							<img
								src='appsPicture/trash-bin.svg'
								alt='change'
								className='mr-2.5 w-5'
							/>
							Удалить
						</MenuItem>
					</ActionConfirm>
				</MenuContent>
			)}
		</Menu>
	)
}
