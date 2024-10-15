import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

export default function AnimatedPlanets() {
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
          className="absolute right-1/2 top-1/2"
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
  