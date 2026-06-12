import { motion, AnimatePresence } from 'framer-motion';
import { Pill, Calendar, User, FileText, Download, ChevronRight, CheckCircle, Bell, Clock, Printer, X, Shield, Share2, Search, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState, useEffect, useRef } from 'react';
import { useHealth } from '../../context/HealthContext';

const Prescriptions = () => {
    const { healthData, setPrintData } = useHealth();
    const [prescriptions, setPrescriptions] = useState<any[]>([]);
    const [showToast, setShowToast] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStep, setSyncStep] = useState(0);
    const [showSyncModal, setShowSyncModal] = useState(false);
    const [selectedSyncRx, setSelectedSyncRx] = useState<any>(null);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [isPrintingBatch, setIsPrintingBatch] = useState(false);
    const prevPrescriptionCount = useRef(healthData.prescriptions.length);

    useEffect(() => {
        // Shared logic: Merge local dummy data with global healthData
        const localItems = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        const combined = [...healthData.prescriptions, ...localItems];

        // Remove duplicates by ID if any
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        setPrescriptions(unique);

        // Check for new arrivals
        if (healthData.prescriptions.length > prevPrescriptionCount.current) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
        }
        prevPrescriptionCount.current = healthData.prescriptions.length;
    }, [healthData.prescriptions]);

    const handleDownload = (p: any) => {
        setPrintData('prescription', p);
    };

    const handleSync = async (rx: any) => {
        setSelectedSyncRx(rx);
        setShowSyncModal(true);
        setIsSyncing(true);
        setSyncStep(0);

        const steps = [
            'Negotiating secure handshake with Institutional Grid...',
            'Broadcasting Digital Directive (RX-9921) to Pharmacy Network...',
            'Verifying Institutional Signature & Authorization...',
            'Synchronization Complete: Pharmacist notified.'
        ];

        for (let i = 0; i < steps.length; i++) {
            setSyncStep(i);
            await new Promise(r => setTimeout(r, 1500));
        }

        setIsSyncing(false);
        setTimeout(() => setShowSyncModal(false), 2000);
    };

    const handleBatchPrint = async () => {
        setIsPrintingBatch(true);
        // Simulate processing
        await new Promise(r => setTimeout(r, 2000));
        setIsPrintingBatch(false);
        setPrintData('prescription', prescriptions[0]); // Just pick one for demo
    };

    const historicalPrescriptions = [
        { id: 'RX-4412', status: 'Completed', diagnosis: 'Acute Bronchitis', date: '2023-11-12', doctorName: 'Dr. John Doe', medicine: 'Amoxicillin' },
        { id: 'RX-3190', status: 'Completed', diagnosis: 'Seasonal Allergies', date: '2023-05-20', doctorName: 'Dr. Sarah Smith', medicine: 'Cetirizine' },
        { id: 'RX-1120', status: 'Expired', diagnosis: 'Wrist Sprain', date: '2023-02-15', doctorName: 'Dr. Sarah Smith', medicine: 'Ibuprofen' }
    ];

    return (
        <div className="w-full relative pb-10">
            {/* Notification Alert for New Prescriptions */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed bottom-10 right-10 z-[200] bg-primary-600 text-white p-6 rounded-[32px] shadow-sm flex items-center gap-5 border border-white/20 backdrop-blur-xl"
                    >
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-medium text-sm uppercase tracking-widest text-primary-100">Live Update</p>
                            <h4 className="text-lg font-medium">New Prescription Added!</h4>
                            <p className="text-white/60 text-xs font-medium italic mt-0.5">Sync with Dr. Sarah Smith successful.</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors"><CheckCircle className="w-5 h-5" /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="page-title">Prescription Records</h1>
                    <p className="page-subtitle">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        End-to-end encrypted clinical directives.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowHistoryModal(true)}
                        className="flex items-center gap-3 bg-white border border-gray-100 px-6 py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-gray-600 font-medium shadow-sm active:scale-95"
                    >
                        <Clock className="w-5 h-5 text-primary-500" />
                        <span>History List</span>
                    </button>
                    <button
                        onClick={handleBatchPrint}
                        disabled={isPrintingBatch}
                        className="flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-2xl hover:bg-black transition-all font-medium shadow-sm shadow-gray-200 active:scale-95 disabled:opacity-50"
                    >
                        {isPrintingBatch ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                <Printer className="w-5 h-5" />
                            </motion.div>
                        ) : <Printer className="w-5 h-5" />}
                        <span>{isPrintingBatch ? 'Preparing...' : 'Batch Print'}</span>
                    </button>
                </div>
            </div>

            <div className="grid gap-8">
                {prescriptions.length === 0 ? (
                    <div className="bg-white p-20 rounded-[40px] border border-dashed border-gray-50 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                            <FileText className="w-10 h-10" />
                        </div>
                        <h3 className="card-title">No Prescriptions Yet</h3>
                        <p className="text-gray-400 mt-2 max-w-sm">When your doctor issues a medical directive, it will automatically appear here via QR sync.</p>
                    </div>
                ) : prescriptions.map((prescription, index) => (
                    <motion.div
                        key={prescription.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-white rounded-[40px] shadow-sm overflow-hidden hover:shadow-sm hover:shadow-primary-500/5 transition-all group relative"
                    >
                        <div className="p-10">
                            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-10">
                                <div className="flex-1 space-y-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-[28px] text-white flex items-center justify-center shadow-sm shadow-primary-500/20 group-hover:scale-110 transition-transform">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-[10px] font-medium bg-primary-100/50 text-primary-700 px-3 py-1 rounded-full tracking-widest uppercase">{prescription.id}</span>
                                                <span className={`text-[10px] font-medium px-3 py-1 rounded-full tracking-widest uppercase flex items-center gap-1.5 ${prescription.status === 'Active' ? 'bg-emerald-100/50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${prescription.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                                                    {prescription.status}
                                                </span>
                                            </div>
                                            <h3 className="section-title tracking-tight group-hover:text-primary-600 transition-colors">{prescription.diagnosis}</h3>
                                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center"><User className="w-4 h-4 text-gray-400" /></div>
                                                    <div className="text-left">
                                                        <p className="text-[9px] font-medium text-gray-400 uppercase tracking-tighter leading-none mb-0.5">Issued By</p>
                                                        <p className="text-sm font-medium text-gray-700">{prescription.doctorName || 'Dr. Sarah Smith'}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center"><Calendar className="w-4 h-4 text-gray-400" /></div>
                                                    <div className="text-left">
                                                        <p className="text-[9px] font-medium text-gray-400 uppercase tracking-tighter leading-none mb-0.5">Directive Date</p>
                                                        <p className="text-sm font-medium text-gray-700">{prescription.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 rounded-[32px] p-8 mt-10">
                                        <h4 className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                                            <Pill className="w-4 h-4 text-primary-500" />
                                            Drug Regimen Directive
                                        </h4>
                                        <div className="grid gap-4">
                                            {(prescription.medications || prescription.medicines || []).map((med: any, idx: number) => (
                                                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between bg-white p-5 rounded-2xl hover:bg-gray-50 transition-all group/item">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500 font-medium text-sm group-hover/item:bg-primary-500 group-hover/item:text-white transition-colors">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800 text-base">{med.name}</p>
                                                            <div className="flex items-center gap-2">
                                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{med.dosage}</p>
                                                                {med.duration && (
                                                                    <>
                                                                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                                        <p className="text-[10px] font-medium text-primary-500 uppercase tracking-widest">{med.duration}</p>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 md:mt-0 px-5 py-2.5 bg-gray-50 rounded-xl text-xs font-medium text-primary-600 border border-gray-100 shadow-sm">
                                                        {med.frequency}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="xl:w-80 flex flex-col gap-4">
                                    <div className="bg-primary-600/5 p-6 rounded-[32px] border border-primary-100 text-center space-y-4">
                                        <p className="text-[10px] font-medium text-primary-600 uppercase tracking-widest">Verification Status</p>
                                        <div className="w-20 h-20 mx-auto bg-white rounded-3xl flex items-center justify-center shadow-sm shadow-primary-500/10 p-4">
                                            <QRCodeSVG
                                                value={`RX-VERIFY-${prescription.id}`}
                                                size={64}
                                                level="M"
                                            />
                                        </div>
                                        <h5 className="font-medium text-gray-800">Clinically Verified</h5>
                                        <p className="text-[11px] text-gray-500 font-medium">This record is digitally signed by the hospital network.</p>
                                    </div>

                                    <button
                                        onClick={() => handleDownload(prescription)}
                                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-gray-800 px-6 py-5 rounded-[28px] hover:border-primary-600 hover:bg-primary-50/30 transition-all font-medium text-sm shadow-sm active:scale-95"
                                    >
                                        <Download className="w-5 h-5 text-primary-500" />
                                        Download Digital Copy
                                    </button>
                                    <button
                                        onClick={() => handleSync(prescription)}
                                        className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-5 rounded-[28px] hover:bg-black transition-all font-medium text-sm shadow-sm active:scale-95"
                                    >
                                        Pharmacy QR Sync
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Pharmacy Sync Modal */}
            <AnimatePresence>
                {showSyncModal && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[2.5rem] shadow-sm overflow-hidden"
                        >
                            <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Smartphone className="w-32 h-32 text-white" />
                                </div>
                                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl relative z-10">
                                    {isSyncing ? (
                                        <Share2 className="w-10 h-10 text-primary-400 animate-pulse" />
                                    ) : (
                                        <CheckCircle className="w-10 h-10 text-emerald-400" />
                                    )}
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2 relative z-10">
                                    {isSyncing ? 'Pharmacy Broadcast' : 'Synchronization Success'}
                                </h3>
                                <p className="text-gray-400 text-xs font-medium uppercase tracking-widest relative z-10">
                                    {selectedSyncRx?.id} • Institutional Sync
                                </p>
                            </div>

                            <div className="p-8 space-y-8">
                                <div className="space-y-4">
                                    {[
                                        'Negotiating secure handshake...',
                                        'Broadcasting Digital Directive...',
                                        'Verifying Institutional Signature...',
                                        'Sync Successful: Authorized'
                                    ].map((step, i) => (
                                        <div key={i} className={`flex items-center gap-4 transition-all ${i <= syncStep ? 'opacity-100' : 'opacity-20'}`}>
                                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium ${i < syncStep ? 'bg-emerald-500 text-white' : i === syncStep ? 'bg-primary-500 text-white animate-pulse' : 'bg-gray-100 text-gray-400'}`}>
                                                {i < syncStep ? <CheckCircle className="w-3 h-3" /> : i + 1}
                                            </div>
                                            <p className={`text-sm font-medium ${i === syncStep ? 'text-gray-800' : 'text-gray-500'}`}>{step}</p>
                                        </div>
                                    ))}
                                </div>

                                {!isSyncing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-4"
                                    >
                                        <Shield className="w-5 h-5 text-emerald-600 mt-1" />
                                        <div>
                                            <h4 className="text-sm font-medium text-emerald-900">Encrypted Transmission</h4>
                                            <p className="text-xs text-emerald-700/70 mt-0.5">Your prescription is now available at all network pharmacies.</p>
                                        </div>
                                    </motion.div>
                                )}

                                <button
                                    onClick={() => setShowSyncModal(false)}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium hover:bg-black transition-all active:scale-95"
                                >
                                    {isSyncing ? 'Cancel Broadcast' : 'Close Dashboard'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* History List Modal */}
            <AnimatePresence>
                {showHistoryModal && (
                    <div className="fixed inset-0 z-[300] flex items-center justify-end bg-gray-900/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="bg-white w-full max-w-lg h-full shadow-sm flex flex-col"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 border-b border-gray-100">
                                <div>
                                    <h3 className="card-title">Clinical History</h3>
                                    <p className="text-sm text-gray-500 font-medium">Consolidated past directives and summaries.</p>
                                </div>
                                <button onClick={() => setShowHistoryModal(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium text-sm" placeholder="Search directives history..." />
                                </div>

                                <div className="grid gap-4">
                                    {historicalPrescriptions.map((h, i) => (
                                        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 hover:border-primary-200 transition-all cursor-pointer group">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">{h.diagnosis}</h4>
                                                        <p className="text-xs text-gray-400 font-medium">{h.date} • {h.status}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-medium text-gray-300 uppercase tracking-widest">{h.id}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Pill className="w-3.5 h-3.5 text-primary-500" />
                                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{h.medicine}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                                <button className="w-full py-4 bg-primary-600 text-white rounded-2xl font-medium shadow-sm shadow-primary-500/20 hover:bg-primary-700 transition-all">
                                    Download Consolidated Export (PDF)
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Prescriptions;
