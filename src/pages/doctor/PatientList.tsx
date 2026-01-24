import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const PatientList = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const patients = [
        { id: 1, name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-03-10', condition: 'Hypertension', status: 'Critical' },
        { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', lastVisit: '2024-03-12', condition: 'Flu', status: 'Stable' },
        { id: 3, name: 'Robert Johnson', age: 58, gender: 'Male', lastVisit: '2024-03-08', condition: 'Diabetes', status: 'Stable' },
        { id: 4, name: 'Emily Davis', age: 28, gender: 'Female', lastVisit: '2024-03-14', condition: 'Migraine', status: 'Recovering' },
    ];

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Patients</h1>
                    <p className="text-gray-500 mt-2">Manage and monitor your assigned patients.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none w-full md:w-64 transition-all"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-5 h-5" />
                        <span>Filter</span>
                    </Button>
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
