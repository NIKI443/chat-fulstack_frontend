import Login from './pages/auth/login'
import Register from './pages/auth/register'
import { Route, Routes, Navigate } from 'react-router'
import Home from './pages/home'
import { Toaster } from 'react-hot-toast'

import { useAuthStore } from './store/useAuthStore'
import Setting from './pages/setting'
import ErrorPage from './pages/errorPage'
import {
	EditingNameSurname,
	EditingEmailPassword,
	EditingID,
} from './components/shared'
import LayoutPage from './LayoutPage'

function App() {
	const { authUser } = useAuthStore()

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
						<Route path='name&surname' element={<EditingNameSurname />} />
						<Route path='email&password' element={<EditingEmailPassword />} />
						<Route path='ID' element={<EditingID />} />
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
