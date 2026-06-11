import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';

const colorMap = {
    rose: {
        bg: 'bg-rose-500/40',
        ring: 'bg-rose-500/30',
        border: 'border-rose-400/50',
        text: 'text-rose-400',
    },
    emerald: {
        bg: 'bg-emerald-500/40',
        ring: 'bg-emerald-500/30',
        border: 'border-emerald-400/50',
        text: 'text-emerald-400',
    },
    amber: {
        bg: 'bg-amber-500/40',
        ring: 'bg-amber-500/30',
        border: 'border-amber-400/50',
        text: 'text-amber-400',
    },
    blue: {
        bg: 'bg-blue-500/40',
        ring: 'bg-blue-500/30',
        border: 'border-blue-400/50',
        text: 'text-blue-400',
    }
};

type NodeColor = keyof typeof colorMap;

const PopulationAnalytics = ({ isDark }: { isDark: boolean }) => {
    // 3D Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const nodes = [
        { id: 1, top: '35%', left: '25%', color: 'rose' as NodeColor, label: 'High Risk Area', size: 'w-10 h-10' },
        { id: 2, top: '55%', left: '60%', color: 'emerald' as NodeColor, label: 'Stable Zone', size: 'w-16 h-16' },
        { id: 3, top: '45%', left: '75%', color: 'amber' as NodeColor, label: 'Monitor', size: 'w-12 h-12' },
        { id: 4, top: '25%', left: '50%', color: 'blue' as NodeColor, label: 'Safe Zone', size: 'w-14 h-14' },
    ];

    const [activeNode, setActiveNode] = useState<number | null>(null);

    return (
        <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#020817]' : 'bg-[#0f172a]'}`}>
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-screen bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-[54px] leading-tight font-bold mb-6 text-white tracking-tight">
                        Command Center for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Population Health</span>
                    </h2>
                    <p className="text-xl max-w-3xl mx-auto text-slate-400">
                        Empowering enterprise hospitals and governments with real-time predictive analytics, disease tracking heatmaps, and capacity monitoring.
                    </p>
                </motion.div>

                <div 
                    className="relative max-w-6xl mx-auto h-auto lg:h-[550px] perspective-1000"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <motion.div
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full h-full bg-[#1e293b]/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl shadow-black/50 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative"
                    >
                        {/* Decorative top bar */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-b-full" />

                        {/* Map Area */}
                        <div className="lg:col-span-2 h-[300px] lg:h-auto bg-[#0f172a]/50 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-white/5 group">
                            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-contain bg-center bg-no-repeat opacity-30 transition-opacity group-hover:opacity-40" />
                            
                            {/* Interactive Nodes */}
                            {nodes.map((node) => {
                                const colors = colorMap[node.color];
                                return (
                                    <div key={node.id} className="absolute" style={{ top: node.top, left: node.left }}>
                                        <motion.div 
                                            whileHover={{ scale: 1.2 }}
                                            onHoverStart={() => setActiveNode(node.id)}
                                            onHoverEnd={() => setActiveNode(null)}
                                            className={`relative z-10 flex items-center justify-center cursor-pointer`}
                                        >
                                            <div className={`absolute inset-0 ${colors.ring} rounded-full animate-ping`} />
                                            <div className={`${node.size} ${colors.bg} border ${colors.border} backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_currentColor] ${colors.text} transition-all`} />
                                        </motion.div>
                                        
                                        {/* Tooltip */}
                                        {activeNode === node.id && (
                                            <motion.div 
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg text-white text-xs whitespace-nowrap z-20 pointer-events-none shadow-xl"
                                            >
                                                {node.label}
                                            </motion.div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="absolute bottom-6 left-6 pointer-events-none">
                                <p className="text-white font-bold tracking-widest uppercase flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Global Risk Heatmap
                                </p>
                            </div>
                        </div>

                        {/* Side Panels */}
                        <div className="lg:col-span-1 flex flex-col gap-6 h-[500px] lg:h-auto">
                            {/* Patient Inflow Chart */}
                            <div className="flex-1 bg-[#0f172a]/50 rounded-3xl p-6 border border-white/5 flex flex-col hover:bg-[#0f172a]/70 transition-colors">
                                <div className="flex justify-between items-center mb-6">
                                    <p className="text-sm text-slate-300 font-medium">Patient Inflow (Live)</p>
                                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-md">+14%</span>
                                </div>
                                <div className="flex-1 w-full flex items-end gap-2">
                                    {[30, 45, 25, 60, 40, 80, 55].map((h, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                                            className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 text-white text-xs px-2 py-1 rounded backdrop-blur-md pointer-events-none transition-opacity">
                                                {h}k
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Resource Load */}
                            <div className="flex-1 bg-[#0f172a]/50 rounded-3xl p-6 border border-white/5 flex flex-col hover:bg-[#0f172a]/70 transition-colors">
                                <p className="text-sm text-slate-300 font-medium mb-2">Resource Load</p>
                                <div className="flex-1 flex items-center justify-center relative">
                                    {/* Background Track */}
                                    <svg className="w-32 h-32 transform -rotate-90">
                                        <circle cx="64" cy="64" r="50" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                                        <motion.circle 
                                            cx="64" cy="64" r="50" 
                                            stroke="url(#gradient)" 
                                            strokeWidth="8" 
                                            fill="none"
                                            strokeDasharray="314"
                                            initial={{ strokeDashoffset: 314 }}
                                            whileInView={{ strokeDashoffset: 314 * 0.25 }} // 75% filled
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#f59e0b" />
                                                <stop offset="100%" stopColor="#ef4444" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-bold text-white">75%</span>
                                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Capacity</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PopulationAnalytics;
