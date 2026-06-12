import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';


const FinalCTA = ({ isDark }: { isDark: boolean }) => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="py-16 md:py-40 relative overflow-hidden">
            {/* Massive bouncy background sphere */}
            <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[800px] md:h-[800px] rounded-[40%] blur-[100px] pointer-events-none transition-colors duration-1000 ${isDark ? 'bg-primary-900/30' : 'bg-emerald-200/50'}`} 
            />
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 break-words ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Let's Build the <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary-500">Future.</span>
                    </h2>
                    
                    <div className="mt-12 max-w-xl mx-auto">
                        {isSubscribed ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`flex items-center justify-center gap-3 py-4 px-6 rounded-2xl border ${isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}
                            >
                                <CheckCircle2 className="w-5 h-5" />
                                <span className="font-semibold text-lg">Welcome to the ecosystem! We'll be in touch.</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <div className="relative w-full sm:flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className={`h-5 w-5 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email address"
                                        required
                                        className={`w-full pl-12 pr-5 py-4 rounded-full border focus:ring-2 focus:ring-primary-500 outline-none transition-all ${
                                            isDark 
                                            ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-400' 
                                            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm'
                                        }`}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-tr from-slate-900 to-slate-700 text-white px-8 py-4 rounded-full font-semibold text-base hover:from-slate-800 hover:to-slate-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/30 hover:shadow-slate-900/50 whitespace-nowrap group"
                                >
                                    Join Ecosystem
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FinalCTA;
