import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, MessageSquare, Calendar, Clock, MoreVertical, CheckCircle, XCircle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

const DoctorConsultations = () => {
    const navigate = useNavigate();
    const { healthData, requestConnection } = useHealth();
    const isApproved = healthData?.approvedDoctorIds?.includes('DOC-001');

    const [consultations, setConsultations] = useState([
        {
            id: 1,
            patient: 'John Doe',
            age: 45,
            phone: '9841234567',
            date: 'Today',
            time: '14:30',
            type: 'Video Call',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300&h=300'
        },
        {
            id: 2,
            patient: 'Emily Davis',
            age: 28,
            phone: '9865432109',
            date: 'Today',
            time: '15:15',
            type: 'Chat',
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300&h=300'
        }
    ]);

    const [notif, setNotif] = useState<string | null>(null);

    const handleComplete = (id: number, name: string) => {
        setConsultations(prev => prev.filter(c => c.id !== id));
        setNotif(`Consultation with ${name} marked as completed.`);
        setTimeout(() => setNotif(null), 3000);
    };

    const handleStartAction = (type: string, name: string) => {
        if (type === 'Video Call') {
            setNotif(`Launching secure video link for ${name}...`);
            setTimeout(() => navigate('/live-consultation'), 1500);
        } else {
            setNotif(`Opening secure chat with ${name}...`);
        }
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
                <h1 className="page-title">Consultations</h1>
                <p className="page-subtitle">Manage your daily appointment schedule and patient engagement.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode='popLayout'>
                    {consultations.map((consult, index) => (
                        <motion.div
                            key={consult.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            {consult.status === 'Upcoming' && (
                                <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-medium px-4 py-1.5 rounded-bl-xl tracking-widest uppercase">
                                    UPCOMING
                                </div>
                            )}

                            <div className="flex items-start gap-4 mb-6">
                                <div className="relative">
                                    <img
                                        src={consult.image}
                                        alt={consult.patient}
                                        className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-transparent group-hover:ring-primary-100 transition-all"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <div className={`w-3 h-3 rounded-full ${consult.status === 'Upcoming' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="card-title">{consult.patient}</h3>
                                        {consult.patient === 'John Doe' && (
                                            isApproved ? (
                                                <div className="flex items-center gap-1 text-[9px] font-semibold text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                                    <ShieldCheck className="w-3 h-3" />
                                                    Identity Verified
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-[9px] font-semibold text-amber-500 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                                                    <ShieldAlert className="w-3 h-3" />
                                                    Pass Required
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{consult.age} years • Patient</p>
                                    <div className="flex items-center gap-3 mt-3 text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                                            <Calendar className="w-3.5 h-3.5 text-primary-500" />
                                            {consult.date}
                                        </span>
                                        <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                                            <Clock className="w-3.5 h-3.5 text-primary-500" />
                                            {consult.time}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                                <button 
                                    onClick={() => {
                                        if (consult.patient === 'John Doe' && !isApproved) {
                                            requestConnection({ id: 'DOC-001', name: 'Dr. Sarah Smith', specialty: 'Cardiologist' });
                                            setNotif("Identity Pass request sent to John Doe.");
                                            return;
                                        }
                                        handleStartAction(consult.type, consult.patient);
                                    }}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all shadow-sm active:scale-95 ${
                                        consult.patient === 'John Doe' && !isApproved 
                                        ? 'bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100'
                                        : consult.status === 'Upcoming'
                                            ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/10'
                                            : 'bg-primary-50 text-primary-600 hover:bg-primary-100 border border-primary-100'
                                    }`}>
                                    {consult.patient === 'John Doe' && !isApproved ? <ShieldAlert className="w-4 h-4" /> : (consult.type === 'Video Call' ? <Video className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />)}
                                    <span className="text-sm">
                                        {consult.patient === 'John Doe' && !isApproved ? 'Request Identity Pass' : (consult.status === 'Upcoming' ? 'Start Call' : 'Open Chat')}
                                    </span>
                                </button>
                                
                                <button 
                                    className="p-3 rounded-xl border border-emerald-100 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all active:scale-90 shadow-sm" 
                                    title="Connect on WhatsApp"
                                    onClick={() => window.open(`https://wa.me/${consult.phone}`, '_blank')}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.123.554 4.197 1.604 6.06L0 24l6.117-1.605a11.77 11.77 0 005.925 1.597h.005c6.632 0 12.032-5.397 12.035-12.032.003-3.218-1.247-6.242-3.52-8.517"/>
                                    </svg>
                                </button>

                                <button 
                                    onClick={() => handleComplete(consult.id, consult.patient)}
                                    className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all active:scale-90 shadow-sm" 
                                    title="Mark as Completed"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                </button>
                                
                                <button className="p-3 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DoctorConsultations;
