import { VerticalCenterContainer, FormInternal } from '@/components/shared'
import { Link } from 'react-router'
import { useAuthStore } from '@/store'

function Login() {
	const { login, isLoggingIn } = useAuthStore()

	return (
		<VerticalCenterContainer className={'max-w-75 space-y-6 outer'}>
			<div className=' inline-block align-middle'>
				<div className='flex relative'>
					<div className='block mt-16'>
						<h1 className='font-bold text-1.5xl'>Введите в аккаунт</h1>
						<p className='w-64 mt-1 font-medium text-sm'>
							Рады вас видеть. Чтобы использовать учетную запись, пожалуйста,
							сначала войдите в систему.
						</p>
					</div>
					<img
						src='appsPicture/dayflow-sitting.png'
						alt='login'
						className='absolute  -right-12'
						width={160}
					/>
				</div>
				<FormInternal
					isLauding={isLoggingIn}
					isEmail
					isPassword
					className='mt-10'
					classButton='mt-12'
					onFunction={login}
				>
					<div className='flex gap-2.5 '>
						<img src='appsPicture/login.svg' alt='login' />
						Войти
					</div>
				</FormInternal>
				<Link to={'/signup'}>
					<div className='mt-1 mb-14 flex justify-center text-sm cursor-pointer'>
						Нет аккаунта?
						<span className='text-[#2F00FF] ml-[0.3rem]'>
							Зарегистрироваться
						</span>
					</div>
				</Link>
			</div>
		</VerticalCenterContainer>
	)
}

export default Login
