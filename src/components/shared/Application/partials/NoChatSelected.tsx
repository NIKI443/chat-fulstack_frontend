import { ChatHeader, MassageField, VerticalCenterContainer } from '../..'

import { cn } from '@/lib/utils'

interface Props {
	className?: string
}
export const NoChatSelected: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'w-full h-full flex flex-1 flex-col items-center justify-between bg-base-100/50 bg-white rounded-lg',
				className
			)}
		>
			<ChatHeader skeleton={true} />
			<VerticalCenterContainer className='w-full text-center space-y-6 before:h-[25%] lg:before:h-[30%] h-[50svh] p-4'>
				<div className='flex justify-center gap-4 '>
					<div className='relative'>
						<div className='w-16 h-16 rounded-2xl bg-primary/40 flex items-center justify-center animate-bounce'>
							<img src='/appsPicture/add-group.svg' alt='new-chat' />
						</div>
					</div>
				</div>

				<h2 className='text-2xl font-bold'>Добро пожаловать!</h2>
				<p className='text-base-content/60'>
					Выберите чат на боковой панели, чтобы начать общение
				</p>
			</VerticalCenterContainer>
			<MassageField />
		</div>
	)
}
