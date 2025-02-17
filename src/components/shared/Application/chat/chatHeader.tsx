import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'


interface Props {
	name?: string
	avatar?: string
	checkOnline?: boolean
	skeleton?: boolean
}

export const ChatHeader: React.FC<Props> = ({
	name,
	avatar = 'AvaDefault.jpg',
	checkOnline,
	skeleton,
}) => {
	return (
		<div className='w-full py-6 px-20 xs:pt-8 xs:pb-5 xs:px-14 flex justify-between xs:rounded-t-lg bg-backDefault'>
			<div className='flex gap-4'>
				<Avatar className='w-[50px] h-[50px]'>
					<AvatarImage src={avatar} alt='avatar' draggable='false' />
				</Avatar>
				
				<div className='text-sm'>
					<h1 className='text-base text-foreground font-semibold'>{name}</h1>
					{!skeleton &&
						(checkOnline ? (
							<p className='text-default'>В сети</p>
						) : (
							<p className='text-ring'>Не в сети</p>
						))}
				</div>
			</div>
		</div>
	)
}
