import { FC } from 'react'

interface Props {
	statusMatch: string
	commandOne: string
	commandTwo: string
	awayScore: number
	homeScore: number
}

export const ListMatchItem: FC<Props> = ({
	statusMatch,
	awayScore,
	commandOne,
	commandTwo,
	homeScore,
}) => {
	const Finished = {
		class: statusMatch == 'Finished' && 'bg-[#EB0237]',

		text: statusMatch == 'Finished' && 'Finished',
	}
	const Scheduled = {
		class: statusMatch == 'Scheduled' && 'bg-[#EB6402]',
		text: statusMatch == 'Scheduled' && 'Match preparing',
	}
	const Ongoing = {
		class: statusMatch == 'Ongoing' && 'bg-[#43AD28]',
		text: statusMatch == 'Ongoing' && 'Live',
	}

	const status = {
		class: Finished.class || Scheduled.class || Ongoing.class,
		name: Finished.text || Scheduled.text || Ongoing.text,
	}

	return (
		<div className='h-26 flex justify-between items-center text-white my-4 p-4 px-9 bg-[#0b0e12]'>
			<div className='flex gap-3.5 items-center'>
				<img src='match_logo.png' alt='match logo' />
				<p>{commandOne}</p>
			</div>
			<div className='w-40 text-center flex flex-col items-center gap-1 text-xl font-semibold'>
				<p>
					{awayScore}:{homeScore}
				</p>
				<div
					className={`w-max min-w-26 py-2.5 px-5 text-center text-sm  rounded-md ${status.class} `}
				>
					{status.name}
				</div>
			</div>
			<div className='flex gap-3.5 items-center'>
				<p>{commandTwo}</p>
				<img src='match_logo.png' alt='match logo' />
			</div>
		</div>
	)
}
