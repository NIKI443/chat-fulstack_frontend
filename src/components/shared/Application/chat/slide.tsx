import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import Download from 'yet-another-react-lightbox/plugins/download'

import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/counter.css'

import { useMessageStore } from '@/store'
import { MessagesImg } from '@/types/storeType'

export const Slide: React.FC<React.PropsWithChildren<{ imageUrl: string }>> = ({
    children,
    imageUrl,
}) => {
    const [index, setIndex] = useState(-1)
    const { messagesImg } = useMessageStore()

    const slides = messagesImg.flatMap(({ image }: MessagesImg) => {
        if (image) {
            return {
                src: image.url,
                width: image.width,
                height: image.height,
            }
        }
        return []
    })

    const massageSlide = () => {
        messagesImg.forEach(({ image }: MessagesImg, index: number) => {
            if (image && image.url === imageUrl) {
                setIndex(index)
            }
        })
    }

    return (
        <>
            <button type='button' onClick={massageSlide}>
                {children}
            </button>
            <Lightbox
                index={index}
                open={index >= 0}
                close={() => setIndex(-1)}
                slides={slides}
                plugins={[Counter, Zoom, Download]}
            />
        </>
    )
}

