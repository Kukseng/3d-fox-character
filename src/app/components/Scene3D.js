// 'use client'
// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, useGLTF, Environment } from '@react-three/drei'
// import { Suspense } from 'react'

// function Model({ url }) {
//   const { scene } = useGLTF(url)
//   return <primitive object={scene} scale={1} />
// }

// function Loader() {
//   return (
//     <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
//       <div className="text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
//         <p>Loading 3D Model...</p>
//       </div>
//     </div>
//   )
// }

// export default function Scene3D() {
//   return (
//     <div className="w-full h-screen relative">
//       <Canvas
//         camera={{ position: [0, 1.5, 3], fov: 60 }}
//         gl={{ antialias: true }}
//         shadows
//       >
//         <ambientLight intensity={0.5} />
//         <directionalLight 
//           position={[5, 10, 7]} 
//           intensity={1}
//           castShadow 
//         />
        
//         <Suspense fallback={null}>
//           <Model url="/models/8_21_2025 (2).glb" />
//           <Environment preset="studio" />
//         </Suspense>
        
//         <OrbitControls 
//           enableDamping 
//           dampingFactor={0.05}
//           minDistance={1}
//           maxDistance={10}
//         />
//       </Canvas>
      
//       <Suspense fallback={<Loader />}>
//         <div />
//       </Suspense>
//     </div>
//   )
// }