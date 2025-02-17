import React, { useState } from 'react'
import { Link } from 'react-router'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import AddLogo from '~/appsPicture/add.svg?react'
import { useAuthStore } from '@/store'

import { Logout } from '@/components/shared'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'

interface Props {
	className?: string
	navPage?: string
}

const SettingsItem: React.FC<React.PropsWithChildren<Props>> = ({
	className,
	children,
	navPage,
}) => {
	return (
		<div
			className={cn(
				'w-full group-hover:bg-backDefault ease-in-out duration-200 text-base font-semibold',
				className
			)}
		>
			<Link
				to={`${navPage}`}
				className='flex justify-between py-2.5 px-5 xs:px-8'
			>
				{children}
			</Link>
		</div>
	)
}

export const Settings = () => {
	const [imageUrl, setImageUrl] = useState('')
	const { authUser, updateProfile } = useAuthStore()

	const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		try {
			const file = e.target.files?.[0]
			const formData = new FormData()
			if (!file) return

			formData.append('profile', file)

			const { data } = await axios.post('/upload/profile', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			const imageUrl = `${
				import.meta.env.REACT_APP_BACKEND_URI || 'http://localhost:4444'
			}/${data.url}`

			updateProfile({ avatarUrl: imageUrl })
			setImageUrl(imageUrl)
		} catch (error) {
			console.error('Failed to send/edit message:', error)
			toast.error('Произошла ошибка при изменении профиля')
		}
	}
	return (
		<div className='h-settings_xs xs:h-settings w-screen xs:w-full -mx-5 xs:m-0 rounded-lg bg-white xs:max-w-95'>
			<div className='border-b-2 border-zinc-400 xxs:px-[12%] xs:px-0'>
				<label
					htmlFor='avatar-upload'
					className='cursor-pointer relative before:absolute before:inset-0 xs:before:rounded-t-lg hover:before:bg-zinc-700/30 before:duration-150 '
				>
					<AspectRatio ratio={16 / 9}>
						<img
							src={imageUrl || authUser.avatarUrl || 'AddImg.png'}
							alt='avatar'
							className='h-full w-full -mt-7 xs:m-0 xs:rounded-t-lg'
						/>
					</AspectRatio>
					<input
						type='file'
						id='avatar-upload'
						accept='image/*'
						onChange={handleChangeImage}
						hidden
					/>
				</label>
			</div>
			<div className='h-full w-full mt-12 flex flex-col justify-between mx-auto gap-4 max-h-setting_xs max-w-95'>
				<div>
					<div className='group'>
						<SettingsItem navPage='name&surname'>
							<p>{authUser.name}</p>
							<Button
								size='icon'
								variant='link'
								className='w-8 h-8 [&_svg]:size-6'
							>
								<AddLogo className='stroke-default stroke-2' />
							</Button>
						</SettingsItem>
						<SettingsItem navPage='name&surname'>
							<p>{authUser?.surname}</p>
						</SettingsItem>
					</div>

					<div className='group'>
						<SettingsItem navPage='email&password'>
							<p>{authUser.email}</p>
							<Button
								size='icon'
								variant='link'
								className='w-8 h-8 [&_svg]:size-6'
							>
								<AddLogo
									width='24px'
									height='24px'
									className='stroke-default stroke-2'
								/>
							</Button>
						</SettingsItem>
						<SettingsItem navPage='email&password'>
							<p>***********</p>
						</SettingsItem>
					</div>

					<div className='group'>
						<SettingsItem navPage='ID'>
							<div className='flex gap-2.5'>
								ID
								<p className='font-normal'>{authUser.UserID}</p>
							</div>
							<Button
								size='icon'
								variant='link'
								className='w-8 h-8 [&_svg]:size-6'
							>
								<AddLogo
									width='24px'
									height='24px'
									className='stroke-default stroke-2'
								/>
							</Button>
						</SettingsItem>
					</div>
				</div>
				<div className='xs:hidden'>
					<Logout />
				</div>
			</div>
		</div>
	)
}
