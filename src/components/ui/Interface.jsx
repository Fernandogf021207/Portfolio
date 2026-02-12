import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Section = ({ children, className = "" }) => {
  return (
    <section className={`min-h-screen w-full flex flex-col justify-center items-center p-10 ${className}`}>
      {children}
    </section>
  )
}

export default function Interface() {
  const containerRef = useRef()
  const titleRef = useRef()
  const scrollHintRef = useRef()

  // Intro Animation
  useEffect(() => {
    const letters = titleRef.current.querySelectorAll('.letter')
    const hint = scrollHintRef.current
    
    // Timeline de Intro
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } })

    // Paso 0: Asegurar estado inicial
    gsap.set(letters, { opacity: 0, color: 'transparent',  webkitTextStroke: '1px white' })
    gsap.set(hint, { opacity: 0 })

    // Paso 1: Aparecer contornos (mientras la cámara se aleja)
    tl.to(letters, {
      opacity: 1,
      duration: 1.5,
      stagger: 0.1,
      delay: 0.5 // Esperar un poco a que la cámara empiece a moverse
    })

    // Paso 2: Rellenar letras
    tl.to(letters, {
      color: '#f0f0f0', // Blanco hueso
      webkitTextStroke: '0px transparent', // Quitar borde al rellenar
      duration: 1,
      stagger: 0.05
    }, "-=0.5") // Solapar ligeramente con la fase anterior

    // Paso 3: Scroll Hint
    tl.to(hint, {
      opacity: 0.6,
      duration: 1
    })

    // Animación de Scroll para las secciones de contenido
    const sections = containerRef.current.querySelectorAll('.content-section')
    sections.forEach((section) => {
      gsap.fromTo(section.children, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 80%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full text-white overflow-x-hidden z-10">
      
      {/* HERO SECTION (Transparent, triggers 3D scroll) */}
      <section className="hero-section h-screen w-full flex flex-col items-center justify-center relative bg-transparent pointer-events-none">
        <div className="flex flex-col items-center justify-center space-y-2 mix-blend-difference">
          {/* Main Title Split */}
          <h1 ref={titleRef} className="text-8xl md:text-9xl font-gothic tracking-wider text-center flex">
            {"Fernando".split('').map((char, index) => (
              <span key={index} className="letter inline-block">
                {char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.h2
            className="text-3xl md:text-4xl font-cursive italic text-gray-300 tracking-widest mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1.2 }}
          >
            Dev Portfolio
          </motion.h2>
        </div>

        {/* Scroll Hint */}
        <div ref={scrollHintRef} className="absolute bottom-12 flex flex-col items-center opacity-0">
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
        </div>
      </section>

      {/* ABOUT SECTION (Gradient Transition) */}
      <section className="content-section min-h-screen w-full flex flex-col justify-center items-center p-10 bg-gradient-to-b from-transparent via-black to-black relative z-10">
        <div className="pt-32"> {/* Push content down into the black area */}
          <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tighter text-center">About Me</h2>
          <div className="max-w-3xl text-center">
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-6">
              I am a creative developer focused on crafting immersive digital experiences. 
              My work sits at the intersection of design, technology, and art.
            </p>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
              Specializing in the <span className="text-white">React Ecosystem</span> and <span className="text-white">Three.js</span>, 
              I bring static webs to life with performance and aesthetics in mind.
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (Solid Black Background) */}
      <Section className="content-section bg-black relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tighter">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-6xl px-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="group cursor-pointer">
              <div className="aspect-[16/9] bg-neutral-900 overflow-hidden relative mb-4 border border-neutral-800 group-hover:border-neutral-600 transition-colors">
                 {/* Image Placeholder */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-neutral-800 to-neutral-900 group-hover:scale-105 transition-transform duration-700"></div>
                 <div className="absolute bottom-4 left-4 font-gothic text-4xl opacity-50 group-hover:opacity-100 transition-opacity">
                   Project 0{item}
                 </div>
              </div>
              <div className="flex justify-between items-baseline border-b border-neutral-800 pb-2 group-hover:border-white transition-colors">
                <h3 className="text-2xl font-light">Project Name</h3>
                <span className="text-xs text-neutral-500 uppercase">Interactive / WebGL</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT SECTION (Solid Black Background) */}
      <Section className="content-section bg-black relative z-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-neutral-500 mb-4">What's Next?</p>
          <h2 className="text-6xl md:text-9xl font-gothic mb-8 hover:text-neutral-300 transition-colors cursor-pointer">
            <a href="mailto:hello@fernando.dev">Get in Touch</a>
          </h2>
          <div className="flex gap-8 justify-center text-neutral-400 text-sm tracking-widest uppercase">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </Section>
    </div>
  )
}
