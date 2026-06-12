import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedNumber = ({ value }: { value: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    
    // We parse the numeric part and keep prefixes/suffixes
    const numericMatch = value.match(/([0-9.]+)/);
    
    const [currentStr, setCurrentStr] = useState(() => {
        if (!numericMatch) return value;
        const isDecimal = numericMatch[1].includes('.');
        const prefix = value.substring(0, numericMatch.index);
        const suffix = value.substring(numericMatch.index! + numericMatch[1].length);
        return prefix + (isDecimal ? "0.0" : "0") + suffix;
    });

    useEffect(() => {
        if (!numericMatch) return;
        
        if (isInView) {
            const numericVal = parseFloat(numericMatch[1]);
            const isDecimal = numericMatch[1].includes('.');
            const prefix = value.substring(0, numericMatch.index);
            const suffix = value.substring(numericMatch.index! + numericMatch[1].length);
            
            const controls = animate(0, numericVal, {
                duration: 2,
                ease: "easeOut",
                onUpdate(v) {
                    if (isDecimal) {
                        setCurrentStr(prefix + v.toFixed(1) + suffix);
                    } else {
                        setCurrentStr(prefix + Math.floor(v) + suffix);
                    }
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value]); // removed numericMatch from deps to avoid re-running

    return <span ref={ref}>{currentStr}</span>;
};

const MetricsGrid = ({ isDark }: { isDark: boolean }) => {
    const metrics = [
        { value: '10M+', label: 'Reports Processed' },
        { value: '99.9%', label: 'Uptime Reliability' },
        { value: '500+', label: 'Hospitals Connected' },
        { value: '2M+', label: 'AI Insights Generated' },
        { value: '4.9/5', label: 'Patient Satisfaction' },
        { value: 'Zero', label: 'Data Breaches' },
    ];

    return (
        <section className={`py-16 md:py-40 relative ${isDark ? 'bg-[#0f172a]' : 'bg-gradient-to-br from-[#f0fcf9] via-teal-50/50 to-cyan-50/50'}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                    {metrics.map((metric, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className={`p-10 rounded-[3rem] text-center transition-all backdrop-blur-xl border shadow-2xl ${isDark ? 'bg-white/5 border-white/10 shadow-black/20' : 'bg-white/70 border-white/80 shadow-teal-400/20 hover:shadow-teal-400/40 hover:bg-white/80'}`}
                        >
                            <h3 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight break-words ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                                <AnimatedNumber value={metric.value} />
                            </h3>
                            <p className={`text-sm md:text-base uppercase tracking-widest font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {metric.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MetricsGrid;
