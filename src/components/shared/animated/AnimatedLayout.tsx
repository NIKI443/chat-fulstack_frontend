import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

const pageVariants = {
	initial: {
		opacity: 0,
		x: '-50%',
	},
	animate: {
		opacity: 1,
		x: 0,
		duration: 1,
	},
	exit: {
		opacity: 0,
		x: '-50%',
	},
}

const pageTransition = {
	type: 'tween',
	ease: 'anticipate',
	duration: 0.5,
}

interface AnimatedLayoutProps extends MotionProps {
	children: React.ReactNode
}
interface Props {
	className?: string
}

const AnimatedLayout: React.FC<AnimatedLayoutProps & Props> = ({
	children,
	className,
}) => {
	return (
		<motion.div
			initial='initial'
			animate='animate'
			exit='exit'
			variants={pageVariants}
			transition={pageTransition}
			className={cn('w-full xs:w-95', className)}
		>
			{children}
		</motion.div>
	)
}

export default AnimatedLayout
