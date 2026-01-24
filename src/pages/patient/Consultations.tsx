import { motion } from 'framer-motion';
import { Video, MessageSquare, Calendar, Clock, MoreVertical } from 'lucide-react';

const Consultations = () => {
    const consultations = [
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
    ];

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Consultations</h1>
                    <p className="text-gray-500 mt-2">Connect with your doctors digitally.</p>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200">
                    Book New Consult
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {consultations.map((consult, index) => (
                    <motion.div
                        key={consult.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        {consult.status === 'Upcoming' && (
                            <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                                UPCOMING
                            </div>
                        )}

                        <div className="flex items-start gap-4 mb-6">
                            <img
                                src={consult.image}
                                alt={consult.doctor}
                                className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                            />
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">{consult.doctor}</h3>
                                <p className="text-primary-600 font-medium text-sm">{consult.specialty}</p>
                                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {consult.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {consult.time}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                            <button className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors ${consult.status === 'Upcoming'
                                ? 'bg-primary-600 text-white hover:bg-primary-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}>
                                {consult.type === 'Video Call' ? <Video className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                                {consult.status === 'Upcoming' ? 'Join Call' : 'View Chat'}
                            </button>
                            <button className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Consultations;
