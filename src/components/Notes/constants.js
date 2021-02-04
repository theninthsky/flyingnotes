import { VIEWPORT_7, VIEWPORT_12, VIEWPORT_18 } from 'media-queries'

const getRenderLimit = () => {
  if (window.matchMedia(VIEWPORT_18).matches) return 30
  if (window.matchMedia(VIEWPORT_12).matches) return 16
  if (window.matchMedia(VIEWPORT_7).matches) return 10
  return 6
}

export const RENDER_LIMIT = getRenderLimit()
