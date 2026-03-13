/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StarryBackground } from './components/StarryBackground';
import { ZodiacGrid } from './components/ZodiacGrid';
import { HoroscopeView } from './components/HoroscopeView';
import { ZodiacSign } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null);

  return (
    <div className="min-h-screen relative font-sans text-slate-100 selection:bg-purple-500/30">
      <StarryBackground />
      
      <main className="relative z-10 w-full h-full min-h-screen">
        <AnimatePresence mode="wait">
          {!selectedSign ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ZodiacGrid onSelectSign={setSelectedSign} />
            </motion.div>
          ) : (
            <motion.div
              key="horoscope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HoroscopeView 
                sign={selectedSign} 
                onBack={() => setSelectedSign(null)} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
