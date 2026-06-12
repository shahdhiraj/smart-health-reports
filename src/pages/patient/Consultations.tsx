import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Calendar, Clock, MessageSquare, MoreVertical, CheckCircle, XCircle, Plus } from 'lucide-react';

const Consultations = () => {
    const navigate = useNavigate();
    
    const [consultations] = useState([
        {
            id: 1,
            doctor: 'Dr. Sarah Smith',
            specialty: 'Cardiologist',
            date: 'Today',
            time: '14:30',
            type: 'Video Call',
            status: 'Upcoming',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300'
        },
        {
            id: 2,
            doctor: 'Dr. James Wilson',
            specialty: 'General Physician',
            date: 'Yesterday',
            time: '10:00',
            type: 'Chat',
            status: 'Completed',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300'
        }
    ]);

    const [isBooking, setIsBooking] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [symptoms, setSymptoms] = useState('');
    const [notif, setNotif] = useState<string | null>(null);

    const doctors = [
        { name: 'Dr. Sarah Smith', specialty: 'Cardiologist', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300' },
        { name: 'Dr. James Wilson', specialty: 'General Physician', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300' },
        { name: 'Dr. Michael Chen', specialty: 'Neurologist', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300&h=300' }
    ];

    const handleAction = (type: string, doctor: string) => {
        if (type === 'Video Call') {
            navigate('/live-consultation');
        } else {
            setNotif(`Opening conversation history with ${doctor}...`);
            setTimeout(() => setNotif(null), 3000);
        }
    };

    const handleConfirmBooking = () => {
        setIsBooking(false);
        setNotif(`Appointment confirmed with ${selectedDoctor.name} for ${selectedTime}! Details: ${symptoms.substring(0, 30)}...`);
        setSelectedDoctor(null);
        setSelectedTime(null);
        setSymptoms('');
        setTimeout(() => setNotif(null), 4000);
    };

    return (
        <div className="w-full relative">
            <AnimatePresence>
                {notif && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-6 right-6 z-[200] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 border border-white/10 backdrop-blur-xl"
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

            {/* Booking Modal */}
            <AnimatePresence>
                {isBooking && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { setIsBooking(false); setSelectedDoctor(null); }}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-3xl shadow-sm overflow-hidden overflow-y-auto max-h-[90vh]"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 border-b border-gray-50">
                                <div>
                                    <h2 className="section-title">Book Virtual Consult</h2>
                                    <p className="text-gray-500 text-sm font-medium mt-1 italic">Select a clinical specialist to begin.</p>
                                </div>
                                <button onClick={() => setIsBooking(false)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400"><XCircle className="w-6 h-6" /></button>
                            </div>

                            <div className="p-8 space-y-6">
                                {!selectedDoctor ? (
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest px-1">Available Specialists</label>
                                        {doctors.map(doc => (
                                            <button 
                                                key={doc.name}
                                                onClick={() => setSelectedDoctor(doc)}
                                                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all text-left group"
                                            >
                                                <img src={doc.img} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all border border-gray-100" alt="" />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-800">{doc.name}</h4>
                                                    <p className="text-xs font-medium text-primary-600 uppercase tracking-wider">{doc.specialty}</p>
                                                </div>
                                                <Plus className="w-5 h-5 text-gray-300 group-hover:text-primary-500 transition-colors" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 20 }} 
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center gap-4 p-4 bg-primary-50/50 rounded-2xl border border-primary-100">
                                            <img src={selectedDoctor.img} className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm" alt="" />
                                            <div>
                                                <h4 className="font-medium text-gray-800">{selectedDoctor.name}</h4>
                                                <span className="text-[10px] font-medium bg-primary-600 text-white px-2 py-0.5 rounded tracking-widest">{selectedDoctor.specialty}</span>
                                            </div>
                                            <button onClick={() => setSelectedDoctor(null)} className="ml-auto text-[10px] font-medium text-primary-600 underline">Change</button>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest px-1">Describe your Symptoms / Details</label>
                                            <textarea 
                                                value={symptoms}
                                                onChange={(e) => setSymptoms(e.target.value)}
                                                placeholder="e.g. Chest pain for 2 days, history of BP..."
                                                className="w-full p-4 rounded-2xl border border-gray-100 focus:border-primary-500 focus:ring-1 focus:ring-primary-100 transition-all text-sm h-32 resize-none"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest px-1">Choose Time Slot (Tomorrow)</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {['09:00 AM', '11:30 AM', '02:00 PM', '04:45 PM'].map(slot => (
                                                    <button 
                                                        key={slot} 
                                                        onClick={() => setSelectedTime(slot)}
                                                        className={`py-3 px-4 rounded-xl border font-medium text-sm transition-all ${
                                                            selectedTime === slot 
                                                            ? 'bg-primary-600 text-white border-primary-600 shadow-sm scale-[0.98]' 
                                                            : 'bg-white border-gray-50 text-gray-600 hover:border-primary-500 hover:text-primary-600'
                                                        }`}
                                                    >
                                                        {slot}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <button 
                                            disabled={!selectedTime || !symptoms.trim()}
                                            onClick={handleConfirmBooking}
                                            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-medium shadow-sm shadow-primary-600/20 hover:bg-primary-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            Confirm Appointment
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="page-title">My Consultations</h1>
                    <p className="page-subtitle">Connect with your clinical care team digitally.</p>
                </div>
                <button 
                    onClick={() => setIsBooking(true)}
                    className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3.5 rounded-2xl hover:bg-primary-700 transition-all font-medium shadow-sm shadow-primary-500/20 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Book New Consult
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {consultations.map((consult, index) => (
                    <motion.div
                        key={consult.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-sm transition-all relative overflow-hidden group"
                    >
                        {consult.status === 'Upcoming' && (
                            <div className="absolute top-0 right-0 bg-primary-600 text-white text-[10px] font-medium px-4 py-1.5 rounded-bl-2xl tracking-widest uppercase">
                                UPCOMING
                            </div>
                        )}

                        <div className="flex items-start gap-5 mb-8">
                            <div className="relative">
                                <img
                                    src={consult.image}
                                    alt={consult.doctor}
                                    className="w-20 h-20 rounded-2xl object-cover shadow-sm ring-4 ring-transparent group-hover:ring-primary-50 transition-all"
                                />
                                <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm`}>
                                    <div className={`w-3.5 h-3.5 rounded-full ${consult.status === 'Upcoming' ? 'bg-emerald-400' : 'bg-gray-300'} ${consult.status === 'Upcoming' && 'animate-pulse'}`} />
                                </div>
                            </div>
                            <div className="pt-1">
                                <h3 className="card-title">{consult.doctor}</h3>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-primary-600 font-medium text-xs uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded-lg">{consult.specialty}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-xs font-medium text-gray-500">
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
                            {(() => {
                                return (
                                    <>
                                        <button 
                                            onClick={() => handleAction(consult.status === 'Upcoming' ? 'Video Call' : 'Chat', consult.doctor)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-medium transition-all shadow-sm active:scale-95 ${
                                                consult.status === 'Upcoming'
                                                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/10'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}>
                                            {consult.type === 'Video Call' ? <Video className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                            {consult.status === 'Upcoming' ? 'Join Video Call' : 'View Chat History'}
                                        </button>
                                        
                                        <button 
                                            className="p-3.5 rounded-2xl border border-emerald-100 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all active:scale-90"
                                            title="WhatsApp Doctor"
                                            onClick={() => window.open(`https://wa.me/9800000000`, '_blank')}
                                        >
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.123.554 4.197 1.604 6.06L0 24l6.117-1.605a11.77 11.77 0 005.925 1.597h.005c6.632 0 12.032-5.397 12.035-12.032.003-3.218-1.247-6.242-3.52-8.517"/>
                                            </svg>
                                        </button>

                                        <button className="p-3.5 rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-all active:scale-90">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </>
                                );
                            })()}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Consultations;
