import React from 'react'
import { cn } from '@/lib/utils'
import { Loader } from '@/components/shared'

interface Props {
	className?: string
}

export const GlobalSpinner: React.FC<Props> = ({ className }) => {
	return (
		<div className='fixed z-[1000] bg-white flex flex-col justify-center items-center w-full h-full'>
			<Loader
				className={cn(
					'loader w-14 h-14 xxs:w-16 xxs:h-16 aspect-square border-[6px] border-default/70 border-l-white',
					className
				)}
			/>
			<span
				className='animate-loading text-2xl xxs:text-3xl before:content-["Загрузка..."] mt-10'
				style={{ fontFamily: 'monospace', clipPath: 'inset(0 3ch 0 0)' }}
			/>
		</div>
	)
}

export default GlobalSpinner
