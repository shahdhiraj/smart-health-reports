import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Stethoscope, User, Building2, Lock, Mail, ArrowRight, ShieldCheck, HeartPulse, Dna, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';



const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    
    // State for light/dark mode and fake form
    const [isDark, setIsDark] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

    const handleLogin = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        // Just use the selected role or default to patient
        const roleToLogin = selectedRole || 'patient';
        login(roleToLogin);
        navigate(`/${roleToLogin}`);
    };

    const fillDemoCredentials = (role: UserRole) => {
        setSelectedRole(role);
        setEmail(`${role}@demo.com`);
        setPassword('demo123');
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans transition-colors duration-500 ${isDark ? 'bg-[#0a0f1c]' : 'bg-slate-50'}`}>
            {/* Theme Toggle */}
            <button 
                onClick={() => setIsDark(!isDark)}
                className={`absolute top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md transition-all shadow-lg border ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="Toggle theme"
            >
                {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Animated Background Elements */}
            <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-600/20 blur-[120px] rounded-full pointer-events-none ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`} />
            <div className={`absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`} />

            <motion.div
                className={`relative z-10 w-full max-w-5xl backdrop-blur-2xl border rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-500 ${
                    isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white/80 border-slate-200'
                }`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left Side - Branding */}
                <div className={`md:w-[45%] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 md:border-r ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className={`absolute inset-0 z-0 ${isDark ? 'bg-gradient-to-br from-primary-900/40 to-slate-900/80' : 'bg-gradient-to-br from-primary-50/80 to-emerald-50/80'}`} />
                    
                    {/* Floating icons background */}
                    <div className={`absolute inset-0 z-0 ${isDark ? 'opacity-10' : 'opacity-5'}`}>
                        <HeartPulse className="absolute top-10 right-10 w-24 h-24 text-primary-500" />
                        <Dna className="absolute bottom-20 left-10 w-32 h-32 text-emerald-500" />
                    </div>

                    <motion.div variants={itemVariants} className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="h-12 w-12 bg-primary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <span className={`text-xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>SmartHealth</span>
                        </div>
                        
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Your health,<br/>
                            <span className="text-primary-500">
                                beautifully synced.
                            </span>
                        </h1>
                        <p className={`text-lg leading-relaxed max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Access your medical records, consult with doctors, and track your wellness journey in one secure platform.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className={`relative z-10 mt-12 flex items-center gap-4 p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/5' : 'bg-white/50 border-slate-100 shadow-sm'}`}>
                        <ShieldCheck className="w-10 h-10 text-emerald-500 flex-shrink-0" />
                        <div>
                            <h4 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>HIPAA Compliant</h4>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Your data is end-to-end encrypted</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side - Login Form */}
                <div className={`md:w-[55%] p-10 md:p-14 flex flex-col justify-center relative ${isDark ? 'bg-slate-900/80' : 'bg-white/50'}`}>
                    <motion.div variants={itemVariants} className="mb-8">
                        <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h2>
                        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Please enter your details to sign in.</p>
                    </motion.div>

                    {/* Auto-fill Demo Buttons */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>One-Click Demo Login</p>
                        <div className="grid grid-cols-3 gap-3">
                            <DemoButton 
                                role="patient" 
                                icon={<User className="w-4 h-4 text-emerald-500" />} 
                                label="Patient" 
                                active={selectedRole === 'patient'}
                                onClick={() => fillDemoCredentials('patient')}
                                isDark={isDark}
                            />
                            <DemoButton 
                                role="doctor" 
                                icon={<Stethoscope className="w-4 h-4 text-blue-500" />} 
                                label="Doctor" 
                                active={selectedRole === 'doctor'}
                                onClick={() => fillDemoCredentials('doctor')}
                                isDark={isDark}
                            />
                            <DemoButton 
                                role="admin" 
                                icon={<Building2 className="w-4 h-4 text-purple-500" />} 
                                label="Admin" 
                                active={selectedRole === 'admin'}
                                onClick={() => fillDemoCredentials('admin')}
                                isDark={isDark}
                            />
                        </div>
                    </motion.div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`block w-full pl-11 pr-4 py-3.5 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none ${
                                        isDark 
                                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                                    }`}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="flex items-center justify-between mb-2">
                                <label className={`block text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
                                <a href="#" className={`text-sm font-medium transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className={`h-5 w-5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`block w-full pl-11 pr-12 py-3.5 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none ${
                                        isDark 
                                        ? 'bg-slate-800/50 border-slate-700 text-white placeholder-slate-500' 
                                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm'
                                    }`}
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-full font-semibold text-white bg-gradient-to-tr from-primary-600 to-primary-400 hover:from-primary-500 hover:to-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
                            >
                                Sign In
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>
                        </motion.div>
                    </form>

                    <motion.p variants={itemVariants} className={`mt-8 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                        Don't have an account?{' '}
                        <a href="#" className={`font-medium transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
                            Contact your provider
                        </a>
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
};

interface DemoButtonProps {
    role: string;
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
    isDark: boolean;
}

const DemoButton = ({ icon, label, active, onClick, isDark }: DemoButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center gap-2 py-3 px-2 rounded-xl border transition-all text-sm font-medium
                ${active 
                    ? (isDark 
                        ? 'bg-primary-500/20 border-primary-500/50 text-primary-300 shadow-[0_0_15px_rgba(var(--color-primary-500),0.15)]' 
                        : 'bg-primary-50 border-primary-300 text-primary-700 shadow-sm')
                    : (isDark
                        ? 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 shadow-sm')
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
};

export default LoginPage;
