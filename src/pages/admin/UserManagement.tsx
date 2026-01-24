import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, UserPlus, Shield, Stethoscope, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

const UserManagement = () => {
    const [activeTab, setActiveTab] = useState<'doctors' | 'patients'>('doctors');

    const users = [
        { id: 1, name: 'Dr. Sarah Smith', role: 'Doctor', specialty: 'Cardiology', status: 'Active', email: 'sarah.smith@hospital.com' },
        { id: 2, name: 'Dr. James Wilson', role: 'Doctor', specialty: 'General Medicine', status: 'Active', email: 'james.wilson@hospital.com' },
        { id: 3, name: 'John Doe', role: 'Patient', specialty: '-', status: 'Active', email: 'john.doe@email.com' },
        { id: 4, name: 'Jane Smith', role: 'Patient', specialty: '-', status: 'Inactive', email: 'jane.smith@email.com' },
    ];

    const filteredUsers = users.filter(user =>
        (activeTab === 'doctors' ? user.role === 'Doctor' : user.role === 'Patient')
    );

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500 mt-2">Manage system access for doctors and patients.</p>
                </div>
                <Button className="gap-2 shadow-lg shadow-primary-200">
                    <UserPlus className="w-5 h-5" />
                    Add New User
                </Button>
            </div>

            <Card className="overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-2 p-1 bg-gray-50 rounded-xl">
                        <Button
                            variant={activeTab === 'doctors' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('doctors')}
                            className={activeTab === 'doctors' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-transparent'}
                        >
                            Doctors
                        </Button>
                        <Button
                            variant={activeTab === 'patients' ? 'secondary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('patients')}
                            className={activeTab === 'patients' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-transparent'}
                        >
                            Patients
                        </Button>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm w-64"
                            />
                        </div>
                        <Button variant="outline" size="sm" className="px-2">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Name</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Role</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Email</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.map((user, index) => (
                                <motion.tr
                                    key={user.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${user.role === 'Doctor' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {user.role === 'Doctor' ? <Stethoscope className="w-5 h-5" /> : <User className="w-5 h-5" />}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{user.name}</p>
                                                {user.role === 'Doctor' && <p className="text-xs text-gray-500">{user.specialty}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-700">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 text-sm">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        <Badge variant={user.status === 'Active' ? 'success' : 'neutral'}>
                                            {user.status}
                                        </Badge>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Button variant="ghost" size="sm" className="p-2 h-auto rounded-lg">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
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

export default UserManagement;
