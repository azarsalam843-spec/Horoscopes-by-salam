import React from 'react';
import { motion } from 'motion/react';
import { ZodiacSign } from '../types';
import { ZODIAC_SIGNS } from '../constants';

interface ZodiacGridProps {
  onSelectSign: (sign: ZodiacSign) => void;
}

export function ZodiacGrid({ onSelectSign }: ZodiacGridProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300"
        >
          Astra Daily
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-purple-200/70 text-lg md:text-xl font-light tracking-wide"
        >
          Select your sign to reveal what the stars have aligned for you today.
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {ZODIAC_SIGNS.map((sign, index) => (
          <motion.button
            key={sign.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectSign(sign)}
            className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center group transition-colors duration-300"
          >
            <div className="text-5xl mb-4 filter drop-shadow-[0_0_8px_rgba(167,139,250,0.5)] group-hover:scale-110 transition-transform duration-300">
              {sign.emoji}
            </div>
            <h3 className="font-serif text-xl font-semibold text-purple-100 mb-1">{sign.name}</h3>
            <p className="text-xs text-purple-300/60 uppercase tracking-widest mb-2">{sign.dateRange}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
              <span className="text-xs text-purple-200/50">{sign.element}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50"></span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
