import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Users, Stethoscope, Building, ShieldPlus, Landmark, TestTube2 } from 'lucide-react';
import { MouseEvent } from 'react';
import AnimatedSectionHeader from './ui/AnimatedSectionHeader';

const AudienceCard = ({ aud, isDark, index }: any) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`group relative p-8 rounded-3xl border overflow-hidden transition-all ${isDark ? 'bg-white/5 border-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-primary-500/10' : 'bg-white border-gray-100 hover:border-emerald-200 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-emerald-500/20'}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            400px circle at ${mouseX}px ${mouseY}px,
                            ${isDark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.06)'},
                            transparent 80%
                        )
                    `,
                }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${isDark ? 'bg-[#1BDADD]/20 text-[#1BDADD] group-hover:bg-gradient-to-tr group-hover:from-primary-600 group-hover:to-primary-400 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-[#1BDADD]/10 text-[#1BDADD] group-hover:bg-gradient-to-tr group-hover:from-primary-600 group-hover:to-primary-400 group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)]'}`}>
                    <aud.icon className="w-7 h-7" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 transition-colors ${isDark ? 'text-white group-hover:text-primary-300' : 'text-gray-900 group-hover:text-emerald-700'}`}>
                    {aud.title}
                </h3>
                
                <p className={`text-base leading-relaxed mt-auto ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-800'}`}>
                    {aud.desc}
                </p>
            </div>
        </motion.div>
    );
};

const TargetAudience = ({ isDark }: { isDark: boolean }) => {
    const audiences = [
        { icon: Users, title: 'Patients', desc: 'Own your lifelong health data. Never lose a paper report again and receive AI-driven health insights.' },
        { icon: Stethoscope, title: 'Doctors', desc: 'Access comprehensive patient histories instantly. AI pre-analyzes reports to save clinical time.' },
        { icon: Building, title: 'Hospitals', desc: 'Digitize operations, manage population health, and interoperate seamlessly with external clinics.' },
        { icon: TestTube2, title: 'Laboratories', desc: 'Push digital reports directly to patient vaults. Eliminate paper printing costs and delays.' },
        { icon: ShieldPlus, title: 'Insurance', desc: 'Streamline claims with verified, immutable digital health records and automated audits.' },
        { icon: Landmark, title: 'Governments', desc: 'Integrate with National Health IDs. Monitor macro disease trends and resource allocation.' },
    ];

    return (
        <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#020817]/50' : 'bg-[#f8fafc]'}`}>
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <AnimatedSectionHeader 
                        isDark={isDark}
                        title={
                            <>Built for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">Entire Ecosystem</span></>
                        }
                        subtitle="A single platform connecting all stakeholders in the healthcare lifecycle."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {audiences.map((aud, i) => (
                        <AudienceCard key={i} aud={aud} isDark={isDark} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetAudience;
