import { IMG_ARRAY } from '../lib/data'

export const WIDTH_RATIO = 0.4
export const HEIGHT_WIDTH_RATIO = 16 / 9
export const GAP_RATIO = 0.015

const numImages = IMG_ARRAY.length

export function getDefaultImageDimensions(canvasWidth) {
  return {
    width: canvasWidth * WIDTH_RATIO * 1.5,
    height: ((canvasWidth * WIDTH_RATIO) / HEIGHT_WIDTH_RATIO) * 1.5,
    gap: canvasWidth * GAP_RATIO,
  }
}

export function getScrollLimit(canvasWidth) {
  const { height, gap } = getDefaultImageDimensions(canvasWidth)
  return (numImages - 1) * (height + gap)
}
