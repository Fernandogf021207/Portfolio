import { CameraControls, SpotLight, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import useOSStore from '../../store/useOSStore'
import ScreenUI from '../os/ScreenUI'

export default function Experience() {
  const controlsRef = useRef()
  const screenMeshes = useRef([]) // Array reference for multiple screen parts
  const isExploring = useOSStore((state) => state.isExploring)
  const isFocused = useOSStore((state) => state.isFocused)
  const setFocused = useOSStore((state) => state.setFocused)
  const boot = useOSStore((state) => state.boot)
  const computer = useGLTF('/models/old_computer.glb')

  useEffect(() => {
    if (controlsRef.current) {
      if (isExploring) {
        console.log("Starting camera transition (ENTER)...");
        // Zoom in towards the "monitor"
        controlsRef.current.setLookAt(
          0, 1.1, 1.3, // Position (Eye level with screen)
          0, 0.9, 0,   // Target (Center of the screen)
          true         // Enable transition
        ).then(() => {
          console.log("Transition complete. Booting...");
          setFocused(true) // LOCK CONTROLS
          setTimeout(() => {
            boot()
          }, 1000)
        }).catch(err => console.error("Transition error:", err))
      } else {
        // Zoom out (EXIT) - Only if we were focused or close
        // We assume default position is roughly [0, 3, 8] looking at [0, 0, 0]
        console.log("Starting camera transition (EXIT)...");
        setFocused(false) // UNLOCK CONTROLS
        controlsRef.current.setLookAt(
          0, 3, 8, // Default Camera Position
          0, 0, 0, // Default Target
          true     // Enable transition
        ).catch(err => console.error("Exit transition error:", err))
      }
    }
  }, [isExploring, boot, setFocused])

    useEffect(() => {
      if (computer.scene) {
        console.log("Estructura del Modelo:", computer.scene)
        screenMeshes.current = [] // Reset array
        let found = false
        
        const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
  
        computer.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            
            // Heuristic based on Material
            const matName = child.material.name ? child.material.name.toLowerCase() : ''
            const meshName = child.name.toLowerCase()
            
            if (child.material.emissiveMap || matName.includes('screen') || matName.includes('glass') || meshName.includes('screen')) {
              console.log("🎯 OBJETIVO ENCONTRADO:", child.name, child.material.name)
              found = true
              
              // Add to array
              screenMeshes.current.push(child)
  
              // Force Matte Black - The "Void"
              child.material = blackMaterial
            }
          }
        })
        if (!found) {
          console.warn("⚠️ NO SCREEN FOUND. LIST OF MESHES:")
          computer.scene.traverse((c) => { if (c.isMesh) console.log(c.name) })
        }
      }
    }, [computer.scene])
  
    // Removed useFrame proximity loop - HTML Overlay handles the UI
  
  return (
    <>
      <CameraControls 
        ref={controlsRef} 
        enabled={!isFocused}
        minDistance={1}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2}
        smoothTime={1.5}
      />
      
      {/* Fog for atmosphere */}
      <fogExp2 attach="fog" args={['#000000', 0.02]} />

      {/* Safety Ambient Light (Dimmed) */}
      <ambientLight intensity={0.05} />

      {/* Volumetric Spotlight from Drei (The Beam) */}
      <SpotLight
        position={[0, 6, 0]}
        angle={0.5}
        penumbra={1}
        intensity={2} 
        distance={20}
        anglePower={5}
        attenuation={5}
        radiusTop={0.2}
        radiusBottom={10}
        opacity={1}
        color="white"
        volumetric={true}
        castShadow
        debug={false}
      />

      {/* Real Light Source (The illumination) */}
      <spotLight
        position={[0, 6, 0]}
        angle={0.5}
        penumbra={1}
        intensity={100}
        distance={20}
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[2048, 2048]}
      />

      {/* Floor: Infinite Concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      {/* Old Computer Model */}
      <primitive 
        object={computer.scene} 
        position={[0, 0, 0]}
        scale={0.5}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Retro OS Interface (Only visible when focused) */}
      <ScreenUI isFocused={isFocused} />
    </>
  )
}
