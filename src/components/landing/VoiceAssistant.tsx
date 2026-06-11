import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const VoiceAssistant = ({ isDark }: { isDark: boolean }) => {
    return (
        <section className={`py-32 relative ${isDark ? 'bg-[#020817]/50' : 'bg-primary-50/50'}`}>
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
                
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-80 h-80 flex items-center justify-center">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-primary-500/20 rounded-full blur-3xl"
                        />
                        <div className={`relative z-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center shadow-[0_0_80px_rgba(52,211,153,0.4)]`}>
                            <Mic className="w-16 h-16 text-white" />
                        </div>

                        {/* Soundwaves */}
                        <div className="absolute inset-0 flex items-center justify-between px-8 z-20 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [20, Math.random() * 80 + 40, 20] }}
                                    transition={{ duration: 0.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
                                    className={`w-2 rounded-full ${isDark ? 'bg-white/40' : 'bg-primary-500/40'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="md:w-1/2">
                    <motion.h2 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={`text-[54px] leading-tight font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                        Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Multilingual Voice Assistant</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`text-xl mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                        Navigate your health records hands-free. Ask complex questions about your vitals, request report summaries, and get immediate vocal responses in over 20 languages.
                    </motion.p>

                    <div className="space-y-4">
                        {["Hey SmartHealth, what was my sugar level last month?", "Translate my prescription to Spanish.", "Book an appointment with Dr. Sarah."].map((text, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className={`px-6 py-4 rounded-2xl border backdrop-blur-sm ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-gray-200 text-gray-800'}`}
                            >
                                <p className="font-medium">"{text}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default VoiceAssistant;
