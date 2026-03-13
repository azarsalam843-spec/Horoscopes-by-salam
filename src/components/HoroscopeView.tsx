import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Heart, Briefcase, Hash, Palette, Loader2 } from 'lucide-react';
import { ZodiacSign, HoroscopeData } from '../types';
import { getDailyHoroscope } from '../services/geminiService';

interface HoroscopeViewProps {
  sign: ZodiacSign;
  onBack: () => void;
}

export function HoroscopeView({ sign, onBack }: HoroscopeViewProps) {
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchHoroscope() {
      try {
        setLoading(true);
        setError(null);
        const data = await getDailyHoroscope(sign.name);
        if (isMounted) {
          setHoroscope(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchHoroscope();

    return () => {
      isMounted = false;
    };
  }, [sign.name]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-2 text-purple-300/70 hover:text-purple-100 transition-colors w-fit mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm uppercase tracking-widest font-medium">Back to Stars</span>
      </motion.button>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Sidebar / Sign Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/3 glass-panel rounded-3xl p-8 flex flex-col items-center text-center sticky top-8"
        >
          <div className="text-8xl mb-6 filter drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]">
            {sign.emoji}
          </div>
          <h1 className="font-serif text-4xl font-bold text-white mb-2">{sign.name}</h1>
          <p className="text-purple-300/80 text-sm uppercase tracking-widest mb-6">{sign.dateRange}</p>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6" />
          
          <div className="grid grid-cols-2 w-full gap-4 text-left">
            <div>
              <p className="text-xs text-purple-400/60 uppercase tracking-wider mb-1">Element</p>
              <p className="text-purple-100 font-medium">{sign.element}</p>
            </div>
            <div>
              <p className="text-xs text-purple-400/60 uppercase tracking-wider mb-1">Symbol</p>
              <p className="text-purple-100 font-medium">{sign.symbol}</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 flex-1">
          {loading ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-purple-300/70">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-purple-400" />
              <p className="font-serif text-lg animate-pulse">Consulting the cosmos...</p>
            </div>
          ) : error ? (
            <div className="glass-panel rounded-3xl p-8 text-center border-red-500/20">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => {
                  setLoading(true);
                  setError(null);
                  getDailyHoroscope(sign.name).then(setHoroscope).catch(e => setError(e.message)).finally(() => setLoading(false));
                }}
                className="px-6 py-2 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : horoscope ? (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1
                  }
                }
              }}
              className="space-y-6"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-panel rounded-3xl p-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Sparkles className="w-32 h-32" />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl text-purple-100 flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Daily Overview
                  </h2>
                  <span className="text-xs text-purple-300/50 uppercase tracking-widest">{horoscope.date}</span>
                </div>
                <p className="text-purple-100/80 leading-relaxed text-lg">
                  {horoscope.overview}
                </p>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="glass-panel rounded-3xl p-6">
                  <h3 className="font-serif text-xl text-pink-200 flex items-center gap-2 mb-4">
                    <Heart className="w-5 h-5" />
                    Love & Connections
                  </h3>
                  <p className="text-purple-100/70 leading-relaxed text-sm">
                    {horoscope.love}
                  </p>
                </div>

                <div className="glass-panel rounded-3xl p-6">
                  <h3 className="font-serif text-xl text-emerald-200 flex items-center gap-2 mb-4">
                    <Briefcase className="w-5 h-5" />
                    Career & Money
                  </h3>
                  <p className="text-purple-100/70 leading-relaxed text-sm">
                    {horoscope.career}
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="grid grid-cols-3 gap-4"
              >
                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Hash className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">Lucky Numbers</p>
                  <p className="text-lg font-mono text-purple-100">{horoscope.luckyNumbers.join(', ')}</p>
                </div>
                
                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Palette className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">Lucky Color</p>
                  <p className="text-lg font-medium text-purple-100 capitalize">{horoscope.luckyColor}</p>
                </div>

                <div className="glass-panel rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                  <Sparkles className="w-5 h-5 text-purple-400 mb-2" />
                  <p className="text-xs text-purple-300/60 uppercase tracking-wider mb-1">Mood</p>
                  <p className="text-lg font-medium text-purple-100 capitalize">{horoscope.mood}</p>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
