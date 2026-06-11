import { motion } from 'framer-motion';
import { Watch, Pill, Globe, Smartphone, Activity } from 'lucide-react';

const FutureIntegrations = ({ isDark }: { isDark: boolean }) => {
    return (
        <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-[#020817]' : 'bg-white'}`}>
            <div className="container mx-auto px-6 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`text-[54px] leading-tight font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                    The Future is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Interconnected</span>
                </motion.h2>
                <p className={`text-xl max-w-2xl mx-auto mb-20 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    SmartHealth seamlessly plugs into the broader healthcare infrastructure, from wearables to national systems.
                </p>

                <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center perspective-1000">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                    
                    {/* Center Hub */}
                    <motion.div 
                        whileHover={{ scale: 1.1, boxShadow: "0 0 80px rgba(52,211,153,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center shadow-[0_0_60px_rgba(52,211,153,0.4)] cursor-pointer group"
                    >
                        <motion.div 
                            animate={{ rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Smartphone className="w-12 h-12 text-white group-hover:text-emerald-50 transition-colors" />
                        </motion.div>
                        {/* Ripples around center */}
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                            animate={{ scale: [1, 1.8], opacity: [1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.div 
                            className="absolute inset-0 rounded-full border-2 border-emerald-400/30"
                            animate={{ scale: [1, 2.2], opacity: [1, 0] }}
                            transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
                        />
                    </motion.div>

                    {/* Orbiting Elements */}
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[300px] border border-dashed border-gray-500/30 rounded-full flex items-center justify-center">
                        <motion.div 
                            whileHover={{ scale: 1.4 }} 
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="absolute -top-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl flex items-center justify-center cursor-pointer group"
                            style={{ rotate: -360 }} // Anti-rotate to keep icon upright visually, but wait, the rotation of parent affects it.
                        >
                            <Watch className={`w-6 h-6 group-hover:text-emerald-500 transition-colors ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.4 }} 
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="absolute -bottom-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl flex items-center justify-center cursor-pointer group"
                        >
                            <Pill className={`w-6 h-6 group-hover:text-rose-500 transition-colors ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                        </motion.div>
                    </motion.div>

                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute w-[500px] h-[500px] border border-dashed border-gray-500/20 rounded-full flex items-center justify-center">
                        <motion.div 
                            whileHover={{ scale: 1.4 }} 
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="absolute -left-6 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl flex items-center justify-center cursor-pointer group"
                        >
                            <Globe className={`w-6 h-6 group-hover:text-blue-500 transition-colors ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FutureIntegrations;
