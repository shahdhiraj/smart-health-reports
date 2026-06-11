import React from 'react';
import { Stethoscope, Building2, MapPin, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface PrintableFormProps {
    data: any;
    type: 'prescription' | 'labReport' | 'tracking' | 'dietPlan';
    patientInfo: {
        fullName: string;
        nationalId: string;
        dob: string;
        bloodGroup: string;
        gender?: string;
    };
}

const PrintableForm: React.FC<PrintableFormProps> = ({ data, type, patientInfo }) => {
    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="medical-form-container bg-white font-sans text-gray-900 min-h-[1100px] p-12 max-w-[900px] mx-auto relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <Stethoscope className="w-[600px] h-[600px] -rotate-12" />
            </div>

            {/* Header Section */}
            <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="flex gap-6">
                    <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                        <Stethoscope className="w-9 h-9" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-none mb-2">
                            {data.doctorName || 'Dr. Sarah Smith'}
                        </h1>
                        <p className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">
                            {data.doctorSpecialty || 'SENIOR CARDIOLOGIST'} • MBBS, MD (CARDIOLOGY)
                        </p>
                        <div className="flex items-center gap-6 text-[9px] font-semibold text-gray-400 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <Building2 className="w-3 h-3" /> DEPT. OF CARDIOLOGY
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" /> ROOM 402, BLOCK B
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* QR Verification */}
                <div className="bg-white p-3 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
                    <QRCodeSVG 
                        value={`RX-VERIFY-${data.id || 'TEMP'}`} 
                        size={80} 
                        level="H" 
                        includeMargin={false}
                    />
                    <div className="mt-2 text-[8px] font-bold text-gray-300 uppercase tracking-tighter">Verified Digital Record</div>
                </div>
            </div>

            <div className="h-[2px] bg-primary-600/20 mb-8 rounded-full" />

            {/* Patient Identity Record */}
            <div className="grid grid-cols-3 gap-1 mb-12 relative z-10">
                <div className="bg-gray-50/80 p-6 rounded-l-[32px] border-y border-l border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Subject Name</p>
                    <h2 className="text-xl font-bold text-gray-900">{patientInfo.fullName}</h2>
                    <p className="text-[10px] text-gray-400 font-medium">NID: {patientInfo.nationalId}</p>
                </div>
                <div className="bg-gray-50/80 p-6 border-y border-x border-gray-100">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Identity Ref</p>
                    <h2 className="text-xl font-bold text-gray-900">PT-8829</h2>
                    <p className="text-[10px] text-gray-400 font-medium italic">SmartHealth Link</p>
                </div>
                <div className="bg-gray-50/80 p-6 rounded-r-[32px] border-y border-r border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 py-1 px-3 bg-gray-200 text-[8px] font-bold text-gray-400 uppercase tracking-widest rounded-bl-lg">
                        Patient Identity Record
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Demographics</p>
                    <h2 className="text-xl font-bold text-gray-900">
                        {calculateAge(patientInfo.dob)}Y • {patientInfo.gender || 'Male'}
                    </h2>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Blood: {patientInfo.bloodGroup}</p>
                </div>
            </div>

            {/* Clinical Notes Section */}
            <div className="mb-12 relative z-10 px-2 text-left">
                <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-4 h-4 text-primary-500" />
                    <h3 className="text-[10px] font-bold text-primary-600 uppercase tracking-[0.2em]">Diagnosis / Clinical Notes</h3>
                </div>
                <div className="p-4 border-l-4 border-primary-500 bg-primary-50/30 rounded-r-2xl">
                    <p className="text-lg font-serif italic text-gray-700 leading-relaxed">
                        {type === 'dietPlan' ? (data.summary || 'Optimized nutrition regimen for metabolic health.') : (data.diagnosis || 'No clinical diagnosis specified.')}
                    </p>
                </div>
            </div>

            {/* medication / Rx Section */}
            <div className="relative z-10 px-2 min-h-[400px]">
                <h2 className="text-5xl font-bold text-primary-600 mb-8 font-serif italic tracking-tighter opacity-80 text-left">
                    {type === 'dietPlan' ? 'Dietary Directive' : 'Rx'}
                </h2>
                
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-[3px] border-gray-100">
                            <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-1/2">
                                {type === 'dietPlan' ? 'Meal Composition' : 'Medication & Strength'}
                            </th>
                            <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-1/4">
                                {type === 'dietPlan' ? 'Energy (kcal)' : 'Frequency'}
                            </th>
                            <th className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] w-1/4">
                                {type === 'dietPlan' ? 'Protein (g)' : 'Duration'}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {(data.medications || []).map((m: any, i: number) => (
                            <tr key={i}>
                                <td className="py-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{m.name}</h4>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{m.dosage}</p>
                                </td>
                                <td className="py-8 text-gray-600 font-medium italic text-sm">{m.frequency}</td>
                                <td className="py-8 text-gray-900 font-bold text-sm uppercase tracking-wider">{m.duration || 'As directed'}</td>
                            </tr>
                        ))}
                        
                        {/* Nutrition Plan Specific Content */}
                        {type === 'dietPlan' && (data.meals || []).map((meal: any, i: number) => (
                            <tr key={i}>
                                <td className="py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-50 rounded flex items-center justify-center text-gray-400 text-[10px] font-bold">
                                            {meal.time.split(' ')[0]}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-gray-800">{meal.name}</h4>
                                            <p className="text-[9px] font-bold text-primary-500 uppercase tracking-widest">{meal.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-6">
                                    <div className="text-sm font-semibold text-gray-600">
                                        {meal.calories} <span className="text-[9px] opacity-50 uppercase">kcal</span>
                                    </div>
                                </td>
                                <td className="py-6">
                                    <div className="text-sm font-bold text-gray-900">
                                        {meal.protein}g <span className="text-[9px] opacity-50 uppercase font-medium">Protein</span>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {(!data.medications && !data.meals) && (
                            <tr>
                                <td className="py-12 border-b border-gray-50">
                                    <p className="text-gray-400 font-bold text-xl">—</p>
                                    <p className="text-[10px] font-medium text-gray-300 uppercase tracking-widest">General •</p>
                                </td>
                                <td className="py-12 border-b border-gray-50">
                                    <p className="text-gray-400 font-bold text-xl">—</p>
                                </td>
                                <td className="py-12 border-b border-gray-50">
                                    <p className="text-gray-400 font-bold text-xl">—</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer Section */}
            <div className="mt-auto relative z-10 pt-20 border-t border-gray-100 flex flex-col items-end">
                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Issued by Clinical Authority</p>
                    <div className="mb-4">
                        <div className="relative inline-block px-8 py-2">
                            {/* Clinical Stamp Background */}
                            <div className="absolute inset-0 bg-primary-600/30 -rotate-1 rounded-sm" />
                            <span className="font-dancing text-4xl text-[#0a2e36] tracking-tight relative z-10 select-none">
                                {data.doctorName || 'Sarah Smith'}
                            </span>
                        </div>
                    </div>
                    <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.3em]">CHIEF CARDIOLOGIST</h4>
                </div>
            </div>

            {/* Bottom Verification Seal */}
            <div className="absolute bottom-12 left-12 flex items-center gap-4 opacity-40">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <div>
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.4em] leading-none mb-1">Authenticated Record</p>
                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">SmartHealth Digital Trust</p>
                </div>
            </div>
            
            <div className="absolute bottom-12 right-12 opacity-10">
                <Heart className="w-12 h-12 text-primary-600" />
            </div>
        </div>
    );
};

export default PrintableForm;
