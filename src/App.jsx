import { Canvas } from '@react-three/fiber'
import Experience from './components/3d/Experience'
import IntroOverlay from './components/ui/IntroOverlay'
import BackButton from './components/ui/BackButton'

function App() {
  return (
    <>
      <IntroOverlay />
      <BackButton />
      <Canvas
        shadows
        camera={{ position: [0, 3, 8], fov: 45 }}
        className="h-screen w-screen bg-black"
      >
        <Experience />
      </Canvas>
    </>
  )
}

export default App
