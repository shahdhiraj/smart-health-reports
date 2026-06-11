import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, FileSearch, CheckCircle2, AlertTriangle, Maximize2, RotateCcw, BrainCircuit } from 'lucide-react';
import { Card } from '../../components/ui/Card';

interface ScanData {
    id: string;
    patientName: string;
    type: string;
    date: string;
    image: string;
    anomalies: Array<{
        id: string;
        label: string;
        severity: 'high' | 'medium' | 'low';
        x: number; // percentage
        y: number;
        w: number;
        h: number;
        desc: string;
    }>;
}

const mockScans: ScanData[] = [
    {
        id: 'SCN-001',
        patientName: 'Emma Thompson',
        type: 'Chest X-Ray',
        date: '2026-06-11',
        image: '/assets/imaging/chest-xray.png',
        anomalies: [
            { id: 'A1', label: 'Consolidation', severity: 'high', x: 25, y: 40, w: 20, h: 25, desc: 'Patchy opacity in the right lower lobe, indicative of potential pneumonia.' },
            { id: 'A2', label: 'Pleural Effusion', severity: 'medium', x: 65, y: 65, w: 15, h: 15, desc: 'Blunting of the left costophrenic angle.' }
        ]
    },
    {
        id: 'SCN-002',
        patientName: 'Michael Chen',
        type: 'Lumbar MRI',
        date: '2026-06-10',
        image: '/assets/imaging/lumbar-mri.png',
        anomalies: [
            { id: 'A3', label: 'L4-L5 Disc Herniation', severity: 'high', x: 40, y: 55, w: 20, h: 10, desc: 'Posterior disc extrusion compressing the descending nerve root.' }
        ]
    },
    {
        id: 'SCN-003',
        patientName: 'Sarah Jenkins',
        type: 'Knee X-Ray',
        date: '2026-06-08',
        image: '/assets/imaging/knee-xray.png',
        anomalies: [
            { id: 'A4', label: 'Joint Space Narrowing', severity: 'medium', x: 30, y: 45, w: 40, h: 10, desc: 'Medial compartment joint space narrowing, mild osteoarthritis.' }
        ]
    }
];

const ImagingStudio = () => {
    const [selectedScan, setSelectedScan] = useState<ScanData>(mockScans[0]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanComplete, setScanComplete] = useState(false);
    const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);

    const handleAnalyze = () => {
        setIsScanning(true);
        setScanComplete(false);
        setSelectedAnomaly(null);
        
        setTimeout(() => {
            setIsScanning(false);
            setScanComplete(true);
        }, 3000); // 3 second scan
    };

    const handleSelectScan = (scan: ScanData) => {
        setSelectedScan(scan);
        setIsScanning(false);
        setScanComplete(false);
        setSelectedAnomaly(null);
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Sidebar: Scan List */}
            <div className="w-80 flex flex-col gap-4">
                <div className="mb-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Imaging Studio</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Select a scan to analyze.</p>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                    {mockScans.map(scan => (
                        <Card 
                            key={scan.id}
                            className={`p-4 cursor-pointer transition-all border-2 ${selectedScan.id === scan.id ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-900/10' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-700'}`}
                            onClick={() => handleSelectScan(scan)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-2 py-0.5 rounded uppercase tracking-wider">{scan.id}</span>
                                <span className="text-xs text-slate-400">{scan.date}</span>
                            </div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">{scan.patientName}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                                <Scan className="w-3.5 h-3.5" />
                                {scan.type}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Middle: Image Viewer */}
            <div className="flex-1 flex flex-col bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-800">
                {/* Toolbar */}
                <div className="h-14 bg-slate-800/80 backdrop-blur-md border-b border-slate-700 flex items-center justify-between px-6 z-20">
                    <div className="flex items-center gap-4">
                        <span className="text-slate-300 font-medium">{selectedScan.type}</span>
                        <span className="text-slate-500 text-sm">|</span>
                        <span className="text-slate-400 text-sm">{selectedScan.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors" title="Zoom">
                            <Maximize2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors" title="Reset View">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        {!scanComplete && !isScanning && (
                            <button 
                                onClick={handleAnalyze}
                                className="ml-4 flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-primary-500/20"
                            >
                                <BrainCircuit className="w-4 h-4" />
                                AI Analyze
                            </button>
                        )}
                        {isScanning && (
                            <div className="ml-4 flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-1.5 rounded-lg text-sm font-medium border border-amber-500/30">
                                <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                                Scanning...
                            </div>
                        )}
                    </div>
                </div>

                {/* Image Area */}
                <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden p-8">
                    <div className="relative max-h-full max-w-full">
                        {/* The Medical Image */}
                        <img 
                            src={selectedScan.image} 
                            alt={selectedScan.type} 
                            className="max-h-full max-w-full object-contain filter grayscale contrast-125"
                        />
                        
                        {/* Scanning Laser Animation */}
                        <AnimatePresence>
                            {isScanning && (
                                <motion.div 
                                    initial={{ top: '0%' }}
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 3, ease: "linear" }}
                                    className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-10"
                                />
                            )}
                        </AnimatePresence>

                        {/* Bounding Boxes */}
                        <AnimatePresence>
                            {scanComplete && selectedScan.anomalies.map(anomaly => (
                                <motion.div
                                    key={anomaly.id}
                                    initial={{ opacity: 0, scale: 1.2 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`absolute border-2 cursor-pointer transition-all z-20 ${selectedAnomaly === anomaly.id ? 'border-primary-400 bg-primary-500/20 z-30 ring-4 ring-primary-500/30' : anomaly.severity === 'high' ? 'border-rose-500 bg-rose-500/10' : 'border-amber-500 bg-amber-500/10'}`}
                                    style={{
                                        left: `${anomaly.x}%`,
                                        top: `${anomaly.y}%`,
                                        width: `${anomaly.w}%`,
                                        height: `${anomaly.h}%`,
                                    }}
                                    onClick={() => setSelectedAnomaly(anomaly.id)}
                                >
                                    {/* Crosshairs */}
                                    <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-inherit" />
                                    <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-inherit" />
                                    <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-inherit" />
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-inherit" />
                                    
                                    {/* Label Badge */}
                                    <div className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap rounded shadow-lg backdrop-blur-md ${anomaly.severity === 'high' ? 'bg-rose-500/90' : 'bg-amber-500/90'}`}>
                                        {anomaly.id} - {(Math.random() * 15 + 80).toFixed(1)}%
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: AI Report Panel */}
            <AnimatePresence mode="wait">
                {scanComplete ? (
                    <motion.div 
                        key="report"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-80 flex flex-col gap-4"
                    >
                        <Card className="flex-1 p-5 flex flex-col border-primary-100 dark:border-primary-900/50">
                            <div className="flex items-center gap-2 mb-6 text-primary-600 dark:text-primary-400">
                                <FileSearch className="w-5 h-5" />
                                <h2 className="font-bold text-lg">AI Radiologist Report</h2>
                            </div>
                            
                            <div className="space-y-6 flex-1 overflow-y-auto pr-2 scrollbar-thin">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Detected Anomalies</h3>
                                    <div className="space-y-3">
                                        {selectedScan.anomalies.map(anomaly => (
                                            <div 
                                                key={anomaly.id}
                                                className={`p-3 rounded-xl border transition-all cursor-pointer ${selectedAnomaly === anomaly.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'}`}
                                                onClick={() => setSelectedAnomaly(anomaly.id)}
                                            >
                                                <div className="flex items-center gap-2 mb-1">
                                                    {anomaly.severity === 'high' ? (
                                                        <AlertTriangle className="w-4 h-4 text-rose-500" />
                                                    ) : (
                                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                    )}
                                                    <span className="font-semibold text-sm text-slate-900 dark:text-white">{anomaly.label}</span>
                                                </div>
                                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                                    {anomaly.desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                                        <CheckCircle2 className="w-4 h-4" /> AI Impression
                                    </h3>
                                    <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                                        Automated analysis highlights {selectedScan.anomalies.length} areas of concern. Clinical correlation and specialist review recommended to confirm findings before patient consultation.
                                    </p>
                                </div>
                            </div>

                            <button className="mt-4 w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-100 dark:text-slate-900 text-white font-semibold py-2.5 rounded-xl transition-colors">
                                Append to Patient Chart
                            </button>
                        </Card>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-80 flex flex-col"
                    >
                        <Card className="flex-1 flex flex-col items-center justify-center p-8 text-center border-dashed border-2 bg-slate-50 dark:bg-slate-800/50">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 text-slate-400">
                                <BrainCircuit className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Ready for Analysis</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Click "AI Analyze" in the viewer to run the neural network over this image.</p>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ImagingStudio;
