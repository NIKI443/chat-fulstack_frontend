import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface Props {
	className?: string
	avatar?: string
	name: string
	dataMassage: string
	Massage?: string
	MassageImg?: string
	checkYour: boolean
	check: boolean
	numberMessages?: number | string
}

export const FriendItem: React.FC<Props> = ({
	className,
	avatar = 'AvaDefault.jpg',
	name,
	dataMassage,
	Massage,
	MassageImg,
	checkYour = false,
	check = false,
	numberMessages,
}) => {
	if (typeof numberMessages === 'number' && numberMessages > 1000) {
		numberMessages = '999+'
	}
	if (!numberMessages) numberMessages = ''
	return (
		<div
			className={cn(
				'h-[4.6875rem] w-full pt-2.5 pb-4 px-4 flex gap-2.5 border-2 border-default rounded-[14px] items-start justify-between duration-75 bg-default/20 hover:bg-default/30',
				className
			)}
		>
			<div className='flex gap-3 max-w-87.5'>
				<Avatar className='w-12 h-12'>
					<AvatarImage src={avatar} alt='avatar' draggable='false' />
				</Avatar>

				<div className='justify-items-start'>
					<p className='text-base text-primary-foreground font-semibold line-clamp-1 break-words'>
						{name}
					</p>
					<div className='flex mt-1 max-w-40 xxs:max-w-44 '>
						{check && (
							<img
								src={`appsPicture/check-${checkYour ? 'true' : 'false'}.svg`}
								alt={checkYour ? 'true' : 'false'}
							/>
						)}

						<p className='ml-1.5 text-xs line-clamp-1 whitespace-nowrap flex items-center'>
							{MassageImg && (
								<img
									src={MassageImg}
									alt={Massage}
									className='h-6 w-6 mr-1 rounded-[4px] '
								/>
							)}
							{Massage}
						</p>
					</div>
				</div>
			</div>
			<div className='ml-1 flex flex-col justify-between items-end'>
				<time className='text-[0.6875rem] w-8 '>{dataMassage}</time>
				{!check && numberMessages && (
					<div className='text-sm bg-default text-white mr-0.5 py-0.5 px-2 rounded-full'>
						{numberMessages}
					</div>
				)}
			</div>
		</div>
	)
}
