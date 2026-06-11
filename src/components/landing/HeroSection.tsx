import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const HeroSection = ({ isDark, isReady }: { isDark: boolean; isReady: boolean }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const yImage = useTransform(scrollYProgress, [0, 1], [0, 400]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const titleVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 }
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
        visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } }
    };

    const text1 = "Health Data".split('');

    return (
        <section ref={ref} className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                
                <motion.div
                    style={{ y: yText, opacity }}
                    className="w-full max-w-5xl"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-8 transition-transform hover:scale-105 cursor-default ${isDark ? 'bg-white/5 text-slate-300 border border-white/10' : 'bg-white/60 text-slate-700 shadow-sm border border-slate-200/50'}`}
                    >
                        <Activity className="w-4 h-4 text-primary-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">The Web3 Era of Health</span>
                    </motion.div>
                    
                    <motion.h1 
                        variants={titleVariants}
                        initial="hidden"
                        animate={isReady ? "visible" : "hidden"}
                        className={`text-6xl md:text-8xl font-extrabold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
                    >
                        <span className="inline-block mr-4">
                            {text1.map((char, index) => (
                                <motion.span key={index} variants={letterVariants} className="inline-block">
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </span>
                        <br className="hidden md:block" />
                        <motion.span variants={letterVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400 mt-2">
                            Reimagined.
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className={`text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
                    >
                        Ultra-smooth, paperless, and perfectly in sync with your life. The happy minimal infrastructure for clinical insights.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 1.1, duration: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-primary-600 to-primary-400 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:from-primary-500 hover:to-primary-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                            Enter App
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>
                        <MagneticButton className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-base transition-all hover:scale-[1.02] active:scale-95 backdrop-blur-xl ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-white/50 text-slate-900 shadow-sm hover:bg-white/80 hover:shadow-md'}`}>
                            Learn More
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Abstract 3D Shapes */}
                <motion.div 
                    style={{ y: yImage, opacity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] pointer-events-none -z-10"
                >
                    <motion.div 
                        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={`absolute top-0 left-20 w-[400px] h-[400px] rounded-[3rem] blur-xl opacity-40 mix-blend-multiply ${isDark ? 'bg-primary-500/20 mix-blend-screen' : 'bg-primary-200'}`} 
                    />
                    <motion.div 
                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className={`absolute bottom-0 right-20 w-[500px] h-[500px] rounded-full blur-xl opacity-40 mix-blend-multiply ${isDark ? 'bg-emerald-500/20 mix-blend-screen' : 'bg-emerald-200'}`} 
                    />
                </motion.div>

            </div>
        </section>
    );
};

export default HeroSection;
