import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	className?: string
}

export const MatchesSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<Skeleton
			className={cn('h-26 w-full my-4 rounded-lg bg-[#0F1318]', className)}
		/>
	)
}
