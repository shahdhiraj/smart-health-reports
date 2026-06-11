import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, FlaskConical, FileText, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const LabDashboard = () => {
    const [labOrders, setLabOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notif, setNotif] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = () => {
            let data = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
            
            // Initial mock data if empty
            if (data.length === 0) {
                data = [
                    {
                        id: 'PD-8821',
                        patientName: 'Robert Taylor',
                        date: '2024-03-21',
                        status: 'Active',
                        labTests: [
                            { name: 'Complete Blood Count (CBC)', instructions: 'Fasting not required' },
                            { name: 'Kidney Function Test (KFT)', instructions: '8h Fasting' }
                        ]
                    },
                    {
                        id: 'PD-1120',
                        patientName: 'John Smith',
                        date: '2024-03-20',
                        status: 'Active',
                        labTests: [
                            { name: 'Lipid Profile', instructions: '12h Fasting' }
                        ]
                    }
                ];
                localStorage.setItem('patient_prescriptions', JSON.stringify(data));
            }

            const orders = data.filter((p: any) => p.labTests && p.labTests.length > 0 && p.status !== 'Reported');
            setLabOrders(orders);
            setLoading(false);
        };
        loadOrders();
    }, []);

    const handleReport = (id: string, patientName: string) => {
        const allData = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        const updated = allData.map((p: any) => p.id === id ? { ...p, status: 'Reported' } : p);
        localStorage.setItem('patient_prescriptions', JSON.stringify(updated));
        
        setLabOrders(prev => prev.filter(p => p.id !== id));
        setNotif(`Diagnostic reports uploaded successfully for ${patientName}.`);
        setTimeout(() => setNotif(null), 3000);
    };

    return (
        <div className="w-full relative">
            <AnimatePresence>
                {notif && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-[200] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl"
                    >
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm tracking-tight">{notif}</span>
                        <button onClick={() => setNotif(null)} className="ml-4 text-gray-400 hover:text-white transition-colors">
                            <XCircle className="w-5 h-5" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-8">
                <h1 className="page-title">Laboratory Desk</h1>
                <p className="page-subtitle">Diagnostic order management and clinical results reporting.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Tests</p>
                            <h3 className="card-title">{labOrders.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-primary-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                            <FlaskConical className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">In Process</p>
                            <h3 className="card-title">14</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-violet-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-violet-50 rounded-xl text-violet-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Accuracy Rate</p>
                            <h3 className="card-title">99.8%</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-primary-500" />
                    Diagnostic Queue
                </h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none w-64 transition-all" placeholder="Search tests..." />
                    </div>
                    <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-12 text-center text-gray-400 italic">Syncing with clinical directives...</div>
            ) : labOrders.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {labOrders.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card className="p-5 border-gray-100 hover:border-primary-200 transition-all group">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 font-medium text-lg shadow-sm">
                                                {order.patientName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-gray-900">{order.patientName}</h3>
                                                    <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">{order.id}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-all italic">
                                                    <Activity className="w-3 h-3 text-primary-500" />
                                                    {order.labTests?.length || 0} tests ordered by Dr. Sarah Smith
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex-1 px-4">
                                            <div className="flex flex-wrap gap-2">
                                                {order.labTests?.map((t: any, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700/80 rounded-lg text-[11px] font-medium border border-primary-100/50">
                                                        {t.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-gray-50">
                                            <button 
                                                onClick={() => handleReport(order.id, order.patientName)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 text-white rounded-xl font-medium text-sm hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/10 active:scale-95"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Report Results
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <Card className="p-12 text-center bg-gray-50 border-dashed border-2 border-gray-200">
                    <FlaskConical className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 tracking-tight">No Active Orders</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-relaxed">
                        The diagnostic queue is clear. New laboratory tests will appear here once issued by the clinical team.
                    </p>
                </Card>
            )}
        </div>
    );
};

export default LabDashboard;
