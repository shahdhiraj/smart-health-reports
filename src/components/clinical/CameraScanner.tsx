import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, RotateCcw, Brain, CameraOff } from 'lucide-react';

interface CameraScannerProps {
    isOpen: boolean;
    onClose: () => void;
    onCapture: (imageData: string) => void;
    title?: string;
    subtitle?: string;
    scanModeLabel?: string;
}

const CameraScanner = ({ 
    isOpen, 
    onClose, 
    onCapture, 
    title = "Document Scanner", 
    subtitle = "Physical to Digital Protocol",
    scanModeLabel = "Scan Mode"
}: CameraScannerProps) => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isScanMode, setIsScanMode] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        setCameraError(null);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' }, 
                audio: false 
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
            setCapturedImage(null);
        } catch (err: any) {
            console.error("Error accessing camera:", err);
            setCameraError(err.name === 'NotFoundError' ? 'No camera device detected.' : 'Camera access denied.');
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [isOpen]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            
            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                if (isScanMode) {
                    context.filter = 'contrast(1.5) grayscale(100%) brightness(1.1)';
                }
                
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/jpeg', 0.8);
                setCapturedImage(imageData);
                stopCamera();
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-gray-900/90 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                                    <Camera className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800 leading-tight">{title}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{subtitle}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 bg-black relative min-h-[400px] flex items-center justify-center overflow-hidden">
                            {cameraError && !capturedImage && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-gray-900">
                                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                                        <CameraOff className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h4 className="text-white font-medium mb-1">{cameraError}</h4>
                                    <p className="text-gray-500 text-xs max-w-[240px]">We couldn't connect to your camera. You can still test the AI processing using a simulated capture.</p>
                                    <button 
                                        onClick={() => {
                                            setCapturedImage('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1000&auto=format&fit=crop');
                                            setCameraError(null);
                                        }}
                                        className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                                    >
                                        Simulate Medicine Scan
                                    </button>
                                </div>
                            )}
                            {!capturedImage ? (
                                <>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        className={`w-full h-full object-cover ${isScanMode ? 'grayscale contrast-125' : ''}`}
                                    />
                                    <div className="absolute inset-0 pointer-events-none border-[30px] border-black/40">
                                        <div className="w-full h-full border border-white/30 relative">
                                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500" />
                                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500" />
                                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500" />
                                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500" />
                                            
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
                                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 uppercase tracking-widest font-bold'
                                        }`}
                                    >
                                        <Brain className="w-4 h-4" />
                                        {scanModeLabel}: {isScanMode ? 'ON' : 'OFF'}
                                    </button>
                                    
                                    <button
                                        onClick={capturePhoto}
                                        disabled={!!cameraError}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl transition-all border-4 border-white ${
                                            cameraError ? 'bg-gray-200 shadow-none cursor-not-allowed' : 'bg-primary-600 shadow-primary-500/30 hover:scale-110 active:scale-95'
                                        }`}
                                    >
                                        <Camera className="w-8 h-8" />
                                    </button>

                                    <div className="w-[124px]" />
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
                                        onClick={() => capturedImage && onCapture(capturedImage)}
                                        className="flex-2 py-4 bg-primary-600 text-white rounded-2xl font-medium hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-3 px-10"
                                    >
                                        <Brain className="w-5 h-5" />
                                        Process Capture
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </AnimatePresence>
    );
};

export default CameraScanner;
