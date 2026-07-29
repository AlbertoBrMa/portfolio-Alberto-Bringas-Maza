import { useCallback, useEffect, useState, type RefObject } from 'react'

// Safari en iPhone (a diferencia de iPad) no implementa la Fullscreen API
// estándar para elementos normales: document.exitFullscreen/requestFullscreen
// no existen ahí. Llamarlos directamente lanza un TypeError síncrono que
// .catch() no intercepta (el método ni siquiera existe), y si eso ocurre
// dentro de un efecto sin Error Boundary, React desmonta toda la app.
export function exitFullscreen() {
  if (typeof document.exitFullscreen === 'function') {
    document.exitFullscreen().catch(() => {})
  }
}

function requestFullscreen(el: HTMLElement) {
  if (typeof el.requestFullscreen === 'function') {
    el.requestFullscreen().catch(() => {})
  }
}

export function useFullscreen(ref: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === ref.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [ref])

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullscreen()
    } else if (ref.current) {
      requestFullscreen(ref.current)
    }
  }, [ref])

  useEffect(() => {
    const node = ref.current
    return () => {
      if (document.fullscreenElement === node) exitFullscreen()
    }
  }, [ref])

  return { isFullscreen, toggle }
}
