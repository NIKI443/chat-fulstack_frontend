import React, { useEffect, useRef, useState } from 'react'
import AddPlusLogo from '~/appsPicture/plus.svg?react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMessageStore } from '@/store'
import axios from '@/lib/axios'
import toast from 'react-hot-toast'

interface Props {
	className?: string
	updateOfMessage?: {
		messageId: string
		text: string
		imgUrl: string
	} | null
	setUpdatedOfMessage?: React.Dispatch<React.SetStateAction<{} | null>>
}

export const MassageField: React.FC<Props> = ({
	className,
	updateOfMessage,
	setUpdatedOfMessage,
}) => {
	const [message, setMessage] = useState('')
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')
	const inputFileRef = useRef<HTMLInputElement>(null)
	const { sendMessage, editMessage } = useMessageStore()

	useEffect(() => {
		if (updateOfMessage?.messageId) {
			setMessage(updateOfMessage?.text)
			setImagePreview(updateOfMessage?.imgUrl)
		} else {
			setMessage('')
		}
	}, [updateOfMessage])

	useEffect(() => {
		return () => {
			if (imagePreview) {
				URL.revokeObjectURL(imagePreview)
			}
		}
	}, [imagePreview])

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!message.trim() && !imagePreview) return
		try {
			let imageUrl, imageWidth, imageHeight
			if (image) {
				const img = new Image()
				img.src = URL.createObjectURL(image)
				await new Promise<void>(resolve => {
					img.onload = () => {
						imageWidth = img.width
						imageHeight = img.height
						resolve()
					}
				})

				const formData = new FormData()
				formData.append('massageImg', image)

				const { data } = await axios.post('/upload/massage', formData, {
					headers: { 'Content-Type': 'multipart/form-data' },
				})
				imageUrl = `${
					import.meta.env.REACT_APP_BACKEND_URI || 'http://localhost:4444'
				}/${data.url}`
			}

			if (updateOfMessage?.messageId) {
				if (imageUrl ?? imagePreview) {
					const img = new Image()
					img.src = imageUrl ?? imagePreview
					await new Promise<void>(resolve => {
						img.onload = () => {
							imageWidth = img.width
							imageHeight = img.height
							resolve()
						}
					})

					await editMessage(updateOfMessage.messageId, {
						text: message.trim(),
						imgUrl: imageUrl ?? imagePreview,
						width: imageWidth,
						height: imageHeight,
					})
				} else {
					await editMessage(updateOfMessage.messageId, {
						text: message.trim(),
					})
				}
				if (setUpdatedOfMessage) setUpdatedOfMessage(null)
			} else {
				await sendMessage({
					text: message.trim(),
					imgUrl: imageUrl,
					width: imageWidth,
					height: imageHeight,
				})
			}
			setMessage('')
			setImage(null)
			setImagePreview('')
		} catch (error) {
			console.error('Failed to send/edit message:', error)
			toast.error('Произошла ошибка при отправке сообщения')
		}
	}

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		if (!file.type.startsWith('image/')) {
			toast.error('Пожалуйста, выберите картинку')
			return
		}

		setImage(file)

		const imageUrl = URL.createObjectURL(file)
		setImagePreview(imageUrl)
	}

	const removeImage = () => {
		if (imagePreview) {
			URL.revokeObjectURL(imagePreview)
		}
		setImagePreview('')
		setImage(null)
		if (inputFileRef.current) inputFileRef.current.value = ''
	}

	return (
		<div className='w-full'>
			{imagePreview && (
				<div className='mb-2 ml-3 flex items-center gap-2'>
					<div className='relative'>
						<img
							src={imagePreview}
							alt='Preview'
							className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
						/>
						<button
							onClick={removeImage}
							className='absolute -top-1.5 -right-2.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
							type='button'
						>
							<AddPlusLogo className='stroke-zinc-500 rotate-45' />
						</button>
					</div>
				</div>
			)}
			<form
				onSubmit={handleSendMessage}
				className={cn('w-full mt-1 xs:w-field xs:my-2.5 mx-auto', className)}
			>
				<div className='flex w-full relative pr-20 xs:rounded-lg bg-backDefault'>
					<Button
						size='icon'
						variant='link'
						className={`h-14 -mx-3 right-0 rounded-lg`}
						onClick={(e: React.ChangeEvent<HTMLButtonElement>) => {
							e.preventDefault()
							inputFileRef.current?.click()
						}}
					>
						<img src='appsPicture/gallery.svg' alt='gallery' />
					</Button>
					<input
						ref={inputFileRef}
						type='file'
						onChange={handleChangeImage}
						hidden
					/>
					<Textarea
						placeholder='Сообщение...'
						value={message}
						onChange={e => setMessage(e.target.value)}
						className='w-full h-28 xs:h-14 pt-3 resize-none textarea-radix-scroll-area-viewport border-none outline-none shadow-none focus-visible:ring-transparent text-zinc-700 placeholder:text-ring active:border-none'
					/>
					<Button
						type='submit'
						size='icon'
						variant='link'
						className={`h-14 mt-5 mr-4 xs:m-0 ${
							updateOfMessage?.messageId ? 'w-18 pl-2' : 'w-22 pl-10'
						} absolute right-0 rounded-lg bg-primary/25 hover:bg-primary/35 duration-200`}
						disabled={!message?.trim() && !imagePreview}
					>
						{updateOfMessage?.messageId ? (
							<img
								src='appsPicture/check-mark.svg'
								alt='Отправить'
								className='w-5 stroke-default'
							/>
						) : (
							<img src='appsPicture/arrow-right.svg' alt='Отправить' />
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}
