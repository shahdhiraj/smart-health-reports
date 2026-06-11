import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, FileText, TrendingUp, CreditCard, Search, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';

const BillingDashboard = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notif, setNotif] = useState<string | null>(null);

    useEffect(() => {
        const loadInvoices = () => {
            const data = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
            
            // Map prescriptions to invoices with mock pricing
            const generatedInvoices = data.map((p: any) => {
                const consultFee = 100;
                const medFee = (p.medicines?.length || 0) * 45;
                const labFee = (p.labTests?.length || 0) * 80;
                const total = consultFee + medFee + labFee;

                return {
                    id: p.id.replace('RX', 'INV'),
                    patientName: p.patientName,
                    date: p.date,
                    amount: total,
                    status: p.billingStatus || 'Unpaid',
                    details: { consultFee, medFee, labFee }
                };
            }).filter((inv: any) => inv.status === 'Unpaid');

            setInvoices(generatedInvoices);
            setLoading(false);
        };
        loadInvoices();
    }, []);

    const handlePayment = (id: string, patientName: string) => {
        const allData = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        const updated = allData.map((p: any) => p.id.replace('RX', 'INV') === id ? { ...p, billingStatus: 'Paid' } : p);
        localStorage.setItem('patient_prescriptions', JSON.stringify(updated));
        
        setInvoices(prev => prev.filter(inv => inv.id !== id));
        setNotif(`Invoice ${id} settled successfully for ${patientName}.`);
        setTimeout(() => setNotif(null), 3000);
    };

    const totalOutstanding = invoices.reduce((acc, inv) => acc + inv.amount, 0);

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
                <h1 className="page-title">Billing Desk</h1>
                <p className="page-subtitle">Financial management, invoicing, and patient accounting.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 border-l-4 border-l-emerald-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Due Today</p>
                            <h3 className="card-title">${totalOutstanding.toLocaleString()}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-amber-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Invoices</p>
                            <h3 className="card-title">{invoices.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-blue-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Collected</p>
                            <h3 className="card-title">$12,480</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6 border-l-4 border-l-primary-500">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Growth</p>
                            <h3 className="card-title">+12%</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-medium text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-500" />
                    Patient Billing Queue
                </h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none w-64 transition-all" placeholder="Search invoices..." />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="py-12 text-center text-gray-400 italic">Auditing financial records...</div>
            ) : invoices.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    <AnimatePresence mode='popLayout'>
                        {invoices.map((inv, idx) => (
                            <motion.div
                                key={inv.id}
                                layout
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Card className="p-5 border-gray-100 hover:border-emerald-200 transition-all group">
                                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 font-medium text-lg shadow-sm border border-emerald-100">
                                                $
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-gray-900">{inv.patientName}</h3>
                                                    <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded uppercase tracking-wider">{inv.id}</span>
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium mt-0.5">ISSUED ON {inv.date.toUpperCase()}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 gap-8 px-4 justify-around">
                                            <div className="text-center">
                                                <p className="text-[10px] font-medium text-gray-400 uppercase">Consultation</p>
                                                <p className="text-sm font-medium text-gray-700">${inv.details.consultFee}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-medium text-gray-400 uppercase">Pharmacy</p>
                                                <p className="text-sm font-medium text-gray-700">${inv.details.medFee}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-medium text-gray-400 uppercase">Laboratory</p>
                                                <p className="text-sm font-medium text-gray-700">${inv.details.labFee}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-0 border-gray-50">
                                            <div className="text-right">
                                                <p className="text-[10px] font-medium text-gray-400 uppercase">Total Amount</p>
                                                <p className="text-xl font-medium text-gray-900">${inv.amount}</p>
                                            </div>
                                            <button 
                                                onClick={() => handlePayment(inv.id, inv.patientName)}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10 active:scale-95"
                                            >
                                                <CreditCard className="w-4 h-4" />
                                                Collect Payment
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
                    <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 tracking-tight">No Pending Invoices</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mt-2 text-sm leading-relaxed">
                        All patient accounts are currently balanced. New invoices will be generated upon clinical or pharmaceutical service delivery.
                    </p>
                </Card>
            )}
        </div>
    );
};

export default BillingDashboard;
