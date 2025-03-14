import { useEffect } from 'react'
import { useMatchStore } from '@/store/useMatchStore'
import { Button } from '@/components/ui/button'
import { MatchesSkeleton } from './matchesSkeleton'
import { ListMatchItem } from './listMatchItem'

export const ListMatches = () => {
	const { getMatch, matches, isMatchesLoading, errorMassage } = useMatchStore()
	useEffect(() => {
		getMatch()
	}, [getMatch])
	console.log(matches)
	return (
		<div>
			<div className='h-14 mb-5 flex justify-between items-end gap-3 text-lg '>
				<img src='match_tracker.png' alt='Match Tracker' className='mb-4.25' />
				<div className='h-full flex gap-3'>
					<div
						className={`px-6 py-3.5 flex items-center gap-2.5 rounded-lg text-white bg-[#0F1318] duration-250 ${
							errorMassage
								? 'translate-0 opacity-100'
								: 'translate-x-4 opacity-0'
						}`}
					>
						<img src='alert-triangle.svg' alt='error' />
						<p>{'Ошибка: не удалось загрузить информацию'}</p>
					</div>

					<Button
						onClick={getMatch}
						className='h-full px-10  text-lg cursor-pointer bg-[#EB0237] hover:bg-[#EB0237]/80'
					>
						Обновить
						{isMatchesLoading && (
							<img src='spin.svg' alt='spin' className='w-7 animate-spin' />
						)}
					</Button>
				</div>
			</div>
			{isMatchesLoading
				? Array(7)
						.fill(null)
						.map((_, index) => <MatchesSkeleton key={index} />)
				: matches?.map(match => (
						<ListMatchItem
							key={match.time}
							statusMatch={match.status}
							commandOne={match.awayTeam.name}
							commandTwo={match.homeTeam.name}
							awayScore={match.awayScore}
							homeScore={match.homeScore}
						/>
				  ))}
		</div>
	)
}
