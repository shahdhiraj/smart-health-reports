import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FileText, Activity, HeartPulse, Dna, Syringe } from 'lucide-react';

const events = [
    { id: 1, type: 'Lab', title: 'Comprehensive Blood Panel', date: 'Oct 2018', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', glow: 'shadow-blue-500/20', position: 'top' },
    { id: 2, type: 'Scan', title: 'Cardiovascular MRI', date: 'Mar 2020', icon: HeartPulse, color: 'text-rose-500', bg: 'bg-rose-500/10', glow: 'shadow-rose-500/20', position: 'bottom' },
    { id: 3, type: 'Vitals', title: 'Diabetes Screening', date: 'Jan 2022', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20', position: 'top' },
    { id: 4, type: 'Genetic', title: 'DNA Sequencing', date: 'Nov 2023', icon: Dna, color: 'text-purple-500', bg: 'bg-purple-500/10', glow: 'shadow-purple-500/20', position: 'bottom' },
    { id: 5, type: 'Preventive', title: 'Vaccination Updated', date: 'Today', icon: Syringe, color: 'text-primary-500', bg: 'bg-primary-500/10', glow: 'shadow-primary-500/20', position: 'top' },
];

const HealthTimelineShowcase = ({ isDark }: { isDark: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xTransform = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

    return (
        <section ref={containerRef} className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-[54px] leading-tight font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                    A Lifetime of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Health. Connected.</span>
                </motion.h2>
                <p className={`text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Say goodbye to scattered paper records. View your entire health history chronologically on a glowing, 3D-perspective pathway.
                </p>
            </div>

            {/* The 3D Pathway Container */}
            <div className="relative w-full h-[400px] overflow-hidden flex items-center" style={{ perspective: '2000px' }}>
                
                {/* 3D Rotated Plane */}
                <motion.div 
                    style={{ x: xTransform }}
                    className="absolute left-0 right-0 flex items-center justify-start w-[150vw] h-full origin-center"
                    initial={{ rotateX: 20, rotateY: -5, scale: 1 }}
                    whileInView={{ rotateX: 20, rotateY: -5, scale: 1 }}
                >
                    {/* The Core Glowing Line */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent w-full opacity-50 blur-[2px]" />
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-full shadow-[0_0_15px_#10b981]" />

                    {/* Nodes and Cards */}
                    <div className="relative w-full h-full flex items-center justify-around px-[10vw]">
                        {events.map((ev, i) => (
                            <div key={ev.id} className="relative group w-0 flex justify-center">
                                {/* Connecting Line */}
                                <motion.div 
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ delay: i * 0.15, duration: 0.5 }}
                                    className={`absolute w-0.5 ${ev.position === 'top' ? 'bottom-0 h-16 bg-gradient-to-t' : 'top-0 h-16 bg-gradient-to-b'} from-primary-500/50 to-transparent origin-${ev.position === 'top' ? 'bottom' : 'top'}`} 
                                />

                                {/* Glowing Node on the line */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.15, type: "spring" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#10b981] z-10 border-4 border-emerald-500" 
                                />

                                {/* Event Card */}
                                <motion.div 
                                    initial={{ opacity: 0, y: ev.position === 'top' ? 20 : -20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 100 }}
                                    whileHover={{ scale: 1.05, y: ev.position === 'top' ? -10 : 10 }}
                                    className={`absolute ${ev.position === 'top' ? 'bottom-[72px]' : 'top-[72px]'} -translate-x-1/2 w-64 p-5 rounded-[1.5rem] border backdrop-blur-xl shadow-2xl transition-all duration-300 cursor-pointer ${isDark ? 'bg-[#1e293b]/80 border-slate-700/50 hover:border-primary-500/50 hover:bg-[#1e293b]' : 'bg-white/90 border-slate-200 hover:border-primary-300 hover:shadow-primary-500/20'} ${ev.glow}`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ev.bg} ${ev.color}`}>
                                            <ev.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wider ${ev.color}`}>{ev.type}</p>
                                            <p className={`text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{ev.date}</p>
                                        </div>
                                    </div>
                                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ev.title}</h3>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Left/Right Fading Overlays */}
                <div className={`absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r ${isDark ? 'from-[#0f172a]' : 'from-[#f8fafc]'} to-transparent z-20 pointer-events-none`} />
                <div className={`absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l ${isDark ? 'from-[#0f172a]' : 'from-[#f8fafc]'} to-transparent z-20 pointer-events-none`} />
            </div>
        </section>
    );
};

export default HealthTimelineShowcase;
