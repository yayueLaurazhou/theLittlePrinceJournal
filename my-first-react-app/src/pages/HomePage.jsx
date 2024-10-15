import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedStars from '../components/animatedStars'
import AnimatedPlanets from '../components/animatedPlanets'
import EmojiSelector from '../components/emojiSelector'
import '@fontsource/nanum-pen-script/400.css'

export default function HomePage() {
  const [typedText, setTypedText] = useState('')
  const fullText = "Welcome to The Little Prince's World."
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
    <div className="min-h-screen bg-gradient-to-b from-pink-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      <main>
        <HeroSection typedText={typedText} />
        <LittlePrinceSection />
        <ContactSection />
      </main>
    </div>
  )
}

function HeroSection({ typedText }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-6 z-0"
        style={{ y }}
      >
        <img 
          src="globe_2.jpeg" 
          alt="The Little Prince's planet"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/70 to-indigo-900/90" />
      </motion.div>
      <div className="relative z-10 text-center px-4 pt-60">
        <AnimatedStars />
        <motion.h1 
          style={{ fontFamily: 'Nanum Pen Script, cursive' }}
          className="text-5xl md:text-7xl mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Journaling with the Little Prince
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl h-20 mx-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {typedText}
        </motion.p>
      </div>
    </motion.section>
  )
}


function LittlePrinceSection() {
  return (
    <Section>
      {({ isVisible }) => (
        <div className="max-w-4xl mx-lg px-4 relative min-h-[50vh]">
          <h1 className="text-center text-5xl"  style={{ fontFamily: 'Nanum Pen Script, cursive'}}>Making note taking convinient and fun</h1>
          <ul className="ml-6 text-lg list-disc mb-8">
            <li>
              Categorization system: use tags and folders (planets) to categorize your note.
            </li>
            <li>
              Easy to Edit and Save: Edit your notes in a rich text Editor, and it is automatically saved on exit.
            </li>
            <li>
              Add tags: Add tags based on your needs: mood, recipe, work, whatever you like!
            </li>
            <li>
              Gamified UI Design: Make recording your life fun!
            </li>
          </ul>
          <AnimatedPlanets />
          <motion.div
            className="absolute bottom-0 right-0 w-1/4 max-w-xs"
            initial={{ scale: 0, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut",
              delay: 0.5
            }}
            style={{
              transformOrigin: 'bottom right'
            }}
          >
            <img
              src="rose.jpeg"
              alt="A rose in a glass dome"
              className="w-full h-auto rounded-tl-full"
            />
          </motion.div>
        </div>
      )}
    </Section>
  )
}

function ContactSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div 
        className="absolute inset-6 z-0"
        style={{ y }}
      >
        <img 
          src="lookingAtStar.jpeg"
          alt="The Little Prince looking at a star"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/70 to-indigo-900/90" />
      </motion.div>
      <div className="relative z-10 text-center px-4 max-w-4xl mt-40 mx-auto">
        <AnimatedStars />
        <motion.h2 
          style={{ fontFamily: 'Nanum Pen Script, cursive' }}
          className="text-4xl md:text-6xl text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Start by recording your thoughts now,<br/>how are you feeling?
        </motion.h2>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <EmojiSelector />
        </motion.div>
      </div>
    </motion.section>
  )
}

function Section({ children }) {
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
      ref={ref}
      className={`min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {typeof children === 'function' ? children({ isVisible }) : children}
      </motion.div>
    </section>
  )
}