import { Html } from '@react-three/drei';
import Desktop from './Desktop';

export default function ScreenUI({ isFocused }) {
  return (
    <Html
      transform
      wrapperClass="screen-wrapper"
      distanceFactor={1.17}
      position={[0, 0.9, -0.15]} // Push back slightly
      rotation={[-0.1, 0, 0]} 
      scale={0.5} // Increased scale for readability
    >
      <div 
        className="w-[960px] h-[720px] bg-black select-none pointer-events-auto"
        style={{ 
          width: '960px', 
          height: '720px',
          opacity: isFocused ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: isFocused ? 'auto' : 'none'
        }} 
      >
        <Desktop />
      </div>
    </Html>
  );
}
