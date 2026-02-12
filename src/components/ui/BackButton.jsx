import useOSStore from '../../store/useOSStore';

export default function BackButton() {
  const isFocused = useOSStore((state) => state.isFocused);
  const shutdown = useOSStore((state) => state.shutdown);

  if (!isFocused) return null;

  return (
    <button
      onClick={() => shutdown()}
      className="absolute top-8 left-8 z-50 text-white hover:text-green-400 transition-colors duration-300 font-mono text-lg flex items-center gap-2 cursor-pointer outline-none"
    >
      <span>←</span> SALIR
    </button>
  );
}
