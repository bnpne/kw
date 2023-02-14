import { useRef, useCallback, useEffect } from 'react'
import { invalidate, useFrame, useThree } from '@react-three/fiber'
import normalizeWheel from 'normalize-wheel'
import ImageBlock from './ImageBlock'
import gsap from 'gsap'

// Import Data
import { IMG_ARRAY } from '../lib/data'
import { getDefaultImageDimensions, getScrollLimit } from '../utils/helpers'
import { useRefMounted } from '../utils/hooks'
import { useCaseStore, useTimelineStore } from '../lib/store'

export default function Scene() {
  const mounted = useRefMounted()
  const imagesRef = useRef()
  // viewport is size with camera FOV, size is the actual canvas size
  const { viewport, size } = useThree()
  const { width, height } = viewport
  const numImages = IMG_ARRAY.length
  const scrollLimit = getScrollLimit(width)
  const [setCurrentCard] = useCaseStore((state) => [state.setCurrentCard])

  const {
    width: defaultWidth,
    height: defaultHeight,
    gap: defaultGap,
  } = getDefaultImageDimensions(width)

  const imagesPosRef = useRef(
    Array.from({ length: numImages }).map((_, i) => ({
      currentX: 0,
      targetX: 0,
      currentY: i * -(defaultHeight + defaultGap),
      targetY: i * -(defaultHeight + defaultGap),
    }))
  )

  const updatePlanes = useCallback(
    (deltaTimeValue) => {
      imagesRef.current.children.forEach((item, i) => {
        const { currentY, targetY } = imagesPosRef.current[i]

        // here, check if target is close to snap point. then set target to snap
        // we in business
        let itemIndex = Math.round(targetY / (defaultHeight + defaultGap))
        if (itemIndex === -0) itemIndex = 0 // to not fuck it up!
        const itemSnap = itemIndex * (defaultHeight + defaultGap)

        // updateY
        let newCurrentPosY =
          currentY + (itemSnap - currentY) * 5.5 * deltaTimeValue
        if (Math.abs(newCurrentPosY - itemSnap) <= 0.001) {
          newCurrentPosY = itemSnap
        }

        const old = currentY
        item.position.y = newCurrentPosY
        imagesPosRef.current[i].currentY = newCurrentPosY

        // Update strength
        item.material.uniforms.strength.value =
          ((newCurrentPosY - old) / size.width) * 1000

        if (Math.round(Math.abs(imagesPosRef.current[i].currentY)) === 0) {
          setCurrentCard(i)

          gsap.to(item.material.uniforms.alpha, {
            value: 1,
            duration: 0.5,
            ease: 'circ.easeIn',
          })
        } else {
          gsap.to(item.material.uniforms.alpha, {
            value: 0.2,
            duration: 0.5,
            ease: 'circ.easeIn',
          })
        }
      })

      if (imagesPosRef.current.some((item) => item.targetY !== item.currentY)) {
        invalidate()
      }
    },
    [invalidate, defaultWidth, defaultGap, numImages, scrollLimit]
  )

  const onScroll = useCallback(
    (e) => {
      const { pixelY, pixelX } = normalizeWheel(e)

      const relativeSpeed = Math.min(
        100,
        Math.max(Math.abs(pixelX), Math.abs(pixelY))
      )

      const scrollSpeed = relativeSpeed * 0.01
      const scrollLimit = getScrollLimit(width)
      let direction = 'U'

      if (pixelY > 0) {
        direction = 'U'
      } else {
        direction = 'D'
      }

      // Update position
      imagesPosRef.current.forEach((_, i) => {
        const bottomBoundary = i * -(defaultHeight + defaultGap)
        const topBoundary = bottomBoundary + scrollLimit

        let target =
          imagesPosRef.current[i].targetY +
          (direction === 'U' ? scrollSpeed : -scrollSpeed)
        target = Math.max(bottomBoundary, Math.min(topBoundary, target))
        imagesPosRef.current[i].targetY = target
      })
      invalidate()
    },
    [invalidate, width, defaultGap, defaultWidth, defaultHeight, height]
  )

  useEffect(() => {
    window.addEventListener('wheel', onScroll)
    return () => {
      window.removeEventListener('wheel', onScroll)
    }
  }, [onScroll])

  useEffect(() => {
    imagesRef.current.children.forEach((item, i) => {
      if (i === 0) item.material.uniforms.alpha.value = 1
    })
  }, [])

  useFrame((_, delta) => {
    if (
      !mounted.current ||
      imagesPosRef.current.every((item) => item.targetY === item.currentY)
    ) {
      return
    }

    updatePlanes(delta)
  })

  return (
    <group ref={imagesRef}>
      {IMG_ARRAY.map((_, i) => (
        <ImageBlock key={i} index={i} />
      ))}
    </group>
  )
}
