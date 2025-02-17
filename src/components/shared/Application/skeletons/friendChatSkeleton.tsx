import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	className?: string
}

export const FriendChatSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between w-full mb-4 bg-primary/15 rounded-2xl p-3 px-5',
				className
			)}
		>
			<Skeleton className='h-12 w-12 rounded-full' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-36 mr-10' />
				<Skeleton className='h-2.5 w-24' />
			</div>
			<div className='mb-4'>
				<Skeleton className='h-4 w-10' />
			</div>
		</div>
	)
}
