import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

export const Loader: React.FC<Props> = ({ className }) => {
	return (
		<div>
			<div
				className={cn(
					'loader w-6 h-6 rounded-full border-[3px] border-white border-l-transparent animate-spin',
					className
				)}
			/>
		</div>
	)
}

export default Loader
