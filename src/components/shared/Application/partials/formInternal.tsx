import React from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Form,
	FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/shared'
import { UserAuthData } from '@/types/storeType'

const messageMinMax = (min: number, max: number) => {
	return { message: `Введите от ${min} до ${max} символов` }
}

interface FormConfig {
	name: string
	label: string
	placeholder: string
	isUse?: boolean
	description?: string
}

interface Props {
	className?: string
	classForm?: string
	classButton?: string
	onFunction: (data: UserAuthData) => Promise<void>
	isLauding: boolean
	isName?: boolean
	isSurname?: boolean
	isEmail?: boolean
	isPassword?: boolean
	isUserID?: boolean
}

export const FormInternal: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	className,
	classButton,
	onFunction,
	isLauding,
	isName,
	isSurname,
	isEmail,
	isPassword,
	isUserID,
}) => {
	const FormSchema = z.object({
		email: isEmail
			? z.string().email({
					message: 'Неправильный формат почты',
			  })
			: z
					.string()
					.email({
						message: 'Неправильный формат почты',
					})
					.optional()
					.or(z.literal('')),

		password: isPassword
			? z.string().min(5, messageMinMax(5, 50)).max(50, messageMinMax(5, 50))
			: z
					.string()
					.min(5, messageMinMax(5, 50))
					.max(50, messageMinMax(5, 50))
					.optional()
					.or(z.literal('')),

		name: isName
			? z.string().min(3, messageMinMax(3, 50)).max(50, messageMinMax(3, 50))
			: z
					.string()
					.max(50, messageMinMax(3, 50))
					.min(3, messageMinMax(3, 50))
					.optional()
					.or(z.literal('')),
		surname: z
			.string()
			.max(50, messageMinMax(3, 50))
			.min(3, messageMinMax(3, 50))
			.optional()
			.or(z.literal('')),

		UserID: isUserID
			? z.string().min(3, messageMinMax(3, 50)).max(50, messageMinMax(3, 50))
			: z
					.string()
					.min(3, messageMinMax(3, 50))
					.max(50, messageMinMax(3, 50))
					.optional()
					.or(z.literal('')),
	})
 type FormSchemaType = z.infer<typeof FormSchema>

	const form = useForm<FormSchemaType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: 'Никита',
			surname: '',
			email: 'test@test.com',
			password: 'qweqwe',
			UserID: 'qwer',
		},
	})

	const formConfig: FormConfig[] = [
		{
			name: 'name',
			label: 'Имя',
			placeholder: 'Иван',
			isUse: isName,
		},
		{
			name: 'surname',
			label: 'Фамилия',
			placeholder: 'Иванович',
			isUse: isSurname,
		},
		{
			name: 'UserID',
			label: 'ID',
			placeholder: 'userID',
			isUse: isUserID,
			description: 'ID должен быть уникальным',
		},
		{
			name: 'email',
			label: 'Email',
			placeholder: 'text@mail.com',
			isUse: isEmail,
		},
		{
			name: 'password',
			label: 'Пароль',
			placeholder: '••••••',
			isUse: isPassword,
		},
	]

	function onSubmit(data: z.infer<typeof FormSchema>) {
		const formData: Partial<FormSchemaType> = Object.entries(data).reduce(
			(acc, [key, value]) => {
				if (value) {
					acc[key as keyof FormSchemaType] = value
				}
				return acc
			},
			{} as Partial<FormSchemaType>
		)

		onFunction(formData)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn('-mt-2 text-lg w-75', className)}
			>
				{formConfig.map((config, index) => (
					<div key={index}>
						{config.isUse && (
							<FormField
								control={form.control}
								name={config.name}
								render={({ field }) => (
									<FormItem>
										<FormLabel>{config.label}</FormLabel>
										<FormControl>
											<Input placeholder={config.placeholder} {...field} />
										</FormControl>
										<FormDescription>{config.description}</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>
				))}
				<Button
					type='submit'
					variant='auth'
					size='auth'
					className={cn('mt-[20%]', classButton)}
					disabled={isLauding}
				>
					{isLauding ? (
						<div className='flex gap-2.5 text-base'>
							<Loader />
							Загрузка...
						</div>
					) : (
						children
					)}
				</Button>
			</form>
		</Form>
	)
}
