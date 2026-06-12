import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText, Upload, Play, Pause,
    Brain, Search, ChevronRight,
    History, Download, Info, CheckCircle2, X,
    Eye, Camera, RotateCcw, AlertTriangle, TrendingUp, TrendingDown, Minus, Activity
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import type { LabResult } from '../../context/HealthContext';
import ImagingVisualizer from '../../components/clinical/ImagingVisualizer';

const MedicalReports = () => {
    const { healthData, syncReportData, setPrintData, addReport, updateReport } = useHealth();
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get('tab') === 'upload' ? 'upload' : 'timeline';
    
    const [activeTab, setActiveTab] = useState<'timeline' | 'upload'>(initialTab);
    const [selectedReportId, setSelectedReportId] = useState<string>(healthData.reports[0]?.id || '');
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    
    // Upload Simulation State
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [analysisStep, setAnalysisStep] = useState('');
    const [uploadComplete, setUploadComplete] = useState(false);

    // Camera/Scan State
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [isScanMode, setIsScanMode] = useState(false);

    const fileInput = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleDownloadReport = (report: any) => {
        setPrintData('labReport', report);
    };

    const reports = healthData.reports;

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadProgress(0);
        setUploadComplete(false);

        // Read file as base64 for preview
        const fileUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
        });

        // 1. Simulate Upload
        for (let i = 0; i <= 100; i += 5) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 50));
        }

        // 2. Simulate AI Analysis
        const steps = [
            'Verifying Digital Signature...',
            'Extracting Biomarkers...',
            'Contextualizing with Neural Grid...',
            'Generating Patient-Friendly Summary...'
        ];

        for (const step of steps) {
            setAnalysisStep(step);
            await new Promise(r => setTimeout(r, 1200));
        }

        // 3. Add to Record
        const newReport = {
            id: `REP-${Date.now()}`,
            title: file.name.split('.')[0].replace(/_/g, ' ') || 'New Analysis Report',
            date: new Date().toISOString().split('T')[0],
            type: (file.type.includes('image') ? 'Imaging' : 'Lab Report') as 'Imaging' | 'Lab Report',
            summary: 'AI Analysis Complete: The uploaded record has been successfully parsed and integrated into your health timeline. Markers are within normal variance.',
            aiInsights: [
                'Digital extraction verified.',
                'Institutional markers successfully synchronized.',
                'Ready for clinical review.'
            ],
            audioDuration: '1:05',
            fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            fileUrl: fileUrl,
            isSynced: false,
            extractedValues: [
                { marker: 'Analyzed Biomarker', value: 'Nominal', unit: '-', status: 'Normal' as const, trend: 'stable' as const },
                { marker: 'Secondary Metric', value: 'Elevated', unit: '-', status: 'High' as const, trend: 'up' as const }
            ],
            riskAlerts: [
                'Secondary metric is slightly elevated. Suggest clinical review.'
            ]
        };

        addReport(newReport);
        setIsUploading(false);
        setUploadComplete(true);
        setAnalysisStep('');
        
        // Auto switch to timeline to show new report
        setTimeout(() => {
            setActiveTab('timeline');
            setSelectedReportId(newReport.id);
            setUploadComplete(false);
        }, 1500);
    };

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' }, 
                audio: false 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setIsCameraOpen(true);
            setCapturedImage(null);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("Could not access camera. Please ensure you have given permission.");
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraOpen(false);
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Apply scanner effect if in scan mode
                if (isScanMode) {
                    context.filter = 'contrast(1.5) grayscale(100%) brightness(1.1)';
                }
                
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedImage(imageData);
                
                // Stop the stream once captured
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    setStream(null);
                }
            }
        }
    };

    const handleProcessScan = async () => {
        if (!capturedImage) return;

        setIsUploading(true);
        setUploadProgress(0);
        setUploadComplete(false);
        setIsCameraOpen(false);

        // Simulate Processing
        for (let i = 0; i <= 100; i += 10) {
            setUploadProgress(i);
            await new Promise(r => setTimeout(r, 60));
        }

        const steps = [
            'Enhancing Optical Legibility...',
            'Extracting Metadata...',
            'Verifying Clinical Markers...'
        ];

        for (const step of steps) {
            setAnalysisStep(step);
            await new Promise(r => setTimeout(r, 1000));
        }

        const newReport: any = {
            id: `REP-${Date.now()}`,
            title: `Scan Capture ${new Date().toLocaleDateString()}`,
            date: new Date().toISOString().split('T')[0],
            type: 'Imaging',
            summary: 'Institutional Scan Complete: Digital extraction successful. Markers integrated into health sink.',
            aiInsights: [
                'OCR extraction verified.',
                'Visual markers successfully synchronized.',
                'High-fidelity digital replica stored.'
            ],
            audioDuration: '1:10',
            fileSize: '1.2 MB',
            fileUrl: capturedImage,
            isSynced: false,
            extractedValues: [
                { marker: 'Optical Density', value: 'Clear', unit: '-', status: 'Normal', trend: 'stable' }
            ],
            riskAlerts: []
        };

        addReport(newReport);
        setIsUploading(false);
        setUploadComplete(true);
        setAnalysisStep('');
        
        setTimeout(() => {
            setActiveTab('timeline');
            setSelectedReportId(newReport.id);
            setUploadComplete(false);
            setCapturedImage(null);
        }, 1500);
    };

    const currentReport = reports.find(r => r.id === selectedReportId) || reports[0];

    if (!currentReport && reports.length === 0) {
        return (
            <div className="w-full flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="card-title">No Reports Available</h3>
                <p className="text-gray-400 mt-2">Initialize your medical record by uploading a report.</p>
                <button onClick={() => setActiveTab('upload')} className="mt-8 bg-primary-600 text-white px-8 py-3 rounded-xl font-medium">Upload Now</button>
            </div>
        );
    }

    return (
        <div className="w-full relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="page-title">Medical Reports</h1>
                    <p className="page-subtitle">Upload, manage, and understand your medical history with AI.</p>
                </div>
                <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`px-6 py-3 rounded-2xl font-medium transition-all shadow-sm active:scale-95 flex items-center gap-2 ${activeTab === 'timeline'
                            ? 'bg-primary-600 text-white shadow-primary-500/20'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                    >
                        <History className="w-4 h-4" />
                        Timeline View
                    </button>
                    <button
                        onClick={() => setActiveTab('upload')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all shadow-sm active:scale-95 ${activeTab === 'upload'
                            ? 'bg-primary-600 text-white shadow-primary-500/20'
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                    >
                        <Upload className="w-4 h-4" />
                        Upload New
                    </button>
                </div>
            </div>

            {/* Category Filter Bar */}
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
                {['All', 'Lab Report', 'Radiology Report', 'Imaging', 'Prescription', 'Discharge Summary', 'Vaccination Record', 'Insurance Document', 'Health Certificate'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2 rounded-full text-[10px] font-medium tracking-widest transition-all ${selectedCategory === cat
                            ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20'
                            : 'bg-white text-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {activeTab === 'upload' ? (
                        <div className="space-y-6">
                            <input
                                type="file"
                                ref={fileInput}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".pdf,.jpg,.png,.jpeg"
                            />
                            
                            {!isUploading && !uploadComplete ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-primary-100 text-center hover:border-primary-300 transition-all group"
                                >
                                    <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform shadow-inner">
                                        <Upload className="w-10 h-10 text-primary-600" />
                                    </div>
                                    <h3 className="section-title mb-2">Upload Clinical Artifacts</h3>
                                    <p className="text-gray-400 font-medium mb-10 max-w-sm mx-auto italic">
                                        Securely process your medical documents for institutional AI analysis. PDF, JPG, PNG supported.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <button 
                                            onClick={() => fileInput.current?.click()}
                                            className="bg-primary-600 text-white px-10 py-4 rounded-2xl font-medium hover:bg-primary-700 transition-all shadow-sm shadow-primary-500/20 active:scale-95 flex items-center gap-2"
                                        >
                                            <Upload className="w-5 h-5" />
                                            Select Laboratory Files
                                        </button>
                                        <button 
                                            onClick={startCamera}
                                            className="bg-white text-gray-700 border border-gray-50 px-10 py-4 rounded-2xl font-medium hover:bg-gray-50 transition-all shadow-sm active:scale-95 flex items-center gap-2"
                                        >
                                            <Camera className="w-5 h-5 text-primary-600" />
                                            Scan Document
                                        </button>
                                    </div>
                                </motion.div>
                            ) : isUploading ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white p-12 rounded-[2rem] border border-gray-100 text-center shadow-sm relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
                                        <motion.div 
                                            className="h-full bg-primary-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>

                                    <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-8 relative">
                                        <Brain className="w-10 h-10 text-primary-600 animate-pulse" />
                                        <motion.div 
                                            className="absolute inset-0 border-2 border-primary-500/30 rounded-2xl"
                                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>

                                    <h3 className="text-xl font-medium text-gray-800 mb-2">
                                        {uploadProgress < 100 ? 'Uploading Protocol...' : 'Neural Grid Analysis'}
                                    </h3>
                                    
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-sm font-medium text-gray-400 animate-pulse min-h-[20px]">
                                            {analysisStep || 'Negotiating secure handshake...'}
                                        </p>
                                        
                                        <div className="w-64 h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                                            <motion.div 
                                                className="h-full bg-primary-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]"
                                                animate={{ 
                                                    x: [-256, 256],
                                                }}
                                                transition={{ 
                                                    duration: 1.5, 
                                                    repeat: Infinity, 
                                                    ease: "linear" 
                                                }}
                                                style={{ width: '40%' }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-emerald-50 p-12 rounded-[2rem] border border-emerald-100 text-center"
                                >
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-medium text-emerald-900 mb-2">Analysis Synchronized</h3>
                                    <p className="text-emerald-600 font-medium mb-4 italic">
                                        The document has been fully parsed and added to your health timeline.
                                    </p>
                                    <p className="text-xs text-emerald-500/60 uppercase tracking-widest font-medium">
                                        Redirecting to timeline...
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8 relative before:absolute before:left-[27px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary-500/20 before:via-primary-500/10 before:to-transparent">
                            {reports
                                .filter(r => selectedCategory === 'All' || r.type === selectedCategory)
                                .map((report, index) => {
                                    const isImaging = report.type === 'Imaging';
                                    const accentColor = isImaging ? 'blue' : 'emerald';
                                    
                                    return (
                                        <motion.div
                                            key={report.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => setSelectedReportId(report.id)}
                                            className={`relative bg-white p-6 pl-16 rounded-3xl shadow-sm transition-all cursor-pointer group outline-none focus:outline-none active:outline-none ${selectedReportId === report.id
                                                ? `${accentColor === 'emerald' ? 'ring-4 ring-emerald-100 shadow-emerald-500/10' : 'ring-4 ring-blue-100 shadow-blue-500/10'} scale-[1.02] z-10 shadow-sm`
                                                : 'hover:shadow-sm'
                                                }`}
                                        >
                                            {/* Timeline Marker */}
                                            <div className="absolute left-[20px] top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
                                                <div className={`w-4 h-4 rounded-full border-2 transition-all ${selectedReportId === report.id ? `bg-${accentColor}-500 border-white scale-125 shadow-sm shadow-${accentColor}-500/30` : `bg-white border-${accentColor}-200 group-hover:border-${accentColor}-400`}`} />
                                            </div>

                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedReportId === report.id ? `bg-${accentColor}-100 text-${accentColor}-600` : 'bg-gray-50 text-gray-400'}`}>
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h3 className="card-title">{report.title}</h3>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className={`text-[10px] font-medium text-${accentColor}-500/70 uppercase tracking-widest leading-none`}>{report.type}</span>
                                                            <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest leading-none">{report.date}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ChevronRight className={`w-5 h-5 text-gray-300 transition-all ${selectedReportId === report.id ? `rotate-90 text-${accentColor}-500` : 'group-hover:translate-x-1'}`} />
                                            </div>

                                            <p className={`text-gray-500 text-sm font-medium leading-relaxed mb-4 line-clamp-2 italic border-l-2 border-${accentColor}-50 pl-4 py-1`}>
                                                "{report.summary}"
                                            </p>
                                            
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex items-center gap-5">
                                                    <span className="flex items-center gap-1.5 text-[9px] font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100/50">
                                                        <Brain className="w-3 h-3" />
                                                        AI Analyzed
                                                    </span>
                                                    <span className="text-[9px] font-medium text-gray-300 uppercase tracking-widest">{report.fileSize}</span>
                                                </div>
                                                
                                                {report.fileUrl && (
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedPreview(report.fileUrl || null);
                                                        }}
                                                        className="flex items-center gap-1.5 text-[9px] font-medium text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary-100 hover:bg-primary-100 transition-colors"
                                                    >
                                                        <Eye className="w-3 h-3" />
                                                        View Document
                                                    </button>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                {/* AI Analysis Sidebar */}
                <div className="lg:col-span-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedReportId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden sticky top-32 group"
                        >
                            <div className="bg-primary-600 p-8 pb-10 text-white relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                                    <Brain className="w-24 h-24" />
                                </div>
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                                        <Brain className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-medium text-lg tracking-tight">AI Summary</h3>
                                </div>
                                <p className="text-primary-50 font-medium text-sm leading-relaxed relative z-10 opacity-90">
                                    Simplifying complex medical terms into plain language for you.
                                </p>
                            </div>

                            <div className="p-8 -mt-6 bg-white rounded-t-[2rem] relative z-20">
                                {currentReport && (
                                    <>
                                        {/* Voice Explanation */}
                                        <div className="bg-gray-50 rounded-2xl p-5 mb-8">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">Audio Explanation</span>
                                                <span className="text-xs font-medium text-gray-300 uppercase tracking-widest">
                                                    {currentReport.audioDuration || '0:00'}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all active:scale-90 shadow-sm ${isPlaying ? 'bg-primary-500 shadow-primary-500/20' : 'bg-primary-600 shadow-primary-600/30'}`}
                                                >
                                                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 pl-1" />}
                                                </button>
                                                <div className="flex-1 space-y-1">
                                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                        <motion.div 
                                                            initial={{ width: 0 }}
                                                            animate={{ width: isPlaying ? '100%' : '30%' }}
                                                            transition={{ duration: isPlaying ? 45 : 1, ease: 'linear' }}
                                                            className="h-full bg-primary-500 shadow-[0_0_8px_rgba(20,184,166,0.5)]" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Health Score */}
                                        {currentReport.healthScore && (
                                            <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8 flex items-center gap-6 shadow-sm">
                                                <div className="relative w-16 h-16 flex items-center justify-center">
                                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                                        <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                        <path className={`${currentReport.healthScore.score > 80 ? 'text-emerald-500' : currentReport.healthScore.score > 60 ? 'text-amber-500' : 'text-rose-500'}`} strokeDasharray={`${currentReport.healthScore.score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                                        <span className="text-lg font-medium text-gray-800 leading-none">{currentReport.healthScore.score}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-800 tracking-tight">Report Health Score</h4>
                                                    <span className={`text-xs font-medium uppercase tracking-widest px-2 py-0.5 rounded mt-1 inline-block ${
                                                        currentReport.healthScore.score > 80 ? 'bg-emerald-50 text-emerald-600' : 
                                                        currentReport.healthScore.score > 60 ? 'bg-amber-50 text-amber-600' : 
                                                        'bg-rose-50 text-rose-600'
                                                    }`}>{currentReport.healthScore.assessment}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Risk Alerts */}
                                        {currentReport.riskAlerts && currentReport.riskAlerts.length > 0 && (
                                            <div className="bg-rose-50/80 border border-rose-100 rounded-2xl p-5 mb-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
                                                    <h4 className="font-medium text-sm uppercase tracking-widest text-rose-800">Critical Alerts</h4>
                                                </div>
                                                <div className="space-y-3">
                                                    {currentReport.riskAlerts.map((alert: string, i: number) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                                            <p className="text-xs font-medium text-rose-700 leading-relaxed">{alert}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Recommendations */}
                                        {currentReport.recommendations && currentReport.recommendations.length > 0 && (
                                            <div className="bg-primary-50/50 border border-primary-100 rounded-2xl p-5 mb-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <CheckCircle2 className="w-4 h-4 text-primary-500" />
                                                    <h4 className="font-medium text-sm uppercase tracking-widest text-primary-800">Doctor-Approved Recommendations</h4>
                                                </div>
                                                <div className="space-y-3">
                                                    {currentReport.recommendations.map((rec: string, i: number) => (
                                                        <div key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-primary-50/50 shadow-sm">
                                                            <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-medium">
                                                                {i + 1}
                                                            </div>
                                                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{rec}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Extracted Values */}
                                        {currentReport.extractedValues && currentReport.extractedValues.length > 0 && (
                                            <div className="mb-8">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <Activity className="w-4 h-4 text-primary-600" />
                                                    <h4 className="font-medium text-sm uppercase tracking-widest text-gray-800">Extracted Markers</h4>
                                                </div>
                                                <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50">
                                                    {currentReport.extractedValues.map((val: any, i: number) => {
                                                        const isAbnormal = val.status !== 'Normal';
                                                        const colorMap: Record<string, any> = {
                                                            'Critical': { text: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: 'text-rose-500' },
                                                            'High': { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: 'text-amber-500' },
                                                            'Low': { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100', icon: 'text-blue-500' },
                                                            'Normal': { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', icon: 'text-emerald-500' },
                                                        };
                                                        const colors = colorMap[val.status] || colorMap['Normal'];
                                                        
                                                        return (
                                                            <div key={i} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                                                                <div>
                                                                    <p className="text-xl font-normal text-gray-700">{val.marker}</p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <span className={`text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded ${colors.text} ${colors.bg} ${colors.border} border`}>
                                                                            {val.status}
                                                                        </span>
                                                                        {val.previousValue && (
                                                                            <span className="text-[10px] text-gray-400 font-medium tracking-tight">Prev: {val.previousValue}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <div className="text-right">
                                                                        <span className={`text-base font-medium ${isAbnormal ? colors.text : 'text-gray-700'}`}>{val.value}</span>
                                                                        <span className="text-xs text-gray-400 ml-1">{val.unit}</span>
                                                                    </div>
                                                                    {val.trend === 'up' && <TrendingUp className={`w-4 h-4 ${colors.icon}`} />}
                                                                    {val.trend === 'down' && <TrendingDown className={`w-4 h-4 ${colors.icon}`} />}
                                                                    {val.trend === 'stable' && <Minus className="w-4 h-4 text-gray-300" />}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Key Insights */}
                                        <div className="flex items-center gap-2 mb-6">
                                            <Search className="w-4 h-4 text-primary-600" />
                                            <h4 className="font-medium text-sm uppercase tracking-widest text-gray-800">Key Insights</h4>
                                        </div>
                                        
                                        <div className="space-y-3 mb-10">
                                            {currentReport.aiInsights.map((insight, i) => (
                                                <motion.div 
                                                    key={i} 
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 + i * 0.1 }}
                                                    className="flex items-start gap-4 text-xs font-medium text-gray-600 bg-primary-100/30 p-4 rounded-2xl hover:bg-primary-50 transition-colors"
                                                >
                                                    <div className="w-2 h-2 rounded-full bg-primary-500 mt-1 shrink-0 shadow-sm shadow-primary-500/50" />
                                                    {insight}
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="space-y-4 mb-4">
                                            <button 
                                                onClick={() => {
                                                    setIsSyncing(true);
                                                    setTimeout(() => {
                                                        const mockResults: LabResult[] = [
                                                            { id: Date.now().toString(), marker: 'Hemoglobin', value: '13.2', unit: 'g/dL', date: new Date().toLocaleDateString(), status: 'Normal' },
                                                            { id: (Date.now()+1).toString(), marker: 'Vitamin D', value: 'Suffice', unit: 'ng/ml', date: new Date().toLocaleDateString(), status: 'Normal' }
                                                        ];
                                                        syncReportData(mockResults);
                                                        updateReport(selectedReportId, { isSynced: true });
                                                        setIsSyncing(false);
                                                    }, 1500);
                                                }}
                                                disabled={currentReport.isSynced || isSyncing}
                                                className={`w-full py-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm ${
                                                    currentReport.isSynced
                                                        ? 'bg-emerald-100/50 text-emerald-700 cursor-default' 
                                                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/20'
                                                }`}
                                            >
                                                {isSyncing ? (
                                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                                        <Brain className="w-5 h-5" />
                                                    </motion.div>
                                                ) : currentReport.isSynced ? (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Synced to Health Identity
                                                    </>
                                                ) : (
                                                    <>
                                                        <Brain className="w-5 h-5" />
                                                        Sync to Health Identity
                                                    </>
                                                )}
                                            </button>

                                            <div className="bg-amber-50/50 p-5 rounded-2xl border border-transparent">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Info className="w-4 h-4 text-amber-600" />
                                                    <span className="text-[10px] font-medium text-amber-700 uppercase tracking-widest">Clinical AI Disclosure</span>
                                                </div>
                                                <p className="text-[10px] font-medium text-amber-600/80 leading-relaxed">
                                                    These AI-generated insights are a support tool and do not replace professional medical judgment. 
                                                </p>
                                            </div>

                                            <button 
                                                onClick={() => handleDownloadReport(currentReport)}
                                                className="w-full py-4 rounded-2xl bg-gray-50 text-gray-500 font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2 active:scale-95"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download Official Report
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {selectedPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
                        onClick={() => setSelectedPreview(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] shadow-sm w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
                                {currentReport?.type === 'Imaging' ? (
                                    <ImagingVisualizer report={currentReport} />
                                ) : (
                                    <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
                                        {selectedPreview.startsWith('data:application/pdf') ? (
                                            <embed
                                                src={selectedPreview}
                                                type="application/pdf"
                                                className="w-full h-full min-h-[70vh] rounded-xl shadow-inner scrollbar-none"
                                            />
                                        ) : (
                                            <img
                                                src={selectedPreview}
                                                alt="Report Preview"
                                                className="max-w-full h-auto rounded-xl shadow-sm border border-gray-50"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
                                <p className="text-xs text-gray-400 font-medium italic">
                                    Secure local vault storage verified.
                                </p>
                                <button
                                    onClick={() => setSelectedPreview(null)}
                                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-all active:scale-95"
                                >
                                    Close Preview
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Camera Capture Modal */}
            <AnimatePresence>
                {isCameraOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2.5rem] shadow-sm w-full max-w-2xl overflow-hidden flex flex-col relative"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                                        <Camera className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-lg text-gray-800 leading-tight">Document Scanner</h3>
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">Physical to Digital Protocol</p>
                                    </div>
                                </div>
                                <button
                                    onClick={stopCamera}
                                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 bg-black relative min-h-[400px] flex items-center justify-center overflow-hidden">
                                {!capturedImage ? (
                                    <>
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className={`w-full h-full object-cover ${isScanMode ? 'grayscale contrast-125 hover:contrast-150' : ''}`}
                                        />
                                        {/* Scanner Grid Overlay */}
                                        <div className="absolute inset-0 pointer-events-none border-[30px] border-black/40">
                                            <div className="w-full h-full border border-white/30 relative">
                                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500" />
                                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500" />
                                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500" />
                                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500" />
                                                
                                                {/* Scanning Line Animation */}
                                                {isScanMode && (
                                                    <motion.div 
                                                        className="absolute left-0 right-0 h-[2px] bg-primary-500 shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                                                        animate={{ top: ['0%', '100%', '0%'] }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <img
                                        src={capturedImage}
                                        alt="Captured Scan"
                                        className="w-full h-full object-contain bg-gray-900"
                                    />
                                )}
                            </div>

                            <div className="p-8 bg-white border-t border-gray-100">
                                {!capturedImage ? (
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={() => setIsScanMode(!isScanMode)}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                                                isScanMode 
                                                    ? 'bg-primary-600 text-white shadow-sm shadow-primary-500/20' 
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200 font-medium uppercase tracking-widest'
                                            }`}
                                        >
                                            <Brain className="w-4 h-4" />
                                            Scan Mode: {isScanMode ? 'ON' : 'OFF'}
                                        </button>
                                        
                                        <button
                                            onClick={capturePhoto}
                                            className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-sm shadow-primary-500/30 hover:scale-110 active:scale-95 transition-all border-4 border-white"
                                        >
                                            <Camera className="w-8 h-8" />
                                        </button>

                                        <div className="w-[124px]" /> {/* Spacer for symmetry */}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => {
                                                setCapturedImage(null);
                                                startCamera();
                                            }}
                                            className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            Retake
                                        </button>
                                        <button
                                            onClick={handleProcessScan}
                                            className="flex-2 py-4 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-all shadow-sm shadow-primary-500/20 flex items-center justify-center gap-3 px-10"
                                        >
                                            <Brain className="w-5 h-5" />
                                            Process as Record
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export default MedicalReports;
