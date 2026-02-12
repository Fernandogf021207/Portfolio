import { SpotLight, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useRef, useEffect, useLayoutEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const computerRef = useRef()
  const lightRef = useRef()
  const { camera } = useThree()
  const computer = useGLTF('/models/old_computer.glb')
  
  // INTRO ANIMATION
  useEffect(() => {
    // 1. Bloqueo inicial
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    // 2. Posición Inicial: Close-up dramático
    camera.position.set(0, 0, 2) // Muy cerca
    camera.rotation.set(0, 0, 0) // Recto

    // 3. Animación a posición final (Hero)
    const tl = gsap.timeline({
      defaults: { duration: 2.5, ease: "power3.inOut" },
      onComplete: () => {
        // Desbloquear al terminar
        document.body.style.overflow = 'auto'
        document.body.style.overflowX = 'hidden'
        // Despachar evento para sincronizar si fuera necesario
        window.dispatchEvent(new CustomEvent('intro-finished'))
      }
    })

    tl.to(camera.position, {
      x: 0,
      y: 3,
      z: 8
    }, 0)

    tl.to(camera.rotation, {
      x: -0.36, // Ángulo picado ligero que calibramos
      y: 0,
      z: 0
    }, 0)

  }, [camera])

  // Material Enhancements (FORCE ON)
  useEffect(() => {
    if (computer.scene) {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          const matName = child.material.name ? child.material.name.toLowerCase() : ''
          const meshName = child.name.toLowerCase()
          
          // PANTALLA: Blanco brillante (Backlight)
          if (matName.includes('screen') || meshName.includes('screen')) {
            child.material.emissive = new THREE.Color(1, 1, 1) 
            child.material.emissiveIntensity = 2               
            child.material.toneMapped = false                  
            child.material.color = new THREE.Color(1, 1, 1)    
          }

          // VIDRIO: Transparente
          if (matName.includes('glass')) {
            child.material.transparent = true
            child.material.opacity = 0.3
            child.material.roughness = 0.1
          }

          // TUBOS/LÍQUIDO: Verde brillante
          if (matName.includes('liquid') || matName.includes('tube') || matName.includes('water') || meshName.includes('liquid')) {
             child.material.emissiveIntensity = 5
             child.material.toneMapped = false
             child.material.transparent = true
             child.material.opacity = 0.8
          }
        }
      })
    }
  }, [computer.scene])

  // SCROLL ANIMATION (Scene Exit)
  useLayoutEffect(() => {
    if (!computerRef.current || !lightRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
      }
    })

    // Bajar la cámara a 0 (desde 3) hace que el objeto parezca subir
    tl.to(camera.position, {
      y: 0, 
      ease: "none"
    }, 0)

    // Apagar la luz
    tl.to(lightRef.current, {
      intensity: 0,
      ease: "power1.inOut"
    }, 0)

    // Escalar la PC
    tl.to(computerRef.current.scale, {
      x: 0.8,
      y: 0.8,
      z: 0.8,
      ease: "power1.inOut"
    }, 0)
    
  }, [camera])

  return (
    <>
      <fogExp2 attach="fog" args={['#000000', 0.02]} />
      <ambientLight intensity={0.05} />

      <SpotLight
        ref={lightRef}
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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#111111" roughness={0.9} />
      </mesh>

      <group ref={computerRef}>
        <primitive 
          object={computer.scene} 
          position={[0, 0, 0]}
          scale={0.5}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </group>
    </>
  )
}
