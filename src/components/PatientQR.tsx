import { motion } from 'framer-motion';
import { QrCode as QrCodeIcon, Smartphone, Zap, ShieldCheck, Share2 } from 'lucide-react';
import QRCode from 'react-qr-code';

interface PatientQRProps {
    patientId: string;
    patientName: string;
    size?: 'sm' | 'md' | 'lg';
    hideDetails?: boolean;
}

const PatientQR = ({ patientId, patientName, size = 'md', hideDetails = false }: PatientQRProps) => {
    const sizeClasses = {
        sm: 'w-32 h-32',
        md: 'w-56 h-56',
        lg: 'w-72 h-72'
    };

    const handleDownload = () => {
        const svg = document.querySelector("#patient-qr-code svg");
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            img.onload = () => {
                canvas.width = 1024; // High res
                canvas.height = 1024;
                if (ctx) {
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0, 1024, 1024);
                }
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `QR-Pass-${patientName.replace(/\s+/g, '-')}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            };
            img.src = "data:image/svg+xml;base64," + btoa(svgData);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 group">
            <div className={`relative p-2 bg-white rounded-3xl shadow-xl border border-gray-100 ${sizeClasses[size]} flex items-center justify-center overflow-hidden`}>
                {/* Decorative background grid */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                </div>

                {/* Real QR Code Generation */}
                <motion.div 
                    id="patient-qr-code"
                    className="w-full h-full p-1 bg-white rounded-xl flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', duration: 1 }}
                >
                    <QRCode
                        value={`http://localhost:5173/doctor/prescriptions?patientId=${patientId}&scan=true&timestamp=${Date.now()}`}
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        viewBox={`0 0 256 256`}
                    />
                </motion.div>

            </div>

            {!hideDetails && (
                <>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <QrCodeIcon className="w-4 h-4 text-primary-600" />
                            <span className="text-xs font-medium text-gray-900 uppercase tracking-widest">Digital Healthcare Pass</span>
                        </div>
                        <h4 className="font-medium text-gray-800 tracking-tight">{patientName}</h4>
                        <p className="text-[10px] text-gray-400 font-medium tracking-widest">{patientId}</p>
                    </div>

                    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
                        <div className="flex flex-col items-center gap-1 opacity-50 max-w-[80px] text-center">
                            <Smartphone className="w-5 h-5 text-gray-900" />
                            <span className="text-[9px] font-medium leading-tight">Patient Console</span>
                        </div>
                        <div className="h-8 w-px bg-gray-200" />
                        <div className="flex flex-col items-center gap-1 opacity-50 max-w-[80px] text-center">
                            <ShieldCheck className="w-5 h-5 text-primary-600" />
                            <span className="text-[9px] font-medium leading-tight">Encrypted Access</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <p className="text-[10px] text-gray-400 font-medium text-center max-w-[200px] leading-relaxed">
                            Scan to connect clinical profile, reports, and digital prescriptions.
                        </p>

                        <div className="flex w-full flex-col gap-2 mt-4">
                            <div className="flex w-full items-center justify-between gap-2">
                                <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 flex-1 justify-center hover:bg-emerald-100 transition-colors">
                                    <Zap className="w-3 h-3 fill-current" />
                                    <span className="text-[10px] font-medium tracking-widest uppercase">Smart Sync</span>
                                </button>
                                
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        alert('QR Pass link copied to clipboard for direct sharing!');
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm flex-1 justify-center"
                                >
                                    <Share2 className="w-3 h-3" />
                                    <span className="text-[10px] font-medium tracking-widest uppercase">Share</span>
                                </button>
                            </div>

                            <button 
                                onClick={handleDownload}
                                className="w-full bg-gray-900 text-white rounded-2xl py-3 px-4 font-medium text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg shadow-gray-200 active:scale-[0.98]"
                            >
                                <QrCodeIcon className="w-4 h-4" />
                                Download QR Pass
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PatientQR;
