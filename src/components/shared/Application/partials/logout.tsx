import React from 'react'
import ExitLogo from '~/appsPicture/exit.svg?react'
import { useAuthStore } from '@/store'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { ActionConfirm } from '@/components/shared'

interface Props {
	className?: string
	classExit?: string
}

export const Logout: React.FC<Props> = ({ className, classExit }) => {
	const { logout } = useAuthStore()
	const onClickLogout = () => {
		logout()
		window.localStorage.removeItem('token')
	}
	return (
		<ActionConfirm
			title='Вы уверены что хотите выйти?'
			description='При нажатии на "Подтвердить" вы выйдите из аккаунта'
			cancel='Отмена'
			action='Подтвердить'
			clickAction={onClickLogout}
		>
			<Button
				size='icon'
				variant='link'
				className={cn(
					'group w-5/6 py-4 pl-5 flex gap-x-2.5 hover:no-underline text-menubar font-normal justify-start text-lg hover:text-default hover:fill-default items-center content-center',
					className
				)}
			>
				<ExitLogo />
				<p className={cn('', classExit)}>Выйти</p>
			</Button>
		</ActionConfirm>
	)
}
