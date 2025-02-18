export interface Message {
	_id: string
	text?: string
	roomId: string
	senderId: string
	content: string
	seen: boolean
	createdAt: string
	isFirst?: boolean
	image?: {
		url?: string
		width?: number
		height?: number
	}
}

export interface EndMessages {
	chat: {
		createdAt: string
		isFirst?: boolean
		seen: boolean
		senderId: string
		text?: string
		imgUrl?: string
	}
	roomId: string
}

export interface EditSendMessage {
	text?: string
	imgUrl?: string
	width?: number
	height?: number
}

export interface UpdateOfMessage {
	messageId: string
	text?: string
	imgUrl?: string
}

export interface MessagesImg {
	image?: {
		url?: string
		width?: number
		height?: number
	}
}
export interface Data {
	id: string
	do: string
	text?: string
	imgUrl?: string
}
export interface Chats {
	_id: string
	UserID: string
	createdAt: string
	avatarUrl?: string
	email: string
	fullName: string
	passwordHash: string
	role: string
	roomId: string
	updatedAt: string
	lastMessage: {
		text?: string
		seen: boolean
		senderId: string
		createdAt: string
	}
	users: []
}

export interface User {
	_id: string
	name: string
	email: string
	passwordHash: string
	surname?: string
	fullName: string
	avatarUrl?: string
	UserID: string
	createdAt: string
	updatedAt: string
	roomId: string
}
export interface UserAuthData {
	email?: string
	password?: string
	name?: string
	surname?: string
	UserID?: string
	avatarUrl?: string
}

// export interface CustomError {
// 	response: {
// 		data: {
// 			message: string
// 		}
// 	}
// }
