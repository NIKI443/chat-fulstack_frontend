import React from 'react'
import { cn } from '@/lib/utils'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Props {
	className?: string
	classTitle?: string
	classDescription?: string
	classCancel?: string
	classAction?: string
	classFooter?: string
	classHeader?: string
	title: string
	description: string
	cancel: string
	action: string
	clickAction: () => void
}

export const ActionConfirm: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	description,
	cancel,
	action,
	clickAction,
	className,
	classTitle,
	classDescription,
	classCancel,
	classAction,
	classFooter,
	classHeader,
	children,
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

			<AlertDialogContent
				className={cn('bg-white w-full max-w-95 rounded-3xl', className)}
			>
				<AlertDialogHeader className={cn('text-left', classHeader)}>
					<AlertDialogTitle className={cn('', classTitle)}>
						{title}
					</AlertDialogTitle>
					<AlertDialogDescription className={cn('', classDescription)}>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter
					className={cn('flex-row justify-end space-x-2', classFooter)}
				>
					<AlertDialogCancel className={cn('mt-0', classCancel)}>
						{cancel}
					</AlertDialogCancel>
					<AlertDialogAction
						className={cn('', classAction)}
						onClick={clickAction}
					>
						{action}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
