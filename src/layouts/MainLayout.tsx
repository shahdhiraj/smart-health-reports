import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Menu, LogOut,
    LayoutDashboard, Stethoscope,
    Users, Building2, User, Pill, FileText,
    Utensils, Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../context/AuthContext';

const MainLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = {
        patient: [
            { path: '/patient', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/patient/health-profile', icon: User, label: 'Health Profile' },
            { path: '/patient/prescriptions', icon: Pill, label: 'Prescriptions' },
            { path: '/patient/consultations', icon: Stethoscope, label: 'Consultations' },
            { path: '/patient/reports', icon: FileText, label: 'Reports & AI' },
            { path: '/patient/nutrition', icon: Utensils, label: 'Nutrition' },
            { path: '/patient/disease-tracking', icon: Activity, label: 'My Tracking' },
        ],
        doctor: [
            { path: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/doctor/patients', icon: Users, label: 'My Patients' },
            { path: '/doctor/consultations', icon: Stethoscope, label: 'Consultations' },
        ],
        admin: [
            { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/admin/users', icon: Users, label: 'User Management' },
            { path: '/admin/hospital', icon: Building2, label: 'Hospital Overview' }, // Keeping this if it was intended, but mapped to dashboard in original? actually it goes to /admin/hospital which isn't in Router?
            { path: '/admin/departments', icon: Building2, label: 'Departments' },
            { path: '/admin/audit-logs', icon: FileText, label: 'Audit Logs' },
            { path: '/admin/ai-settings', icon: Activity, label: 'AI Configuration' },
        ],
    };

    const currentRole = user?.role as UserRole || 'patient';
    const roleMenuItems = menuItems[currentRole] || [];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="bg-white border-r border-gray-200 fixed h-full z-30 hidden md:flex flex-col"
            >
                <div className="p-6 flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center w-full'}`}>
                        <div className="h-10 w-10 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
                            <Stethoscope className="text-white w-6 h-6" />
                        </div>
                        {isSidebarOpen && (
                            <span className="font-bold text-xl text-gray-800">SmartHealth</span>
                        )}
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {roleMenuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                    ? 'bg-primary-50 text-primary-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    } ${!isSidebarOpen && 'justify-center'}`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {isSidebarOpen && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-[280px]' : 'md:ml-[80px]'}`}>
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg hidden md:block"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors outline-none"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                            </div>
                            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold ring-2 ring-transparent group-hover:ring-primary-100 transition-all">
                                {user?.name?.charAt(0)}
                            </div>
                        </button>

                        {/* Profile Dropdown */}
                        {isProfileOpen && (
                            <div
                                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 origin-top-right overflow-hidden"
                                onMouseLeave={() => setIsProfileOpen(false)}
                            >
                                <div className="px-4 py-3 border-b border-gray-50 mb-1">
                                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(false);
                                        navigate('/settings');
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary-600 flex items-center gap-2 transition-colors"
                                >
                                    <Menu className="w-4 h-4" />
                                    Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
