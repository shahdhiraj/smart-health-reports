import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Calendar, Pill, TrendingUp, Clock, FileText, Heart, Moon, ChevronRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';

const bpData = [
  { day: 'Mon', systolic: 120, diastolic: 80 },
  { day: 'Tue', systolic: 118, diastolic: 79 },
  { day: 'Wed', systolic: 122, diastolic: 82 },
  { day: 'Thu', systolic: 119, diastolic: 81 },
  { day: 'Fri', systolic: 121, diastolic: 80 },
  { day: 'Sat', systolic: 117, diastolic: 78 },
  { day: 'Sun', systolic: 115, diastolic: 76 },
];

const sleepData = [
  { day: 'Mon', hours: 7.5, quality: 85 },
  { day: 'Tue', hours: 6.8, quality: 70 },
  { day: 'Wed', hours: 8.1, quality: 92 },
  { day: 'Thu', hours: 7.2, quality: 80 },
  { day: 'Fri', hours: 6.5, quality: 65 },
  { day: 'Sat', hours: 8.5, quality: 95 },
  { day: 'Sun', hours: 9.0, quality: 98 },
];

const healthBreakdown = [
  { name: 'Cardio', value: 35, color: '#10b981' },
  { name: 'Strength', value: 25, color: '#3b82f6' },
  { name: 'Flexibility', value: 20, color: '#8b5cf6' },
  { name: 'Rest', value: 20, color: '#f59e0b' },
];

const PatientDashboard = () => {
    const navigate = useNavigate();
    const stats = [
        { label: 'Upcoming Consults', value: '2', icon: Calendar, color: 'blue' },
        { label: 'Active Prescriptions', value: '4', icon: Pill, color: 'emerald' },
        { label: 'Health Score', value: '92%', icon: Activity, color: 'primary' },
        { label: 'Pending Reports', value: '1', icon: FileText, color: 'orange' },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-50">
                    <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-xs font-medium" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full pb-8">
            <div className="mb-8 md:mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-0">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="page-title text-3xl sm:text-4xl"
                    >
                        Patient Dashboard
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 mt-2 font-light text-base sm:text-lg"
                    >
                        Good morning, John! ☀️ Here's your daily health summary.
                    </motion.p>
                </div>
                <motion.button
                    onClick={() => navigate('/patient/consultations')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-tr from-primary-600 to-primary-400 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:from-primary-500 hover:to-primary-300 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 group w-full sm:w-auto justify-center"
                >
                    Book Consultation
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="bg-white p-5 rounded-3xl shadow-sm cursor-pointer group hover:shadow-md transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-500 group-hover:bg-${stat.color}-100 transition-colors duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="flex items-baseline gap-2">
                                <h3 className="card-title">{stat.value}</h3>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            </div>
                        </div>
                        {index === 2 && (
                            <motion.span 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl"
                            >
                                <TrendingUp className="w-3 h-3" />
                                +2%
                            </motion.span>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Primary Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Blood Pressure Area Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="card-title">Blood Pressure Trend</h3>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1.5">
                                Last 7 Days • <span className="text-emerald-500">Normal Range</span>
                            </p>
                        </div>
                        <motion.div 
                            whileHover={{ rotate: 15 }}
                            className="p-3.5 bg-rose-50 text-rose-400 rounded-2xl"
                        >
                            <Heart className="w-6 h-6" />
                        </motion.div>
                    </div>
                    
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={bpData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 400 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 400 }} domain={['dataMin - 10', 'dataMax + 10']} />
                                <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#f1f5f9', strokeWidth: 1 }} />
                                <Area 
                                    type="monotone" 
                                    dataKey="systolic" 
                                    name="Systolic"
                                    stroke="#fb7185" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorSys)" 
                                    activeDot={{ r: 5, strokeWidth: 0, fill: '#fb7185' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="diastolic" 
                                    name="Diastolic"
                                    stroke="#60a5fa" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorDia)" 
                                    activeDot={{ r: 5, strokeWidth: 0, fill: '#60a5fa' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Sleep Analysis Bar Chart */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="bg-white p-8 rounded-3xl shadow-sm group flex flex-col hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="card-title">Sleep Analysis</h3>
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mt-1.5">
                                Avg 7.8 hours/night
                            </p>
                        </div>
                        <motion.div 
                            whileHover={{ rotate: -15 }}
                            className="p-3.5 bg-indigo-50 text-indigo-400 rounded-2xl"
                        >
                            <Moon className="w-6 h-6" />
                        </motion.div>
                    </div>
                    
                    <div className="h-[250px] w-full flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sleepData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 400 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontWeight: 400 }} />
                                <RechartsTooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                                <Bar dataKey="hours" name="Hours" radius={[8, 8, 8, 8]} maxBarSize={28}>
                                    {sleepData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.hours >= 8 ? '#818cf8' : '#c7d2fe'} className="transition-all duration-300 hover:opacity-80" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Secondary Charts & Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Health Breakdown Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="bg-white p-8 rounded-3xl shadow-sm flex flex-col hover:shadow-md transition-all duration-300"
                >
                    <h3 className="text-xl font-medium text-gray-800 tracking-tight mb-2">Activity Breakdown</h3>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">Current Week</p>
                    
                    <div className="h-[240px] w-full relative flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={healthBreakdown}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {healthBreakdown.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity outline-none" />
                                    ))}
                                </Pie>
                                <RechartsTooltip content={<CustomTooltip />} />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 400, color: '#6b7280' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center -mt-8 pointer-events-none">
                            <div className="text-center">
                                <span className="block text-3xl font-medium text-gray-800">100%</span>
                                <span className="block text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">Total</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Upcoming Appointments */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm flex flex-col hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="card-title">Upcoming Appointments</h3>
                        <motion.button 
                            whileHover={{ x: 3 }}
                            className="text-primary-500 text-sm font-medium hover:text-primary-600 flex items-center gap-1.5"
                        >
                            View All <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                    <div className="space-y-4 flex-grow">
                        {[
                            { doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', time: 'Today, 14:30', type: 'Video Call', color: 'primary' },
                            { doctor: 'Dr. James Wilson', specialty: 'General Physician', time: 'Tomorrow, 10:00', type: 'Clinic Visit', color: 'emerald' }
                        ].map((apt, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ scale: 1.02, backgroundColor: '#f8fafc' }}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl transition-all cursor-pointer bg-white"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 bg-${apt.color}-50 rounded-2xl flex items-center justify-center text-${apt.color}-500 font-medium text-sm`}>
                                        {apt.time.split(',')[0].substring(0, 3)}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{apt.doctor}</h4>
                                        <p className="text-sm font-normal text-gray-500">{apt.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl">
                                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                                        {apt.time.split(', ')[1]}
                                    </div>
                                    <p className={`text-xs text-${apt.color}-500 mt-1.5 font-medium`}>{apt.type}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Recent Vitals */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-3xl shadow-sm flex flex-col hover:shadow-md transition-all duration-300"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="card-title">Recent Vitals</h3>
                        <span className="text-xs font-medium bg-gray-50 text-gray-500 px-3 py-1.5 rounded-xl uppercase tracking-wider">Today</span>
                    </div>
                    <div className="space-y-8 flex-grow">
                        <motion.div whileHover={{ x: 5 }} className="cursor-pointer group">
                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Blood Pressure</span>
                                <span className="text-xl font-normal text-gray-700">120/80 <span className="text-xs font-normal text-gray-400">mmHg</span></span>
                            </div>
                            <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-emerald-400 rounded-full" 
                                />
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ x: 5 }} className="cursor-pointer group">
                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Heart Rate</span>
                                <span className="text-xl font-normal text-gray-700">72 <span className="text-xs font-normal text-gray-400">bpm</span></span>
                            </div>
                            <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '50%' }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                                    className="h-full bg-rose-400 rounded-full" 
                                />
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ x: 5 }} className="cursor-pointer group">
                            <div className="flex justify-between mb-3">
                                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">Sugar Level</span>
                                <span className="text-xl font-normal text-gray-700">95 <span className="text-xs font-normal text-gray-400">mg/dL</span></span>
                            </div>
                            <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '66%' }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-blue-400 rounded-full" 
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PatientDashboard;
