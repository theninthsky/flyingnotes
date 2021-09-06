const VIEWPORT_7 = '(min-width: 768px)'
const VIEWPORT_12 = '(min-width: 1200px)'
const VIEWPORT_18 = '(min-width: 1800px)'

const getRenderBatch = () => {
  if (window.matchMedia(VIEWPORT_18).matches) return 30
  if (window.matchMedia(VIEWPORT_12).matches) return 18
  if (window.matchMedia(VIEWPORT_7).matches) return 12
  return 8
}

export const RENDER_BATCH = getRenderBatch()
