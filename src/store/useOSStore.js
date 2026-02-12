import { create } from 'zustand';

const useOSStore = create((set) => ({
  // Window State Management
  windows: {
    about: false,
    projects: false,
    contact: false,
  },
  
  // System State
  isBooted: false,
  isExploring: false, // Starts the zoom sequence
  isFocused: false, // Locks camera when true
  cameraState: 'IDLE', // 'IDLE' | 'ZOOMING'

  // Actions
  startExploration: () => set({ isExploring: true, cameraState: 'ZOOMING', isFocused: false }),
  setFocused: (value) => set({ isFocused: value }),
  boot: () => set({ isBooted: true }),
  
  toggleWindow: (id, isOpen) => set((state) => ({
    windows: { ...state.windows, [id]: isOpen }
  })),

  shutdown: () => set({ 
    isBooted: false, 
    isExploring: false, 
    isFocused: false, 
    cameraState: 'IDLE', 
    windows: { about: false, projects: false, contact: false }
  }),
}));

export default useOSStore;
