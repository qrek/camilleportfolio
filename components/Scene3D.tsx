'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import InteractiveCube from './InteractiveCube'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Scene3D() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionColor, setTransitionColor] = useState('#000000')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  const handleCubeClick = (link: string, color: string) => {
    setTransitionColor(color)
    setIsTransitioning(true)
  }

  return (
    <main
      className="relative min-h-screen bg-[#efefef] px-4 pb-8 pt-4 text-[#111111] md:px-8 md:pb-10"
      onPointerMove={(event) => {
        setCursorPosition({ x: event.clientX, y: event.clientY })
      }}
    >
      {/* Transition overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-50 animate-fade-in"
          style={{ backgroundColor: transitionColor }}
        />
      )}
      {/* Hover label */}
      {hoveredLabel && (
        <div
          className="pointer-events-none fixed z-40 rounded-full bg-black px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-white shadow-lg"
          style={{ left: cursorPosition.x + 12, top: cursorPosition.y + 16 }}
        >
          {hoveredLabel}
        </div>
      )}

      <motion.header
        className="mb-4 border-b border-black/25 pb-3 pt-1"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <nav className="grid grid-cols-3 items-center text-[14px] leading-none md:text-[18px]">
          <motion.span
            className="justify-self-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
          >
            Portfolio
          </motion.span>
          <motion.span
            className="justify-self-center font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
          >
            2026
          </motion.span>
          <motion.div
            className="justify-self-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
          >
            <Link href="/contact" className="hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </motion.div>
        </nav>
      </motion.header>

      <section className="relative mb-4 h-[58vh] min-h-[360px] w-full md:h-[70vh] md:min-h-[620px]">
        <Canvas
          camera={{ position: [0, 0.1, 8.2], fov: 46 }}
          className="cursor-pointer"
        >
          <Environment preset="city" background={false} />
          <ambientLight intensity={0.6} />
          <ContactShadows
            position={[0, -1.85, 0]}
            opacity={0.35}
            scale={15}
            blur={2.2}
            far={4}
          />

          <InteractiveCube
            position={[-3, 0, 0]}
            color="#11196b"
            link="/projects"
            label="Projets"
            onHoverChange={setHoveredLabel}
            onCubeClick={handleCubeClick}
            rotationSpeed={[0.001, 0, 0.0008]}
          />

          <InteractiveCube
            position={[0, 0, 0]}
            color="#11196b"
            link="/contact"
            label="Contact"
            onHoverChange={setHoveredLabel}
            onCubeClick={handleCubeClick}
            rotationSpeed={[0.0007, 0.001, 0]}
          />

          <InteractiveCube
            position={[3, 0, 0]}
            color="#11196b"
            link="/about"
            label="A propos"
            onHoverChange={setHoveredLabel}
            onCubeClick={handleCubeClick}
            rotationSpeed={[0, 0.001, 0.0009]}
          />

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </section>

      <motion.section
        className="mt-6 border-t border-black/25 pt-6 md:mt-10 md:pt-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.75, ease: 'easeOut' }}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:gap-10">
          <motion.h1
            className="text-5xl font-bold uppercase leading-none tracking-tight md:text-8xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.95, ease: 'easeOut' }}
          >
            Portfolio
          </motion.h1>
          <motion.p
            className="max-w-[22ch] text-xl leading-[1.15] md:max-w-none md:text-[25px] md:leading-[1.05]"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
          >
            Camille Ameline de Cadeville. Directrice artistique et motion designer, basee a Paris,
            specialisee dans le developpement d&apos;identites de marque et dans la creation de
            contenus visuels et digitaux.
          </motion.p>
        </div>
      </motion.section>
    </main>
  )
}
