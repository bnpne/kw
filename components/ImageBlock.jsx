import { useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import './ImageShaderMaterial'

import { IMG_SRC_ARRAY } from '../lib/data'

export default function ImageBlock({
  el,
  index,
  imagesRef,
  imagesPosRef,
  imagesScaleRef,
}) {
  const { viewport, size, camera } = useThree()
  const imgTexture = useTexture(IMG_SRC_ARRAY[index].src)
  const meshRef = useRef()

  return (
    <mesh
      ref={meshRef}
      position={[
        imagesPosRef.current[index].currentX,
        imagesPosRef.current[index].currentY,
        0,
      ]}
      scale={[
        imagesScaleRef.current[index].x,
        imagesScaleRef.current[index].y,
        0,
      ]}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <imageShaderMaterial tex={imgTexture} />
    </mesh>
  )
}
