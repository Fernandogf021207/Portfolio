// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'
import useOSStore from '../../store/useOSStore'

export default function IntroOverlay() {
  const startExploration = useOSStore((state) => state.startExploration)
  const isExploring = useOSStore((state) => state.isExploring)

  return (
    <AnimatePresence>
      {!isExploring && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center justify-center space-y-2 mix-blend-difference pointer-events-auto">
            {/* Main Title */}
            <motion.h1
              className="text-8xl md:text-9xl font-gothic text-[#f0f0f0] tracking-wider"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              Fernando
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="text-3xl md:text-4xl font-cursive italic text-gray-300 tracking-widest mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1.2 }}
            >
              Dev Portfolio
            </motion.h2>

            {/* Enter Button */}
            <motion.button
              onClick={() => startExploration()}
              className="mt-12 px-8 py-2 border border-white/20 bg-transparent text-white/80 font-mono text-sm tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all duration-700 ease-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              INGRESAR
            </motion.button>
          </div>

          {/* Scroll Hint */}
          <motion.div 
            className="absolute bottom-12 flex flex-col items-center opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-white/50 rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-[10px] text-white/40 font-mono mt-4 tracking-[0.4em] uppercase">
              Use Scroll To Explore
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
