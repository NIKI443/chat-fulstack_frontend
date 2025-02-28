import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../../../ui/button'
import { Chat } from './chat'
import ArrowLeftLogo from '~/appsPicture/arrow-left.svg?react'
import { useChatStore } from '@/store'

const pageVariants = {
	initial: {
		opacity: 0,
		x: '50%',
	},
	animate: {
		opacity: 1,
		x: 0,
		duration: 1,
	},
	exit: {
		opacity: 0,
		x: '50%',
	},
}

const pageTransition = {
	type: 'tween',
	ease: 'easeInOut',
	duration: 0.5,
}

export const ChatMobil = () => {
	const { selectedUser, open, setOpen } = useChatStore()

 useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false)
			}
		}

		const handleBackButton = () => {
			setOpen(false)
		}

		document.addEventListener('keydown', handleKeyDown)
		window.addEventListener('popstate', handleBackButton)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('popstate', handleBackButton)
		}
 }, [setOpen])

	return (
		<AnimatePresence>
			{open && selectedUser && (
				<motion.div
					initial='initial'
					animate='animate'
					exit='exit'
					variants={pageVariants}
					transition={pageTransition}
					className='z-50 fixed bg-white w-screen h-chat_mobil block xs:hidden'
				>
					<Button
						size='icon'
						variant='link'
						className='[&_svg]:size-5 w-6 h-5 absolute top-9 left-7'
						onClick={() => setOpen(false)}
					>
						<ArrowLeftLogo />
					</Button>
					<Chat />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
