// import Scene3D from '../app/components/Scene3D'

// export default function Home() {
//   return (
//     <main className="w-full h-screen">
//       <div className="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white p-4 rounded">
//         <h1 className="text-xl font-bold mb-2">Stack-Quiz Character </h1>
        
//       </div>
//       <Scene3D />
//     </main>
//   )
// }
'use client'
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { ChevronLeft, ChevronRight, RotateCw, ZoomIn, ZoomOut, Home } from 'lucide-react';

// Model component
function Model({ url, scale = 1 }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={[scale, scale, scale]} />;
}

// Loading component
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-6"></div>
        <p className="text-lg font-semibold">Loading Character...</p>
      </div>
    </div>
  );
}

const characters = [
  { id: 1, name: "Cactus Character", file: "/models/blue-3d-2.glb", description: "Cute cactus with pink flowers" },
  { id: 2, name: "Character 2", file: "/models/blue-3d.glb", description: "Second character design" },
  { id: 3, name: "Character 3", file: "/models/green-plant-3d.glb", description: "Third character design" },
  { id: 4, name: "Character 4", file: "/models/lion-3d.glb", description: "Fourth character design" },
  { id: 5, name: "Character 5", file: "/models/orange-3d.glb", description: "Fifth character design" },
  { id: 6, name: "Character 6", file: "/models/panda-3d.glb", description: "Sixth character design" },
  { id: 7, name: "Character 7", file: "/models/sunflower-3d.glb", description: "Seventh character design" },
  { id: 8, name: "Character 8", file: "/models/yellow-3d.glb", description: "Eighth character design" }
];

export default function CharacterViewer3D() {
  const [currentCharacter, setCurrentCharacter] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [scale, setScale] = useState(1);

  const nextCharacter = () => {
    setCurrentCharacter((prev) => (prev + 1) % characters.length);
  };

  const prevCharacter = () => {
    setCurrentCharacter((prev) => (prev - 1 + characters.length) % characters.length);
  };

  const resetView = () => {
    setScale(1);
    setAutoRotate(true);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.2));
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">3D Character Showcase</h1>
           
          </div>
          <div className="text-right">
            <div className="text-white/70 text-sm">Character</div>
            <div className="text-white font-semibold">{currentCharacter + 1} of {characters.length}</div>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas */}
      <div className="absolute inset-0 pt-24 pb-32">
        <Canvas
          camera={{ position: [0, 2, 4], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          shadows
        >
          <ambientLight intensity={1.2} />
          <directionalLight 
            position={[5, 10, 7]} 
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Front lighting for face and body */}
          <directionalLight 
            position={[0, 2, 5]} 
            intensity={1.8}
            color="#ffffff"
          />
          {/* Side fill lights */}
          <pointLight position={[-3, 2, 3]} intensity={1.2} color="#ffffff" />
          <pointLight position={[3, 2, 3]} intensity={1.2} color="#ffffff" />
          {/* Back rim light */}
          <pointLight position={[0, 3, -3]} intensity={0.8} color="#ffffff" />
          {/* Accent lights */}
          <pointLight position={[-5, 5, 5]} intensity={0.6} color="#ff6b9d" />
          <pointLight position={[5, 5, -5]} intensity={0.6} color="#4ecdc4" />
          
          <Suspense fallback={null}>
            <Model 
              url={characters[currentCharacter].file} 
              scale={scale}
            />
            <ContactShadows 
              opacity={0.3} 
              scale={5} 
              blur={2} 
              far={2} 
              resolution={256} 
              color="#000000" 
            />
            <Environment preset="studio" intensity={1.2} />
          </Suspense>
          
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableDamping
            dampingFactor={0.05}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Canvas>
      </div>

      {/* Character Info Panel */}
      <div className="absolute bottom-32 left-6 right-6 z-20">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              {characters[currentCharacter].name}
            </h2>
            <p className="text-white/80 mb-4">
              {characters[currentCharacter].description}
            </p>
            
            {/* Character thumbnails */}
            <div className="flex justify-center space-x-2 mb-4">
              {characters.map((char, index) => (
                <button
                  key={char.id}
                  onClick={() => setCurrentCharacter(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentCharacter 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="absolute bottom-6 left-6 right-6 z-20">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex items-center justify-between">
            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevCharacter}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextCharacter}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Center Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-3 rounded-full transition-all duration-200 backdrop-blur-sm ${
                  autoRotate 
                    ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <RotateCw size={20} />
              </button>
              
              <button
                onClick={resetView}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <Home size={20} />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={zoomOut}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ZoomOut size={20} />
              </button>
              
              <button
                onClick={zoomIn}
                className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      <Suspense fallback={<Loader />}>
        <div />
      </Suspense>
    </div>
  );
}