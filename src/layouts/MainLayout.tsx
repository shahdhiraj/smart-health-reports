import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, LogOut,
    LayoutDashboard, Stethoscope,
    Users, Building2, User, Pill, FileText,
    Utensils, Activity, Bell, Trash2, X, Search, RotateCcw, Heart, History, ShieldCheck, Watch, Scan, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealth } from '../context/HealthContext';
import PrintableForm from '../components/clinical/PrintableForm';
import type { UserRole } from '../context/AuthContext';

const MainLayout = () => {
    const { user, logout } = useAuth();
    const { healthData, markNotificationRead, clearNotifications, setPrintData, resetToDefault } = useHealth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    // Print Listener
    useEffect(() => {
        if (healthData.printData.type) {
            window.print();
            // Reset print data after a short timeout to prevent loops
            const timer = setTimeout(() => {
                setPrintData(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [healthData.printData.type, setPrintData]);

    const unreadCount = healthData.notifications.filter(n => !n.read).length;

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
            { path: '/patient/timeline', icon: History, label: 'Health Timeline' },
            { path: '/patient/menstruation-cycle', icon: Heart, label: 'Menstruation Cycle' },
            { path: '/patient/family', icon: Users, label: 'Family Health' },
            { path: '/patient/wearables', icon: Watch, label: 'Device Sync' },
            { path: '/patient/privacy', icon: ShieldCheck, label: 'Security & Privacy' },
        ],
        doctor: [
            { path: '/doctor', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/doctor/patients', icon: Users, label: 'My Patients' },
            { path: '/doctor/prescriptions', icon: Pill, label: 'ePrescriptions' },
            { path: '/doctor/imaging', icon: Scan, label: 'AI Imaging' },
            { path: '/doctor/consultations', icon: Stethoscope, label: 'Consultations' },
        ],
        admin: [
            { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
            { path: '/admin/users', icon: Users, label: 'User Management' },
            { path: '/admin/departments', icon: Building2, label: 'Departments' },
            { path: '/admin/audit-logs', icon: FileText, label: 'Audit Logs' },
            { path: '/admin/ai-settings', icon: Activity, label: 'AI Configuration' },
        ],
        pharmacist: [
            { path: '/pharmacy', icon: LayoutDashboard, label: 'Pharmacy Desk' },
            { path: '/pharmacy/prescriptions', icon: Pill, label: 'Dispense' },
            { path: '/pharmacy/inventory', icon: Building2, label: 'Inventory' },
        ],
        technician: [
            { path: '/laboratory', icon: LayoutDashboard, label: 'Lab Desk' },
            { path: '/laboratory/orders', icon: Activity, label: 'Test Queue' },
            { path: '/laboratory/results', icon: FileText, label: 'Results' },
        ],
        billing: [
            { path: '/billing', icon: LayoutDashboard, label: 'Billing Desk' },
            { path: '/billing/invoices', icon: FileText, label: 'Invoices' },
            { path: '/billing/reports', icon: Activity, label: 'Financials' },
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
                            <span className="font-medium text-xl text-gray-800">SmartHealth</span>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-3.5 top-8 p-1.5 bg-white border border-gray-200 shadow-sm rounded-lg text-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-colors hidden md:block z-50"
                >
                    {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

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
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-200 px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between md:justify-end">

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => {
                                resetToDefault();
                                navigate('/patient/dashboard');
                            }}
                            className="p-2.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all group"
                            title="Refill Mock Data"
                        >
                            <RotateCcw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
                        </button>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search clinical records..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-primary-200 rounded-xl text-sm outline-none w-64 transition-all"
                            />
                        </div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    setIsProfileOpen(false);
                                }}
                                className={`p-2.5 rounded-xl transition-all relative group ${
                                    isNotificationsOpen ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-400 hover:text-gray-900'
                                }`}
                            >
                                <Bell className={`w-5 h-5 ${unreadCount > 0 && 'animate-swing'}`} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center ring-2 ring-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
                                    >
                                        <div className="p-5 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0">
                                            <h3 className="font-medium text-gray-800">Notifications</h3>
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => clearNotifications()}
                                                    className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                                    title="Clear All"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                    className="p-1.5 hover:bg-gray-100 text-gray-400 rounded-lg"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
                                            {healthData.notifications.length === 0 ? (
                                                <div className="p-10 text-center">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <Bell className="w-6 h-6 text-gray-300" />
                                                    </div>
                                                    <p className="text-sm text-gray-400 font-medium">No alerts today</p>
                                                </div>
                                            ) : (
                                                <div className="divide-y divide-gray-50">
                                                    {healthData.notifications.map((notif) => (
                                                        <div 
                                                            key={notif.id}
                                                            className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer relative group/item ${!notif.read ? 'bg-primary-50/20' : ''}`}
                                                            onClick={() => {
                                                                markNotificationRead(notif.id);
                                                                if (notif.link) navigate(notif.link);
                                                                setIsNotificationsOpen(false);
                                                            }}
                                                        >
                                                            <div className="flex gap-3">
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                                    notif.type === 'prescription' ? 'bg-emerald-50 text-emerald-500' :
                                                                    notif.type === 'connection' ? 'bg-primary-50 text-primary-500' :
                                                                    'bg-gray-50 text-gray-500'
                                                                }`}>
                                                                    <Activity className="w-5 h-5" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{notif.title}</h4>
                                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                                                    <p className="text-[10px] text-gray-400 font-medium mt-2 uppercase tracking-tight">
                                                                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                    </p>
                                                                </div>
                                                                {!notif.read && (
                                                                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-1.5" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {healthData.notifications.length > 0 && (
                                            <div className="p-3 bg-gray-50/50 border-t border-gray-50 text-center">
                                                <button 
                                                    className="text-xs font-medium text-primary-600 hover:text-primary-700 tracking-tight"
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                >
                                                    View All History
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotificationsOpen(false);
                                }}
                                className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl transition-colors outline-none group"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">{user?.name}</p>
                                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                                </div>
                                <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold ring-2 ring-transparent group-hover:ring-primary-100 transition-all">
                                    {user?.name?.charAt(0)}
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 origin-top-right overflow-hidden z-50"
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
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <div className="px-6 py-6 md:px-16 md:py-8 lg:px-24 lg:py-10 w-full overflow-x-hidden">
                    <Outlet />
                </div>
            </main>

            {/* Hidden Print Container */}
            {healthData.printData.type && (
                <div className="print-only">
                    <PrintableForm 
                        data={healthData.printData.data} 
                        type={healthData.printData.type} 
                        patientInfo={{
                            fullName: healthData.fullName,
                            nationalId: healthData.nationalId,
                            dob: healthData.dateOfBirth,
                            bloodGroup: healthData.bloodGroup,
                            gender: healthData.gender
                        }} 
                    />
                </div>
            )}
        </div>
    );
};

export default MainLayout;
