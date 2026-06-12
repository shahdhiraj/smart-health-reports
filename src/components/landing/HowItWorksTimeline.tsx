import { motion } from 'framer-motion';
import { UploadCloud, Cpu, LineChart, Stethoscope, HeartHandshake } from 'lucide-react';

const HowItWorksTimeline = ({ isDark }: { isDark: boolean }) => {
    const steps = [
        { icon: UploadCloud, title: 'Upload', desc: 'Securely upload records.', color: 'from-blue-400 to-blue-600' },
        { icon: Cpu, title: 'Analyze', desc: 'AI extracts biomarkers.', color: 'from-emerald-400 to-emerald-600' },
        { icon: LineChart, title: 'Insights', desc: 'View lifetime trends.', color: 'from-purple-400 to-purple-600' },
        { icon: Stethoscope, title: 'Review', desc: 'Doctor verifies data.', color: 'from-rose-400 to-rose-600' },
        { icon: HeartHandshake, title: 'Action', desc: 'Get treatment plan.', color: 'from-amber-400 to-amber-600' },
    ];

    return (
        <section className={`py-16 md:py-40 relative ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className={`text-3xl sm:text-4xl md:text-[54px] leading-tight font-bold mb-4 md:mb-6 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        The Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Journey</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 relative max-w-7xl mx-auto">
                    {steps.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                            whileHover={{ y: -15, scale: 1.05 }}
                            className={`flex-1 p-8 rounded-[3rem] text-center transition-all cursor-pointer ${isDark ? 'bg-white/5 hover:bg-white/10 border border-white/5' : 'bg-white hover:shadow-2xl shadow-slate-200'}`}
                        >
                            <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-tr ${step.color} flex items-center justify-center mb-8 shadow-xl`}>
                                <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className={`text-2xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {step.title}
                            </h3>
                            <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksTimeline;
