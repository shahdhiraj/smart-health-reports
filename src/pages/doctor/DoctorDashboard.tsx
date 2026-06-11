import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Users, Activity, AlertCircle,
    ChevronRight, CheckCircle2, Pill, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AIBanner } from '../../components/safety/AIBanner';
import { MedicalDisclaimer } from '../../components/safety/MedicalDisclaimer';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const [isAvailable, setIsAvailable] = useState(true);
    const stats = [
        { label: "Today's Appointments", value: '8', icon: Calendar, color: 'blue' },
        { label: 'Total Patients', value: '142', icon: Users, color: 'primary' },
        { label: 'Pending Reports', value: '5', icon: Activity, color: 'orange' },
        { label: 'Critical Cases', value: '3', icon: AlertCircle, color: 'red' },
    ];

    const [recentPrescriptions, setRecentPrescriptions] = useState<any[]>([]);
    useEffect(() => {
        const all = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        setRecentPrescriptions(all.slice(0, 3));
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="page-title">Doctor Dashboard</h1>
                    <p className="text-gray-500 mt-2">Good morning, Dr. Smith. You have 8 appointments today.</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={() => navigate('/doctor/prescriptions')}
                        variant="primary"
                        className="gap-2 shadow-lg shadow-primary-500/20"
                    >
                        <Plus className="w-5 h-5 font-semibold" />
                        New Prescription
                    </Button>
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-sm font-medium text-gray-600 pl-2">Status:</span>
                        <Button
                            onClick={() => setIsAvailable(!isAvailable)}
                            variant="primary"
                            className={`transition-all ${isAvailable ? 'bg-primary-100 text-primary-700 hover:bg-primary-200' : ''}`}
                            size="sm"
                        >
                            <span className={`w-2 h-2 rounded-full mr-2 ${isAvailable ? 'bg-primary-500' : 'bg-gray-400'}`} />
                            {isAvailable ? 'Available' : 'Offline'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardContent className="flex items-center justify-between p-6">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                                    <h3 className="section-title mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="card-title">Today's Schedule</h3>
                        <button className="text-primary-600 text-sm font-medium hover:underline">View Calendar</button>
                    </div>
                    <div className="space-y-4">
                        {[
                            { patient: 'John Doe', time: '09:00 AM', type: 'Check-up', status: 'Completed' },
                            { patient: 'Jane Smith', time: '10:30 AM', type: 'Follow-up', status: 'In Progress' },
                            { patient: 'Robert Johnson', time: '11:45 AM', type: 'Consultation', status: 'Upcoming' },
                            { patient: 'Emily Davis', time: '02:00 PM', type: 'Report Review', status: 'Upcoming' },
                        ].map((apt, i) => (
                            <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-medium text-gray-500 w-16">{apt.time}</div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{apt.patient}</h4>
                                        <p className="text-sm text-gray-500">{apt.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${apt.status === 'Completed' ? 'bg-primary-100 text-primary-700' :
                                        apt.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-600'
                                        }`}>
                                        {apt.status}
                                    </span>
                                    <button className="text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-all">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Patient Requests & Recent Activity */}
                <div className="space-y-6 h-fit">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="card-title">Patient Requests</h3>
                            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full">3 New</span>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Michael Brown', request: 'Prescription Renewal', time: '10m ago' },
                                { name: 'Sarah Wilson', request: 'Lab Report Analysis', time: '1h ago' },
                            ].map((req, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-gray-800">{req.name}</h4>
                                        <span className="text-xs text-gray-500">{req.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{req.request}</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors">Decline</button>
                                        <button 
                                            className="flex-1 bg-primary-600 text-white text-xs font-medium py-2 rounded-lg hover:bg-primary-700 transition-colors"
                                            onClick={() => req.request === 'Prescription Renewal' && navigate('/doctor/prescriptions')}
                                        >
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recently Issued Prescriptions */}
                    {recentPrescriptions.length > 0 && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border-primary-100 bg-gradient-to-br from-white to-primary-50/20">
                            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-primary-500" />
                                Recently Issued
                            </h3>
                            <div className="space-y-3">
                                {recentPrescriptions.map((rx, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-primary-50 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center">
                                                <Pill className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-xl font-normal text-gray-700">{rx.patientName || 'Clinical Record'}</p>
                                                <p className="text-[10px] text-gray-500">{(rx.medications?.[0]?.name || rx.diagnosis) || '—'} • {rx.date}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-semibold text-primary-600 uppercase tracking-tighter">Synced</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Chronic Patient Monitoring - Full Width on Mobile, 2 Cols on Desktop to match Schedule */}
                {/* Chronic Patient Monitoring Section - NEW */}
                <Card className="lg:col-span-3 border-orange-100">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-orange-900 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-orange-500" />
                                Chronic Patient Monitoring
                            </CardTitle>
                            <Badge variant="warning">High Attention Needed</Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <AIBanner className="mb-6" confidence={87} />

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-orange-50/50 rounded-lg">
                                    <tr>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-orange-800 uppercase tracking-wider">Patient</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-orange-800 uppercase tracking-wider">Condition</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-orange-800 uppercase tracking-wider">Vitals Trend</th>
                                        <th className="text-left py-3 px-4 text-xs font-semibold text-orange-800 uppercase tracking-wider">Status</th>
                                        <th className="text-right py-3 px-4 text-xs font-semibold text-orange-800 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-orange-100">
                                    {[
                                        { name: "Sarah Connor", condition: "Hypertension", trend: "Rising BP", status: "Critical" },
                                        { name: "James Bond", condition: "Arrhythmia", trend: "Irregular", status: "Warning" },
                                        { name: "Bruce Wayne", condition: "Post-Surgery", trend: "Stable", status: "Stable" },
                                    ].map((p, i) => (
                                        <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                                            <td className="py-3 px-4 font-medium text-gray-900">{p.name}</td>
                                            <td className="py-3 px-4 text-gray-600">{p.condition}</td>
                                            <td className="py-3 px-4">
                                                <span className="text-red-600 text-sm font-medium flex items-center gap-1">
                                                    <Activity className="w-3 h-3" /> {p.trend}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge variant={p.status === 'Critical' ? 'critical' : p.status === 'Warning' ? 'warning' : 'success'}>
                                                    {p.status}
                                                </Badge>
                                            </td>
                                            <td className="text-right py-3 px-4">
                                                <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <MedicalDisclaimer />
        </div>
    );
};

export default DoctorDashboard;
