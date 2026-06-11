import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import type { MouseEvent } from 'react';
import { Brain, ActivitySquare, Mic, Apple, HeartPulse, PieChart } from 'lucide-react';
import AnimatedSectionHeader from './ui/AnimatedSectionHeader';

const FeatureCard = ({ mod, isDark, index }: any) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            className={`group relative p-8 rounded-[2rem] border overflow-hidden transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20 shadow-lg' : 'bg-white/80 backdrop-blur-xl border-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 hover:bg-white'}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            350px circle at ${mouseX}px ${mouseY}px,
                            ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(52, 211, 153, 0.08)'},
                            transparent 80%
                        )
                    `,
                }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="relative mb-8">
                    {/* Glowing blur behind icon */}
                    <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${mod.color.split(' ')[0]}`} />
                    <div className={`relative w-14 h-14 rounded-[1.25rem] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 ${mod.color} ${isDark ? 'bg-opacity-20 text-opacity-90 mix-blend-screen shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]' : 'shadow-sm group-hover:shadow-md'}`}>
                        <mod.icon className="w-7 h-7" />
                    </div>
                </div>
                
                <h4 className={`text-xl font-bold mb-3 transition-colors ${isDark ? 'text-white group-hover:text-primary-300' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                    {mod.title}
                </h4>
                
                <p className={`text-sm font-medium leading-relaxed mt-auto transition-colors ${isDark ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-700'}`}>
                    {mod.desc}
                </p>
            </div>
        </motion.div>
    );
};

const SmartAIEngine = ({ isDark }: { isDark: boolean }) => {
    const modules = [
        { icon: Brain, title: 'AI Report Reader', desc: 'OCR & NLP extracts medical entities accurately.', color: 'bg-rose-100 text-rose-500' },
        { icon: ActivitySquare, title: 'Risk Prediction', desc: 'Algorithms flag early signs of chronic diseases.', color: 'bg-emerald-100 text-emerald-500' },
        { icon: Mic, title: 'Voice Assistant', desc: 'Multilingual voice commands for accessible navigation.', color: 'bg-blue-100 text-blue-500' },
        { icon: Apple, title: 'AI Nutritionist', desc: 'Personalized diet plans based on lab vitals.', color: 'bg-amber-100 text-amber-500' },
        { icon: HeartPulse, title: 'Disease Tracking', desc: 'Longitudinal tracking of diabetes, hypertension, etc.', color: 'bg-purple-100 text-purple-500' },
        { icon: PieChart, title: 'Population Analytics', desc: 'Macro insights for hospitals and governments.', color: 'bg-cyan-100 text-cyan-500' },
    ];

    return (
        <section className={`py-40 relative ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
            <div className="container mx-auto px-6">
                <div className="flex flex-col xl:flex-row items-center gap-16">
                    <div className="xl:w-1/2">
                        <AnimatedSectionHeader 
                            isDark={isDark}
                            align="left"
                            title={
                                <>The Smart <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI Engine</span></>
                            }
                            subtitle="Six powerful intelligence modules working in absolute harmony to decode your health."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {modules.map((mod, i) => (
                                <FeatureCard key={i} mod={mod} isDark={isDark} index={i} />
                            ))}
                        </div>
                    </div>

                    <div className="xl:w-1/2 relative h-[600px] w-full flex items-center justify-center perspective-1000 mt-20 xl:mt-0">
                        {/* Abstract Floating Bouncy Shapes instead of rigid dashboard */}
                        <motion.div 
                            animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute w-64 h-64 rounded-[4rem] backdrop-blur-2xl border flex flex-col justify-between p-8 z-20 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-white shadow-2xl'}`}
                        >
                            <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                                <ActivitySquare className="w-8 h-8 text-white" />
                            </div>
                            <div className={`h-4 w-3/4 rounded-full ${isDark ? 'bg-white/20' : 'bg-slate-200'}`} />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className={`absolute right-10 top-20 w-48 h-48 rounded-full backdrop-blur-2xl border flex items-center justify-center z-10 ${isDark ? 'bg-primary-500/20 border-primary-500/30' : 'bg-primary-100/80 border-white shadow-xl'}`}
                        >
                            <Brain className={`w-16 h-16 ${isDark ? 'text-primary-400' : 'text-primary-500'}`} />
                        </motion.div>
                        
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] opacity-40 mix-blend-multiply ${isDark ? 'bg-primary-600 mix-blend-screen' : 'bg-emerald-300'}`} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SmartAIEngine;
