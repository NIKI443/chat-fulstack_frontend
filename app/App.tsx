import { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router'

import Login from '@/pages/auth/login'
import Register from '@/pages/auth/register'
import Home from '@/pages/home'
import Setting from '@/pages/setting'
import ErrorPage from '@/pages/errorPage'
import GlobalSpinner from '@/pages/globalSpinner'

import LayoutPage from '@/LayoutPage'
import { useAuthStore } from '@/store/useAuthStore'

import { Toaster } from 'react-hot-toast'
import { SettingRouts } from '@/routes'

function App() {
	const { isCheckingAuth, AuthMe, authUser } = useAuthStore()
	useEffect(() => {
		AuthMe()
	}, [AuthMe])

	if (isCheckingAuth && !authUser) return <GlobalSpinner />
	return (
		<>
			<Routes>
				<Route element={<LayoutPage />}>
					<Route
						path='/'
						element={authUser ? <Home /> : <Navigate to='/login' />}
					/>
					<Route path='/settings'>
						<Route
							index
							element={authUser ? <Setting /> : <Navigate to='/login' />}
						/>
						{SettingRouts.map(setting => {
							return (
								<Route
									key={setting.path}
									path={setting.path}
									element={<setting.element />}
								/>
							)
						})}
					</Route>
				</Route>
				<Route
					path='/signup'
					element={!authUser ? <Register /> : <Navigate to='/' />}
				/>
				<Route
					path='/login'
					element={!authUser ? <Login /> : <Navigate to='/' />}
				/>
				<Route path='/*' element={<ErrorPage />} />
			</Routes>
			<Toaster
				position='bottom-right'
				toastOptions={{
					className: '',
					removeDelay: 750,
					style: {
						background: '#A12A2A',
						color: '#fff',
					},
					success: {
						duration: 3000,
						iconTheme: {
							primary: '#781f98fa',
							secondary: 'white',
						},
						style: {
							background: '#781f9876',
						},
					},
				}}
			/>
		</>
	)
}

export default App
