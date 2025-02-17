import React from 'react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

interface Props {
	className?: string
	avatar?: string
	name?: string
}

export const FriendItemAdd: React.FC<Props> = ({
	className,
	avatar = 'AvaDefault.jpg',
	name = 'Robert Fox',
}) => {
	return (
		<div className={cn('', className)}>
			<div className='mb-3 rounded-2xl p-3 flex line-clamp-1 break-words w-full gap-3 items-center bg-default/20 hover:bg-default/30 duration-200'>
				<Avatar className='h-10 w-10'>
					<AvatarImage src={avatar} alt='avatar' draggable='false' />
				</Avatar>
				<p className='font-semibold text-left line-clamp-1 break-words'>
					{name}
				</p>
			</div>
		</div>
	)
}
