import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'

export default function R({ children, ...props }) {
  const canvasSizeRef = useRef({
    width: 0,
    height: 0,
  })

  return (
    <Canvas
      linear={true}
      flat={true}
      gl={{ antialias: true, alpha: true }}
      onCreated={(state) => {
        const { viewport } = state
        const { width, height } = viewport
        canvasSizeRef.current.width = width
        canvasSizeRef.current.height = height
      }}
      {...props}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        near={0.1}
        far={100}
        fov={75}
      />
      {children}
    </Canvas>
  )
}
