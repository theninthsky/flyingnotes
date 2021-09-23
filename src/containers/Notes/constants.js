const VIEWPORT_7 = '(min-width: 768px)'
const VIEWPORT_12 = '(min-width: 1200px)'
const VIEWPORT_18 = '(min-width: 1800px)'

const getRenderBatch = () => {
  if (window.matchMedia(VIEWPORT_18).matches) return 32
  if (window.matchMedia(VIEWPORT_12).matches) return 20
  if (window.matchMedia(VIEWPORT_7).matches) return 14
  return 10
}

export const RENDER_BATCH = getRenderBatch()
