import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { User, Stethoscope, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role: UserRole) => {
        login(role);
        navigate(`/${role}`);
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3
            },
        },
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-4">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

            <motion.div
                className="relative z-10 w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Left Side - Branding */}
                <div className="md:w-1/2 p-12 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-primary-700 text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                    <motion.div variants={itemVariants} className="relative z-10">
                        <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/30">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-medium mb-4">Smart Health Reports</h1>
                        <p className="text-blue-100 text-lg leading-relaxed">
                            The next generation of digital healthcare. Manage reports, consultations, and prescriptions in one seamless platform.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side - Role Selection */}
                <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white/50">
                    <motion.div variants={itemVariants} className="mb-8">
                        <h2 className="text-3xl font-medium text-gray-800 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Select your portal to continue</p>
                    </motion.div>

                    <div className="space-y-4">
                        <RoleButton
                            role="patient"
                            icon={<User className="w-6 h-6" />}
                            title="Patient Portal"
                            description="Access your health records and consults"
                            onClick={() => handleLogin('patient')}
                            variants={itemVariants}
                        />
                        <RoleButton
                            role="doctor"
                            icon={<Stethoscope className="w-6 h-6" />}
                            title="Doctor Portal"
                            description="Manage patients and prescriptions"
                            onClick={() => handleLogin('doctor')}
                            variants={itemVariants}
                        />
                        <RoleButton
                            role="admin"
                            icon={<Building2 className="w-6 h-6" />}
                            title="Hospital Admin"
                            description="System overview and management"
                            onClick={() => handleLogin('admin')}
                            variants={itemVariants}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface RoleButtonProps {
    role: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
    variants: any;
}

const RoleButton = ({ role, icon, title, description, onClick, variants }: RoleButtonProps) => {
    return (
        <motion.button
            variants={variants}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full flex items-center p-4 bg-white/60 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left"
        >
            <div className={`p-3 rounded-xl mr-4 ${role === 'patient' ? 'bg-blue-100 text-blue-600' :
                role === 'doctor' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-purple-100 text-purple-600'
                }`}>
                {icon}
            </div>
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
        </motion.button>
    );
};

export default LoginPage;
