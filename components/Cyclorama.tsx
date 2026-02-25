'use client'

import * as THREE from 'three'
import { useMemo } from 'react'

export default function Cyclorama() {
  // Create infinity cove cyclorama - floor + curved transition + wall
  const cycloGeometry = useMemo(() => {
    // Create a 2D profile (side view) of the cyclo
    const curve = new THREE.CurvePath<THREE.Vector2>()

    const floorLength = 8  // Length of flat floor
    const wallHeight = 10   // Height of vertical wall
    const curveRadius = 2   // Radius of the curve connecting floor to wall

    // 1. Flat floor section
    curve.add(new THREE.LineCurve(
      new THREE.Vector2(0, 0),
      new THREE.Vector2(floorLength, 0)
    ))

    // 2. Curved transition (quarter circle)
    const curveCenter = new THREE.Vector2(floorLength, curveRadius)
    const curveStart = Math.PI * 1.5  // Start at bottom
    const curveEnd = Math.PI          // End at left (vertical)

    curve.add(new THREE.EllipseCurve(
      curveCenter.x, curveCenter.y,
      curveRadius, curveRadius,
      curveStart, curveEnd,
      true, // clockwise
      0
    ))

    // 3. Vertical wall section
    curve.add(new THREE.LineCurve(
      new THREE.Vector2(floorLength + curveRadius, curveRadius),
      new THREE.Vector2(floorLength + curveRadius, curveRadius + wallHeight)
    ))

    // Get points from curve and create shape
    const points = curve.getPoints(50)
    const shape = new THREE.Shape(points)

    // Extrude the shape to create width
    const extrudeSettings = {
      depth: 30,           // Width of the cyclo
      bevelEnabled: false,
      curveSegments: 32
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [])

  return (
    <mesh
      geometry={cycloGeometry}
      position={[-15, -2, -2]}
      rotation={[0, Math.PI / 2, 0]}
    >
      <meshStandardMaterial
        color="#ffffff"
        roughness={0.9}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
