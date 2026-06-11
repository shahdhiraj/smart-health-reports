import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

const FinalCTA = ({ isDark }: { isDark: boolean }) => {
    return (
        <section className="py-40 relative overflow-hidden">
            {/* Massive bouncy background sphere */}
            <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-[40%] blur-[100px] pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-primary-900/30' : 'bg-emerald-200/50'}`} 
            />
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className={`text-7xl md:text-8xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Let's Build the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-500">Future.</span>
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <MagneticButton className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-primary-600 to-primary-400 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:from-primary-500 hover:to-primary-300 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                            Join Ecosystem
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
