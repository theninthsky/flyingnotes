import { VIEWPORT_7, VIEWPORT_12, VIEWPORT_18 } from 'media-queries'

const getRenderLimit = () => {
  if (window.matchMedia(VIEWPORT_18)) return 30
  if (window.matchMedia(VIEWPORT_12)) return 20
  if (window.matchMedia(VIEWPORT_7)) return 14
  return 8
}

export const RENDER_LIMIT = getRenderLimit()
export const REMOVE_RENDER_LIMIT_TIMEOUT = 200
