import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { Star, Moon, Sun } from 'lucide-react'

export default function AnimatedStars() {
    return (
      <div className="relative -top-6">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [10, -10, 0],
              opacity: [0.2, 1, 0.2],
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="text-yellow-200" size={Math.random() * 15 + 5} />
          </motion.div>
        ))}
      </div>
    )
  }  