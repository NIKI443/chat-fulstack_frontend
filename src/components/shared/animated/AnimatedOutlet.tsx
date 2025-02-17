import { AnimatePresence } from 'motion/react'
import React from 'react'
import { useLocation, useOutlet } from 'react-router'

const AnimatedOutlet = (): React.JSX.Element => {
	const location = useLocation()
	const element = useOutlet()
	return (
		<AnimatePresence mode='wait'>
			{element && React.cloneElement(element, { key: location.pathname })}
		</AnimatePresence>
	)
}
export default AnimatedOutlet
