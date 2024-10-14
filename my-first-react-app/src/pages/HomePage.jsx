import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Star, Moon, Sun } from 'lucide-react'

export default function HomePage() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Welcome to The Little Prince's World. It is only with the heart that one can see rightly; what is essential is invisible to the eye."
  const typingSpeed = 150 // milliseconds per character

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        i = 0 // Reset to start typing again
      }
    }, typingSpeed)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
      <main className="pt-16">
        <Section id="home">
          <div className="text-center relative">
            <h1 className="text-5xl font-bold mb-4">The Little Prince</h1>
            <p className="text-xl h-20">{typedText}</p>
            <AnimatedStars />
          </div>
        </Section>

        <Section id="about">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">About The Little Prince</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              "The Little Prince" is a novella by French aristocrat, writer, and aviator Antoine de Saint-Exupéry. It tells the story of a young prince who visits various planets in space, including Earth.
            </p>
            <AnimatedPlanets />
          </div>
        </Section>

        <Section id="little-prince">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">The Little Prince</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              "It is only with the heart that one can see rightly; what is essential is invisible to the eye."
            </p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-64 h-64 mx-auto"
            >
              {/* <Image
                src="globe.jpeg"
                alt="The Little Prince on his planet"
                layout="fill"
                objectFit="contain"
                className="rounded-full"
              /> */}
            </motion.div>
          </div>
        </Section>

        <Section id="contact">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl mb-8">Get in touch for more information about The Little Prince.</p>
            <AnimatedFox />
          </div>
        </Section>
      </main>
    </div>
  )
}

// function Section({ children, id }) {
//   const ref = useRef(null)
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"]
//   })

//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
//   const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

//   return (
//     <motion.section
//       id={id}
//       ref={ref}
//       style={{ opacity, scale }}
//       className="min-h-screen flex items-center justify-center p-8"
//     >
//       {children}
//     </motion.section>
//   )
// }

function Section({ children, id }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0' : 'translate-y-20'
      }`}>
        {children}
      </div>
    </section>
  )
}

function AnimatedStars() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="text-yellow-200" size={Math.random() * 10 + 5} />
        </motion.div>
      ))}
    </div>
  )
}

function AnimatedPlanets() {
  return (
    <div className="relative h-40 w-full">
      <motion.div
        className="absolute left-1/4 top-1/2"
        animate={{ 
          rotate: 360,
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Moon className="text-gray-300" size={40} />
      </motion.div>
      <motion.div
        className="absolute right-1/4 top-1/2"
        animate={{ 
          rotate: 360,
          y: [0, 20, 0]
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Sun className="text-yellow-300" size={60} />
      </motion.div>
    </div>
  )
}

function AnimatedFox() {
  return (
    <motion.div
      className="w-40 h-40 mx-auto"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* <Image
        src="/placeholder.svg?height=160&width=160"
        alt="Fox illustration"
        width={160}
        height={160}
        className="rounded-full"
      /> */}
    </motion.div>
  )
}