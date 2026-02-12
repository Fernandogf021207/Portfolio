import { Canvas } from '@react-three/fiber'
import Experience from './components/3d/Experience'
import Interface from './components/ui/Interface'

function App() {
  return (
    <>
      <Interface />
      <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
        <Canvas
          shadows
          camera={{ position: [0, 3, 8], fov: 45 }}
        >
          <Experience />
        </Canvas>
      </div>
    </>
  )
}

export default App
