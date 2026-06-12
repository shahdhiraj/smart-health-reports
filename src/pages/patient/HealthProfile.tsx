import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    User, Activity, Heart, AlertCircle, Shield,
    FileText, Plus, Trash2, Pencil, X,
    Lock, CheckCircle2, XCircle,
    Thermometer, ClipboardList, Phone, Mail,
    MapPin, Briefcase, Users, AlertTriangle, ChevronRight, Brain,
    Upload, Camera, Loader2
} from 'lucide-react';
import PatientQR from '../../components/PatientQR';
import { useHealth } from '../../context/HealthContext';
import BMIGauge from '../../components/clinical/BMIGauge';
import CameraScanner from '../../components/clinical/CameraScanner';

const MEDICINE_DICTIONARY: Record<string, string> = {
    'Metformin': 'Type 2 Diabetes Management',
    'Lisinopril': 'Hypertension / Blood Pressure',
    'Atorvastatin': 'Cholesterol Management',
    'Amoxicillin': 'Antibiotic / Bacterial Infection',
    'Ibuprofen': 'Pain Relief / Anti-inflammatory',
    'Aspirin': 'Blood Thinner / Pain Relief',
    'Levothyroxine': 'Thyroid Regulation',
    'Omeprazole': 'Acid Reflux / GERD',
    'Vitamin D3': 'Bone Health / Supplement',
    'Paracetamol': 'Pain Relief / Fever',
    'Cetirizine': 'Allergy Relief',
    'Amlodipine': 'High Blood Pressure',
    'Metoprolol': 'Chest Pain / Hypertension',
    'Losartan': 'Hypertension Management',
    'Albuterol': 'Asthma / Bronchospasm',
    'Gabapentin': 'Nerve Pain / Seizures'
};

const HealthProfile = () => {
    const { 
        healthData, 
        updateField, 
        addListItem, 
        removeListItem, 
        handleConnectionAction 
    } = useHealth();
    const navigate = useNavigate();

    const [newMed, setNewMed] = useState<any>({ name: '', dosage: '', frequency: '', duration: '', manufacturer: '', expiryDate: '', purpose: '' });
    const [newSurgery, setNewSurgery] = useState({ name: '', date: '', hospital: '' });
    const [newLab, setNewLab] = useState({ marker: '', value: '', unit: '' });
    const [newChronic, setNewChronic] = useState('');
    const [newAllergy, setNewAllergy] = useState('');
    const [editingMedIndex, setEditingMedIndex] = useState<number | null>(null);

    // Scanner States
    const [isScanningMed, setIsScanningMed] = useState(false);
    const [isAnalyzingMed, setIsAnalyzingMed] = useState(false);
    const [analysisStep, setAnalysisStep] = useState('');

    // AI Dictionary Side Effect
    useEffect(() => {
        if (editingMedIndex !== null) return;
        
        const isPurposeEmpty = !newMed.purpose;
        const isPurposeAutoFilled = Object.values(MEDICINE_DICTIONARY).includes(newMed.purpose);
        
        // Only auto-sync if the user hasn't manually entered a custom purpose
        if (!isPurposeEmpty && !isPurposeAutoFilled) return;

        const matchedMed = Object.keys(MEDICINE_DICTIONARY).find(
            key => key.toLowerCase() === newMed.name.trim().toLowerCase()
        );
        
        if (matchedMed) {
            const newPurpose = MEDICINE_DICTIONARY[matchedMed];
            if (newMed.purpose !== newPurpose) {
                setNewMed((prev: any) => ({ ...prev, purpose: newPurpose }));
            }
        } else if (isPurposeAutoFilled) {
            // Auto-clear the purpose if the drug name no longer matches
            setNewMed((prev: any) => ({ ...prev, purpose: '' }));
        }
    }, [newMed.name, editingMedIndex, newMed.purpose]);

    // AI Record Optimization: Clean up duplicates and backfill missing purposes
    useEffect(() => {
        if (healthData.medications.length === 0) return;

        let needsUpdate = false;
        const optimizedMeds = [...healthData.medications].filter((med, index, self) => {
            // Deduplication: Remove exact duplicates (same name, dosage, frequency)
            const isDuplicate = self.findIndex(m => 
                m.name.toLowerCase() === med.name.toLowerCase() && 
                m.dosage.toLowerCase() === med.dosage.toLowerCase() && 
                m.frequency.toLowerCase() === med.frequency.toLowerCase()
            ) !== index;
            
            if (isDuplicate) {
                needsUpdate = true;
                return false;
            }
            return true;
        }).map(med => {
            // Auto-fill Purposes from Dictionary if missing
            if (!med.purpose || med.purpose === 'Unknown' || med.purpose === 'N/A') {
                const matchedMed = Object.keys(MEDICINE_DICTIONARY).find(
                    key => key.toLowerCase() === med.name.trim().toLowerCase()
                );
                if (matchedMed) {
                    needsUpdate = true;
                    return { ...med, purpose: MEDICINE_DICTIONARY[matchedMed] };
                }
            }
            return med;
        });

        if (needsUpdate) {
            updateField('medications', optimizedMeds);
        }
    }, [healthData.medications.length]);

    const SectionHeader = ({ icon: Icon, title, color }: { icon: any, title: string, color: string }) => (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-medium text-gray-800 flex items-center gap-3">
                <div className={`p-2 bg-${color}-50 rounded-lg text-${color}-600`}>
                    <Icon className="w-5 h-5" />
                </div>
                {title}
            </h2>
        </div>
    );

    const handleMedicineScan = async () => {
        setIsScanningMed(false);
        setIsAnalyzingMed(true);
        setAnalysisStep('Initializing Optical Molecular Grid...');

        // Simulate AI Analysis Steps
        const steps = [
            { text: 'Extracting Active Ingredients...', delay: 1500 },
            { text: 'identifying METFORMIN HYDROCHLORIDE...', delay: 1000 },
            { text: 'Analyzing Regulatory Markings...', delay: 1200 },
            { text: 'Contextualizing Clinical Purpose: Type 2 Diabetes...', delay: 1000 },
            { text: 'Determining Default Therapeutic Dosage...', delay: 800 }
        ];

        for (const step of steps) {
            setAnalysisStep(step.text);
            await new Promise(r => setTimeout(r, step.delay));
        }

        // Add the identified medicine
        const scannedMed = {
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice Daily (Post-Scan)',
            duration: 'As Directed',
            manufacturer: 'Merck & Co.',
            expiryDate: '2026-08-15',
            purpose: 'Type 2 Diabetes Management'
        };

        addListItem('medications', scannedMed);
        setIsAnalyzingMed(false);
        setAnalysisStep('');
    };

    const startEditingMed = (index: number) => {
        const med = healthData.medications[index];
        setNewMed({ ...med });
        setEditingMedIndex(index);
    };

    const cancelEditingMed = () => {
        setNewMed({ name: '', dosage: '', frequency: '', duration: '', manufacturer: '', expiryDate: '', purpose: '' });
        setEditingMedIndex(null);
    };

    const saveMedication = () => {
        if (!newMed.name) return;
        
        if (editingMedIndex !== null) {
            const updatedMeds = [...healthData.medications];
            updatedMeds[editingMedIndex] = newMed;
            updateField('medications', updatedMeds);
            setEditingMedIndex(null);
        } else {
            addListItem('medications', newMed);
        }
        setNewMed({ name: '', dosage: '', frequency: '', manufacturer: '', expiryDate: '', purpose: '' });
    };

    const InputField = ({ label, value, onChange, type = 'text', placeholder }: any) => (
        <div>
            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
            />
        </div>
    );

    return (
        <div className="w-full pb-20">
            
            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* 1. Dynamic Header (Span 12) */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-12 flex flex-col justify-center min-h-[100px] mb-4"
                >
                    <h1 className="page-title">Complete Health Record</h1>
                    <p className="text-gray-500 mt-2">Your comprehensive digital health identity.</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-5 py-2.5 rounded-xl mt-6 inline-flex w-max shadow-sm">
                        <Shield className="w-5 h-5" />
                        Clinical Sink: Synchronized
                    </div>
                </motion.div>

                {/* 2. Personal Information (Span 8) - COMPREHENSIVE FORM */}
                <motion.div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm">
                    <SectionHeader icon={User} title="Personal Information" color="primary" />

                    {/* Row 1: Core Identity */}
                    <div className="mb-2">
                        <p className="text-[10px] font-medium text-primary-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <User className="w-3.5 h-3.5" />
                            Core Identity
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <InputField label="Full Name" value={healthData.fullName} onChange={(v: any) => updateField('fullName', v)} placeholder="Enter full name" />
                            <InputField label="Date of Birth" value={healthData.dateOfBirth} type="date" onChange={(v: any) => updateField('dateOfBirth', v)} />
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                                <select
                                    value={healthData.gender}
                                    onChange={(e) => updateField('gender', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm appearance-none"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Non-binary</option>
                                    <option>Prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Blood Group</label>
                                <select
                                    value={healthData.bloodGroup}
                                    onChange={(e) => updateField('bloodGroup', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm appearance-none"
                                >
                                    <option value="">Select Blood Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-50 my-6" />

                    {/* Row 2: Personal Details */}
                    <div className="mb-2">
                        <p className="text-[10px] font-medium text-primary-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5" />
                            Personal Details
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <InputField label="National ID" value={healthData.nationalId} onChange={(v: any) => updateField('nationalId', v)} placeholder="ID Number" />
                            <InputField label="Occupation" value={healthData.occupation} onChange={(v: any) => updateField('occupation', v)} placeholder="e.g. Engineer" />
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Marital Status</label>
                                <select
                                    value={healthData.maritalStatus}
                                    onChange={(e) => updateField('maritalStatus', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm appearance-none"
                                >
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Divorced</option>
                                    <option>Widowed</option>
                                </select>
                            </div>
                            <InputField label="Nationality" value={healthData.nationality} onChange={(v: any) => updateField('nationality', v)} placeholder="e.g. Nepali" />
                        </div>
                    </div>

                    <div className="border-t border-gray-50 my-6" />

                    {/* Row 3: Contact */}
                    <div className="mb-2">
                        <p className="text-[10px] font-medium text-emerald-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" />
                            Contact Information
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="tel"
                                        value={healthData.phone}
                                        onChange={(e) => updateField('phone', e.target.value)}
                                        placeholder="+977-9XXXXXXXXX"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="email"
                                        value={healthData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-50 my-6" />

                    {/* Row 4: Address */}
                    <div className="mb-2">
                        <p className="text-[10px] font-medium text-amber-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5" />
                            Home Address
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
                            <div className="lg:col-span-3">
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Street Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="text"
                                        value={healthData.address}
                                        onChange={(e) => updateField('address', e.target.value)}
                                        placeholder="House No., Street Name, Area"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                            <InputField label="City" value={healthData.city} onChange={(v: any) => updateField('city', v)} placeholder="e.g. Kathmandu" />
                            <InputField label="State / Province" value={healthData.state} onChange={(v: any) => updateField('state', v)} placeholder="e.g. Bagmati" />
                            <InputField label="Postal Code" value={healthData.postalCode} onChange={(v: any) => updateField('postalCode', v)} placeholder="e.g. 44600" />
                            <InputField label="Country" value={healthData.country} onChange={(v: any) => updateField('country', v)} placeholder="e.g. Nepal" />
                        </div>
                    </div>

                    <div className="border-t border-gray-50 my-6" />

                    {/* Row 5: Emergency Contact */}
                    <div>
                        <p className="text-[10px] font-medium text-rose-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Emergency Contact
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Contact Name</label>
                                <div className="relative">
                                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="text"
                                        value={healthData.emergencyName}
                                        onChange={(e) => updateField('emergencyName', e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Relationship</label>
                                <select
                                    value={healthData.emergencyRelation}
                                    onChange={(e) => updateField('emergencyRelation', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm appearance-none"
                                >
                                    <option>Spouse</option>
                                    <option>Parent</option>
                                    <option>Sibling</option>
                                    <option>Child</option>
                                    <option>Friend</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Emergency Phone</label>
                                <div className="relative">
                                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="tel"
                                        value={healthData.emergencyPhone}
                                        onChange={(e) => updateField('emergencyPhone', e.target.value)}
                                        placeholder="+977-9XXXXXXXXX"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Emergency Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                    <input
                                        type="email"
                                        value={healthData.emergencyEmail}
                                        onChange={(e) => updateField('emergencyEmail', e.target.value)}
                                        placeholder="emergency@email.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all font-medium text-gray-800 bg-white shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 3. QR Digital Identity & Handshake (Span 4) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 relative group"
                >
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center min-h-[420px] mb-6">
                        <PatientQR 
                            patientId="PT-8829" 
                            patientName={healthData.fullName} 
                            size="md" 
                        />
                    </div>

                    {/* Handshake UI */}
                    <div className="bg-gray-900 p-6 rounded-[2rem] shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Lock className="w-20 h-20 text-white" />
                        </div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                <Shield className="w-4 h-4" />
                            </div>
                            <h3 className="text-sm font-medium text-white tracking-tight">Access Handshake</h3>
                        </div>

                        <div className="space-y-3 relative z-10">
                            {healthData.connectionRequests.length === 0 ? (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                    <p className="text-[10px] text-gray-400 font-medium">No active connection requests.</p>
                                </div>
                            ) : healthData.connectionRequests.map(req => (
                                <div key={req.id} className="bg-white p-4 rounded-xl flex flex-col gap-3 border border-emerald-500/20 shadow-sm transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-medium text-sm shrink-0">
                                            {req.doctorName.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-xs">{req.doctorName}</p>
                                            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest leading-none">{req.doctorSpecialty}</p>
                                        </div>
                                    </div>
                                    
                                    {req.status === 'pending' ? (
                                        <div className="flex items-center gap-2 mt-1">
                                            <button 
                                                onClick={() => handleConnectionAction(req.id, 'denied')}
                                                className="flex-1 py-2 rounded-lg text-[10px] text-gray-400 font-medium hover:bg-gray-100 transition-colors border border-gray-100"
                                            >
                                                Deny
                                            </button>
                                            <button 
                                                onClick={() => handleConnectionAction(req.id, 'approved')}
                                                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg font-medium text-[10px] shadow-sm shadow-emerald-500/10 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1"
                                            >
                                                <CheckCircle2 className="w-3 h-3" />
                                                Approve
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`w-full text-center py-2 rounded-lg text-[9px] font-medium uppercase tracking-widest ${req.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {req.status}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>


                {/* 5. Physical Vitals & BMI (Span 12) */}
                <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm">
                    <SectionHeader icon={Activity} title="Physical Snapshot" color="blue" />
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        <InputField label="Height (cm)" value={healthData.height} type="number" onChange={(v:any) => updateField('height', v)} />
                        <InputField label="Weight (kg)" value={healthData.weight} type="number" onChange={(v:any) => updateField('weight', v)} />
                        
                        {/* BMI Calculator with Status */}
                        <div className="md:col-span-2">
                            <BMIGauge 
                                bmi={(Number(healthData.weight) / ((Number(healthData.height) / 100) ** 2)) || 0} 
                                showTitle={true} 
                            />
                        </div>
                        
                        <div className="p-4 bg-primary-50 rounded-2xl flex flex-col items-center justify-center h-full relative border border-primary-100 group">
                            <span className="absolute top-2 left-3 text-[10px] font-medium text-primary-400 uppercase tracking-widest">Global Status</span>
                            <div className="flex items-center gap-2 mt-2">
                                <Thermometer className="w-5 h-5 text-primary-600 animate-pulse" />
                                <span className="text-sm font-medium text-primary-700 uppercase tracking-tight">Stable</span>
                            </div>
                        </div>
                    </div>
                </motion.div>


                {/* 7. Active Medications (Span 12) */}
                <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm">
                    <SectionHeader icon={FileText} title="Active Medications" color="primary" />
                    <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {healthData.medications.map((med, i) => (
                            <div key={i} className="flex justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-white text-primary-600 border border-primary-100 rounded-xl flex items-center justify-center font-medium text-[10px]">Rx</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                                            <div>
                                                <p className="font-medium text-gray-800 text-sm leading-none">{med.name}</p>
                                                {med.purpose && (
                                                    <p className="text-[9px] font-medium text-primary-600 tracking-tighter mt-1 bg-primary-50 px-1.5 py-0.5 rounded border border-primary-100/50 inline-block">{med.purpose}</p>
                                                )}
                                            </div>
                                            <p className="text-[10px] font-medium text-gray-400 tracking-widest">{med.dosage} • {med.frequency}</p>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100/50">
                                            <p className="text-[9px] text-gray-400 font-medium tracking-tight bg-gray-100/50 px-2 py-0.5 rounded">Mfd. By: <span className="text-gray-600 font-medium">{med.manufacturer || 'Unknown'}</span></p>
                                            <p className="text-[9px] text-gray-400 font-medium tracking-tight bg-gray-100/50 px-2 py-0.5 rounded">Exp. Date: <span className="text-gray-600 font-medium">{med.expiryDate || 'N/A'}</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => startEditingMed(i)} 
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-primary-500 transition-all"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => removeListItem('medications', i)} 
                                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-rose-500 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isAnalyzingMed && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-6 bg-primary-900 rounded-3xl text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Brain className="w-16 h-16 animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <Loader2 className="w-5 h-5 animate-spin text-primary-400" />
                                <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-primary-200">Clinical Molecule Detection</h4>
                            </div>
                            <p className="text-sm font-medium italic animate-pulse">{analysisStep}</p>
                            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-primary-500"
                                    animate={{ width: ['0%', '100%'] }}
                                    transition={{ duration: 6, ease: 'linear' }}
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="flex flex-col gap-3">
                            {/* Line 1: Clinical Basics */}
                            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                                <input placeholder="Drug Name" className="w-full sm:flex-[3] px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white outline-none" value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})} />
                                <div className="flex gap-2 w-full sm:w-auto sm:flex-[2]">
                                    <select className="flex-1 px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white" value={newMed.dosage} onChange={e => setNewMed({...newMed, dosage: e.target.value})}>
                                    <option value="" disabled hidden>Dosage</option>
                                    <option value="5mg">5mg</option>
                                    <option value="10mg">10mg</option>
                                    <option value="20mg">20mg</option>
                                    <option value="50mg">50mg</option>
                                    <option value="100mg">100mg</option>
                                    <option value="250mg">250mg</option>
                                    <option value="500mg">500mg</option>
                                    <option value="850mg">850mg</option>
                                    <option value="1000mg">1000mg</option>
                                    <option value="1 Puff">1 Puff</option>
                                    <option value="2 Puffs">2 Puffs</option>
                                    <option value="1 Drop">1 Drop</option>
                                    <option value="2 Drops">2 Drops</option>
                                    <option value="5ml">5ml</option>
                                    <option value="10ml">10ml</option>
                                    <option value="15ml">15ml</option>
                                </select>
                                <select className="flex-1 px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white" value={newMed.frequency} onChange={e => setNewMed({...newMed, frequency: e.target.value})}>
                                    <option value="" disabled hidden>Freq</option>
                                    <option value="Once Daily">Once Daily</option>
                                    <option value="Twice Daily">Twice Daily</option>
                                    <option value="Three Times Daily">Three Times Daily</option>
                                    <option value="Four Times Daily">Four Times Daily</option>
                                    <option value="Every 4 Hours">Every 4 Hours</option>
                                    <option value="Every 6 Hours">Every 6 Hours</option>
                                    <option value="Every 8 Hours">Every 8 Hours</option>
                                    <option value="Every 12 Hours">Every 12 Hours</option>
                                        <option value="As Needed">As Needed</option>
                                    </select>
                                </div>
                                <button 
                                    onClick={() => setIsScanningMed(true)}
                                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-100 text-primary-600 rounded-xl hover:bg-primary-50 transition-all flex items-center justify-center gap-2 group shadow-sm shrink-0"
                                >
                                    <Camera className="w-4 h-4" />
                                    <span className="text-[10px] font-medium uppercase tracking-wider">Scan</span>
                                </button>
                            </div>
                            
                            {/* Line 2: Clinical Details */}
                            <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                                <div className="flex gap-2 w-full sm:w-auto sm:flex-[2]">
                                    <input placeholder="Mfd. By" className="flex-1 px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white" value={newMed.manufacturer} onChange={e => setNewMed({...newMed, manufacturer: e.target.value})} />
                                    <input placeholder="Exp. Date" className="flex-1 px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white" value={newMed.expiryDate} onChange={e => setNewMed({...newMed, expiryDate: e.target.value})} />
                                </div>
                                <input placeholder="Purpose (e.g. Fever)" className="w-full sm:flex-[2] px-3 py-2.5 rounded-xl text-sm border border-gray-50 bg-white" value={newMed.purpose} onChange={e => setNewMed({...newMed, purpose: e.target.value})} />
                                <div className="flex gap-2 shrink-0">
                                    {editingMedIndex !== null && (
                                        <button 
                                            onClick={cancelEditingMed}
                                            className="bg-gray-100 text-gray-500 p-2.5 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm px-4"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                    <button 
                                        onClick={saveMedication}
                                        className={`${editingMedIndex !== null ? 'bg-primary-600' : 'bg-primary-600'} text-white p-2.5 rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors shadow-sm self-stretch px-6 min-w-[60px]`}
                                    >
                                        {editingMedIndex !== null ? (
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <span className="text-xs font-medium uppercase tracking-wider">Update</span>
                                            </div>
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 8. SURGERIES HISTORY - FLEXIBLE SECTION (Span 12) */}
                <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm">
                    <SectionHeader icon={Heart} title="Surgical & Procedure History" color="rose" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {healthData.surgeries.length === 0 && <p className="col-span-full text-center py-6 text-gray-300 font-medium uppercase text-[10px] tracking-widest border border-dashed border-gray-100 rounded-2xl">No Procedures Noted.</p>}
                        {healthData.surgeries.map((s, i) => (
                            <div key={i} className="p-5 border border-rose-100 bg-rose-50/20 rounded-2xl relative group">
                                <h4 className="font-medium text-gray-800">{s.name}</h4>
                                <p className="text-xs text-rose-600 font-medium mt-1 uppercase tracking-wider">{s.date} • {s.hospital}</p>
                                <button onClick={() => removeListItem('surgeries', i)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-2 text-rose-300 hover:text-rose-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <InputField label="Procedure Name" value={newSurgery.name} onChange={(v:any) => setNewSurgery({...newSurgery, name: v})} />
                        <InputField label="Date" type="date" value={newSurgery.date} onChange={(v:any) => setNewSurgery({...newSurgery, date: v})} />
                        <InputField label="Hospital/Clinic" value={newSurgery.hospital} onChange={(v:any) => setNewSurgery({...newSurgery, hospital: v})} />
                        <button onClick={() => {
                            if(!newSurgery.name) return;
                            addListItem('surgeries', {...newSurgery, id: Date.now().toString(), status: 'Completed'});
                            setNewSurgery({name:'', date:'', hospital:''});
                        }} className="bg-rose-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-rose-700 transition-colors">
                            <Plus className="w-4 h-4" />
                            Add Procedure
                        </button>
                    </div>
                </motion.div>

                {/* 9. LABORATORY & CLINICAL REPORTS - (Span 12) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
                        <SectionHeader icon={FileText} title="Laboratory & Clinical Reports" color="indigo" />
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => navigate('/patient/reports?tab=upload')}
                                className="text-xs font-medium text-white bg-indigo-600 uppercase tracking-widest hover:bg-indigo-700 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm shadow-indigo-500/20 active:scale-95 px-5"
                            >
                                <Upload className="w-4 h-4" />
                                Upload Report
                            </button>
                            <button 
                                onClick={() => navigate('/patient/reports')}
                                className="text-xs font-medium text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 group border border-indigo-100"
                            >
                                View History
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {healthData.reports.slice(0, 2).map((report, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.01, x: 5 }}
                                onClick={() => navigate('/patient/reports')}
                                className="p-6 bg-gray-50/50 rounded-2xl border border-transparent hover:border-indigo-100 cursor-pointer transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-${report.type === 'Imaging' ? 'blue' : 'emerald'}-500`}>
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{report.title}</h4>
                                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-1">{report.date} • {report.type}</p>
                                        </div>
                                    </div>
                                    <div className={`p-2 bg-gray-50 text-gray-300 rounded-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors`}>
                                        <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                                <div className="bg-white/80 p-4 rounded-xl flex items-start gap-3 border border-gray-100/50">
                                    <Brain className="w-4 h-4 text-indigo-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 leading-relaxed italic line-clamp-2">
                                            <span className="font-medium text-gray-700 not-italic mr-1">AI Insight:</span>
                                            {report.aiInsights[0]}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* 10. CHRONIC & ALLERGIES - DYNAMIC (Span 12) */}
                <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div>
                        <SectionHeader icon={AlertCircle} title="Chronic Conditions" color="amber" />
                        <div className="flex flex-wrap gap-2 mb-4 min-h-[46px]">
                            {healthData.chronicConditions.map((c, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 font-medium text-xs rounded-full group">
                                    {c}
                                    <XCircle className="w-3.5 h-3.5 cursor-pointer opacity-40 group-hover:opacity-100" onClick={() => removeListItem('chronicConditions', i)} />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input className="flex-1 px-4 py-2 border rounded-xl outline-none text-sm" placeholder="Add Chronic Condition" value={newChronic} onChange={e => setNewChronic(e.target.value)} onKeyDown={e => e.key === 'Enter' && (addListItem('chronicConditions', newChronic), setNewChronic(''))} />
                            <button onClick={() => { if(newChronic) {addListItem('chronicConditions', newChronic); setNewChronic('');} }} className="bg-amber-600 text-white p-2.5 rounded-xl"><Plus className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div>
                        <SectionHeader icon={Shield} title="Active Allergies" color="emerald" />
                        <div className="flex flex-wrap gap-2 mb-4 min-h-[46px]">
                            {healthData.allergies.map((a, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium text-xs rounded-full group">
                                    {a}
                                    <XCircle className="w-3.5 h-3.5 cursor-pointer opacity-40 group-hover:opacity-100" onClick={() => removeListItem('allergies', i)} />
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input className="flex-1 px-4 py-2 border rounded-xl outline-none text-sm" placeholder="Add Allergy" value={newAllergy} onChange={e => setNewAllergy(e.target.value)} onKeyDown={e => e.key === 'Enter' && (addListItem('allergies', newAllergy), setNewAllergy(''))} />
                            <button onClick={() => { if(newAllergy) {addListItem('allergies', newAllergy); setNewAllergy('');} }} className="bg-emerald-600 text-white p-2.5 rounded-xl"><Plus className="w-5 h-5" /></button>
                        </div>
                    </div>
                </motion.div>

                {/* 6. LABORATORY HUB - THE "REAL TIME SINK" TARGET (Span 12) */}
                <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm">
                    <SectionHeader icon={ClipboardList} title="Laboratory Markers Hub" color="primary" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {healthData.labResults.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50/50 border-2 border-dashed border-gray-100 rounded-2xl">
                                    <p className="text-sm font-medium text-gray-300 uppercase tracking-widest">No Markers Synced.</p>
                                </div>
                            ) : healthData.labResults.map((lab, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-2xl shadow-sm transition-all hover:border-primary-200">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium text-[10px] ${
                                            lab.status === 'Normal' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {lab.status.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800 text-sm leading-none mb-1">{lab.marker}</p>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{lab.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-medium text-gray-800 leading-none">{lab.value}</p>
                                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">{lab.unit}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-center">
                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3">Add Manual Marker</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <input placeholder="Marker" className="px-3 py-2.5 rounded-xl border border-gray-50 text-sm bg-white" value={newLab.marker} onChange={e => setNewLab({...newLab, marker: e.target.value})} />
                                <input placeholder="Value" className="px-3 py-2.5 rounded-xl border border-gray-50 text-sm bg-white" value={newLab.value} onChange={e => setNewLab({...newLab, value: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <select className="px-3 py-2.5 rounded-xl border border-gray-50 text-sm bg-white" value={newLab.unit} onChange={e => setNewLab({...newLab, unit: e.target.value})}>
                                    <option value="" disabled hidden>Unit</option>
                                    <option value="mg/dL">mg/dL</option>
                                    <option value="mmol/L">mmol/L</option>
                                    <option value="mEq/L">mEq/L</option>
                                    <option value="g/dL">g/dL</option>
                                    <option value="U/L">U/L</option>
                                    <option value="ng/mL">ng/mL</option>
                                    <option value="pg/mL">pg/mL</option>
                                    <option value="cells/mcL">cells/mcL</option>
                                    <option value="%">%</option>
                                </select>
                                <button onClick={() => {
                                    if(!newLab.marker) return;
                                    addListItem('labResults', {...newLab, id: Date.now().toString(), date: new Date().toLocaleDateString(), status: 'Normal'});
                                    setNewLab({marker:'', value:'', unit:''});
                                }} className="bg-primary-600 text-white px-3 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary-700 transition-colors">
                                    <Plus className="w-4 h-4 shadow-sm" />
                                    <span className="text-xs">Add Marker</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 10. Footer Actions */}
                <div className="lg:col-span-12 flex justify-end mt-4">
                     <div className="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl flex items-center gap-3 border border-emerald-100 font-medium uppercase tracking-widest text-[10px] shadow-sm">
                        <CheckCircle2 className="w-5 h-5" />
                        Live Synchronized with Local Storage Sink
                    </div>
                </div>

            </div>

            <CameraScanner 
                isOpen={isScanningMed} 
                onClose={() => setIsScanningMed(false)} 
                onCapture={handleMedicineScan}
                title="Medicine Scanner"
                subtitle="Artificial Intelligence Molecule Detection"
                scanModeLabel="Extract Text"
            />
        </div>
    );
};

export default HealthProfile;
