import {
	autoUpdate,
	flip,
	offset,
	Placement,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
	useRole,
} from '@floating-ui/react'
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'

interface CoordinateMenu {
	width: number
	height: number
	x: number
	y: number
	top: number
	right: number
	bottom: number
	left: number
}
export interface MenuOptions {
	initialOpen?: boolean
	placement?: Placement
	coordinateMenu?: CoordinateMenu
	modal?: boolean
	open?: boolean
	IsActive?: boolean
	itemRef?: React.RefObject<HTMLElement>
	excludeRef?: React.RefObject<HTMLElement>
	onOpenChange?: (open: boolean) => void
}
export function useMenu({
	initialOpen = false,
	placement = 'left-start',
	coordinateMenu,
	modal,
	open: controlledOpen,
	onOpenChange: setControlledOpen,
	itemRef,
	excludeRef,
}: MenuOptions) {
	const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
	const [labelId, setLabelId] = useState<string | undefined>()
	const [descriptionId, setDescriptionId] = useState<string | undefined>()
	const allowMouseUpCloseRef = useRef(false)

	const open = controlledOpen ?? uncontrolledOpen
	const setOpen = setControlledOpen ?? setUncontrolledOpen

	const data = useFloating({
		placement,
		open,
		onOpenChange: setOpen,
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(5),
			flip({
				crossAxis: placement.includes('-'),
				fallbackAxisSideDirection: 'end',
				padding: 5,
			}),
			shift({ padding: 5 }),
		],
	})
	const context = data.context

	const click = useClick(context, {
		enabled: controlledOpen == null,
	})
	const role = useRole(context)
	const dismiss = useDismiss(context, {
		outsidePress: true,
	})
	const interactions = useInteractions([click, dismiss, role])

	useEffect(() => {
		let timeout: number

		function onDivClick(e) {
			if (excludeRef?.current?.contains(e.target as Node)) return

			e.preventDefault()

			const clientX = e.clientX
			const clientY = e.clientY

			data.refs.setPositionReference({
				getBoundingClientRect() {
					return {
						width: 0,
						height: 0,
						x: clientX || coordinateMenu?.x,
						y: clientY || coordinateMenu?.y,
						top: clientY || coordinateMenu?.y,
						right: clientX || coordinateMenu?.x,
						bottom: clientY || coordinateMenu?.y,
						left: clientX || coordinateMenu?.x,
					}
				},
			})
			setOpen(true)

			clearTimeout(timeout)

			allowMouseUpCloseRef.current = false
			timeout = window.setTimeout(() => {
				allowMouseUpCloseRef.current = true
			}, 300)
		}
		function onMouseUp(e) {
			if (excludeRef?.current?.contains(e.target as Node)) return
			
			if (allowMouseUpCloseRef.current) {
				setOpen(false)
			}
		}
		if (itemRef?.current) {
			itemRef.current.addEventListener('contextmenu', onDivClick)

			itemRef.current.addEventListener('pointerup', onMouseUp)
			return () => {
				itemRef.current?.removeEventListener('pointerup', onMouseUp)
				itemRef.current?.addEventListener('contextmenu', onMouseUp)
			}
		}
	}, [click, data.refs, setOpen, coordinateMenu])

	return useMemo(
		() => ({
			open,
			setOpen,
			...interactions,
			...data,
			modal,
			labelId,
			descriptionId,
			setLabelId,
			setDescriptionId,
		}),
		[open, setOpen, interactions, data, modal, labelId, descriptionId]
	)
}

export type ContextType =
	| (ReturnType<typeof useMenu> & {
			setLabelId: Dispatch<SetStateAction<string | undefined>>
			setDescriptionId: Dispatch<SetStateAction<string | undefined>>
	  })
	| null
