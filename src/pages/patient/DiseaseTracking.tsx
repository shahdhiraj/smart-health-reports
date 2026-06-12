import { motion } from 'framer-motion';
import { Activity, TrendingUp, CheckCircle2, Download } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

const DiseaseTracking = () => {
    const { setPrintData } = useHealth();

    const handleDownloadSummary = () => {
        setPrintData('tracking', {});
    };

    return (
        <div className="w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="page-title">Chronic Disease Tracking</h1>
                    <p className="text-gray-500 mt-2">Monitor your long-term health metrics and progress.</p>
                </div>
                <button 
                    onClick={handleDownloadSummary}
                    className="flex items-center gap-2 bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 px-6 py-3 rounded-xl transition-all shadow-sm shadow-primary-500/20 active:scale-95"
                >
                    <Download className="w-4 h-4" />
                    Download Health Summary
                </button>
            </div>

            <div className="grid gap-8">
                {/* Diabetes Tracker */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl shadow-sm"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h2 className="section-title">Type 2 Diabetes</h2>
                                <span className="text-xs font-medium bg-primary-100 text-primary-700 px-2 py-1 rounded-md">MONITORED</span>
                            </div>
                            <p className="text-sm text-gray-500">Last checkup: 2 days ago</p>
                        </div>
                        <button className="text-primary-600 font-medium text-sm hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors border border-primary-100">
                            Update Metrics
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">Fasting Blood Sugar</p>
                            <p className="text-xl font-normal text-gray-700">110 <span className="text-sm font-normal text-gray-400">mg/dL</span></p>
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                                <TrendingUp className="w-3 h-3" />
                                <span>Stable within range</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">Post-Prandial</p>
                            <p className="text-xl font-normal text-gray-700">145 <span className="text-sm font-normal text-gray-400">mg/dL</span></p>
                            <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                <TrendingUp className="w-3 h-3" />
                                <span>-5% from last week</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500 mb-1">HbA1c</p>
                            <p className="text-xl font-normal text-gray-700">5.7 <span className="text-sm font-normal text-gray-400">%</span></p>
                            <div className="mt-2 flex items-center gap-1 text-xs text-green-600 font-medium">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Excellent Control</span>
                            </div>
                        </div>
                    </div>

                    {/* Simple Visualization Placeholder */}
                    <div className="relative h-64 bg-slate-50 rounded-xl border-dashed border-2 border-slate-200 flex items-center justify-center">
                        <div className="absolute inset-x-8 bottom-8 top-8 flex items-end justify-between gap-2">
                            {[40, 45, 30, 60, 55, 45, 50].map((h, i) => (
                                <div key={i} className="w-full bg-primary-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                        <p className="absolute top-4 left-6 text-xs text-primary-400 font-medium uppercase tracking-wider">Weekly Sugar Levels Trend</p>
                    </div>
                </motion.div>

                {/* Medication Adherence */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm"
                >
                    <h2 className="text-xl font-medium text-gray-800 mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-600" />
                        Medication Adherence
                    </h2>

                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">M</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Metformin</h3>
                                    <p className="text-sm text-gray-500">500mg • After Breakfast</p>
                                </div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
                                {[1, 1, 1, 1, 1, 0, 0].map((taken, i) => (
                                    <div key={i} className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${taken ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">I</div>
                                <div>
                                    <h3 className="font-medium text-gray-800">Insulin Glargine</h3>
                                    <p className="text-sm text-gray-500">20 Units • Before Bed</p>
                                </div>
                            </div>
                            <div className="flex gap-1 sm:gap-2 w-full md:w-auto overflow-x-auto pb-1 scrollbar-none">
                                {[1, 1, 1, 1, 0, 0, 0].map((taken, i) => (
                                    <div key={i} className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${taken ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-200 text-gray-400'
                                        }`}>
                                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DiseaseTracking;
