import { create } from 'zustand'
import axios from '@/lib/axios'

interface Team {
	name: string
	place: number
	players: {
		kills: number
		username: string
	}[]
	points: number
	total_kills: number
}
interface Matches {
	awayScore: number
	awayTeam: Team
	homeScore: number
	homeTeam: Team
	status: string
	time: string
}
interface MatchState {
	matches: Matches[]
	isMatchesLoading: boolean 
	errorMassage: string
}

interface MatchActions {
	getMatch: () => Promise<void>
}

export const useMatchStore = create<MatchState & MatchActions>()(set => ({
	matches: [],
	isMatchesLoading: true,
	errorMassage: '',
	getMatch: async () => {
		set({ isMatchesLoading: true })
		try {
			const response = await axios.get('/fronttemp')

			set({ matches: response.data.data.matches, isMatchesLoading: false })
		} catch (error: any) {
			console.log(error)
			set({
				errorMassage: 'Ошибка: не удалось загрузить информацию',
			})
		}
	},
}))
