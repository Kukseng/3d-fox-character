'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useState } from 'react'
import * as THREE from 'three'

function Model({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) {
  const { scene } = useGLTF(url)
  
  // Clone the scene to avoid conflicts when using same model multiple times
  const clonedScene = scene.clone()
  
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          // Clone materials to avoid shared material issues
          child.material = child.material.clone()
          child.material.needsUpdate = true
          
          if (child.material.isPhysicalMaterial || child.material.isStandardMaterial) {
            child.castShadow = true
            child.receiveShadow = true
          }
        }
      }
    })
  }, [clonedScene])
  
  return (
    <primitive 
      object={clonedScene} 
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

function CharacterSelector({ onCharacterChange, characters }) {
  return (
    <div className="absolute top-20 left-4 z-10 bg-black bg-opacity-70 text-white p-4 rounded">
      <h3 className="text-lg font-bold mb-2">Characters</h3>
      {characters.map((char, index) => (
        <label key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={char.visible}
            onChange={() => onCharacterChange(index)}
            className="mr-2"
          />
          <span className="text-sm">{char.name}</span>
        </label>
      ))}
    </div>
  )
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading 3D Models...</p>
      </div>
    </div>
  )
}

export default function Scene3D() {
  const [characters, setCharacters] = useState([
    {
      name: "Character 1",
      url: "/models/fox_character_design.glb",
      position: [-2, 0, 0],
      rotation: [0, 0.5, 0],
      scale: [1, 1, 1],
      visible: true
    },
    {
      name: "Character 2", 
      url: "/models/fox-pink.glb", // Add your second model here
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      visible: true
    },
    {
      name: "Character 3",
      url: "/models/fox-red.glb", // Add your third model here
      position: [2, 0, 0],
      rotation: [0, -0.5, 0],
      scale: [1, 1, 1],
      visible: true
    }
  ])

  const toggleCharacter = (index) => {
    setCharacters(prev => prev.map((char, i) => 
      i === index ? { ...char, visible: !char.visible } : char
    ))
  }

  return (
    <div className="w-full h-screen relative">
      

      <CharacterSelector 
        characters={characters}
        onCharacterChange={toggleCharacter}
      />

      <Canvas
        camera={{ position: [0, 1.5, 5], fov: 60 }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.8
        }}
        shadows
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 10, 7]} 
          intensity={0.5}
          castShadow 
        />
        <pointLight position={[-5, 5, 5]} intensity={0.2} />
        
        {/* Ground plane */}
        <mesh receiveShadow position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        <Suspense fallback={null}>
          {characters.map((character, index) => 
            character.visible && (
              <Model
                key={`${character.url}-${index}`}
                url={character.url}
                position={character.position}
                rotation={character.rotation}
                scale={character.scale}
              />
            )
          )}
        </Suspense>
        
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={15}
          target={[0, 1, 0]}
        />
      </Canvas>
      
      <Suspense fallback={<Loader />}>
        <div />
      </Suspense>
    </div>
  )
}