import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Activity, QrCode, Scan, Camera, X, FileText, Lock, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useHealth } from '../../context/HealthContext';


const PatientList = () => {
    const navigate = useNavigate();
    const { healthData, requestConnection } = useHealth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanState, setScanState] = useState<'idle' | 'scanning' | 'found' | 'requested'>('idle');

    const patients = [
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-03-10', condition: 'Hypertension', status: 'Critical' },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2024-03-12', condition: 'Flu', status: 'Stable' },
        { id: 3, name: 'Robert Johnson', age: 58, gender: 'Male', lastVisit: '2024-03-08', condition: 'Diabetes', status: 'Stable' },
        { id: 4, name: 'Emily Davis', age: 28, gender: 'Female', lastVisit: '2024-03-14', condition: 'Migraine', status: 'Recovering' },
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [scannedData, setScannedData] = useState<{ id: string, name: string } | null>(null);

    const handleScanClick = () => {
        setIsScanning(true);
        setScanState('scanning');
        setScannedData(null);
    };

    const handleScannerResult = (result: any) => {
        if (result && result.length > 0) {
            try {
                const payload = JSON.parse(result[0].rawValue);
                if (payload.action === 'sync_patient' && payload.id) {
                    setScannedData({ id: payload.id, name: payload.name });
                    setScanState('found');
                }
            } catch (error) {
                // Ignore non-JSON or invalid QR codes
            }
        }
    };

    const handleCloseScan = () => {
        setIsScanning(false);
        setScanState('idle');
        setScannedData(null);
    };

    const handleDirectPrescribe = () => {
        if (!scannedData) return;
        handleCloseScan();
        navigate(`/doctor/prescriptions?patientId=${scannedData.id}`);
    };

    const handleViewProfile = () => {
        if (!scannedData) return;
        handleCloseScan();
        navigate(`/doctor/patients/${scannedData.id}`);
    };

    const handleRequestAccess = () => {
        if (!scannedData) return;
        requestConnection({ 
            id: 'DR-SMITH', 
            name: 'Dr. Sarah Smith', 
            specialty: 'Clinical Cardiology' 
        });
        setScanState('requested');
    };

    // Check if current scanned patient has an approved request
    const currentConnection = scannedData 
        ? healthData.connectionRequests.find(r => r.status === 'approved') 
        : null;
    
    const isApproved = !!currentConnection;

    return (
        <div className="w-full relative">
            <AnimatePresence>
                {isScanning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-gray-900/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
                    >
                        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
                            <button 
                                onClick={handleCloseScan}
                                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {scanState === 'scanning' ? (
                                <div className="p-10 flex flex-col items-center justify-center text-center">
                                    <h3 className="section-title tracking-tight mb-8">Scan Patient QR Pass</h3>
                                    
                                    <div className="relative w-72 h-72 bg-gray-900 rounded-3xl overflow-hidden mb-6 border-4 border-gray-100 shadow-inner">
                                        <Scanner 
                                            onScan={handleScannerResult} 
                                            allowMultiple={true}
                                            scanDelay={2000}
                                        />
                                        <div className="absolute top-4 left-4 right-4 bottom-4 border-2 border-white/40 rounded-xl pointer-events-none" />
                                        
                                        {/* Scanning Animation Line overlay */}
                                        <motion.div 
                                            animate={{ top: ['0%', '100%', '0%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            className="absolute left-0 right-0 h-1 bg-primary-500 shadow-[0_0_15px_rgba(20,184,166,1)] z-10 pointer-events-none"
                                        />
                                    </div>

                                    
                                    <div className="flex items-center gap-3 text-gray-400 font-medium uppercase tracking-widest text-xs">
                                        <Camera className="w-4 h-4 animate-pulse" />
                                        Detecting Identity...
                                    </div>
                                </div>
                            ) : (
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="p-10 flex flex-col items-center justify-center text-center"
                                >
                                    {!isApproved ? (
                                        <>
                                            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6 border-4 border-amber-100 shadow-sm relative">
                                                <Lock className="w-10 h-10" />
                                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-amber-200">
                                                    <QrCode className="w-3 h-3" />
                                                </div>
                                            </div>
                                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600 mb-2">Patient Identified</h3>
                                            <h2 className="text-3xl font-medium text-gray-900 tracking-tight mb-2">{scannedData?.name}</h2>
                                            <p className="text-gray-500 font-medium mb-8 max-w-[200px]">Clinical records are restricted. Request access to proceed.</p>
                                            
                                            <button 
                                                onClick={handleRequestAccess}
                                                disabled={scanState === 'requested'}
                                                className={`w-full py-4 rounded-2xl font-medium transition-all shadow-lg text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${
                                                    scanState === 'requested' 
                                                        ? 'bg-amber-100 text-amber-600 cursor-default' 
                                                        : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'
                                                }`}
                                            >
                                                {scanState === 'requested' ? (
                                                    <>
                                                        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                                                            Waiting for Approval...
                                                        </motion.div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShieldCheck className="w-5 h-5" />
                                                        Request Full Access
                                                    </>
                                                )}
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6 border-4 border-emerald-100 shadow-sm">
                                                <QrCode className="w-10 h-10" />
                                            </div>
                                            
                                            <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600 mb-2">Access Granted</h3>
                                            <h2 className="text-3xl font-medium text-gray-900 tracking-tight mb-2">{scannedData?.name}</h2>
                                            <p className="text-gray-500 font-medium mb-8">Clinical Sync Active • Secure Connection</p>
                                            
                                            <div className="flex flex-col gap-3 w-full">
                                                <button 
                                                    onClick={handleDirectPrescribe}
                                                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-medium py-4 rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95 text-sm uppercase tracking-wider"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    Direct Prescription
                                                </button>
                                                <button 
                                                    onClick={handleViewProfile}
                                                    className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-medium py-4 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 text-sm uppercase tracking-wider"
                                                >
                                                    <Activity className="w-4 h-4" />
                                                    View Full Profile
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title">My Patients</h1>
                    <p className="page-subtitle">Manage and monitor your assigned patients.</p>
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={handleScanClick}
                        className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-xl active:scale-95 transition-all text-sm group"
                    >
                        <Scan className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Scan QR
                    </button>
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none w-full md:w-64 transition-all text-sm font-medium shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Patient Name</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Age/Gender</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Last Visit</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Condition</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPatients.map((patient, index) => (
                                <motion.tr
                                    key={patient.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold">
                                                {patient.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{patient.name}</p>
                                                <p className="text-xs text-gray-500">ID: #{patient.id.toString().padStart(4, '0')}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {patient.age} yrs / {patient.gender}
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        {patient.lastVisit}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{patient.condition}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={
                                            patient.status === 'Critical' ? 'critical' :
                                                patient.status === 'Stable' ? 'success' : 'info'
                                        }>
                                            {patient.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-gray-400 hover:text-primary-600 transition-colors p-2 hover:bg-primary-50 rounded-lg">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default PatientList;
