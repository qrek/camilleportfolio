'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRouter } from 'next/navigation'
import { Outlines, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveCubeProps {
  position: [number, number, number]
  color: string
  link: string
  label: string
  onHoverChange: (label: string | null) => void
  onCubeClick: (link: string, color: string) => void
  rotationSpeed?: [number, number, number]
}

export default function InteractiveCube({
  position,
  color,
  link,
  label,
  onHoverChange,
  onCubeClick,
  rotationSpeed = [0.001, 0.001, 0]
}: InteractiveCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  // Animation de lévitation
  useFrame((state) => {
    if (meshRef.current) {
      // Lévitation douce avec un mouvement sinusoïdal
      const floatY = Math.sin(state.clock.elapsedTime + position[0]) * 0.2
      meshRef.current.position.y = position[1] + floatY

      // Rotation avec axes personnalisés
      meshRef.current.rotation.x += rotationSpeed[0]
      meshRef.current.rotation.y += rotationSpeed[1]
      meshRef.current.rotation.z += rotationSpeed[2]

      // Animation au survol - scale up légèrement
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    onCubeClick(link, color)
    // Navigate after transition
    setTimeout(() => {
      router.push(link)
    }, 800)
  }

  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    onHoverChange(label)
  }

  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    onHoverChange(null)
  }

  return (
    <RoundedBox
      ref={meshRef}
      args={[2.6, 2.6, 2.6]}
      radius={0.15}
      smoothness={4}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
    >
      <meshStandardMaterial
        color={color}
        emissive={hovered ? color : '#000000'}
        emissiveIntensity={hovered ? 0.6 : 0}
        roughness={0.3}
        metalness={0.9}
        envMapIntensity={2}
      />
      {hovered && (
        <Outlines thickness={0.05} color="black" opacity={0.8} />
      )}
    </RoundedBox>
  )
}
