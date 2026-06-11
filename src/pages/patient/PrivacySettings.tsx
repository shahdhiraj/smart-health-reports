import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Clock, Key, ShieldAlert, History, UserX, CheckCircle2, ChevronDown, Check, X } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

const PrivacySettings = () => {
    const { healthData, updateField, handleConnectionAction } = useHealth();
    const [notif, setNotif] = useState<string | null>(null);
    const [pendingDurations, setPendingDurations] = useState<Record<string, string>>({});

    const pendingRequests = healthData.connectionRequests.filter(r => r.status === 'pending');

    // Mock Doctors derived from approved IDs
    const [accessControls, setAccessControls] = useState(
        healthData.approvedDoctorIds.map(id => {
            let name = 'Dr. Unknown';
            let specialty = 'Specialist';
            let duration = 'Permanent';
            let scope = 'All Records';

            if (id === 'DOC-001') { name = 'Dr. Sarah Smith'; specialty = 'Cardiologist'; }
            else if (id === 'DOC-005') { name = 'Dr. Michael Chen'; specialty = 'Endocrinologist'; duration = '7 Days'; scope = 'Lab Reports Only'; }
            else if (id === 'DOC-008') { name = 'Dr. Emily Foster'; specialty = 'General Practitioner'; duration = '24 Hours'; scope = 'Prescriptions Only'; }
            else if (id === 'DOC-012') { name = 'Dr. Robert Thorne'; specialty = 'Neurologist'; duration = '1 Hour'; scope = 'Imaging Scans Only'; }
            else if (id === 'DOC-024') { name = 'Dr. Lisa Hayes'; specialty = 'Oncologist'; duration = '15 Mins'; scope = 'All Records'; }
            
            return {
                id,
                name,
                specialty,
                scope,
                duration
            };
        })
    );

    const auditLogs = [
        { id: 1, action: 'Viewed', document: 'Blood Test Analysis', doctor: 'Dr. Sarah Smith', time: 'Today, 10:45 AM', status: 'Authorized' },
        { id: 2, action: 'Downloaded', document: 'MRI Scan - Lower Back', doctor: 'Dr. Michael Chen', time: 'Yesterday, 02:15 PM', status: 'Authorized' },
        { id: 3, action: 'Access Revoked', document: 'All Records', doctor: 'Dr. James Wilson', time: 'Oct 12, 2023', status: 'System' },
    ];

    const handleUpdateControl = (id: string, field: 'scope' | 'duration', value: string) => {
        setAccessControls(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
        setNotif(`Access rules updated for ${accessControls.find(c => c.id === id)?.name}`);
        setTimeout(() => setNotif(null), 3000);
    };

    const handleRevoke = (id: string) => {
        setAccessControls(prev => prev.filter(c => c.id !== id));
        // Also update context if we wanted to persist
        const newApproved = healthData.approvedDoctorIds.filter(docId => docId !== id);
        updateField('approvedDoctorIds', newApproved);
        
        setNotif('Clinical access revoked successfully. E2E Keys invalidated.');
        setTimeout(() => setNotif(null), 3000);
    };

    return (
        <div className="w-full relative pb-20">
            <AnimatePresence>
                {notif && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-[200] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 border border-white/10 backdrop-blur-xl"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm tracking-tight">{notif}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-10">
                <h1 className="page-title">Security & Privacy</h1>
                <p className="page-subtitle">You own your health data. Manage access and audit trails.</p>
            </div>

            {/* End-to-End Encryption Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-sm shadow-emerald-500/20">
                <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight flex items-center gap-2">
                            End-to-End Encrypted <Lock className="w-4 h-4 text-emerald-300" />
                        </h2>
                        <p className="text-emerald-50 mt-2 font-medium leading-relaxed max-w-lg">
                            Your medical records are secured with military-grade AES-256 encryption. Only you and your explicitly approved clinical team can decrypt and view this data.
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                            <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                                <Key className="w-3 h-3" /> Private Key Active
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Consent Management */}
            <div className="mb-12">
                {pendingRequests.length > 0 && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Pending Handshakes</h2>
                        </div>
                        <div className="space-y-4">
                            {pendingRequests.map(req => (
                                <div key={req.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-amber-50 rounded-3xl border border-amber-100 shadow-sm gap-6">
                                    <div>
                                        <h3 className="card-title">{req.doctorName}</h3>
                                        <p className="text-sm text-gray-600 font-medium">{req.doctorSpecialty}</p>
                                        <p className="text-xs text-amber-700 mt-2 bg-amber-100/50 px-3 py-1.5 rounded-lg inline-block border border-amber-200/50">
                                            Requested access to your digital health vault.
                                        </p>
                                    </div>
                                    <div className="flex gap-3 w-full md:w-auto items-stretch">
                                        <div className="relative group hidden sm:block">
                                            <select 
                                                className="appearance-none bg-white border border-amber-200 text-amber-900 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-amber-400 transition-colors w-32 cursor-pointer text-sm h-full"
                                                value={pendingDurations[req.id] || '1 Hour'}
                                                onChange={(e) => setPendingDurations(prev => ({...prev, [req.id]: e.target.value}))}
                                            >
                                                <option>5 Mins</option>
                                                <option>15 Mins</option>
                                                <option>1 Hour</option>
                                                <option>24 Hours</option>
                                                <option>7 Days</option>
                                                <option>Permanent</option>
                                            </select>
                                            <ChevronDown className="w-4 h-4 text-amber-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>
                                        <button 
                                            onClick={() => {
                                                handleConnectionAction(req.id, 'approved');
                                                setAccessControls(prev => [...prev, {
                                                    id: req.doctorId,
                                                    name: req.doctorName,
                                                    specialty: req.doctorSpecialty,
                                                    scope: 'All Records',
                                                    duration: pendingDurations[req.id] || '1 Hour'
                                                }]);
                                                setNotif(`Access granted to ${req.doctorName}`);
                                                setTimeout(() => setNotif(null), 3000);
                                            }}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all font-medium shadow-sm active:scale-95"
                                        >
                                            <Check className="w-4 h-4" /> Approve
                                        </button>
                                        <button 
                                            onClick={() => handleConnectionAction(req.id, 'denied')}
                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-500 border border-gray-50 rounded-xl hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all font-medium shadow-sm active:scale-95"
                                        >
                                            <X className="w-4 h-4" /> Deny
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary-100 text-primary-600 rounded-xl">
                        <Eye className="w-5 h-5" />
                    </div>
                    <h2 className="section-title">Clinical Access Controls</h2>
                </div>

                <div className="space-y-4">
                    {accessControls.length === 0 ? (
                        <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center shadow-sm">
                            <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="card-title">No Active Connections</h3>
                            <p className="text-gray-500 mt-1">No doctors currently have access to your health vault.</p>
                        </div>
                    ) : (
                        accessControls.map(doc => (
                            <div key={doc.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-shadow">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-medium border border-primary-100">
                                        {doc.name.charAt(4)}
                                    </div>
                                    <div>
                                        <h3 className="card-title">{doc.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">{doc.specialty}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4">
                                    {/* Scope Dropdown */}
                                    <div className="relative group">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-400 uppercase tracking-widest z-10">Access Scope</label>
                                        <select 
                                            value={doc.scope}
                                            onChange={(e) => handleUpdateControl(doc.id, 'scope', e.target.value)}
                                            className="appearance-none bg-gray-50 border border-gray-50 text-gray-700 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors w-40 cursor-pointer"
                                        >
                                            <option>All Records</option>
                                            <option>Lab Reports Only</option>
                                            <option>Prescriptions Only</option>
                                            <option>Imaging Only</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    {/* Duration Dropdown */}
                                    <div className="relative group">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-medium text-gray-400 uppercase tracking-widest z-10">Duration</label>
                                        <select 
                                            value={doc.duration}
                                            onChange={(e) => handleUpdateControl(doc.id, 'duration', e.target.value)}
                                            className="appearance-none bg-gray-50 border border-gray-50 text-gray-700 font-medium py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:border-primary-500 transition-colors w-36 cursor-pointer"
                                        >
                                            <option>5 Mins</option>
                                            <option>15 Mins</option>
                                            <option>1 Hour</option>
                                            <option>24 Hours</option>
                                            <option>7 Days</option>
                                            <option>Permanent</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                    </div>

                                    <button 
                                        onClick={() => handleRevoke(doc.id)}
                                        className="p-3 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100 transition-colors flex items-center justify-center shrink-0"
                                        title="Revoke Access"
                                    >
                                        <UserX className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Audit Trails */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gray-100 text-gray-600 rounded-xl">
                        <History className="w-5 h-5" />
                    </div>
                    <h2 className="section-title">Audit Trails</h2>
                </div>
                
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-widest">Time</th>
                                    <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-widest">Action</th>
                                    <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-widest">Document</th>
                                    <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-widest">User</th>
                                    <th className="p-4 text-xs font-medium text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {auditLogs.map(log => (
                                    <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                                <Clock className="w-4 h-4 text-gray-400" /> {log.time}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xl font-normal text-gray-700">{log.action}</span>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-600">{log.document}</td>
                                        <td className="p-4 text-sm font-medium text-primary-600">{log.doctor}</td>
                                        <td className="p-4">
                                            <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-1 rounded border ${
                                                log.status === 'Authorized' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-gray-100 text-gray-500 border-gray-50'
                                            }`}>
                                                {log.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacySettings;
