import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, Plus, Trash2, FileText, User, 
    Stethoscope, Clock, Navigation, 
    CheckCircle2, 
    ArrowLeft, Download, Activity, Search,
    Star, ChevronRight, Building2, ShieldAlert, 
    Mail, MessageSquare, PenTool
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PatientQR from '../../components/PatientQR';
import { useHealth } from '../../context/HealthContext';
import { Button } from '../../components/ui/Button';
import BMIGauge from '../../components/clinical/BMIGauge';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'react-qr-code';

const COMMON_MEDICINES = [
    "Amoxicillin", "Lisinopril", "Levothyroxine", "Atorvastatin", "Metformin",
    "Amlodipine", "Metoprolol", "Omeprazole", "Simvastatin", "Losartan",
    "Albuterol", "Gabapentin", "Hydrochlorothiazide", "Sertraline", "Montelukast",
    "Fluticasone", "Amoxicillin/Clavulanate", "Furosemide", "Pantoprazole", "Acetaminophen",
    "Ibuprofen", "Naproxen", "Prednisone", "Azithromycin", "Ciprofloxacin",
    "Amoxicillin", "Cephalexin", "Doxycycline", "Warfarin", "Clopidogrel",
    "Aspirin", "Ramipril", "Valsartan", "Spironolactone", "Carvedilol",
    "Digoxin", "Warfarin", "Rivaroxaban", "Apixaban", "Insulin Glargine",
    "Sitagliptin", "Gliclazide", "Pioglitazone", "Rosuvastatin", "Ezetimibe",
    "Fenofibrate", "Hydrocortisone", "Fluconazole", "Tetracycline", "Metronidazole"
];

const COMMON_UNITS = ["mg", "mcg", "g", "ml", "Drops", "IU", "tab", "cap", "tsp"];

const PrescriptionEditor = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { healthData, addPrescription, requestConnection } = useHealth();
    const [medicines, setMedicines] = useState([
        { name: '', dosage: '', frequency: '', duration: '', instructions: '', route: 'Oral' }
    ]);
    const [labTests, setLabTests] = useState([
        { name: '', instructions: '' }
    ]);
    const [myChoiceMedicines, setMyChoiceMedicines] = useState<string[]>([]);
    const [isESigned, setIsESigned] = useState(false);
    
    // Search synchronization state
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [focusedStrengthIndex, setFocusedStrengthIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const strengthDropdownRef = useRef<HTMLDivElement>(null);

    // Initial load of doctor's own choices
    useEffect(() => {
        const saved = localStorage.getItem('doctor_choice_medicines');
        if (saved) {
            setMyChoiceMedicines(JSON.parse(saved));
        }
    }, []);

    // CLICK OUTSIDE HANDLER
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setFocusedIndex(null);
            }
            if (strengthDropdownRef.current && !strengthDropdownRef.current.contains(event.target as Node)) {
                setFocusedStrengthIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const saveChoice = (name: string) => {
        if (!myChoiceMedicines.includes(name)) {
            const newList = [...myChoiceMedicines, name];
            setMyChoiceMedicines(newList);
            localStorage.setItem('doctor_choice_medicines', JSON.stringify(newList));
        }
    };

    const [patientInfo, setPatientInfo] = useState<any>({
        name: 'John Doe',
        id: 'PT-8829',
        age: '38',
        gender: 'Male',
        diagnosis: '',
        description: '',
        followUp: '',
        vitals: {
            bp: '140/95',
            hr: '88 bpm',
            temp: '98.6°F',
            bmi: '22.9',
            weight: '70kg'
        },
        allergies: ['Penicillin', 'Peanuts'],
        conditions: ['Stage 2 Hypertension']
    });
    
    // Listen for QR Scan Identity Pass
    const isScan = searchParams.get('scan') === 'true';
    const isApproved = healthData.approvedDoctorIds.includes('DOC-001');

    useEffect(() => {
        if (isScan && !isApproved) {
            requestConnection({ id: 'DOC-001', name: 'Dr. Sarah Smith', specialty: 'Cardiologist' });
        }
    }, [isScan, isApproved]);

    useEffect(() => {
        const pId = searchParams.get('patientId');
        if ((pId === '1' || pId === 'PT-8829') && healthData) {
            setPatientInfo({
                name: healthData.fullName || 'John Doe',
                id: 'PT-8829',
                age: '45',
                gender: healthData.gender || 'Male',
                diagnosis: 'Hypertension',
                description: 'Patient identity verified via Smart Health QR Pass.',
                followUp: '7 Days',
                vitals: {
                    bp: '142/88',
                    hr: '76 bpm',
                    temp: '98.6°F',
                    bmi: healthData.bmi || '26.1',
                    weight: healthData.weight ? `${healthData.weight}kg` : '82kg'
                },
                allergies: healthData.allergies || ['Penicillin', 'Peanuts'],
                conditions: healthData.chronicConditions || ['Essential Hypertension']
            });
        }
    }, [searchParams, healthData]);

    const [isIssued, setIsIssued] = useState(false);
    const [isIssuing, setIsIssuing] = useState(false);
    const [issueStep, setIssueStep] = useState('');

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '', route: 'Oral' }]);
    };

    const addLabTest = () => {
        setLabTests([...labTests, { name: '', instructions: '' }]);
    };

    const removeMedicine = (index: number) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const removeLabTest = (index: number) => {
        setLabTests(labTests.filter((_, i) => i !== index));
    };

    const handleLabChange = (index: number, field: 'name' | 'instructions', value: string) => {
        const newTests = [...labTests];
        newTests[index][field] = value;
        setLabTests(newTests);
    };

    const handleChange = (index: number, field: keyof typeof medicines[0], value: string) => {
        const newMedicines = [...medicines];
        (newMedicines[index] as any)[field] = value;
        setMedicines(newMedicines);
    };

    const handleIssuePrescription = async () => {
        if (!isApproved) {
            alert("Connection not approved. Handshake required.");
            return;
        }
        if (!isESigned) {
            alert("Please apply E-Signature before issuing the prescription.");
            return;
        }

        // Allergy Pre-flight Check
        const allergyConflicts = medicines.filter(m => 
            patientInfo.allergies.some((a: string) => m.name.toLowerCase().includes(a.toLowerCase()))
        );

        if (allergyConflicts.length > 0) {
            const confirmRisk = window.confirm(
                `CRITICAL ALERT: Potential Allergy Conflict Detected!\n\n` +
                `Selected Drugs: ${allergyConflicts.map(c => c.name).join(', ')}\n` +
                `Patient Allergies: ${patientInfo.allergies.join(', ')}\n\n` +
                `Do you wish to override this warning with Clinical Rationale?`
            );
            if (!confirmRisk) return;
        }

        setFocusedIndex(null);
        setIsIssuing(true);
        
        const steps = [
            "Clinical Validation...",
            "Encrypting Digital Directive...",
            "Syncing with Patient Record...",
            "Notifying Patient & Pharmacy..."
        ];

        for (const step of steps) {
            setIssueStep(step);
            await new Promise(r => setTimeout(r, 800));
        }

        // Persist the prescription with full metadata
        const newPrescription = {
            doctorId: 'DOC-001',
            doctorName: 'Dr. Sarah Smith',
            doctorSpecialty: 'Cardiologist',
            patientName: patientInfo.name || 'John Doe',
            diagnosis: patientInfo.diagnosis || 'General Consultation',
            date: new Date().toISOString().split('T')[0],
            medications: medicines.filter(m => m.name).map(m => ({
                name: m.name,
                dosage: m.dosage,
                frequency: m.frequency,
                duration: m.duration,
                instructions: m.instructions
            })),
            labTests: labTests.filter(t => t.name),
            clinicalNotes: patientInfo.description,
            status: 'Active' as const
        };

        addPrescription(newPrescription);

        // Sync with local fallback
        const existing = JSON.parse(localStorage.getItem('patient_prescriptions') || '[]');
        localStorage.setItem('patient_prescriptions', JSON.stringify([newPrescription, ...existing]));

        setIsIssuing(false);
        setIsIssued(true);
    };

    const handleDownload = async () => {
        if (!isESigned) {
            alert("Please apply E-Signature before downloading the official prescription.");
            return;
        }
        const element = document.getElementById('prescription-preview');
        if (!element) return;
        
        try {
            // Temporary styles for rendering
            const originalBorder = element.style.border;
            element.style.border = 'none';
            const canvas = await html2canvas(element, { scale: 2, useCORS: true });
            element.style.border = originalBorder;
            
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Prescription_${patientInfo.id}_${new Date().getTime()}.pdf`);
        } catch (err) {
            console.error("PDF generation failed", err);
            // Fallback
            window.print();
        }
    };

    // Filtered medicine options
    const allOptions = [...new Set([...COMMON_MEDICINES, ...myChoiceMedicines])];
    const filteredOptions = allOptions.filter(m => 
        m.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8);

    const Letterhead = () => (
        <div id="prescription-preview" className="bg-white p-[20mm] shadow-2xl rounded-sm border border-gray-100 w-[210mm] min-h-[297mm] h-[297mm] flex flex-col font-serif relative overflow-hidden mx-auto">
            {/* Professional Header */}
            <div className="border-b-[3px] border-primary-600 pb-8 mb-10 flex justify-between items-start">
                <div className="flex gap-5">
                    <div className="w-20 h-20 bg-primary-900 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3 shrink-0">
                        <Stethoscope className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
                            Dr. Sarah Smith
                        </h2>
                        <p className="text-sm font-medium text-primary-700 tracking-wider uppercase mt-1">Senior Cardiologist • MBBS, MD (Cardiology)</p>
                        <div className="flex items-center gap-4 mt-3 text-[10px] text-gray-500 font-medium uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Dept. of Cardiology</span>
                            <span className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5" /> Room 402, Block B</span>
                        </div>
                    </div>
                </div>
                <div className="mr-12">
                    <div className="bg-white p-1 rounded-2xl">
                        <PatientQR 
                            patientId={patientInfo.id} 
                            patientName={patientInfo.name || 'John Doe'} 
                            size="sm"
                            hideDetails={true}
                        />
                    </div>
                </div>
            </div>

            {/* Patient Info Row */}
            <div className="grid grid-cols-12 gap-8 mb-10 bg-gray-50/50 p-6 rounded-[24px] border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 py-1 px-4 bg-gray-100 border-l border-b border-gray-200 text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em]">Patient Identity Record</div>
                <div className="col-span-5 border-r border-gray-200 pr-8">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-sans font-bold mb-2">Subject Name</p>
                    <p className="text-lg font-bold text-gray-900">{patientInfo.name || '—'}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">NID: {patientInfo.nationalId || 'Verified Clinical ID'}</p>
                </div>
                <div className="col-span-3 border-r border-gray-200 pr-8">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-sans font-bold mb-2">Identity Ref</p>
                    <p className="text-lg font-bold text-gray-900">{patientInfo.id}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">SmartHealth Link</p>
                </div>
                <div className="col-span-4">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-sans font-bold mb-2">Demographics</p>
                    <p className="text-lg font-bold text-gray-900">{patientInfo.age}Y • {patientInfo.gender}</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Blood: {healthData.bloodGroup || '—'}</p>
                </div>
            </div>

            {/* Diagnosis */}
            <div className="mb-10">
                <p className="text-xs font-medium text-primary-600 mb-2 flex items-center gap-1 font-sans">
                    <CheckCircle2 className="w-3 h-3" />
                    DIAGNOSIS / CLINICAL NOTES
                </p>
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap italic">
                    {patientInfo.diagnosis || 'No clinical diagnosis specified.'}
                </p>
            </div>

            {/* Symbols */}
            <div className="text-3xl font-medium text-primary-600 mb-6 font-sans">Rx</div>

            {/* Medications List */}
            <div className="flex-1">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100 text-[10px] uppercase tracking-widest text-gray-400 font-sans font-medium">
                            <th className="pb-2">Medication & Strength</th>
                            <th className="pb-2">Frequency</th>
                            <th className="pb-2 text-right">Duration</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-gray-800">
                        {medicines.map((med, i) => (
                            <tr key={i} className="group">
                                <td className="py-3">
                                    <p className="font-medium">{med.name || '—'} {med.dosage && <span className="text-gray-400 font-normal ml-1">({med.dosage})</span>}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{med.route} • {med.instructions}</p>
                                </td>
                                <td className="py-3 text-xs font-medium italic">
                                    {med.frequency || '—'}
                                </td>
                                <td className="py-3 text-xs text-right font-medium text-primary-600">
                                    {med.duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {labTests.length > 0 && labTests[0].name && (
                    <div className="mt-8">
                        <p className="text-[10px] font-medium text-primary-600 mb-2 uppercase tracking-widest font-sans">
                            DIAGNOSTIC ADVICE / LAB TESTS
                        </p>
                        <ul className="space-y-1">
                            {labTests.map((test, i) => (
                                <li key={i} className="text-xs font-medium text-gray-800 flex justify-between">
                                    <span>• {test.name}</span>
                                    <span className="text-[10px] text-gray-500 italic font-normal">{test.instructions}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {patientInfo.followUp && (
                    <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-[10px] font-medium text-gray-400 mb-1 uppercase tracking-widest font-sans">FOLLOW-UP / ADVISE</p>
                        <p className="text-xs italic text-gray-700">{patientInfo.followUp}</p>
                    </div>
                )}
            </div>

            <div className="mt-12 pt-8 border-t-[3px] border-gray-900/5 flex justify-between items-end gap-10">
                {/* QR Verification Section */}
                {isESigned && (
                    <div className="flex gap-4 items-center">
                        <div className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <QRCode
                                value={`https://smart-health.local/verify/RX-${patientInfo.id}-${new Date().getFullYear()}`}
                                size={64}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold text-gray-900 uppercase tracking-widest mb-0.5">Authenticity Scan</p>
                            <p className="text-[8px] text-gray-500 font-medium leading-tight">Scan to cryptographically<br/>verify this prescription.</p>
                            <p className="text-[8px] text-primary-600 font-medium mt-1">ID: RX-{patientInfo.id}</p>
                        </div>
                    </div>
                )}
                {!isESigned && (
                    <div className="text-[10px] font-medium text-amber-500 italic flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Pending E-Signature
                    </div>
                )}

                <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2">Issued by Clinical Authority</p>
                    <div className={`text-primary-800 italic font-medium text-3xl mb-1 font-signature -rotate-2 transition-all duration-500 ${isESigned ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ fontFamily: "'Dancing Script', cursive" }}>
                        Sarah Smith
                    </div>
                    <div className="w-[140px] h-0.5 bg-gray-900/10 mb-1 ml-auto" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Chief Cardiologist</p>
                </div>
            </div>

            {/* Watermark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] pointer-events-none rotate-[-45deg] scale-150">
                 <Building2 className="w-[500px] h-[500px]" />
            </div>
        </div>
    );

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-0 pb-20 print:p-0 print:m-0">
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { size: A4 portrait; margin: 0; }
                    body { background: white !important; margin: 0; padding: 0; }
                    .print-hidden, nav, sidebar, button, .xl\\:col-span-7 { display: none !important; }
                    .xl\\:col-span-12 { display: block !important; width: 100% !important; }
                    .xl\\:col-span-5 { 
                        display: block !important;
                        width: 210mm !important; 
                        height: 297mm !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                    }
                    #prescription-preview {
                        width: 210mm !important;
                        height: 297mm !important;
                        padding: 20mm !important;
                        margin: 0 !important;
                        background: white !important;
                        box-shadow: none !important;
                        border: none !important;
                        visibility: visible !important;
                        overflow: hidden !important;
                    }
                    .fixed { position: static !important; }
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                }
            `}} />

            <AnimatePresence>
                 {isIssuing && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[120] flex items-center justify-center bg-white/80 backdrop-blur-md print-hidden"
                    >
                        <div className="text-center">
                            <div className="w-20 h-20 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mx-auto mb-6" />
                            <h3 className="text-2xl font-medium text-gray-900 mb-2 tracking-tight">Issuing Directive</h3>
                            <p className="text-primary-600 font-medium animate-pulse uppercase tracking-widest text-[10px]">{issueStep}</p>
                        </div>
                    </motion.div>
                )}

                {isScan && !isApproved && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center bg-gray-900/40 backdrop-blur-xl print-hidden px-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 text-center max-w-sm w-full"
                        >
                            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <Stethoscope className="w-10 h-10 animate-pulse" />
                            </div>
                            <h2 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">Handshake Pending</h2>
                            <p className="text-gray-500 mb-8 text-sm font-medium leading-relaxed">
                                Access to <span className="text-gray-900 font-medium">{healthData.fullName}</span>'s clinical profile requires digital consent. Please ask the patient to approve the request in their dashboard.
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-center gap-2 text-[10px] font-semibold text-amber-600 uppercase tracking-widest bg-amber-50 py-3 rounded-2xl border border-amber-100">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
                                    Secure Connection Request Sent
                                </div>
                                <button 
                                    onClick={() => navigate('/doctor')}
                                    className="w-full text-gray-400 font-medium hover:text-gray-900 transition-colors py-3 uppercase text-[10px] tracking-[0.2em]"
                                >
                                    Cancel Request
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {isIssued && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[130] flex items-center justify-center bg-white/95 backdrop-blur-sm print-hidden px-4"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white p-10 rounded-3xl shadow-2xl border border-gray-100 text-center max-w-md w-full"
                        >
                            <div className="w-20 h-20 bg-primary-50 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h2 className="text-4xl font-medium text-gray-900 mb-4 tracking-tight">Prescription Issued!</h2>
                            <p className="text-gray-500 mb-8 text-[15px] font-medium leading-relaxed">
                                The digital copy has been updated in the patient's records and a clinical notification has been dispatched.
                            </p>
                            
                            {/* Identity Confirmation QR */}
                            <div className="mb-10 p-6 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col items-center justify-center gap-4 group hover:border-primary-100 transition-all shadow-inner">
                                <PatientQR 
                                    patientId={patientInfo.id} 
                                    patientName={patientInfo.name} 
                                    size="sm"
                                />
                                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Identity Confirmed • Network Sync Active</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <button 
                                    onClick={handleDownload}
                                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-medium py-5 rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 text-lg"
                                >
                                    <Download className="w-6 h-6" />
                                    Download Digital Copy
                                </button>
                                <button 
                                    onClick={() => navigate('/doctor')}
                                    className="w-full text-gray-400 font-medium hover:text-gray-900 transition-colors py-3 uppercase text-[11px] tracking-[0.2em]"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 print-hidden">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/doctor')}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="page-title">My Patients Profile</h1>
                        <p className="text-sm text-gray-500 mt-1 font-medium flex items-center gap-2 italic">
                            <Activity className="w-4 h-4 text-primary-500" />
                            Clinical directives and therapeutic plans.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleDownload} className="p-2.5 bg-white border border-gray-100 text-gray-400 hover:text-primary-600 hover:border-primary-100 rounded-xl transition-all shadow-sm" title="Download PDF">
                        <Download className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-2.5 rounded-xl border border-blue-100 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors" 
                        title="Share via SMS"
                        onClick={() => window.open(`sms:?body=Here is your digital prescription link: https://smart-health.local/verify/RX-12345`, '_blank')}
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-2.5 rounded-xl border border-rose-100 text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors" 
                        title="Share via Email"
                        onClick={() => window.open(`mailto:?subject=Your Digital Prescription&body=Here is your digital prescription link: https://smart-health.local/verify/RX-12345`, '_blank')}
                    >
                        <Mail className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-2.5 rounded-xl border border-emerald-100 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors" 
                        title="Chat on WhatsApp"
                        onClick={() => window.open('https://wa.me/?text=Here is your digital prescription link: https://smart-health.local/verify/RX-12345', '_blank')}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.123.554 4.197 1.604 6.06L0 24l6.117-1.605a11.77 11.77 0 005.925 1.597h.005c6.632 0 12.032-5.397 12.035-12.032.003-3.218-1.247-6.242-3.52-8.517"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Editor Side */}
                <div className="xl:col-span-7 space-y-8 print-hidden">
                    <div className="bg-primary-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-800 rounded-full -mr-20 -mt-20 blur-3xl opacity-50 transition-all group-hover:scale-110" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary-800 rounded-xl">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                </div>
                                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">Clinical Intelligence</h3>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-3xl font-medium tracking-tight">Active Suggestions</h2>
                                <Button size="sm" variant="outline" className="text-[10px] uppercase tracking-widest bg-white/5 border-white/10 text-primary-300 hover:bg-white/10 hover:text-white transition-all py-1.5 px-3">
                                    Run IQ Diagnostics
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(() => {
                                    if (!healthData) return null;
                                    const suggestions = [];
                                    const vitals = healthData;
                                    const vitalsBMI = Number(vitals.bmi || 0);
                                    
                                    if (vitalsBMI >= 25) {
                                        suggestions.push({
                                            label: "Weight Management Plan",
                                            desc: `BMI is ${vitalsBMI.toFixed(1)} (Overweight). Recommend dietary consult and exercise protocol.`,
                                            type: "warning"
                                        });
                                                            if (vitals.labResults) {
                                        vitals.labResults.forEach(lab => {
                                            if (lab.marker.toLowerCase().includes('vitamin d') && parseFloat(lab.value) < 30) {
                                                suggestions.push({
                                                    label: "Vitamin D Supplementation",
                                                    desc: `Level: ${lab.value} ng/mL (Low). Suggest Cholecalciferol 60k IU Weekly.`,
                                                    type: "clinical"
                                                });
                                            }
                                            if (lab.marker.toLowerCase().includes('glucose') && parseFloat(lab.value) > 110) {
                                                suggestions.push({
                                                    label: "Hyperglycemia Alert",
                                                    desc: `Glucose: ${lab.value} mg/dL. Re-test Fasting Glucose & recommend low-carb diet.`,
                                                    type: "critical"
                                                });
                                            }
                                        });
                                    }

                                    // Allergy Conflict Real-time Detection
                                    medicines.forEach(m => {
                                        if (m.name && patientInfo.allergies.some((a: string) => m.name.toLowerCase().includes(a.toLowerCase()))) {
                                            suggestions.push({
                                                label: "Allergy Conflict Detected",
                                                desc: `${m.name} may conflict with patient's ${patientInfo.allergies.find((a: string) => m.name.toLowerCase().includes(a.toLowerCase()))} allergy.`,
                                                type: "critical"
                                            });
                                        }
                                    });

                                    // Drug-Drug Interaction Mock
                                    const activeMeds = medicines.map(m => m.name.toLowerCase());
                                    if (activeMeds.includes('warfarin') && activeMeds.includes('aspirin')) {
                                        suggestions.push({
                                            label: "Critical Interaction Alert",
                                            desc: "Concurrent use of Warfarin and Aspirin increases major bleeding risk.",
                                            type: "critical"
                                        });
                                    }

                                    // Diagnosis Awareness
                                    if (patientInfo.diagnosis.toLowerCase().includes('hypertension')) {
                                        suggestions.push({
                                            label: "HTN Protocol Suggestion",
                                            desc: "Recommend DASH diet, low sodium (<1500mg/day), and daily BP log.",
                                            type: "clinical"
                                        });
                                    }
                                    if (patientInfo.diagnosis.toLowerCase().includes('fever') || patientInfo.diagnosis.toLowerCase().includes('infection')) {
                                        suggestions.push({
                                            label: "Infection Management",
                                            desc: "Advise completing full course of antibiotics even if symptoms resolve.",
                                            type: "clinical"
                                        });
                                    }
               }

                                    if (suggestions.length === 0) {
                                        return (
                                            <div className="col-span-2 p-6 bg-white/5 rounded-3xl border border-white/10 italic text-primary-300 text-sm flex items-center justify-between">
                                                <span>No critical metabolic markers out of range. Maintain current healthy baseline.</span>
                                                <button className="text-[10px] font-semibold text-primary-400 hover:text-white uppercase tracking-widest transition-colors pl-4">
                                                    Manual Re-scan
                                                </button>
                                            </div>
                                        );
                                    }

                                    return suggestions.map((s, i) => (
                                        <div key={i} className={`p-4 rounded-3xl border transition-all hover:scale-[1.02] cursor-pointer ${
                                            s.type === 'critical' ? 'bg-rose-500/10 border-rose-500/30' : 
                                            s.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 
                                            'bg-emerald-500/10 border-emerald-500/30'
                                        }`}>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    s.type === 'critical' ? 'bg-rose-500' : 
                                                    s.type === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'
                                                }`} />
                                                <span className="font-semibold text-[10px] uppercase tracking-widest text-white">{s.label}</span>
                                            </div>
                                            <p className="text-xs text-primary-100/80 leading-relaxed font-medium">{s.desc}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* Patient Context & Reference (LIGHT THEME) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="card-title">Clinical Context</h3>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Patient Assignment</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 flex justify-between">
                                        <span>Active Patient Selection</span>
                                        {searchParams.get('patientId') && (
                                            <span className="text-emerald-500 flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                                                QR SYNC ACTIVE
                                            </span>
                                        )}
                                    </label>
                                    <select 
                                        value={patientInfo.id}
                                        onChange={(e) => setPatientInfo({ ...patientInfo, id: e.target.value })}
                                        className={`w-full px-4 py-3 rounded-xl border outline-none transition-all font-medium text-gray-700 cursor-pointer shadow-sm ${searchParams.get('patientId') ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-200 bg-gray-50/50 focus:border-primary-500'}`}
                                    >
                                        <option value="PT-8829">John Doe (ID: PT-8829) {searchParams.get('patientId') ? '— Identity Confirmed' : ''}</option>
                                        <option value="PT-1120">Jane Smith (ID: PT-1120)</option>
                                        <option value="PT-4451">Robert Taylor (ID: PT-4451)</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2">Core Diagnosis</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none transition-all font-medium text-gray-700 shadow-sm" 
                                                placeholder="e.g. Hypertension..."
                                                value={patientInfo.diagnosis}
                                                onChange={(e) => setPatientInfo({...patientInfo, diagnosis: e.target.value})}
                                            />
                                            <Stethoscope className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2">Follow-up Window</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none transition-all font-medium text-gray-700 shadow-sm" 
                                                placeholder="Next visit details..."
                                                value={patientInfo.followUp}
                                                onChange={(e) => setPatientInfo({...patientInfo, followUp: e.target.value})}
                                            />
                                            <Clock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2">Detailed Clinical Description</label>
                                    <div className="relative">
                                        <textarea 
                                            rows={3}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 outline-none transition-all font-medium text-sm text-gray-700 bg-gray-50/30 shadow-sm resize-none" 
                                            placeholder="Describe symptoms, patient history, or clinical observations..."
                                            value={patientInfo.description}
                                            onChange={(e) => setPatientInfo({...patientInfo, description: e.target.value})}
                                        />
                                        <Activity className="absolute right-5 bottom-4 w-5 h-5 text-gray-300 opacity-50" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-primary-50 shadow-sm border-l-4 border-l-primary-400">
                            <h4 className="text-[10px] font-medium uppercase tracking-widest text-primary-600 mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-primary-500" />
                                Patient Vitals
                            </h4>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="p-4 bg-primary-50/40 rounded-3xl border border-primary-100 flex items-center justify-between">
                                        <p className="text-[10px] text-primary-700 font-bold uppercase tracking-widest">Blood Pressure</p>
                                        <p className="text-xl font-bold text-gray-900 tracking-tighter">{patientInfo.vitals.bp}</p>
                                    </div>
                                    <BMIGauge bmi={Number(patientInfo.vitals.bmi || 0)} showTitle={true} />
                                </div>
                                <div className="p-5 bg-rose-50/30 rounded-2xl border border-rose-100/50">
                                    <p className="text-[10px] text-rose-700 font-medium uppercase tracking-wider mb-2 flex items-center justify-between">
                                        Known Allergies
                                        <span className="w-2 h-2 bg-rose-400 rounded-full animate-ping" />
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {patientInfo.allergies.map((a: string) => (
                                            <span key={a} className="px-2.5 py-1 bg-white text-rose-600 text-[10px] font-medium rounded-lg border border-rose-100 shadow-sm">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mb-2">Chronic Conditions</p>
                                    <ul className="space-y-1.5">
                                        {patientInfo.conditions.map((c: string) => (
                                            <li key={c} className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                                <div className="w-1 h-3 bg-primary-300 rounded-full" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medications Editor */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="card-title">Therapeutic Plan</h3>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">Medication Mapping</p>
                                </div>
                            </div>
                            <button
                                onClick={addMedicine}
                                className="flex items-center gap-2 bg-primary-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md group"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Medication</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            {medicines.map((med, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-gray-50/30 rounded-2xl border border-gray-100 group relative hover:border-primary-100 transition-colors"
                                >
                                    <button
                                        onClick={() => removeMedicine(index)}
                                        className="absolute -top-3 -right-3 w-10 h-10 bg-white text-gray-300 hover:text-rose-500 hover:shadow-xl rounded-2xl flex items-center justify-center transition-all border border-gray-100 shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                        <div className="md:col-span-3 relative" ref={focusedIndex === index ? dropdownRef : null}>
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Drug Name</label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Search or enter medicine..."
                                                    value={focusedIndex === index ? searchTerm : med.name}
                                                    onFocus={() => {
                                                        setFocusedIndex(index);
                                                        setSearchTerm(med.name);
                                                    }}
                                                    onChange={(e) => {
                                                        setSearchTerm(e.target.value);
                                                        handleChange(index, 'name', e.target.value);
                                                    }}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500 bg-white font-medium text-gray-800 placeholder:text-gray-300 shadow-sm"
                                                />
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                    {myChoiceMedicines.includes(med.name) && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                                                    <Search className="w-5 h-5 text-gray-300" />
                                                </div>
                                            </div>

                                            {/* DROPDOWN SEARCH RESULTS */}
                                            <AnimatePresence>
                                                {focusedIndex === index && (searchTerm.length > 0 || myChoiceMedicines.length > 0) && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 5 }}
                                                        className="absolute z-[100] left-0 right-0 mt-2 bg-white rounded-[24px] shadow-2xl border border-gray-100 overflow-hidden"
                                                    >
                                                        <div className="p-2 space-y-1">
                                                            {filteredOptions.map((opt) => (
                                                                <button
                                                                    key={opt}
                                                                    onClick={() => {
                                                                        handleChange(index, 'name', opt);
                                                                        setFocusedIndex(null);
                                                                    }}
                                                                    className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-primary-50 rounded-xl transition-colors group/opt"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center group-hover/opt:bg-white">
                                                                            <FileText className="w-4 h-4 text-gray-400" />
                                                                        </div>
                                                                        <span className="font-medium text-gray-700">{opt}</span>
                                                                    </div>
                                                                    {myChoiceMedicines.includes(opt) && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                                                                </button>
                                                            ))}
                                                            
                                                            {searchTerm.length > 0 && !allOptions.includes(searchTerm) && (
                                                                <button
                                                                    onClick={() => {
                                                                        handleChange(index, 'name', searchTerm);
                                                                        saveChoice(searchTerm);
                                                                        setFocusedIndex(null);
                                                                    }}
                                                                    className="w-full flex items-center justify-between px-4 py-4 bg-primary-50/50 hover:bg-primary-50 rounded-xl transition-colors border border-dashed border-primary-200 mt-2"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                                                            <Plus className="w-4 h-4 text-primary-600" />
                                                                        </div>
                                                                        <div className="text-left">
                                                                            <p className="text-[9px] font-medium text-primary-700 uppercase tracking-tighter">Add as New Choice</p>
                                                                            <p className="text-sm font-medium text-primary-900">{searchTerm}</p>
                                                                        </div>
                                                                    </div>
                                                                    <ChevronRight className="w-4 h-4 text-emerald-400" />
                                                                </button>
                                                            )}
                                                            
                                                            {filteredOptions.length === 0 && searchTerm.length === 0 && (
                                                                <div className="p-6 text-center text-gray-400">
                                                                    <p className="text-xs font-medium uppercase tracking-widest">Start typing to search...</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div className="md:col-span-2 relative" ref={focusedStrengthIndex === index ? strengthDropdownRef : null}>
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Daily Strength</label>
                                            <div className="relative">
                                                <input
                                                    placeholder="e.g. 500"
                                                    value={med.dosage}
                                                    onFocus={() => setFocusedStrengthIndex(index)}
                                                    onChange={(e) => handleChange(index, 'dosage', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500 bg-white font-medium text-gray-800 placeholder:text-gray-300 shadow-sm"
                                                />
                                                <button 
                                                    onClick={() => setFocusedStrengthIndex(focusedStrengthIndex === index ? null : index)}
                                                    className="absolute right-0 top-0 bottom-0 px-4 flex items-center gap-1.5 text-primary-600 font-medium bg-primary-50/30 border-l border-primary-100 rounded-r-xl hover:bg-primary-50 transition-colors"
                                                >
                                                    <span className="text-xs">mg</span>
                                                    <Plus className="w-3 h-3 rotate-45" />
                                                </button>
                                            </div>

                                            {/* STRENGTH UNIT DROPDOWN */}
                                            <AnimatePresence>
                                                {focusedStrengthIndex === index && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, scale: 0.95 }}
                                                        className="absolute z-[110] right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                                                    >
                                                        <div className="p-1.5 grid grid-cols-2 gap-1">
                                                            {COMMON_UNITS.map(unit => (
                                                                <button
                                                                    key={unit}
                                                                    onClick={() => {
                                                                        const currentVal = med.dosage.replace(/[a-zA-Z]/g, '').trim();
                                                                        handleChange(index, 'dosage', `${currentVal}${unit}`);
                                                                        setFocusedStrengthIndex(null);
                                                                    }}
                                                                    className="px-3 py-2 text-xs font-medium text-gray-600 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors text-center"
                                                                >
                                                                    {unit}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Mode</label>
                                            <select 
                                                value={med.route}
                                                onChange={(e) => handleChange(index, 'route', e.target.value)}
                                                className="w-full px-3 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500 bg-white text-xs font-medium uppercase shadow-sm cursor-pointer"
                                            >
                                                <option>Oral</option>
                                                <option>IV</option>
                                                <option>IM</option>
                                                <option>Topical</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Frequency</label>
                                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus-within:border-primary-500 transition-colors">
                                                <Clock className="w-5 h-5 text-gray-300" />
                                                <input
                                                    placeholder="1-0-1 or TDS"
                                                    value={med.frequency}
                                                    onChange={(e) => handleChange(index, 'frequency', e.target.value)}
                                                    className="w-full outline-none text-sm font-medium text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Therapy Period</label>
                                            <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus-within:border-primary-500 transition-colors">
                                                <Navigation className="w-5 h-5 text-gray-300" />
                                                <input
                                                    placeholder="e.g. 7 Days"
                                                    value={med.duration}
                                                    onChange={(e) => handleChange(index, 'duration', e.target.value)}
                                                    className="w-full outline-none text-sm font-medium text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2 ml-1">Intake Timing</label>
                                            <input
                                                placeholder="e.g. After meals"
                                                value={med.instructions}
                                                onChange={(e) => handleChange(index, 'instructions', e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-100 outline-none italic text-xs font-medium text-gray-400 bg-gray-50/50"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Diagnostic Advice */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="card-title">Diagnostic Plan</h3>
                            </div>
                            <button
                                onClick={addLabTest}
                                className="flex items-center gap-2 bg-primary-600 text-white font-medium px-5 py-3 rounded-xl hover:bg-primary-700 transition-all shadow-md group"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                <span>Order Test</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {labTests.map((test, index) => (
                                <motion.div
                                    key={index}
                                    layout
                                    className="flex gap-4 items-center"
                                >
                                    <input
                                        placeholder="Test Name (e.g. CBC, Lipid Profile)"
                                        value={test.name}
                                        onChange={(e) => handleLabChange(index, 'name', e.target.value)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-100 outline-none focus:border-primary-400 bg-gray-50/50 font-medium text-sm text-gray-800"
                                    />
                                    <input
                                        placeholder="Instructions..."
                                        value={test.instructions}
                                        onChange={(e) => handleLabChange(index, 'instructions', e.target.value)}
                                        className="flex-[0.8] px-4 py-3 rounded-xl border border-gray-100 outline-none focus:border-primary-400 bg-gray-50/50 text-sm font-medium text-gray-400 italic"
                                    />
                                    <button
                                        onClick={() => removeLabTest(index)}
                                        className="p-2 text-gray-300 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-6">
                        <button 
                            onClick={() => navigate('/doctor')}
                            className="flex items-center gap-2 text-gray-400 hover:text-primary-600 transition-all font-medium uppercase text-[10px] tracking-widest group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Dashboard
                        </button>
                        <div className="flex flex-wrap items-center justify-end gap-4 w-full md:w-auto">
                            {!isESigned ? (
                                <button 
                                    onClick={() => setIsESigned(true)}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all font-medium uppercase text-[10px] tracking-widest shadow-lg group"
                                >
                                    <PenTool className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Apply E-Signature
                                </button>
                            ) : (
                                <div className="px-6 py-3.5 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">E-Signed</span>
                                    <button 
                                        onClick={() => setIsESigned(false)}
                                        className="ml-2 text-[9px] text-gray-400 hover:text-rose-500 underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}

                            <button className="flex-1 md:flex-none px-8 py-4 rounded-2xl border border-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-50 font-medium uppercase text-[10px] tracking-widest transition-all shadow-sm">
                                Save Draft
                            </button>
                            <button 
                                onClick={handleIssuePrescription}
                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-4 rounded-2xl transition-all font-medium uppercase text-[10px] tracking-widest shadow-lg group ${isESigned ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-primary-500/20' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                            >
                                <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Issue Directive
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Side */}
                <div className="xl:col-span-5 hidden xl:block print:block">
                    <div className="sticky top-10">
                        <div className="flex items-center justify-between mb-6 px-6 print:hidden">
                            <div className="flex items-center gap-3">
                                <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(0,164,167,0.5)]" />
                                <h3 className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">Official E-Prescription</h3>
                            </div>
                            <span className="text-[10px] font-medium text-primary-500 uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full">
                                Read Only
                            </span>
                        </div>
                        <div className="scale-[0.7] origin-top transform-gpu transition-all duration-500 hover:scale-[0.75] print:scale-100 shadow-2xl ring-1 ring-gray-950/5">
                            <Letterhead />
                        </div>
                        <p className="text-center text-[10px] text-gray-300 font-medium uppercase tracking-widest mt-8 flex items-center justify-center gap-2 italic print:hidden">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Verified for Pharmacy Dispensing
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionEditor;
