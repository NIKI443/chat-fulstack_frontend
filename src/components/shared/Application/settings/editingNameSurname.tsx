import { FormInternal, VerticalCenterContainer } from '../..'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

import { useAuthStore } from '@/store'
import AnimatedLayout from '../../animated/AnimatedLayout'

export const EditingNameSurname = () => {
	const { updateProfile, isUpdatingProfile } = useAuthStore()

	return (
		<AnimatedLayout className='h-settings_xs xs:h-settings'>
			<VerticalCenterContainer className='h-full w-75 xs:w-95 space-y-6 before:h-[75%] xs:px-[10%] rounded-lg bg-white'>
				<div className='inline-block align-middle'>
					<div className='w-full flex flex-col '>
						<Link to={'/settings'}>
							<Button
								type='submit'
								variant='link'
								size='icon'
								className='w-9 p-0'
							>
								<img src='/appsPicture/exit-page.svg' alt='exit' />
							</Button>
						</Link>

						<FormInternal
							isLauding={isUpdatingProfile}
							isName
							isSurname
							// isUserID
							onFunction={updateProfile}
						>
							<div>Сохранить изменения</div>
						</FormInternal>
					</div>
				</div>
			</VerticalCenterContainer>
		</AnimatedLayout>
	)
}
