import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';

const AuditLogs = () => {
    const [logs] = useState([
        { id: 1, user: 'Dr. Sarah Smith', action: 'Viewed Patient Record', target: 'Patient #1024', timestamp: '2 mins ago', level: 'info' },
        { id: 2, user: 'Admin User', action: 'Updated System Settings', target: 'AI Configuration', timestamp: '1 hour ago', level: 'warning' },
        { id: 3, user: 'Dr. James Wilson', action: 'Prescription Issued', target: 'Patient #859', timestamp: '3 hours ago', level: 'info' },
        { id: 4, user: 'System', action: 'Database Backup', target: 'Daily Backup', timestamp: '5 hours ago', level: 'success' },
        { id: 5, user: 'Unknown IP', action: 'Failed Login Attempt', target: 'Admin Portal', timestamp: '1 day ago', level: 'critical' },
    ]);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'success': return 'bg-green-100 text-green-700';
            case 'warning': return 'bg-orange-100 text-orange-700';
            case 'critical': return 'bg-red-100 text-red-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="page-title">Audit Logs</h1>
                    <p className="text-gray-500 mt-2">Monitor system activity and security events.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    <Download className="w-5 h-5" />
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none text-sm transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-600">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">User / Actor</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Action</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Target</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Timeline</th>
                                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600">Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {logs.map((log, index) => (
                                <motion.tr
                                    key={log.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-medium text-xs">
                                                {log.user.charAt(0)}
                                            </div>
                                            <span className="font-medium text-gray-900 text-sm">{log.user}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-800 text-sm font-medium">
                                        {log.action}
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 text-sm">
                                        {log.target}
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 text-sm">
                                        {log.timestamp}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getLevelColor(log.level)}`}>
                                            {log.level}
                                        </span>
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

export default AuditLogs;
