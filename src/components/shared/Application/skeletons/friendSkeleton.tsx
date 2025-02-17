import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	className?: string
}

export const FriendSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'flex items-center space-x-3 w-full mb-4 bg-white rounded-2xl p-2',
				className
			)}
		>
			<Skeleton className='h-10 w-10 rounded-full' />
			<div className='space-y-2'>
				<Skeleton className='h-4 w-32' />
				<Skeleton className='h-2.5 w-24' />
			</div>
		</div>
	)
}
