import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Paintbrush, Moon, Globe, Save } from 'lucide-react';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('English');

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="page-title">Settings</h1>
                <p className="text-gray-500 mt-2">Manage your application preferences and account settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Settings Navigation */}
                <div className="md:col-span-1 space-y-2">
                    {['General', 'Notifications', 'Security', 'Appearance'].map((item, index) => (
                        <button
                            key={item}
                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-colors ${index === 0
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Notifications Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                <Bell className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-700">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Receive updates via email</p>
                                </div>
                                <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-100 text-green-600 rounded-xl">
                                <Lock className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Security</h2>
                        </div>
                        <div className="space-y-4">
                            <button className="text-primary-600 font-medium hover:underline">Change Password</button>
                            <button className="block text-primary-600 font-medium hover:underline">Enable Two-Factor Authentication</button>
                        </div>
                    </motion.div>

                    {/* Appearance Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                                <Paintbrush className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Appearance</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Moon className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-700">Dark Mode</span>
                                </div>
                                <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-700">Language</span>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-primary-500"
                                >
                                    <option>English</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex justify-end">
                        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ease-in-out shrink-0 ${checked ? 'bg-primary-600' : 'bg-gray-200'}`}
    >
        <span
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}
        />
    </button>
);

export default SettingsPage;
