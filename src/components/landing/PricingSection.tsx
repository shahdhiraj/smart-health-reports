import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import AnimatedSectionHeader from './ui/AnimatedSectionHeader';

const PricingSection = ({ isDark }: { isDark: boolean }) => {
    const plans = [
        {
            name: 'Individual',
            price: 'Free',
            desc: 'For patients managing personal records.',
            features: ['Digital Health Vault', 'Basic AI Insights', '5 Report Uploads/mo', 'Email Support'],
        },
        {
            name: 'Clinic Pro',
            price: '$49',
            period: '/mo',
            desc: 'For independent doctors and small clinics.',
            features: ['Unlimited Patient Records', 'Advanced AI Diagnostics', 'Telemedicine Portal', 'Priority Support'],
            popular: true,
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            desc: 'For large hospitals and networks.',
            features: ['Full EHR Integration', 'Population Analytics', 'Dedicated Server Instance', '24/7 SLA Support'],
        }
    ];

    return (
        <section className={`py-40 relative ${isDark ? 'bg-[#0f172a]' : 'bg-[#f8fafc]'}`}>
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <AnimatedSectionHeader 
                        isDark={isDark}
                        title={
                            <>Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Happy <br className="hidden md:block" /> Pricing.</span></>
                        }
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-center justify-center">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                            whileHover={{ y: -15 }}
                            className={`flex-1 w-full p-10 rounded-[3rem] relative ${plan.popular ? (isDark ? 'bg-primary-900/20 border border-primary-500 scale-105 z-10' : 'bg-primary-50 border-4 border-primary-500 shadow-2xl scale-105 z-10') : (isDark ? 'bg-white/5 border border-white/5' : 'bg-white border border-slate-100 shadow-xl shadow-slate-200')}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-primary-500 text-white text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}
                            
                            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                            <p className={`text-sm font-medium mb-8 h-10 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{plan.desc}</p>
                            
                            <div className="mb-10">
                                <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                                {plan.period && <span className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{plan.period}</span>}
                            </div>
                            
                            <ul className="space-y-5 mb-10">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? 'bg-primary-500 text-white' : (isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-700')}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className={`text-base font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <MagneticButton className={`w-full py-3.5 rounded-full font-semibold text-base transition-all active:scale-95 ${plan.popular ? 'bg-gradient-to-tr from-primary-600 to-primary-400 text-white hover:from-primary-500 hover:to-primary-300 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-[1.02]' : (isDark ? 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]' : 'bg-slate-100 text-slate-900 hover:bg-slate-200 hover:scale-[1.02]')}`}>
                                Get Started
                            </MagneticButton>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
