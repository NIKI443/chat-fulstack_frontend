import React from 'react'
import HomeLogo from '~/appsPicture/home.svg?react'
import SettingsLogo from '~/appsPicture/settings.svg?react'
import { Container } from '@/components/shared/container'
import { NavLink } from 'react-router'
import { cn } from '@/lib/utils'
import { Logout } from '@/components/shared'

interface Props {
	className?: string
	isSpan?: boolean
	navPage?: string
}

const Redirect: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
	isSpan = true,
	navPage,
}) => {
	return (
		<NavLink to={'/' + navPage}>
			{({ isActive }) => (
				<div
					className={
						isActive
							? cn(
									'w-full py-4 pr-8 ml-5 flex gap-x-2.5 text-lg text-default fill-default cursor-pointer items-center content-center relative',
									className
							  )
							: cn(
									'group w-full py-4 pr-8 ml-5 flex gap-x-2.5 text-lg hover:text-default hover:fill-default cursor-pointer items-center content-center relative',
									className
							  )
					}
				>
					{isSpan && (
						<span
							className={`h-11 w-1.5 -left-5 hidden xs:block rounded-r-lg absolute
								${
									isActive
										? 'bg-default'
										: 'group-hover:bg-default -translate-x-1 group-hover:translate-x-0 origin-bottom group-hover:origin-top ease-in-out duration-300 '
								}`}
							aria-hidden='true'
						/>
					)}
					{children}
				</div>
			)}
		</NavLink>
	)
}

export const SidebarMenu = () => {
	return (
		<Container className='w-full h-24 bottom-0 rounded-t-2xl font-normal text-menubar row-start-2 xs:row-auto xs:m-0 xs:w-14 lg:w-48 xs:h-full xs:rounded-none xs:rounded-l-2xl bg-backDefault xs:bg-white'>
			<nav className='flex h-full flex-col justify-between items-start'>
				<section className=' w-full flex justify-evenly  flex-row-reverse xs:block'>
					<Redirect navPage='settings'>
						<SettingsLogo className='w-9 h-9 xs:w-6.25 xs:h-6.25' />
						<h2 className='hidden lg:block'>Настройки</h2>
					</Redirect>
					<Redirect className='gap-x-3.5' navPage=''>
						<HomeLogo className='w-9 h-9 xs:w-5 xs:h-5' />
						<h2 className='hidden lg:block'>Главная</h2>
					</Redirect>
				</section>
				<section className='hidden xs:block'>
					<Logout
						className='w-full py-4 pr-8 pl-0 ml-5'
						classExit='hidden lg:block'
					/>
				</section>
			</nav>
		</Container>
	)
}
