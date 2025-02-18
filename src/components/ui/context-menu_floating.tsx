import {
	ButtonHTMLAttributes,
	cloneElement,
	createContext,
	forwardRef,
	HTMLProps,
	isValidElement,
	ReactNode,
	useContext,
} from 'react'
import {
	useMergeRefs,
	FloatingPortal,
	FloatingFocusManager,
	FloatingOverlay,
} from '@floating-ui/react'
import { MenuOptions, useMenu, ContextType } from '@/types/contextType'
import { Data } from '@/types/storeType'
import { cn } from '@/lib/utils'

const MenuContext = createContext<ContextType>(null)

export const useMenuContext = () => {
	const context = useContext(MenuContext)

	if (context == null) {
		throw new Error('Menu components must be wrapped in <Menu />')
	}

	return context
}

interface MenuTriggerProps {
	children: ReactNode
	asChild?: boolean
}
export const MenuTrigger = forwardRef<
	HTMLElement,
	HTMLProps<HTMLElement> & MenuTriggerProps
>(function MenuTrigger({ children, asChild = false, ...props }, propRef) {
	const context = useMenuContext()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const childrenRef = (children as any).ref
	const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef])
	if (asChild && isValidElement(children)) {
		return cloneElement(
			children,
			context.getReferenceProps({
				ref,
				...props,
				...children.props,
				'data-state': context?.open ? 'open' : 'closed',
			})
		)
	}

	return (
		<button
			ref={ref}
			type='button'
			data-state={context?.open ? 'open' : 'closed'}
			{...context.getReferenceProps(props)}
		>
			{children}
		</button>
	)
})

export const MenuOverlay = forwardRef<
	React.ElementRef<typeof FloatingOverlay>,
	React.ComponentPropsWithoutRef<typeof FloatingOverlay> & {
		onOpenChange?: () => void
	}
>(({ className, onOpenChange, ...props }, ref) => {
	return (
		<FloatingOverlay
			className={cn(
				'fixed inset-0 z-40 bg-black/5  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
				className
			)}
			onClick={() => {
				if (onOpenChange) onOpenChange()
			}}
			{...props}
			ref={ref}
		/>
	)
})

export const MenuContent = forwardRef<
	HTMLDivElement,
	HTMLProps<HTMLDivElement>
>(function MenuContent({ style, className, children, ...props }, propRef) {
	const { context: floatingContext, ...context } = useMenuContext()
	const ref = useMergeRefs([context.refs?.setFloating, propRef])
	if (!floatingContext?.open) return null

	return (
		<FloatingPortal>
			<FloatingFocusManager context={floatingContext} modal={context.modal}>
				<div
					ref={ref}
					style={{ ...context.floatingStyles, ...style }}
					aria-labelledby={context.labelId}
					aria-describedby={context.descriptionId}
					{...context.getFloatingProps(props)}
					className={cn(
						'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
						'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
						className
					)}
				>
					{children}
				</div>
			</FloatingFocusManager>
		</FloatingPortal>
	)
})

export const MenuItem = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement> & {
		inset?: boolean
		message?: boolean
		onItemSelect?: (data: Data) => void
		dataValue?: Data
		label?: string
		disabled?: boolean
	}
>(
	(
		{
			children,
			className,
			inset,
			message,
			onItemSelect,
			dataValue,
			disabled,
			...props
		},
		ref
	) => {
		return (
			<button
				type='button'
				role='menuitem'
				disabled={disabled}
				className={cn(
					'relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-none focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-accent',
					inset && 'pl-8',
					message && 'py-2 pl-6 rounded-[0.5rem] w-full',
					className
				)}
				onClick={event => {
					props.onClick?.(event)
					if (onItemSelect && dataValue) {
						onItemSelect(dataValue)
					}
				}}
				ref={ref}
				{...props}
			>
				{children}
			</button>
		)
	}
)

export function Menu({
	children,
	modal = false,
	...restOptions
}: {
	children: ReactNode
} & MenuOptions) {
	const menu = useMenu({ modal, ...restOptions })
	return <MenuContext.Provider value={menu}>{children}</MenuContext.Provider>
}
