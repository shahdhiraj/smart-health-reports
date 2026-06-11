import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Sparkles, Volume2 } from 'lucide-react';

const VoiceAssistant = ({ isDark }: { isDark: boolean }) => {
    const [isListening, setIsListening] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeBars, setActiveBars] = useState<number[]>([]);

    const phrases = [
        "Hey SmartHealth, what was my sugar level last month?",
        "Translate my prescription to Spanish.",
        "Book an appointment with Dr. Sarah."
    ];

    // Simulate active soundwaves when listening or hovering
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isListening || hoveredIndex !== null) {
            interval = setInterval(() => {
                setActiveBars(Array.from({ length: 8 }, () => Math.random() * 80 + 20));
            }, 150);
        } else {
            setActiveBars(Array.from({ length: 8 }, () => 10)); // resting state
        }
        return () => clearInterval(interval);
    }, [isListening, hoveredIndex]);

    return (
        <section className={`py-32 relative overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#020817]/50' : 'bg-primary-50/50'}`}>
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
                
                {/* Interactive Microphone Visualization */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-80 h-80 flex items-center justify-center cursor-pointer"
                         onClick={() => setIsListening(!isListening)}
                         onMouseEnter={() => !isListening && setIsListening(true)}
                         onMouseLeave={() => setIsListening(false)}
                    >
                        {/* Ambient Glows */}
                        <motion.div 
                            animate={{ 
                                scale: isListening ? [1.2, 1.5, 1.2] : [1, 1.1, 1], 
                                opacity: isListening ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3] 
                            }}
                            transition={{ duration: isListening ? 1 : 3, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute inset-0 rounded-full blur-3xl ${isListening ? 'bg-cyan-500/40' : 'bg-primary-500/20'}`}
                        />

                        {/* Central Button */}
                        <motion.div 
                            animate={{ scale: isListening ? 1.05 : 1 }}
                            className={`relative z-10 w-40 h-40 rounded-full flex items-center justify-center transition-colors duration-500 shadow-2xl
                                ${isListening 
                                    ? 'bg-gradient-to-tr from-cyan-500 to-emerald-400 shadow-[0_0_80px_rgba(6,182,212,0.6)]' 
                                    : 'bg-gradient-to-tr from-primary-600 to-emerald-400 shadow-[0_0_80px_rgba(52,211,153,0.3)]'
                                }`}
                        >
                            <Mic className={`w-16 h-16 text-white transition-transform duration-300 ${isListening ? 'scale-110' : 'scale-100'}`} />
                            
                            {/* Listening Sparkles */}
                            <AnimatePresence>
                                {isListening && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute -top-4 -right-4"
                                    >
                                        <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Dynamic Soundwaves Overlay */}
                        <div className="absolute inset-0 flex items-center justify-between px-[10%] z-20 pointer-events-none">
                            {activeBars.length > 0 ? activeBars.map((height, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: `${height}%` }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className={`w-2 rounded-full transition-colors duration-300 ${
                                        isListening 
                                        ? 'bg-white/80' 
                                        : (isDark ? 'bg-white/20' : 'bg-primary-500/30')
                                    }`}
                                />
                            )) : [...Array(8)].map((_, i) => (
                                <div key={i} className={`w-2 h-[10%] rounded-full ${isDark ? 'bg-white/20' : 'bg-primary-500/30'}`} />
                            ))}
                        </div>

                        {/* Status Tooltip */}
                        <motion.div 
                            animate={{ opacity: isListening ? 1 : 0, y: isListening ? 0 : 10 }}
                            className="absolute -bottom-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold text-cyan-600 dark:text-cyan-400 shadow-lg border border-cyan-100 dark:border-cyan-900/50 flex items-center gap-2"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Listening...
                        </motion.div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <motion.h2 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`text-[54px] leading-tight font-extrabold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Multilingual Voice Assistant</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                        Navigate your health records hands-free. Ask complex questions about your vitals, request report summaries, and get immediate vocal responses in over 20 languages.
                    </motion.p>

                    <div className="space-y-4">
                        {phrases.map((text, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`px-6 py-4 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 transform 
                                    ${hoveredIndex === i ? 'scale-105 shadow-xl ring-2 ring-cyan-400/50' : 'scale-100 hover:shadow-md'} 
                                    ${isDark 
                                        ? `bg-white/5 border-white/10 text-white ${hoveredIndex === i ? 'bg-white/10' : ''}` 
                                        : `bg-white border-slate-200 text-slate-800 ${hoveredIndex === i ? 'border-cyan-300 bg-cyan-50/50' : ''}`
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <p className="font-medium text-lg">"{text}"</p>
                                    <Volume2 className={`w-5 h-5 transition-opacity duration-300 ${hoveredIndex === i ? 'opacity-100 text-cyan-500' : 'opacity-0 text-slate-400'}`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VoiceAssistant;
