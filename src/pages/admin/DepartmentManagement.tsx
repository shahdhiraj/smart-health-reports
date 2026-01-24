import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MoreVertical, Building2, Users } from 'lucide-react';

const DepartmentManagement = () => {
    const [departments] = useState([
        { id: 1, name: 'Cardiology', head: 'Dr. Sarah Smith', doctors: 12, status: 'Active' },
        { id: 2, name: 'Neurology', head: 'Dr. James Wilson', doctors: 8, status: 'Active' },
        { id: 3, name: 'Pediatrics', head: 'Dr. Emily Brown', doctors: 15, status: 'Active' },
        { id: 4, name: 'Oncology', head: 'Dr. Robert Chen', doctors: 10, status: 'Maintenance' },
    ]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Departments</h1>
                    <p className="text-gray-500 mt-2">Manage hospital departments and assignments.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200">
                    <Plus className="w-5 h-5" />
                    Add Department
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search departments..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Department Name</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Head of Dept</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Total Doctors</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Status</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {departments.map((dept, index) => (
                                <motion.tr
                                    key={dept.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                                <Building2 className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-900">{dept.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600 text-sm">
                                        {dept.head}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <Users className="w-4 h-4 text-gray-400" />
                                            {dept.doctors}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${dept.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {dept.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DepartmentManagement;
