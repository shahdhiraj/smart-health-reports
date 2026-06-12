import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Fingerprint } from 'lucide-react';
import AnimatedSectionHeader from './ui/AnimatedSectionHeader';

const SecurityVault = ({ isDark }: { isDark: boolean }) => {
    return (
        <section className={`py-16 md:py-32 relative ${isDark ? 'bg-[#020817]' : 'bg-white'}`}>
            <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-16">
                
                <div className="md:w-1/2 flex justify-center perspective-1000">
                    <motion.div 
                        initial={{ rotateY: -15, scale: 0.9, opacity: 0 }}
                        whileInView={{ rotateY: 5, scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative w-80 h-96 bg-gradient-to-b from-blue-900 to-[#020817] rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center overflow-hidden"
                    >
                        {/* Vault Elements */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="absolute border border-blue-400 rounded-full" style={{ width: `${(i+1)*60}px`, height: `${(i+1)*60}px` }} />
                            ))}
                        </div>
                        
                        <ShieldCheck className="w-24 h-24 text-blue-400 relative z-10 mb-6 drop-shadow-lg" />
                        
                        <div className="flex gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Lock className="w-5 h-5 text-white" />
                            </div>
                            <div className="w-12 h-12 bg-white/10 rounded-xl backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Fingerprint className="w-5 h-5 text-white" />
                            </div>
                        </div>

                        {/* Scanning beam */}
                        <motion.div 
                            animate={{ y: [-150, 150, -150] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20"
                        />
                    </motion.div>
                </div>

                <div className="md:w-1/2">
                    <AnimatedSectionHeader 
                        isDark={isDark}
                        align="left"
                        title={
                            <>Impenetrable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Vault</span></>
                        }
                        subtitle="Your health data is highly sensitive. We protect it with military-grade encryption, biometric clinical authentication, and granular consent management."
                    />
                    
                    <ul className="space-y-4">
                        {['End-to-end 256-bit AES Encryption', 'HIPAA & GDPR Compliant', 'Dynamic Consent Handshakes', 'Immutable Audit Trails'].map((feature, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (i * 0.1) }}
                                className="flex items-center gap-3"
                            >
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                </div>
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default SecurityVault;
