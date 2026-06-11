import { motion } from 'framer-motion';
import { Users, Stethoscope, Activity, DollarSign, TrendingUp } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, BarChart, Bar
} from 'recharts';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Patients', value: '1,250', change: '+12%', icon: Users, color: 'blue' },
        { label: 'Active Doctors', value: '45', change: '+2', icon: Stethoscope, color: 'emerald' },
        { label: 'Consultations', value: '328', change: '+18%', icon: Activity, color: 'purple' },
        { label: 'Revenue', value: '$45k', change: '+8%', icon: DollarSign, color: 'primary' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="page-title">Hospital Overview</h1>
                <p className="text-gray-500 mt-2">System performance and key metrics.</p>
            </div>

            {/* System Status Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                    { label: 'AI Engine', status: 'Operational', color: 'green', latency: '45ms' },
                    { label: 'Database Cluster', status: 'Operational', color: 'green', latency: '12ms' },
                    { label: 'Server Health', status: 'High Load', color: 'orange', latency: '82% Load' },
                ].map((sys, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                        <div>
                            <h4 className="font-medium text-gray-800">{sys.label}</h4>
                            <p className="text-xs text-gray-500">Latency: {sys.latency}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${sys.color}-100 text-${sys.color}-700`}>
                            {sys.status}
                        </span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3" />
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="card-title">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Disease Trend Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">Disease Trends (Monthly)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { name: 'Jan', flu: 40, covid: 24, cardio: 55 },
                                { name: 'Feb', flu: 30, covid: 13, cardio: 58 },
                                { name: 'Mar', flu: 20, covid: 98, cardio: 60 },
                                { name: 'Apr', flu: 27, covid: 39, cardio: 63 },
                                { name: 'May', flu: 18, covid: 48, cardio: 65 },
                                { name: 'Jun', flu: 23, covid: 38, cardio: 68 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend />
                                <Line type="monotone" dataKey="flu" stroke="#8884d8" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="covid" stroke="#82ca9d" strokeWidth={3} dot={false} />
                                <Line type="monotone" dataKey="cardio" stroke="#ffc658" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Risk Clustering */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">Patient Risk Distribution</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'High Risk', value: 15, fill: '#EF4444' },
                                        { name: 'Moderate', value: 35, fill: '#F59E0B' },
                                        { name: 'Low Risk', value: 50, fill: '#10B981' },
                                    ]}
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {/* Cells handled by fill in data */}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend verticalAlign="middle" align="right" layout="vertical" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Doctor Workload */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-800 mb-6">Doctor Workload (Weekly Consults)</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Dr. Smith', consults: 45 },
                                { name: 'Dr. Wilson', consults: 38 },
                                { name: 'Dr. Lee', consults: 52 },
                                { name: 'Dr. Brown', consults: 29 },
                                { name: 'Dr. Davis', consults: 41 },
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="consults" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="card-title">Department Status</h3>
                        <button className="text-primary-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {['Cardiology', 'Neurology', 'Pediatrics', 'Oncology', 'Orthopedics'].map((dept) => (
                            <div key={dept} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                                <span className="font-medium text-gray-700">{dept}</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">OPERATIONAL</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
