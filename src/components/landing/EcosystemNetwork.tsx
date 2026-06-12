import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, UserPlus, Building, Microscope, ShieldCheck, HeartPulse, Activity } from 'lucide-react';
import AnimatedSectionHeader from './ui/AnimatedSectionHeader';

const EcosystemNetwork = ({ isDark }: { isDark: boolean }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const nodes = [
        { icon: Users, label: 'Patients', color: 'bg-blue-400', x: '10%', y: '20%' },
        { icon: UserPlus, label: 'Doctors', color: 'bg-emerald-400', x: '80%', y: '10%' },
        { icon: Building, label: 'Hospitals', color: 'bg-purple-400', x: '15%', y: '70%' },
        { icon: Microscope, label: 'Laboratories', color: 'bg-rose-400', x: '85%', y: '80%' },
        { icon: HeartPulse, label: 'Pharmacies', color: 'bg-amber-400', x: '50%', y: '15%' },
        { icon: ShieldCheck, label: 'Insurance', color: 'bg-cyan-400', x: '50%', y: '85%' },
    ];

    return (
        <section ref={ref} className={`py-16 md:py-40 relative ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}>
            <div className="container mx-auto px-6 relative z-10 text-center">
                <AnimatedSectionHeader 
                    isDark={isDark}
                    title={
                        <>Seamless <br className="block md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Interoperability</span></>
                    }
                />

                <div className="relative h-[400px] md:h-[600px] w-full max-w-5xl mx-auto rounded-[3rem] overflow-visible md:overflow-hidden mt-10 md:mt-20">
                    {/* SVG Connections with Scroll Scrubbing */}
                    <svg viewBox="0 0 1000 600" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-40 overflow-visible">
                        <motion.path 
                            d="M 100 100 C 300 100, 400 300, 500 300 C 600 300, 800 500, 900 400" 
                            stroke="url(#grad1)" 
                            strokeWidth="4" 
                            strokeLinecap="round"
                            fill="none" 
                            style={{ pathLength }}
                        />
                        <defs>
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#38bdf8" />
                                <stop offset="100%" stopColor="#34d399" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Nodes */}
                    {nodes.map((node, i) => (
                        <motion.div
                            key={node.label}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", bounce: 0.5, delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="absolute flex flex-col items-center justify-center group cursor-pointer"
                            style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full ${node.color} flex items-center justify-center mb-2 md:mb-4 shadow-xl`}>
                                <node.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                            </div>
                            <span className={`font-bold tracking-tight text-xs md:text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>{node.label}</span>
                        </motion.div>
                    ))}

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="relative"
                        >
                            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-primary-500 to-emerald-400 flex items-center justify-center shadow-2xl z-10 relative">
                                <Activity className="w-8 h-8 md:w-12 md:h-12 text-white" />
                            </div>
                            <div className="absolute -inset-4 md:-inset-8 bg-primary-400/20 rounded-full blur-xl" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemNetwork;
