'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import InteractiveCube from './InteractiveCube'
import NavigationMenu from './NavigationMenu'
import Link from 'next/link'

export default function Scene3D() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionColor, setTransitionColor] = useState('#000000')

  const handleCubeClick = (link: string, color: string) => {
    setTransitionColor(color)
    setIsTransitioning(true)
  }

  return (
    <div className="w-full h-screen relative bg-white">
      {/* Transition overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-50 animate-fade-in"
          style={{ backgroundColor: transitionColor }}
        />
      )}
      {/* Hover label */}
      {hoveredLabel && (
        <div className="absolute top-1/2 left-8 -translate-y-1/2 z-10 pointer-events-none">
          <div className="text-6xl font-bold text-black opacity-20 transition-opacity duration-300">
            {hoveredLabel}
          </div>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        className="bg-white cursor-pointer"
      >
        {/* HDRI Environment for realistic lighting */}
        <Environment preset="city" background={false} />

        {/* Subtle ambient light */}
        <ambientLight intensity={0.6} />

        {/* Contact shadows for soft realistic shadows */}
        <ContactShadows
          position={[0, -1.99, 0]}
          opacity={0.4}
          scale={15}
          blur={2}
          far={4}
        />

        {/* Cube C - Left - Rotation on X and Z */}
        <InteractiveCube
          position={[-3, 0, 0]}
          color="#11196b"
          link="/projects"
          label="Projets"
          onHoverChange={setHoveredLabel}
          onCubeClick={handleCubeClick}
          rotationSpeed={[0.001, 0, 0.0008]}
        />

        {/* Cube A - Center - Rotation on Y and X */}
        <InteractiveCube
          position={[0, 0, 0]}
          color="#11196b"
          link="/contact"
          label="Contact"
          onHoverChange={setHoveredLabel}
          onCubeClick={handleCubeClick}
          rotationSpeed={[0.0007, 0.001, 0]}
        />

        {/* Cube M - Right - Rotation on Y and Z */}
        <InteractiveCube
          position={[3, 0, 0]}
          color="#11196b"
          link="/about"
          label="À propos"
          onHoverChange={setHoveredLabel}
          onCubeClick={handleCubeClick}
          rotationSpeed={[0, 0.001, 0.0009]}
        />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Navigation menu bottom right */}
      <NavigationMenu />
    </div>
  )
}
