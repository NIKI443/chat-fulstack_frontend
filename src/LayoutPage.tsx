import {
	Chat,
	SidebarMenu,
	VerticalCenterContainer,
	NoChatSelected,
} from '@/components/shared/index'
import { useChatStore } from '@/store'
import AnimatedOutlet from './components/shared/animated/AnimatedOutlet'
import { ChatMobil } from './components/shared/Application/chat/chatMobil'
import { useLocation } from 'react-router'

export default function LayoutPage() {
	const { selectedUser, isActiveSidMenu } = useChatStore()
	const location = useLocation()

	return (
		<div className='xs:bg-[#DECFF4]'>
			<ChatMobil />
			<VerticalCenterContainer className='select-none h-screen before:h-[100%]'>
				{/* overflow-y-hidden */}
				<div className='w-full h-full inline-block align-middle'>
					<div className='w-full h-full grid justify-normal items-end xs:grid-flow-col xs:grid-cols-menubar_s lg:grid-cols-menubar'>
						<div className='w-full h-full row-start-2 block xs:hidden'>
							{(location.pathname == '/' || location.pathname == '/settings') &&
								isActiveSidMenu && <SidebarMenu />}
						</div>
						<div className='w-full h-full hidden xs:block'>
							<SidebarMenu />
						</div>
						<main className='w-full h-full gap-x-8 max-h-svh pt-7 px-5 xs:p-6 flex justify-center  xs:rounded-r-2xl xs:bg-primary'>
							<div className='h-full w-full xs:w-95'>
								<AnimatedOutlet />
							</div>
							<div className='w-full h-full hidden xs:block'>
								{!selectedUser ? <NoChatSelected /> : <Chat />}
							</div>
						</main>
					</div>
				</div>
			</VerticalCenterContainer>
		</div>
	)
}
