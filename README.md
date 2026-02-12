# Retro-Portfolio: Arquitectura del Sistema

Este proyecto es un portafolio inmersivo con una estética retro, combinando una experiencia 3D (monitor CRT) con una interfaz de sistema operativo funcional (2D).

## Estructura de Carpetas (`/src`)

-   **`assets/`**: Recursos estáticos como texturas para Three.js, fuentes retro, iconos y sonidos.
-   **`components/3d/`**: Componentes de React Three Fiber. Incluye la escena inicial, el monitor CRT, cables y entorno.
-   **`components/os/`**: Lógica y componentes visuales del sistema operativo (ventanas, barra de tareas, escritorio). Basado en React95.
-   **`components/ui/`**: Componentes de UI genéricos y overlays que no pertenecen estrictamente al OS o a la escena 3D.
-   **`hooks/`**: Hooks personalizados para interacciones, animaciones de sonido o lógica de sistema.
-   **`store/`**: Gestión de estado global mediante Zustand.
    -   `useOSStore.js`: Maneja el ciclo de vida de las ventanas, el enfoque y el estado de encendido/transición del sistema.

## Estado Global (`useOSStore`)

El store principal gestiona:
- `windows`: Lista de aplicaciones abiertas.
- `activeWindow`: ID de la ventana que posee el `z-index` más alto.
- `isBooted`: Flag booleano que dispara la transición de la cámara 3D hacia la interfaz 2D.
- `minimizeWindow`: Acción para ocultar ventanas sin cerrarlas.

## Tecnologías Principales
- Vite + React
- TailwindCSS
- React Three Fiber + Drei
- React95
- Zustand
