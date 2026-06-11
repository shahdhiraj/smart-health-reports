import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ZoomIn, ZoomOut, Layers,
    Activity, Brain, 
    Crosshair, MousePointer2, RefreshCcw
} from 'lucide-react';

interface ImagingVisualizerProps {
    report: any;
}

const ImagingVisualizer: React.FC<ImagingVisualizerProps> = ({ report }) => {
    const [zoom, setZoom] = useState(1);
    const [showOverlay, setShowOverlay] = useState(true);
    const [activeTool, setActiveTool] = useState<'pan' | 'measure'>('pan');

    // AI Overlay Definitions
    const renderOverlay = () => {
        if (!showOverlay) return null;

        if (report.id === 'REP-002') { // Lumbar MRI
            return (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <motion.ellipse 
                        cx="50" cy="55" rx="8" ry="12"
                        className="stroke-primary-500 fill-primary-500/20 stroke-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ filter: 'drop-shadow(0 0 5px rgba(20, 184, 166, 0.5))' }}
                    />
                    <foreignObject x="60" y="50" width="40" height="20">
                        <div className="bg-primary-900/80 backdrop-blur-md px-2 py-1 rounded text-[4px] text-white border border-primary-500/30">
                            <p className="font-bold">L4-L5 SPONDYLOSIS</p>
                            <p className="opacity-70">Mild bilateral bulging noted</p>
                        </div>
                    </foreignObject>
                </svg>
            );
        }

        if (report.id === 'REP-003') { // Chest X-Ray
            return (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <motion.path 
                        d="M30 30 Q 20 50 35 80"
                        className="stroke-emerald-500 fill-none stroke-[0.5]"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <motion.path 
                        d="M70 30 Q 80 50 65 80"
                        className="stroke-emerald-500 fill-none stroke-[0.5]"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    />
                    <motion.ellipse 
                        cx="48" cy="62" rx="10" ry="12"
                        className="stroke-blue-400 fill-blue-500/10 stroke-[0.5]"
                        style={{ filter: 'blur(1px)' }}
                    />
                    <foreignObject x="10" y="20" width="30" height="10">
                        <div className="bg-emerald-900/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[3px] text-emerald-100 flex items-center gap-1">
                            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                            LUNG FIELDS: CLEAR
                        </div>
                    </foreignObject>
                    <foreignObject x="55" y="65" width="35" height="10">
                        <div className="bg-blue-900/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[3px] text-blue-100 flex items-center gap-1">
                            <Activity className="w-1 h-1 text-blue-400" />
                            CARDIAC SILHOUETTE: NORMAL
                        </div>
                    </foreignObject>
                </svg>
            );
        }

        if (report.id === 'REP-004') { // Knee X-Ray
            return (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <motion.rect 
                        x="40" y="45" width="20" height="10"
                        className="stroke-amber-500 fill-amber-500/10 stroke-[0.2]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                    <foreignObject x="65" y="47" width="30" height="10">
                        <div className="bg-amber-900/80 backdrop-blur-md px-2 py-1 rounded text-[3px] text-amber-100 border border-amber-500/30">
                            JOINT SPACE: PRESERVED
                        </div>
                    </foreignObject>
                </svg>
            );
        }

        if (report.id === 'REP-005') { // Dental X-Ray
            return (
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <motion.circle 
                        cx="25" cy="60" r="5"
                        className="stroke-emerald-400 fill-emerald-500/10 stroke-[0.1]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                    <motion.circle 
                        cx="75" cy="60" r="5"
                        className="stroke-emerald-400 fill-emerald-500/10 stroke-[0.1]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    />
                    <foreignObject x="35" y="70" width="30" height="10">
                        <div className="bg-emerald-900/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[3px] text-emerald-100 text-center">
                            DENTAL ALIGNMENT: NORMAL
                        </div>
                    </foreignObject>
                </svg>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0f] overflow-hidden select-none">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/5 bg-black/40 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg">
                        <button 
                            onClick={() => setActiveTool('pan')}
                            className={`p-2 rounded-md transition-all ${activeTool === 'pan' ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            <MousePointer2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setActiveTool('measure')}
                            className={`p-2 rounded-md transition-all ${activeTool === 'measure' ? 'bg-primary-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            <Crosshair className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-2" />

                    <div className="flex items-center gap-1">
                        <button 
                            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] font-bold text-gray-500 w-12 text-center uppercase tracking-widest">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button 
                            onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
                            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => setShowOverlay(!showOverlay)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${showOverlay ? 'bg-primary-500/10 text-primary-500 border border-primary-500/20' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                    >
                        <Brain className={`w-3 h-3 ${showOverlay ? 'animate-pulse' : ''}`} />
                        AI Analysis Overlay
                    </button>
                    <button 
                         onClick={() => {
                             setZoom(1);
                             setShowOverlay(true);
                         }}
                         className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
                         title="Reset View"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Viewport */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <motion.div 
                    className="relative cursor-grab active:cursor-grabbing"
                    drag={activeTool === 'pan'}
                    dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                    style={{ scale: zoom }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <img 
                        src={report.fileUrl} 
                        alt="Clinical Imaging"
                        className="max-h-[70vh] w-auto rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-none"
                        style={{ filter: 'contrast(1.1) brightness(1.05)' }}
                    />
                    
                    <AnimatePresence>
                        {renderOverlay()}
                    </AnimatePresence>

                    {/* Measurement Simulation Tools */}
                    {activeTool === 'measure' && (
                        <div className="absolute inset-0 z-50">
                             <svg className="w-full h-full cursor-crosshair">
                                 {/* Example measurement line */}
                                 <line x1="20" y1="20" x2="80" y2="20" className="stroke-primary-500 stroke-[0.2] stroke-dash-2" />
                             </svg>
                        </div>
                    )}
                </motion.div>

                {/* Perspective Badge */}
                <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/5">
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em]">Imaging Perspective</p>
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">{report.title}</p>
                    </div>
                </div>

                {/* Exposure Info */}
                <div className="absolute bottom-6 right-6 text-right">
                    <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-lg border border-white/5 mb-2">
                        <p className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.3em]">Capture Scale</p>
                        <p className="text-[10px] font-bold text-white uppercase tracking-widest">1.0mm : 1.0px</p>
                    </div>
                    <div className="flex items-center gap-2 justify-end opacity-40">
                        <Layers className="w-3 h-3 text-white" />
                        <span className="text-[8px] font-bold text-white uppercase tracking-widest">Level: Institutional</span>
                    </div>
                </div>
            </div>

            {/* Insights Footer */}
            <div className="h-16 border-t border-white/5 bg-black/40 backdrop-blur-xl flex items-center px-8 gap-10 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-3 shrink-0">
                    <Activity className="w-4 h-4 text-primary-500" />
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Diagnostic Stream</span>
                </div>
                <div className="flex items-center gap-6">
                    {report.aiInsights?.map((insight: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 shrink-0">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full shadow-[0_0_5px_rgba(20,184,166,0.5)]" />
                            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest leading-none">{insight}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImagingVisualizer;
