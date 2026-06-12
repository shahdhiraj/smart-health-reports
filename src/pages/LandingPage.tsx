import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Stethoscope, Moon, Sun, Menu, X } from 'lucide-react';

// UI
import MagneticButton from '../components/landing/ui/MagneticButton';

// Components
import HeroSection from '../components/landing/HeroSection';
import EcosystemNetwork from '../components/landing/EcosystemNetwork';
import HowItWorksTimeline from '../components/landing/HowItWorksTimeline';
import SmartAIEngine from '../components/landing/SmartAIEngine';
import HealthTimelineShowcase from '../components/landing/HealthTimelineShowcase';
import VoiceAssistant from '../components/landing/VoiceAssistant';
import PopulationAnalytics from '../components/landing/PopulationAnalytics';
import SecurityVault from '../components/landing/SecurityVault';
import TargetAudience from '../components/landing/TargetAudience';
import FutureIntegrations from '../components/landing/FutureIntegrations';
import MetricsGrid from '../components/landing/MetricsGrid';
import PricingSection from '../components/landing/PricingSection';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['features', 'solutions', 'testimonials', 'pricing'];
            let current = '';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 300 && rect.bottom >= 300) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        // Run once on mount to set initial active section
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return () => {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#0f172a] text-white' : 'bg-[#f8fafc] text-slate-900'} overflow-hidden selection:bg-primary-500/30`}>
            <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-primary-500 origin-left z-[100] rounded-r-full" style={{ scaleX }} />

            {/* Preloader */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className={`fixed inset-0 z-[200] flex items-center justify-center ${isDark ? 'bg-[#0f172a]' : 'bg-white'}`}
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-20 h-20 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary-500/40"
                        >
                            <Stethoscope className="w-10 h-10 text-white" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ambient Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className={`absolute top-0 left-1/4 w-[40rem] h-[40rem] rounded-full blur-[128px] mix-blend-screen transition-opacity duration-1000 ${isDark ? 'bg-primary-600/10 opacity-100' : 'bg-primary-300/20 opacity-70'}`} />
                <div className={`absolute bottom-0 right-1/4 w-[40rem] h-[40rem] rounded-full blur-[128px] mix-blend-screen transition-opacity duration-1000 ${isDark ? 'bg-emerald-600/10 opacity-100' : 'bg-emerald-300/20 opacity-70'}`} />
            </div>

            {/* Sticky Floating Nav Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none transition-all duration-500 mt-2 md:mt-6">
                <header className={`pointer-events-auto transition-all duration-500 ${scrolled ? `w-full max-w-6xl rounded-full ${isDark ? 'bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50' : 'bg-white/80 backdrop-blur-2xl border border-slate-200/50 shadow-2xl shadow-slate-200/50'}` : 'w-full bg-transparent'}`}>
                    <div className={`px-3 sm:px-6 flex justify-between items-center transition-all duration-500 ${scrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'}`}>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <MagneticButton className={`transition-all duration-500 bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg shadow-primary-500/20 ${scrolled ? 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl' : 'w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl'}`}>
                                <Stethoscope className={`text-white transition-all duration-500 ${scrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
                            </MagneticButton>
                            <span className={`font-medium tracking-tight transition-all duration-500 ${scrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} ${isDark ? 'text-white' : 'text-slate-900'}`}>SmartHealth</span>
                        </div>
                        
                        <nav className="hidden lg:flex items-center gap-8">
                            {[
                                { name: 'Features', id: 'features' },
                                { name: 'Solutions', id: 'solutions' },
                                { name: 'Testimonials', id: 'testimonials' },
                                { name: 'Pricing', id: 'pricing' }
                            ].map((item) => (
                                <MagneticButton 
                                    key={item.name} 
                                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                                    className={`text-sm font-semibold transition-colors cursor-pointer ${activeSection === item.id ? 'text-primary-500 drop-shadow-md' : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-primary-600')}`}
                                >
                                    {item.name}
                                </MagneticButton>
                            ))}
                        </nav>
                        
                        <div className="flex items-center gap-1.5 sm:gap-4">
                            <MagneticButton 
                                onClick={() => setIsDark(!isDark)}
                                className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors ${isDark ? 'bg-white/5 text-yellow-300 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                <AnimatePresence mode="wait">
                                    {isDark ? (
                                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                            <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                            <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </MagneticButton>
                            <MagneticButton 
                                onClick={() => navigate('/login')}
                                className={`hidden sm:flex text-sm font-bold tracking-wide transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                Log In
                            </MagneticButton>
                            <MagneticButton 
                                onClick={() => navigate('/login')}
                                className={`bg-gradient-to-tr from-primary-600 to-primary-400 text-white font-bold hover:from-primary-500 hover:to-primary-300 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 ${scrolled ? 'px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full text-[10px] sm:text-xs' : 'px-3 sm:px-6 py-2 sm:py-3 rounded-full text-[11px] sm:text-sm'}`}
                            >
                                Start App
                            </MagneticButton>
                            <MagneticButton
                                onClick={() => setIsMobileMenuOpen(true)}
                                className={`lg:hidden p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors ${isDark ? 'bg-white/5 text-slate-300 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                            </MagneticButton>
                        </div>
                    </div>
                </header>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`absolute top-[120%] left-4 right-4 rounded-3xl p-6 shadow-2xl border ${isDark ? 'bg-[#0f172a] border-white/10 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/50'} lg:hidden pointer-events-auto`}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-slate-900'}`}>Navigation</span>
                                <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 rounded-full ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4">
                                {[
                                    { name: 'Features', id: 'features' },
                                    { name: 'Solutions', id: 'solutions' },
                                    { name: 'Testimonials', id: 'testimonials' },
                                    { name: 'Pricing', id: 'pricing' }
                                ].map((item) => (
                                    <button 
                                        key={item.name} 
                                        onClick={() => {
                                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`text-left text-lg font-semibold py-3 border-b ${isDark ? 'border-white/10 text-slate-300 hover:text-white' : 'border-slate-100 text-slate-600 hover:text-primary-600'}`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                                <button 
                                    onClick={() => navigate('/login')}
                                    className={`mt-4 w-full py-4 rounded-xl font-bold transition-all sm:hidden ${isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-900'}`}
                                >
                                    Log In
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Main Content Areas */}
            <main className="relative z-10 pt-20">
                <HeroSection isDark={isDark} isReady={!isLoading} />
                <div id="solutions"><EcosystemNetwork isDark={isDark} /></div>
                <HowItWorksTimeline isDark={isDark} />
                <div id="features"><SmartAIEngine isDark={isDark} /></div>
                <HealthTimelineShowcase isDark={isDark} />
                <VoiceAssistant isDark={isDark} />
                <PopulationAnalytics isDark={isDark} />
                <SecurityVault isDark={isDark} />
                <TargetAudience isDark={isDark} />
                <FutureIntegrations isDark={isDark} />
                <div id="testimonials"><MetricsGrid isDark={isDark} /></div>
                <div id="pricing"><PricingSection isDark={isDark} /></div>
                <FinalCTA isDark={isDark} />
            </main>

            <Footer isDark={isDark} />
        </div>
    );
};

export default LandingPage;
