export interface Message {
	_id: string
	text: string
	roomId: string
	senderId: string
	content: string
	seen: boolean
}

export interface MessagesImg {
	width: number
	height: number
	url: string
}
export interface Data {
	id: string
	to: string
	text?: string
	imgUrl?: string
}
export interface Chats {
	_id: string
	UserID: string
	createdAt: string
	email: string
	fullName: string
	passwordHash: string
	role: string
	roomId: string
	updatedAt: string
}

export interface User {
	_id: string
	name: string
	passwordHash: string
	surname?: string
	UserID: string
	createdAt: string
	updatedAt: string
}
export interface UserAuthData {
	email: string
	password: string
	name: string
	surname: string
	UserID: string
}

export interface Error {
	response: {
		data: {
			message: string
		}
	}
}
