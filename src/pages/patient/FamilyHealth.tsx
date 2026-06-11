import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Heart, Calendar, Activity, X, FileText, ChevronRight } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import PatientQR from '../../components/PatientQR';

const FamilyHealth = () => {
    const { healthData } = useHealth();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    
    // Mock dependents data for demonstration
    const [dependents, setDependents] = useState([
        {
            id: 'DEP-101',
            name: 'Sarah Connor',
            relation: 'Mother',
            age: '65',
            bloodGroup: 'O+',
            lastVisit: '2 days ago',
            nextAppointment: 'Oct 15, 2024',
            healthScore: 88,
            status: 'Stable',
            alerts: 1
        },
        {
            id: 'DEP-102',
            name: 'John Doe Jr.',
            relation: 'Son',
            age: '12',
            bloodGroup: 'A-',
            lastVisit: '1 month ago',
            nextAppointment: 'Nov 02, 2024',
            healthScore: 95,
            status: 'Healthy',
            alerts: 0
        }
    ]);

    const [newMember, setNewMember] = useState({ name: '', relation: '', age: '', bloodGroup: '' });

    const handleAddMember = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMember.name) return;
        
        setDependents([...dependents, {
            id: `DEP-${Date.now()}`,
            name: newMember.name,
            relation: newMember.relation || 'Dependent',
            age: newMember.age || '—',
            bloodGroup: newMember.bloodGroup || '—',
            lastVisit: '—',
            nextAppointment: '—',
            healthScore: 100,
            status: 'Pending Sync',
            alerts: 0
        }]);
        
        setIsAddModalOpen(false);
        setNewMember({ name: '', relation: '', age: '', bloodGroup: '' });
    };

    return (
        <div className="w-full relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="page-title">Family Health</h1>
                    <p className="page-subtitle">Manage health profiles and appointments for your dependents.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 transition-all shadow-sm shadow-primary-500/20 active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Add Family Member
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dependents List */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dependents.map((dep, index) => (
                        <motion.div
                            key={dep.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:border-primary-100 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                {dep.alerts > 0 && (
                                    <span className="flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full text-xs font-medium animate-pulse">
                                        {dep.alerts}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center text-primary-600 font-medium text-2xl shadow-inner">
                                    {dep.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="card-title">{dep.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium uppercase tracking-wider">{dep.relation}</span>
                                        <span className="text-xs text-gray-400 font-medium">{dep.age} yrs</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1">Health Score</p>
                                    <p className="text-lg font-medium text-gray-800 flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-emerald-500" />
                                        {dep.healthScore}
                                    </p>
                                </div>
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1">Blood Type</p>
                                    <p className="text-lg font-medium text-rose-600 flex items-center gap-2">
                                        <Heart className="w-4 h-4" />
                                        {dep.bloodGroup}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Next Appt</span>
                                    <span className="font-medium text-gray-800">{dep.nextAppointment}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500 flex items-center gap-2"><FileText className="w-4 h-4" /> Last Visit</span>
                                    <span className="font-medium text-gray-800">{dep.lastVisit}</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-primary-50 text-primary-600 font-medium rounded-xl hover:bg-primary-100 transition-colors flex items-center justify-center gap-2">
                                View Full Profile
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Primary Account Info */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-b from-primary-900 to-primary-800 p-8 rounded-[2rem] text-white shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10">
                            <Users className="w-48 h-48 transform translate-x-12 -translate-y-12" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-primary-200 mb-6">Primary Custodian</h3>
                            
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 mb-4">
                                    <div className="bg-white p-2 rounded-xl">
                                        <PatientQR patientId={healthData.nationalId} patientName={healthData.fullName} size="sm" hideDetails={true} />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-medium tracking-tight">{healthData.fullName}</h2>
                                <p className="text-primary-200 font-medium mt-1">ID: {healthData.nationalId}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-primary-200 uppercase tracking-widest font-medium mb-1">Managed Profiles</p>
                                    <p className="text-xl font-medium">{dependents.length} Dependents</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                    <p className="text-[10px] text-primary-200 uppercase tracking-widest font-medium mb-1">Global Permissions</p>
                                    <p className="text-sm font-medium">Full clinical proxy access granted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Member Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
                        onClick={() => setIsAddModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-sm relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="absolute top-6 right-6 p-2 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            
                            <h2 className="section-title mb-2">Link Dependent</h2>
                            <p className="text-gray-500 text-sm mb-8">Add a family member to manage their clinical records and appointments.</p>
                            
                            <form onSubmit={handleAddMember} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={newMember.name}
                                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-50 focus:border-primary-500 outline-none transition-colors text-gray-800 font-medium" 
                                        placeholder="e.g. Jane Doe"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Relation</label>
                                        <select 
                                            value={newMember.relation}
                                            onChange={(e) => setNewMember({...newMember, relation: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-50 focus:border-primary-500 outline-none transition-colors text-gray-800 font-medium bg-white"
                                        >
                                            <option value="">Select...</option>
                                            <option value="Child">Child</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Spouse">Spouse</option>
                                            <option value="Sibling">Sibling</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Age</label>
                                        <input 
                                            type="number" 
                                            value={newMember.age}
                                            onChange={(e) => setNewMember({...newMember, age: e.target.value})}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-50 focus:border-primary-500 outline-none transition-colors text-gray-800 font-medium" 
                                            placeholder="Years"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Blood Group (Optional)</label>
                                    <select 
                                        value={newMember.bloodGroup}
                                        onChange={(e) => setNewMember({...newMember, bloodGroup: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-50 focus:border-primary-500 outline-none transition-colors text-gray-800 font-medium bg-white"
                                    >
                                        <option value="">Unknown</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                
                                <button type="submit" className="w-full py-4 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm shadow-primary-500/30 mt-4">
                                    Create Profile Sync
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FamilyHealth;
