import { useEffect, useRef, useState } from 'react'
import { img as getImg } from '../data/images'

type Props = { name: string; alt: string; scroll?: boolean; maxH?: number }

/** Картинка, открывается на весь экран. scroll=true: длинный макет в окне с прокруткой. */
export default function Zoom({ name, alt, scroll = false, maxH = 560 }: Props) {
  const im = getImg(name)
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const picture = (
    <img src={im.src} width={im.w} height={im.h} alt={alt} loading="lazy" decoding="async" draggable={false} />
  )

  return (
    <>
      {scroll ? (
        <div className="shot shot--scroll" style={{ maxHeight: maxH }}>
          <div className="shot__inner" tabIndex={0} aria-label={`${alt}. Прокручивается`}>
            {picture}
          </div>
          <button type="button" className="shot__expand" onClick={() => setOpen(true)} aria-label="Открыть на весь экран">
            На весь экран
          </button>
        </div>
      ) : (
        <button type="button" className="shot shot--btn" onClick={() => setOpen(true)} aria-label={`${alt}. Открыть на весь экран`}>
          {picture}
        </button>
      )}

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          <button ref={closeRef} type="button" className="lightbox__close" onClick={() => setOpen(false)}>
            Закрыть
          </button>
          <div className="lightbox__body" onClick={(e) => e.stopPropagation()}>
            <img src={im.src} alt={alt} />
          </div>
        </div>
      )}
    </>
  )
}
