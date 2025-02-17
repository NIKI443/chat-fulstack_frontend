import { VerticalCenterContainer } from '@/components/shared'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function ErrorPage() {
	return (
		<>
			<div className='bg-[#DECFF4]'>
				<VerticalCenterContainer className='select-none home-h before:h-[50%] lg:before:h-[50%]'>
					<div className='text-4xl font-normal w-full justify-items-center inline-block align-middle'>
						<h1>Произошла ошибка</h1>
						<p className='text-6xl font-semibold'>404</p>
						<Link to={'/'}>
							<Button variant='auth' className='text-base mt-10 p-6'>
								Перейти на главную
								<img src='/appsPicture/login.svg' alt='login' className='w-4' />
							</Button>
						</Link>
					</div>
				</VerticalCenterContainer>
			</div>
		</>
	)
}
