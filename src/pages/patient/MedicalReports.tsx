import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText, Upload, Play, Pause,
    Brain, Search, ChevronRight
} from 'lucide-react';

const MedicalReports = () => {
    const [activeTab, setActiveTab] = useState<'timeline' | 'upload'>('timeline');
    const [selectedReport, setSelectedReport] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Mock Data
    const reports = [
        {
            id: 1,
            title: 'Blood Test Analysis',
            date: '2024-03-10',
            type: 'Lab Report',
            doctor: 'Dr. Sarah Smith',
            summary: 'Your blood work shows normal levels of cholesterol and sugar. Hemoglobin is slightly low (13.2 g/dL) but within acceptable range. Vitamin D levels are sufficient.',
            aiInsights: [
                'Hemoglobin levels are stable compared to last visit.',
                'Good cholesterol (HDL) has improved by 5%.',
                'Recommended to maintain iron-rich diet.'
            ],
            audioDuration: '0:45',
            fileSize: '2.4 MB'
        },
        {
            id: 2,
            title: 'MRI Scan - Lower Back',
            date: '2024-02-15',
            type: 'Imaging',
            doctor: 'Dr. James Wilson',
            summary: 'Scan confirms mild lumbar spondylosis at L4-L5 level. No significant nerve compression observed. Physiotherapy recommended.',
            aiInsights: [
                'No structural progression since 2023 scan.',
                'Inflammation markers are reduced.',
                'Posture correction exercises advised.'
            ],
            audioDuration: '1:20',
            fileSize: '15.8 MB'
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Medical Reports</h1>
                    <p className="text-gray-500 mt-2">Upload, manage, and understand your medical history with AI.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`px-4 py-2 rounded-xl font-medium transition-colors ${activeTab === 'timeline'
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        Timeline View
                    </button>
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${activeTab === 'upload'
                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        <Upload className="w-4 h-4" />
                        Upload New
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'upload' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-3xl border-2 border-dashed border-primary-100 text-center hover:border-primary-300 transition-colors"
                        >
                            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Upload className="w-10 h-10 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Medical Records</h3>
                            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                                Drag and drop your files here, or click to browse. Supported formats: PDF, JPG, PNG.
                            </p>
                            <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
                                Browse Files
                            </button>
                        </motion.div>
                    ) : (
                        <div className="space-y-4">
                            {reports.map((report, index) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setSelectedReport(report.id)}
                                    className={`bg-white p-6 rounded-2xl shadow-sm border transition-all cursor-pointer ${selectedReport === report.id
                                        ? 'border-primary-500 ring-2 ring-primary-100'
                                        : 'border-gray-100 hover:border-primary-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">{report.title}</h3>
                                                <p className="text-sm text-gray-500">{report.type} • {report.date}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedReport === report.id ? 'rotate-90' : ''}`} />
                                    </div>

                                    <div className="pl-16">
                                        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                            {report.summary}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                                                <Brain className="w-3 h-3" />
                                                AI Analyzed
                                            </span>
                                            <span className="text-xs text-gray-400">{report.fileSize}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* AI Analysis Sidebar */}
                <div className="lg:col-span-1">
                    {selectedReport ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24"
                        >
                            <div className="bg-primary-600 p-6 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <Brain className="w-6 h-6 text-primary-200" />
                                    <h3 className="font-bold text-lg">AI Summary</h3>
                                </div>
                                <p className="text-primary-100 text-sm leading-relaxed">
                                    Simplifying complex medical terms into plain language for you.
                                </p>
                            </div>

                            <div className="p-6">
                                {/* Voice Explanation */}
                                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm font-semibold text-gray-700">Audio Explanation</span>
                                        <span className="text-xs text-gray-500">
                                            {reports.find(r => r.id === selectedReport)?.audioDuration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors shadow-md"
                                        >
                                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 pl-1" />}
                                        </button>
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary-500 w-1/3" />
                                        </div>
                                    </div>
                                </div>

                                {/* Key Insights */}
                                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <Search className="w-4 h-4 text-primary-600" />
                                    Key Insights
                                </h4>
                                <ul className="space-y-3 mb-6">
                                    {reports.find(r => r.id === selectedReport)?.aiInsights.map((insight, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 bg-primary-50/50 p-3 rounded-lg">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-1.5 shrink-0" />
                                            {insight}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                                    View Full Original Report
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200 h-64 flex flex-col items-center justify-center text-gray-400">
                            <Brain className="w-12 h-12 mb-4 opacity-50" />
                            <p>Select a report to view AI analysis and insights</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MedicalReports;
