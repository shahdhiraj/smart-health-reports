import { motion } from 'framer-motion';
import { Activity, Calendar, Pill, TrendingUp, Clock, FileText } from 'lucide-react';

const PatientDashboard = () => {
    const stats = [
        { label: 'Upcoming Consults', value: '2', icon: Calendar, color: 'primary' },
        { label: 'Active Prescriptions', value: '4', icon: Pill, color: 'emerald' },
        { label: 'Health Score', value: '92%', icon: Activity, color: 'blue' },
        { label: 'Pending Reports', value: '1', icon: FileText, color: 'orange' },
    ];

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome back, John. Here's your health overview.</p>
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
                            {index === 2 && (
                                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                    <TrendingUp className="w-3 h-3" />
                                    +2%
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        <p className="text-gray-500 text-sm">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
                        <button className="text-primary-600 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { doctor: 'Dr. Sarah Smith', specialty: 'Cardiologist', time: 'Today, 14:30', type: 'Video Call' },
                            { doctor: 'Dr. James Wilson', specialty: 'General Physician', time: 'Tomorrow, 10:00', type: 'Clinic Visit' }
                        ].map((apt, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold">
                                        {apt.time.split(',')[0].substring(0, 3)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{apt.doctor}</h4>
                                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                        <Clock className="w-3 h-3" />
                                        {apt.time.split(', ')[1]}
                                    </div>
                                    <p className="text-xs text-primary-600 mt-1 font-medium">{apt.type}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Vitals */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Vitals</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Blood Pressure</span>
                                <span className="text-sm font-bold text-gray-800">120/80</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-3/4 rounded-full" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Heart Rate</span>
                                <span className="text-sm font-bold text-gray-800">72 bpm</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-rose-500 w-1/2 rounded-full" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-500">Sugar Level</span>
                                <span className="text-sm font-bold text-gray-800">95 mg/dL</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-2/3 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
