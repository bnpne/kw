import { useRef, useCallback, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import ImageBlock from './ImageBlock'

// Import Data
import { IMG_ARRAY } from '../lib/data'

export default function Scene() {
  const imagesRef = useRef()

  // viewport is size with camera FOV, size is the actual canvas size
  const { viewport, size } = useThree()
  const [scroll, setScroll] = useState({ current: 0, target: 0, ease: 0.075 })
  
  const imagesScaleRef = useRef(
    IMG_ARRAY.map((el) => ({
    y: (viewport.width * el.wr) / (el.w /el.h),
      x: (viewport.width * el.wr),
    }))
  )

  // const imagesPosRef = useRef(
  //   IMG_ARRAY.map((el, index) => ({
  //     currentX:
  //       -(viewport.width / 2) +
  //       imagesScaleRef.current[index].x / 2 +
  //       (el.l / size.width) * viewport.width,
  //     targetX:
  //       -(viewport.width / 2) +
  //       imagesScaleRef.current[index].x / 2 +
  //       (el.l / size.width) * viewport.width,
  //     currentY:
  //       viewport.height / 2 -
  //       imagesScaleRef.current[index].y / 2 -
  //       (el.t / size.height) * viewport.height,
  //     targetY:
  //       viewport.height / 2 -
  //       imagesScaleRef.current[index].y / 2 -
  //       (el.t / size.height) * viewport.height,
  //   }))
  // )

  const imagesPosRef = useRef(
    IMG_ARRAY.map((el, index) => ({
      currentX: (viewport.width/2) * (el.l / 1920),
      targetX: 0,
        currentY: viewport.height / 2 - imagesScaleRef.current[index].y /2 - ((el.t / size.height) *viewport.height),
      targetY: 0,
    }))
  )

  const updatePlanes = useCallback((deltaTimeValue) => {
    imagesRef.current.children.forEach((item, i) => {
      const { currentX, targetX, currentY, targetY } = imagesPosRef.current[i]
      const { x, y } = imagesScaleRef.current[i]

      // updateX

      // updateY
    })
  })

  useFrame((_, delta) => {
    updatePlanes(delta)
  })

  return (
    <group ref={imagesRef}>
      {IMG_ARRAY.map((el, i) => (
        <ImageBlock
          el={el}
          key={i}
          index={i}
          imagesRef={imagesRef}
          imagesPosRef={imagesPosRef}
          imagesScaleRef={imagesScaleRef}
        />
      ))}
    </group>
  )
}
