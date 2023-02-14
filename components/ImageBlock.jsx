import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import './ImageShaderMaterial'

import { IMG_ARRAY } from '../lib/data'
import { getDefaultImageDimensions } from '../utils/helpers'

export default function ImageBlock({ index }) {
  const { viewport } = useThree()
  const { width, height } = viewport
  const imgTexture = useTexture(IMG_ARRAY[index].stills[0])
  const meshRef = useRef()
  let alpha = { value: 0.5 }

  const imgDim = {
    x: IMG_ARRAY[index].stills[0].width,
    y: IMG_ARRAY[index].stills[0].height,
  }

  const {
    width: defaultWidth,
    height: defaultHeight,
    gap: defaultGap,
  } = getDefaultImageDimensions(width)

  return (
    <mesh
      ref={meshRef}
      position={[0, index * -(defaultHeight + defaultGap), 0.001]}
      scale={[defaultWidth, defaultHeight, 1]}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <imageShaderMaterial
        transparent
        tex={imgTexture}
        alpha={alpha.value}
        index={index}
        viewportSizes={[width, height]}
        strength={0}
        imgDim={[imgDim.x, imgDim.y]}
        planeDim={[defaultWidth, defaultHeight]}
      />
    </mesh>
  )
}
