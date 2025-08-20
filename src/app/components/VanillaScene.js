'use client'
import { useEffect, useRef } from 'react'

export default function VanillaScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    let scene, camera, renderer, controls, loader

    const init = async () => {
      // Dynamic imports for client-side only
      const THREE = await import('three')
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader')

      // Scene setup
      scene = new THREE.Scene()
      scene.background = new THREE.Color(0x222222)

      // Camera
      camera = new THREE.PerspectiveCamera(
        60, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      )
      camera.position.set(0, 1.5, 3)

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040, 0.6)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
      directionalLight.position.set(5, 10, 7)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      // Controls
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05

      // Load model
      loader = new GLTFLoader()
      loader.load(
        '/models/Holofil-Taurus.glb',
        (gltf) => {
          const model = gltf.scene
          model.scale.set(1, 1, 1)
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })
          scene.add(model)
          console.log('Model loaded successfully')
        },
        (progress) => {
          console.log('Loading progress:', progress)
        },
        (error) => {
          console.error('Error loading model:', error)
        }
      )

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        renderer.render(scene, camera)
      }
      animate()

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    init()

    // Cleanup
    return () => {
      if (renderer) {
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement)
        }
        renderer.dispose()
      }
      if (scene) {
        scene.traverse((child) => {
          if (child.geometry) child.geometry.dispose()
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(material => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
      }
    }
  }, [])

  return <div ref={mountRef} className="w-full h-screen" />
}