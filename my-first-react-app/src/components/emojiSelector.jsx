import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function EmojiSelector() {
    const [activeText, setActiveText] = useState(null)
    const clickCounts = useRef({})
    const totalVisits = useRef(0)
  
    const buttons = [
      { id: 'happy', emoji: '😄', text: 'You look happy today! Record the precious moment...', emotion: 'happy' },
      { id: 'shocked', emoji: '😵', text: 'Wow, what\'s so shocking?!', emotion: 'shocked' },
      { id: 'thinking', emoji: '🤔', text: 'Hmm, what are you thinking about?', emotion: 'thoughtful' },
      { id: 'confused', emoji: '🤨', text: 'Don\'t worry...Keep Calm...', emotion: 'confused' },
      { id: 'sad', emoji: '😞', text: 'Oh no, why so sad?', emotion: 'sad' },
    ]

    useEffect(() => {
      const storedClickCounts = JSON.parse(localStorage.getItem('clickCounts')) || {};
      const storedTotalVisits = JSON.parse(localStorage.getItem('totalVisits')) || 0;

      clickCounts.current = storedClickCounts;
      totalVisits.current = storedTotalVisits;

    }, []);


    const handleClick = (id) => {
      
      if (!clickCounts.current[id]) {
        clickCounts.current[id] = 0;
      }

      clickCounts.current[id]++;
      totalVisits.current++;

      localStorage.setItem('clickCounts', JSON.stringify(clickCounts.current));
      localStorage.setItem('totalVisits', JSON.stringify(totalVisits.current));

      setActiveText(id);
    };

  
    const getStatistics = (activeText) => {
      const justClickedPercentage = Math.round((clickCounts.current[activeText] / totalVisits.current) * 100)
      const emotionName = buttons.find(button => button.id === activeText)?.emotion
  
      return `You visited the Little Prince ${totalVisits.current} times. ${justClickedPercentage}% of the time you were ${emotionName}.`
    }

    const statistics = useMemo(() => getStatistics(activeText), [activeText]);
  
    return (
      <div className="ml-20 mt-60 p-6 bg-white rounded-lg shadow-lg min-h-[200px] flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {activeText === null ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex justify-center gap-4 mb-6">
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => handleClick(button.id)}
                    variant="outline"
                    className="text-3xl p-2 h-auto"
                  >
                    {button.emoji}
                  </button>
                ))}
              </div>
              <p className="text-gray-800">
                Click an emoji to express your mood!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-xl text-gray-800 mb-4">
                {buttons.find(button => button.id === activeText)?.text}
              </p>
              <p className="text-md text-gray-600 mb-6">
                {statistics}
              </p>
              <Link to={"/folders"} className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600">
                Write it down!
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }