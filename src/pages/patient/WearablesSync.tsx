import { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, HeartPulse, Activity, BellRing, Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const WearablesSync = () => {
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
        <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 dark:bg-primary-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 25 }}
                className="relative z-10 w-full max-w-2xl"
            >
                <Card className="p-10 md:p-14 text-center border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl ring-1 ring-slate-200 dark:ring-white/10 overflow-hidden relative">
                    
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-emerald-400 to-primary-600" />

                    {/* Animated Icons Container */}
                    <div className="relative w-40 h-40 mx-auto mb-10">
                        {/* Orbiting Elements */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border border-dashed border-slate-300 dark:border-slate-700 rounded-full"
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md text-emerald-500">
                                <Activity className="w-4 h-4" />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md text-rose-500">
                                <HeartPulse className="w-4 h-4" />
                            </div>
                        </motion.div>

                        {/* Center Icon */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-40 rounded-full" />
                                <div className="relative w-20 h-20 bg-gradient-to-tr from-primary-600 to-emerald-400 rounded-3xl flex items-center justify-center shadow-xl shadow-primary-500/30 transform rotate-12">
                                    <Watch className="w-10 h-10 text-white transform -rotate-12" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-sm mb-6 border border-slate-200 dark:border-slate-700">
                            <Sparkles className="w-4 h-4 text-primary-500" />
                            <span>Feature in Development</span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
                            Wearables Integration
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-emerald-500">
                                is Coming Soon.
                            </span>
                        </h1>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg mx-auto leading-relaxed">
                            We're building seamless syncing with Apple Watch, Oura Ring, and Fitbit. Get ready to stream your live vitals directly to your doctor.
                        </p>

                        {isSubscribed ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 py-4 px-6 rounded-2xl border border-emerald-100 dark:border-emerald-500/20"
                            >
                                <BellRing className="w-5 h-5" />
                                <span className="font-semibold text-lg">You're on the waitlist! We'll notify you.</span>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    required
                                    className="w-full sm:flex-1 px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                                />
                                <button
                                    type="submit"
                                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 dark:bg-primary-500 text-white font-bold hover:bg-slate-800 dark:hover:bg-primary-400 hover:shadow-lg transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
                                >
                                    Notify Me
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        )}
                    </motion.div>
                </Card>
            </motion.div>
        </div>
    );
};

export default WearablesSync;
