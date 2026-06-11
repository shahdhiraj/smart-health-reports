import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Users, Settings, Maximize, Shield, Send, CheckCheck } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

const LiveConsultation = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [messages, setMessages] = useState<any[]>([
        { id: 1, sender: 'Doctor', text: 'Good afternoon, how are you feeling today?', time: '14:31' }
    ]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setStatus('connected'), 2000);
        return () => clearTimeout(timer);
    }, []);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now(), sender: 'Me', text: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        setInput('');
    };

    const handleEndCall = () => {
        setStatus('ended');
        setTimeout(() => navigate(-1), 1500);
    };

    return (
        <div className="fixed inset-0 z-[500] bg-gray-950 flex flex-col items-center justify-center text-white font-sans overflow-hidden">
            <AnimatePresence>
                {status === 'connecting' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="relative">
                            <div className="w-24 h-24 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
                            <Video className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-500" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-medium tracking-tight">Establishing Secure Link</h2>
                            <p className="text-gray-500 mt-2 font-medium">Smart Health Clinical Gateway v2.4</p>
                        </div>
                    </motion.div>
                )}

                {status === 'connected' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full h-full flex flex-col md:flex-row p-4 gap-4"
                    >
                        {/* Main Video Area */}
                        <div className="flex-1 relative bg-gray-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col group">
                            {/* Remote Person (Doctor/Patient) View */}
                            <div className="absolute inset-0">
                                <img 
                                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200&h=800" 
                                    className="w-full h-full object-cover opacity-80"
                                    alt="Remote Stream"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                            </div>

                            {/* Self View (Mini Window) */}
                            <motion.div 
                                drag
                                dragConstraints={{ top: 10, left: 10, right: 300, bottom: 400 }}
                                className="absolute top-6 right-6 w-48 h-32 bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 cursor-grab active:cursor-grabbing"
                            >
                                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                                    {isVideoOff ? <VideoOff className="text-gray-500" /> : <div className="w-full h-full bg-primary-500/10" />}
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[10px] font-medium">YOU (SELF)</div>
                            </motion.div>

                            {/* Header Info */}
                            <div className="absolute top-6 left-6 flex items-center gap-4">
                                <div className="px-4 py-2 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                    <span className="font-medium text-sm tracking-tight tracking-wider">LIVE • 04:12</span>
                                </div>
                                <div className="px-4 py-2 bg-emerald-500 text-white rounded-2xl border border-white/20 flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                                    <Shield className="w-4 h-4" />
                                    <span className="font-medium text-sm">ENCRYPTED</span>
                                </div>
                            </div>

                            {/* Footer Controls */}
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4">
                                <button 
                                    onClick={() => setIsMuted(!isMuted)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl ${isMuted ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20 backdrop-blur-xl'}`}
                                >
                                    {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                </button>
                                <button 
                                    onClick={() => setIsVideoOff(!isVideoOff)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-xl ${isVideoOff ? 'bg-red-500' : 'bg-white/10 hover:bg-white/20 backdrop-blur-xl'}`}
                                >
                                    {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                                </button>
                                <button 
                                    onClick={handleEndCall}
                                    className="w-16 h-16 bg-red-500 rounded-3xl flex items-center justify-center hover:bg-red-600 transition-all shadow-xl shadow-red-500/20 active:scale-95"
                                >
                                    <PhoneOff className="w-8 h-8" />
                                </button>
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-xl">
                                    <Maximize className="w-6 h-6" />
                                </div>
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer shadow-xl">
                                    <Settings className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Chat & Participants */}
                        <div className="w-full md:w-96 flex flex-col gap-4">
                            {/* Participant Card */}
                            <Card className="bg-gray-900 border-white/5 p-4 flex items-center justify-between text-white shadow-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg shadow-primary-500/20">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm tracking-tight">Active Room</h4>
                                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">DR. SARAH SMITH (HOST)</p>
                                    </div>
                                </div>
                                <div className="flex -space-x-2">
                                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=100&h=100" className="w-8 h-8 rounded-full border-2 border-gray-900" />
                                    <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px] font-medium">ME</div>
                                </div>
                            </Card>

                            {/* Chat Window */}
                            <Card className="flex-1 bg-gray-900 border-white/5 flex flex-col overflow-hidden shadow-2xl">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-primary-500" />
                                        <h4 className="font-medium text-sm">Consultation Logs</h4>
                                    </div>
                                    <span className="text-[10px] font-medium text-gray-500">REAL-TIME SYNC</span>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.map((m) => (
                                        <div key={m.id} className={`flex flex-col ${m.sender === 'Me' ? 'items-end' : 'items-start'}`}>
                                            <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${m.sender === 'Me' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-300 rounded-tl-none'}`}>
                                                {m.text}
                                            </div>
                                            <div className="flex items-center gap-1 mt-1">
                                                <span className="text-[9px] font-medium text-gray-500 uppercase">{m.time}</span>
                                                {m.sender === 'Me' && <CheckCheck className="w-3 h-3 text-primary-500" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 bg-gray-950/50 border-t border-white/5">
                                    <form 
                                        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                                        className="relative"
                                    >
                                        <input 
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Reply to Dr. Sarah Smith..."
                                            className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-primary-500/50 outline-none transition-all placeholder:text-gray-600 font-medium"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-600 rounded-lg shadow-lg hover:bg-primary-700 transition-all active:scale-90">
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </form>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {status === 'ended' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shadow-2xl">
                            <PhoneOff className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-medium tracking-tight">Call Concluded</h2>
                            <p className="text-gray-500 mt-1 font-medium">Session logs being archived to patient record.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveConsultation;
