import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Calendar, Activity, FileText, Pill,
    ChevronLeft, Clock, Phone, Mail, MapPin,
    AlertCircle, Sparkles, Brain, Plus
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { AIBanner } from '../../components/safety/AIBanner';
import { MedicalDisclaimer } from '../../components/safety/MedicalDisclaimer';
import PatientQR from '../../components/PatientQR';

const PatientDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'prescriptions' | 'analysis' | 'comparison'>('overview');
    
    // Load persisted prescriptions
    const [savedPrescriptions, setSavedPrescriptions] = useState<any[]>([]);
    useEffect(() => {
        const all = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        // Filter for this patient
        setSavedPrescriptions(all.filter((rx: any) => rx.patientId === id || rx.patientName === 'John Doe'));
    }, [id]);

    // Mock Patient Data
    const patient = {
        id: id,
        name: 'John Doe',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200&h=200',
        age: 45,
        gender: 'Male',
        bloodGroup: 'O+',
        phone: '+1 234 567 890',
        email: 'john.doe@example.com',
        address: '123 Main St, New York, NY',
        lastVisit: '2024-03-10',
        nextAppointment: '2024-03-24',
        condition: 'Hypertension',
        status: 'Stable',
        allergies: ['Penicillin', 'Peanuts'],
        chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
        vitals: [
            { label: 'Heart Rate', value: '72 bpm', status: 'normal' },
            { label: 'Blood Pressure', value: '120/80', status: 'normal' },
            { label: 'Temperature', value: '98.6°F', status: 'normal' },
            { label: 'SpO2', value: '98%', status: 'normal' }
        ]
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header / Back Button */}
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/doctor/patients')}
                    className="p-2"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="page-title">Patient Profile</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Sidebar: Patient Info Card */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex flex-col items-center text-center mb-6">
                                    <div className="relative">
                                        <img
                                            src={patient.image}
                                            alt={patient.name}
                                            className="w-24 h-24 rounded-2xl object-cover mb-4 shadow-sm"
                                        />
                                        <span className={`absolute bottom-3 right-0 w-5 h-5 border-2 border-white rounded-full ${patient.status === 'Stable' ? 'bg-primary-500' : 'bg-red-500'}`}></span>
                                    </div>
                                    <h2 className="section-title">{patient.name}</h2>
                                    <p className="text-gray-500 text-sm">ID: #{patient.id?.toString().padStart(4, '0')}</p>

                                    <div className="flex gap-2 mt-4">
                                        <Badge variant="info">
                                            {patient.condition}
                                        </Badge>
                                        <Badge variant="neutral">
                                            {patient.age} yrs, {patient.gender}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-100">
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        {patient.phone}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <Mail className="w-4 h-4 text-gray-400" />
                                        {patient.email}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {patient.address}
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-3">
                                    <Button 
                                        className="w-full gap-2"
                                        onClick={() => navigate('/doctor/prescriptions')}
                                    >
                                        <FileText className="w-4 h-4" />
                                        Prescribe
                                    </Button>
                                    <Button variant="secondary" className="w-full gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Book
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Identification QR Pass & Vitals */}
                    <div className="grid grid-cols-1 gap-6">
                        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 flex items-center justify-center border-emerald-100 shadow-sm group hover:shadow-md transition-all">
                            <PatientQR 
                                patientId={patient.id || 'ID-UNKNOWN'} 
                                patientName={patient.name} 
                                size="md"
                            />
                        </Card>

                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                Live Vitals
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {patient.vitals.map((vital, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-100 transition-all">
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">{vital.label}</p>
                                        <p className="text-xl font-normal text-gray-700">{vital.value}</p>
                                        <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Healthy</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Last Visit</p>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary-500" />
                                <span className="font-medium text-gray-800">{patient.lastVisit}</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Next Appointment</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary-500" />
                                <span className="font-medium text-gray-800">{patient.nextAppointment}</span>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Blood Group</p>
                            <span className="font-medium text-gray-800">{patient.bloodGroup}</span>
                        </div>
                    </div>

                    {/* Medical Info Tabs */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
                        <div className="flex border-b border-gray-100">
                            {['overview', 'history', 'prescriptions', 'analysis', 'comparison'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === tab
                                        ? 'border-primary-500 text-primary-600 bg-primary-50/10'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        } capitalize`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-6">
                            {activeTab === 'overview' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                                            <AlertCircle className="w-4 h-4 text-primary-500" />
                                            Important Medical Alerts
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {patient.allergies.map(allergy => (
                                                <span key={allergy} className="px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-lg border border-red-100">
                                                    Allergy: {allergy}
                                                </span>
                                            ))}
                                            {patient.chronicConditions.map(condition => (
                                                <span key={condition} className="px-3 py-1 bg-orange-50 text-orange-700 text-sm font-medium rounded-lg border border-orange-100">
                                                    {condition}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="flex items-center gap-2 text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                                            <FileText className="w-4 h-4 text-primary-500" />
                                            Recent Notes
                                        </h4>
                                        <div className="space-y-4">
                                            {[1, 2].map((_, i) => (
                                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="text-xs font-medium text-gray-500">Dr. Sarah Smith • Cardiologist</span>
                                                        <span className="text-xs text-gray-400">Mar 10, 2024</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700 leading-relaxed">
                                                        Patient shows stable vitals. Blood pressure has improved since last visit.
                                                        Recommended continuing current medication dosage and increasing daily activity.
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'prescriptions' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium text-gray-800">Active Medications</h4>
                                        <button 
                                            className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1"
                                            onClick={() => navigate('/doctor/prescriptions')}
                                        >
                                            <Plus className="w-4 h-4" /> Add New
                                        </button>
                                    </div>
                                    {/* Mock Prescriptions List */}
                                        {[
                                            ...savedPrescriptions.map(rx => ({
                                                name: rx.medicines[0]?.name || 'Clinical Directive',
                                                dosage: rx.medicines[0]?.dosage || '-',
                                                freq: rx.medicines[0]?.frequency || '-',
                                                doctor: 'Dr. Sarah Smith',
                                                isNew: true,
                                                id: rx.id
                                            })),
                                            { name: 'Lisinopril', dosage: '10mg', freq: 'Daily', doctor: 'Dr. Sarah Smith', isNew: false },
                                            { name: 'Metformin', dosage: '500mg', freq: 'Twice Daily', doctor: 'Dr. James Wilson', isNew: false }
                                        ].map((med, i) => (
                                            <div key={i} className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl border ${med.isNew ? 'border-primary-100 bg-primary-50/20' : 'border-gray-100'}`}>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary-600 shadow-sm border border-gray-200">
                                                        <Pill className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-medium text-gray-800 flex items-center gap-2">
                                                            {med.name}
                                                            {med.isNew && <Badge variant="info" className="text-[8px] px-1.5 py-0">LIVE</Badge>}
                                                        </h5>
                                                        <p className="text-xs text-gray-500">{med.dosage} • {med.freq}</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-200">
                                                    Prescribed by {med.doctor}
                                                </span>
                                            </div>
                                        ))}
                                </motion.div>
                            )}

                            {activeTab === 'analysis' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                    {/* AI Insight Panel */}
                                    <div className="space-y-4">
                                        <AIBanner confidence={98} />

                                        <Card className="border-primary-100 bg-gradient-to-br from-primary-50/50 to-purple-50/50">
                                            <CardContent className="p-6">
                                                <div className="flex gap-4 items-start">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm border border-primary-100 text-primary-600">
                                                        <Sparkles className="w-5 h-5" />
                                                    </div>
                                                    <div className="space-y-4 flex-1">
                                                        <div>
                                                            <h4 className="font-medium text-gray-800 mb-2">Clinical Recommendation</h4>
                                                            <p className="text-gray-700 leading-relaxed text-sm">
                                                                Based on recent BP trends (averaging 150/95) and increased heart rate variance, consider adjusting <span className="font-medium text-gray-900">Lisinopril</span> dosage to 20mg. Patient shows signs of <span className="font-medium text-gray-900">Stage 2 Hypertension</span> requiring immediate attention.
                                                            </p>
                                                        </div>

                                                        <div className="flex gap-3">
                                                            <Button size="sm" className="gap-2 bg-primary-600 hover:bg-primary-700">
                                                                <Brain className="w-4 h-4" />
                                                                Accept Recommendation
                                                            </Button>
                                                            <Button size="sm" variant="secondary">
                                                                Dismiss
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    {/* Trend Charts */}
                                    <div>
                                        <h4 className="font-medium text-gray-800 mb-6 flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-gray-500" />
                                            Vitals Trends (Last 7 Days)
                                        </h4>

                                        <div className="grid grid-cols-1 gap-8">
                                            {/* Blood Pressure Chart */}
                                            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                                <h5 className="text-sm font-medium text-gray-600 mb-4 ml-2">Blood Pressure</h5>
                                                <div className="h-[250px] w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <LineChart data={[
                                                            { day: 'Mon', systolic: 140, diastolic: 85 },
                                                            { day: 'Tue', systolic: 142, diastolic: 88 },
                                                            { day: 'Wed', systolic: 145, diastolic: 90 },
                                                            { day: 'Thu', systolic: 148, diastolic: 92 },
                                                            { day: 'Fri', systolic: 150, diastolic: 95 },
                                                            { day: 'Sat', systolic: 148, diastolic: 94 },
                                                            { day: 'Sun', systolic: 152, diastolic: 96 },
                                                        ]}>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                            />
                                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                                            <Line type="monotone" dataKey="systolic" name="Systolic" stroke="#EF4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 0, fill: '#EF4444' }} activeDot={{ r: 6 }} />
                                                            <Line type="monotone" dataKey="diastolic" name="Diastolic" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, strokeWidth: 0, fill: '#3B82F6' }} activeDot={{ r: 6 }} />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>

                                            {/* Heart Rate Chart */}
                                            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
                                                <h5 className="text-sm font-medium text-gray-600 mb-4 ml-2">Heart Rate</h5>
                                                <div className="h-[200px] w-full">
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <AreaChart data={[
                                                            { day: 'Mon', hr: 72 },
                                                            { day: 'Tue', hr: 75 },
                                                            { day: 'Wed', hr: 78 },
                                                            { day: 'Thu', hr: 74 },
                                                            { day: 'Fri', hr: 80 },
                                                            { day: 'Sat', hr: 82 },
                                                            { day: 'Sun', hr: 79 },
                                                        ]}>
                                                            <defs>
                                                                <linearGradient id="colorHr" x1="0" y1="0" x2="0" y2="1">
                                                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                                                </linearGradient>
                                                            </defs>
                                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                            <Tooltip
                                                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                                            />
                                                            <Area type="monotone" dataKey="hr" name="Heart Rate" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorHr)" />
                                                        </AreaChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'comparison' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                    {/* AI Delta Summary */}
                                    <div className="bg-primary-50 border border-primary-100 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
                                        <div className="p-3 bg-white rounded-xl shadow-sm border border-primary-100 text-primary-600">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary-900 mb-1 flex items-center gap-2">
                                                AI Delta Summary
                                                <Badge variant="info" className="text-[10px] py-0">High Confidence</Badge>
                                            </h4>
                                            <p className="text-sm text-primary-800 leading-relaxed font-medium">
                                                Comparison between <span className="font-bold bg-primary-100 px-1 rounded">MRI Brain (Mar 2024)</span> and <span className="font-bold bg-primary-100 px-1 rounded">MRI Brain (Jan 2023)</span> shows no new lesions. Previous hyperintensities in the periventricular white matter remain unchanged. Overall progression is clinically stable.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Split Screen Container */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Report A: Baseline */}
                                        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden flex flex-col h-[550px] shadow-sm">
                                            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                                                <select className="bg-white border border-gray-200 text-sm rounded-xl px-4 py-2 font-semibold outline-none text-gray-700 shadow-sm hover:border-gray-300 transition-colors cursor-pointer w-[60%]">
                                                    <option>MRI Brain (Jan 15, 2023)</option>
                                                    <option>Complete Blood Count (2023)</option>
                                                </select>
                                                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">Baseline</span>
                                            </div>
                                            <div className="flex-1 p-5 overflow-y-auto bg-gray-50/50">
                                                <div className="w-full aspect-square bg-black rounded-2xl mb-5 overflow-hidden relative shadow-inner">
                                                    <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600&h=600" alt="MRI Baseline" className="w-full h-full object-cover grayscale opacity-80" />
                                                </div>
                                                <div className="space-y-2 bg-white p-4 rounded-2xl border border-gray-100">
                                                    <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Radiologist Findings</h5>
                                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">Mild periventricular white matter changes. No acute infarct or hemorrhage. Ventricles are normal in size and configuration.</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Report B: Recent */}
                                        <div className="bg-white border-2 border-primary-500 rounded-3xl overflow-hidden flex flex-col h-[550px] shadow-lg relative">
                                            <div className="p-4 border-b border-primary-100 bg-primary-50/50 flex justify-between items-center">
                                                <select className="bg-white border border-primary-200 text-sm rounded-xl px-4 py-2 font-semibold outline-none text-primary-700 shadow-sm hover:border-primary-300 transition-colors cursor-pointer w-[60%]">
                                                    <option>MRI Brain (Mar 10, 2024)</option>
                                                    <option>Complete Blood Count (2024)</option>
                                                </select>
                                                <span className="px-3 py-1 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">Recent</span>
                                            </div>
                                            <div className="flex-1 p-5 overflow-y-auto bg-primary-50/10">
                                                <div className="w-full aspect-square bg-black rounded-2xl mb-5 overflow-hidden relative shadow-inner group">
                                                    <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600&h=600" alt="MRI Recent" className="w-full h-full object-cover grayscale contrast-125 brightness-110" />
                                                    
                                                    {/* AI Artifact Highlights */}
                                                    <div className="absolute top-[30%] left-[40%] w-16 h-16 border-2 border-primary-500 bg-primary-500/20 rounded-full animate-pulse flex items-center justify-center group-hover:bg-primary-500/40 transition-colors">
                                                        <span className="absolute -top-6 bg-primary-600 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Stable Region</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 bg-white p-4 rounded-2xl border border-primary-100">
                                                    <h5 className="text-xs font-bold text-primary-500 uppercase tracking-widest flex items-center gap-2">
                                                        <Sparkles className="w-3 h-3" />
                                                        AI Extracted Findings
                                                    </h5>
                                                    <p className="text-sm text-gray-700 leading-relaxed font-medium">Stable periventricular white matter changes. <span className="bg-primary-100 text-primary-800 px-1 rounded font-bold">No interval change</span> compared to 2023 study. No new acute findings detected by neural scan.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <MedicalDisclaimer />
        </div>
    );
};

export default PatientDetails;
