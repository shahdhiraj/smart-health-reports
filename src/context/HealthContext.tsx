import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our health sink
export interface LabResult {
    id: string;
    marker: string;
    value: string;
    unit: string;
    date: string;
    status: 'Normal' | 'High' | 'Low' | 'Critical';
}

export interface Surgery {
    id: string;
    name: string;
    date: string;
    hospital: string;
    status: 'Completed' | 'Scheduled' | 'Recovering';
}

export interface ConnectionRequest {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorSpecialty: string;
    timestamp: string;
    status: 'pending' | 'approved' | 'denied';
}

export interface Prescription {
    id: string;
    doctorId: string;
    doctorName: string;
    doctorSpecialty: string;
    date: string;
    diagnosis: string;
    medications: Array<{ name: string; dosage: string; frequency: string; duration?: string; }>;
    status: 'Active' | 'Completed';
}

export interface ExtractedValue {
    marker: string;
    value: string;
    unit: string;
    status: 'Normal' | 'High' | 'Low' | 'Critical';
    trend?: 'up' | 'down' | 'stable';
    previousValue?: string;
}

export interface MedicalReport {
    id: string;
    title: string;
    date: string;
    type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Discharge Summary' | 'Vaccination Record' | 'Insurance Document' | 'Health Certificate' | 'Other';
    summary: string;
    aiInsights: string[];
    audioDuration?: string;
    fileSize: string;
    fileUrl?: string;
    isSynced?: boolean;
    extractedValues?: ExtractedValue[];
    riskAlerts?: string[];
    healthScore?: { score: number, assessment: string };
    recommendations?: string[];
}

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'prescription' | 'connection' | 'booking' | 'system';
    timestamp: string;
    read: boolean;
    link?: string;
}

export interface HealthData {
    // Personal & Vitals
    fullName: string;
    dateOfBirth: string;
    gender: string;
    bloodGroup: string;
    height: string;
    weight: string;
    bmi: string;

    // Extended Personal Details
    phone: string;
    email: string;
    nationality: string;
    maritalStatus: string;
    occupation: string;
    nationalId: string;

    // Address
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;

    // Emergency Contact
    emergencyName: string;
    emergencyRelation: string;
    emergencyPhone: string;
    emergencyEmail: string;
    
    // Clinical Lists (Flexible Sections)
    chronicConditions: string[];
    allergies: string[];
    medications: Array<{ name: string; dosage: string; frequency: string; duration?: string; manufacturer?: string; expiryDate?: string; purpose?: string }>;
    surgeries: Surgery[];
    labResults: LabResult[];
    reports: MedicalReport[];
    prescriptions: Prescription[];
    notifications: Notification[];
    
    // Women's Health
    menstruationData?: {
        cycleLength: number;
        periodLength: number;
        lastPeriodStart: string;
        trackedCycles: { startDate: string, endDate: string, symptoms: string[] }[];
        pregnancyStatus?: 'none' | 'trying' | 'pregnant';
        dueDate?: string;
        pregnancyLog?: { date: string, mood: string, symptoms: string, kicks?: string, weight?: string, aiInsight?: string[] }[];
    };
    
    // Security
    connectionRequests: ConnectionRequest[];
    approvedDoctorIds: string[];
    
    // Global Print State
    printData: {
        data: any;
        type: 'prescription' | 'labReport' | 'tracking' | 'dietPlan' | null;
    };
}

interface HealthContextType {
    healthData: HealthData;
    updateField: (field: keyof HealthData, value: any) => void;
    updateReport: (id: string, updates: Partial<MedicalReport>) => void;
    addListItem: (listName: 'chronicConditions' | 'allergies' | 'medications' | 'surgeries' | 'labResults' | 'prescriptions' | 'notifications', item: any) => void;
    removeListItem: (listName: 'chronicConditions' | 'allergies' | 'medications' | 'surgeries' | 'labResults' | 'prescriptions' | 'notifications', index: number) => void;
    syncReportData: (results: LabResult[]) => void;
    addReport: (report: MedicalReport) => void;
    handleConnectionAction: (requestId: string, action: 'approved' | 'denied') => void;
    requestConnection: (doctor: { id: string, name: string, specialty: string }) => void;
    addPrescription: (prescription: Omit<Prescription, 'id' | 'date' | 'status'>) => void;
    addNotification: (title: string, message: string, type: Notification['type'], link?: string) => void;
    markNotificationRead: (id: string) => void;
    clearNotifications: () => void;
    setPrintData: (type: 'prescription' | 'labReport' | 'tracking' | 'dietPlan' | null, data?: any) => void;
    resetToDefault: () => void;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const DEFAULT_DATA: HealthData = {
    fullName: 'John Doe',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    bloodGroup: 'O+',
    height: '175',
    weight: '70',
    bmi: '22.9',
    phone: '+977-98XXXXXXXX',
    email: 'john.doe@email.com',
    nationality: 'Nepali',
    maritalStatus: 'Married',
    occupation: 'Software Engineer',
    nationalId: '123-456-789',
    address: '123 Health Street',
    city: 'Kathmandu',
    state: 'Bagmati',
    postalCode: '44600',
    country: 'Nepal',
    emergencyName: 'Jane Doe',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+977-98YYYYYYYY',
    emergencyEmail: 'jane.doe@email.com',
    menstruationData: {
        cycleLength: 28,
        periodLength: 5,
        lastPeriodStart: '2024-03-25',
        trackedCycles: [],
        pregnancyStatus: 'none',
        pregnancyLog: []
    },
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Lactose'],
    medications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: 'Ongoing', manufacturer: 'GSK Pharma', expiryDate: '2025-12-01', purpose: 'Type 2 Diabetes Management' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '90 Days', manufacturer: 'Pfizer Inc.', expiryDate: '2025-10-15', purpose: 'Hypertension Management' },
        { name: 'Atorvastatin', dosage: '20mg', frequency: 'At night', duration: '90 Days', manufacturer: 'Merck & Co.', expiryDate: '2026-03-10', purpose: 'Cholesterol Regulation' },
        { name: 'Vitamin D3', dosage: '2000 IU', frequency: 'Daily', duration: 'Ongoing', manufacturer: 'Bayer AG', expiryDate: '2026-05-20', purpose: 'Bone Health / Supplement' }
    ],
    surgeries: [
        { id: 'SUR-110', name: 'Appendectomy', date: '2022-05-12', hospital: 'City Care Hospital', status: 'Completed' }
    ],
    labResults: [
        { id: 'LAB-992', marker: 'HbA1c', value: '6.4', unit: '%', date: '2024-03-20', status: 'High' },
        { id: 'LAB-993', marker: 'Creatinine', value: '0.9', unit: 'mg/dL', date: '2024-03-20', status: 'Normal' },
        { id: 'LAB-994', marker: 'Total Cholesterol', value: '185', unit: 'mg/dL', date: '2024-01-15', status: 'Normal' }
    ],
    prescriptions: [
        {
            id: 'RX-9921',
            doctorId: 'DOC-001',
            doctorName: 'Dr. Sarah Smith',
            doctorSpecialty: 'Cardiologist',
            date: '2024-03-15',
            diagnosis: 'Grade 1 Hypertension',
            medications: [
                { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 Days' },
                { name: 'Atorvastatin', dosage: '10mg', frequency: 'At night', duration: '30 Days' }
            ],
            status: 'Active'
        },
        {
            id: 'RX-7740',
            doctorId: 'DOC-005',
            doctorName: 'Dr. Michael Chen',
            doctorSpecialty: 'Endocrinologist',
            date: '2024-02-10',
            diagnosis: 'Pre-diabetes Management',
            medications: [
                { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '90 Days' }
            ],
            status: 'Active'
        }
    ],
    notifications: [
        {
            id: 'N-001',
            title: 'Lab Report Ready',
            message: 'Your recent blood work results (HbA1c) are now available in the portal.',
            type: 'system',
            timestamp: '2024-03-21T10:30:00Z',
            read: false,
            link: '/patient/reports'
        },
        {
            id: 'N-002',
            title: 'New Prescription Issued',
            message: 'Dr. Sarah Smith has updated your hypertension management plan.',
            type: 'prescription',
            timestamp: '2024-03-15T14:45:00Z',
            read: true,
            link: '/patient/prescriptions'
        }
    ],
    connectionRequests: [],
    approvedDoctorIds: ['DOC-001', 'DOC-005', 'DOC-008', 'DOC-012', 'DOC-024'],
    reports: [
        {
            id: 'REP-001',
            title: 'Blood Test Analysis',
            date: '2024-03-10',
            type: 'Lab Report',
            summary: 'Your blood work shows normal levels of cholesterol and sugar. Hemoglobin is slightly low (13.2 g/dL) but within acceptable range.',
            aiInsights: [
                'Hemoglobin levels are stable compared to last visit.',
                'Good cholesterol (HDL) has improved by 5%.',
                'Recommended to maintain iron-rich diet.'
            ],
            audioDuration: '0:45',
            fileSize: '2.4 MB',
            isSynced: true,
            extractedValues: [
                { marker: 'Hemoglobin', value: '13.2', unit: 'g/dL', status: 'Low', trend: 'down', previousValue: '13.8' },
                { marker: 'Total Cholesterol', value: '185', unit: 'mg/dL', status: 'Normal', trend: 'down', previousValue: '195' },
                { marker: 'Fasting Sugar', value: '98', unit: 'mg/dL', status: 'Normal', trend: 'stable', previousValue: '97' },
                { marker: 'Triglycerides', value: '160', unit: 'mg/dL', status: 'High', trend: 'up', previousValue: '145' }
            ],
            riskAlerts: [
                'Triglycerides elevated: Risk of metabolic syndrome.',
                'Hemoglobin dropping: Monitor for anemia.'
            ],
            healthScore: { score: 78, assessment: 'Moderate Risk' },
            recommendations: [
                'Initiate iron supplementation (FeSO4 325mg daily).',
                'Repeat lipid panel in 3 months.',
                'Engage in 150 minutes of moderate aerobic exercise weekly.'
            ]
        },
        {
            id: 'REP-002',
            title: 'MRI Scan - Lower Back',
            date: '2024-02-15',
            type: 'Imaging',
            summary: 'Scan confirms mild lumbar spondylosis at L4-L5 level. No significant nerve compression observed.',
            aiInsights: [
                'No structural progression since 2023 scan.',
                'Slight disc bulge noted at L4-L5.',
                'Neural foramina appear clear.'
            ],
            audioDuration: '1:20',
            fileSize: '15.8 MB',
            fileUrl: '/assets/imaging/lumbar-mri.png',
            isSynced: false,
            extractedValues: [
                { marker: 'L4-L5 Disc Space', value: 'Narrowed', unit: '-', status: 'High', trend: 'stable', previousValue: 'Narrowed' },
                { marker: 'Nerve Root Compression', value: 'None', unit: '-', status: 'Normal' }
            ],
            riskAlerts: []
        },
        {
            id: 'REP-003',
            title: 'Chest X-Ray - PA View',
            date: '2024-04-05',
            type: 'Imaging',
            summary: 'Institutional chest X-ray confirms clear lung fields and normal cardiac silhouette.',
            aiInsights: [
                'Lungs are clear bilaterally.',
                'No evidence of pleural effusion.',
                'Heart size is within normal limits.'
            ],
            audioDuration: '0:55',
            fileSize: '4.2 MB',
            fileUrl: '/assets/imaging/chest-xray.png',
            isSynced: false
        },
        {
            id: 'REP-004',
            title: 'Right Knee X-Ray - AP/Lat',
            date: '2024-03-25',
            type: 'Imaging',
            summary: 'Radiographic examination of the right knee shows preserved joint spaces and normal bone mineral density. No fracture or dislocation seen.',
            aiInsights: [
                'No evidence of joint space narrowing.',
                'Patella is normally positioned.',
                'Bone cortex appears intact throughout.'
            ],
            audioDuration: '1:10',
            fileSize: '5.8 MB',
            fileUrl: '/assets/imaging/knee-xray.png',
            isSynced: false
        },
        {
            id: 'REP-005',
            title: 'Dental Panoramic X-Ray',
            date: '2024-03-12',
            type: 'Imaging',
            summary: 'Complete orthopantomogram (OPG) reveals healthy periodontal structures and normal wisdom teeth eruption patterns.',
            aiInsights: [
                'No evidence of significant caries.',
                'Jawbone density is within healthy range.',
                'TMJ alignment is normal.'
            ],
            audioDuration: '0:50',
            fileSize: '3.5 MB',
            fileUrl: '/assets/imaging/dental-xray.png',
            isSynced: false
        },
        {
            id: 'REP-006',
            title: 'Annual Health Certificate',
            date: '2024-01-10',
            type: 'Health Certificate',
            summary: 'Patient is certified fit for general physical activities and employment. No communicable diseases detected.',
            aiInsights: [
                'General vitals are within normal limits.',
                'Vision and hearing are normal.',
                'No chronic issues affecting fitness.'
            ],
            audioDuration: '0:30',
            fileSize: '1.2 MB',
            isSynced: true
        },
        {
            id: 'REP-007',
            title: 'COVID-19 Vaccination Record',
            date: '2023-11-05',
            type: 'Vaccination Record',
            summary: 'Received booster dose of mRNA COVID-19 vaccine. Next booster recommended in 12 months.',
            aiInsights: [
                'Vaccine batch verified.',
                'No adverse reactions reported.',
                'Immunity levels expected to be optimal.'
            ],
            audioDuration: '0:40',
            fileSize: '0.8 MB',
            isSynced: true
        },
        {
            id: 'REP-008',
            title: 'Discharge Summary - Appendectomy',
            date: '2022-05-15',
            type: 'Discharge Summary',
            summary: 'Patient discharged after successful laparoscopic appendectomy. Post-operative recovery was uneventful.',
            aiInsights: [
                'Surgical wound healing well.',
                'Prescribed antibiotics for 5 days.',
                'Follow-up required in 2 weeks.'
            ],
            audioDuration: '1:15',
            fileSize: '2.5 MB',
            isSynced: true
        },
        {
            id: 'REP-009',
            title: 'Health Insurance Policy',
            date: '2024-01-01',
            type: 'Insurance Document',
            summary: 'Comprehensive health coverage active for the current year. Includes outpatient and inpatient benefits.',
            aiInsights: [
                'Coverage limit verified.',
                'Dental and vision included.',
                'Valid until Dec 31, 2024.'
            ],
            audioDuration: '0:35',
            fileSize: '1.5 MB',
            isSynced: true
        },
        {
            id: 'REP-010',
            title: 'Prescription - Hypertension',
            date: '2024-03-15',
            type: 'Prescription',
            summary: 'Prescription for Amlodipine 5mg and Atorvastatin 10mg. 30 days supply.',
            aiInsights: [
                'Dosage matches clinical guidelines.',
                'No drug interactions detected with current medications.',
                'Refill required next month.'
            ],
            audioDuration: '0:45',
            fileSize: '1.1 MB',
            isSynced: true
        },
        {
            id: 'REP-011',
            title: 'CT Scan - Head',
            date: '2023-10-20',
            type: 'Imaging',
            summary: 'Non-contrast CT head shows no acute intracranial hemorrhage, mass effect, or midline shift.',
            aiInsights: [
                'Ventricles are normal in size.',
                'No acute territorial infarcts.',
                'Paranasal sinuses are clear.'
            ],
            audioDuration: '1:00',
            fileSize: '8.5 MB',
            isSynced: false
        }
    ],
    printData: {
        data: null,
        type: null
    }
};

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [healthData, setHealthData] = useState<HealthData>(() => {
        const saved = localStorage.getItem('smart_health_sink');
        if (!saved) return DEFAULT_DATA;
        
        try {
            const parsed = JSON.parse(saved);
            // Safety: If lists are empty, infuse from DEFAULT_DATA for a fresh demo feel
            // Use spread to ensure any new fields in DEFAULT_DATA are present
            return {
                ...DEFAULT_DATA,
                ...parsed,
                prescriptions: (parsed.prescriptions || []).length === 0 ? DEFAULT_DATA.prescriptions : (parsed.prescriptions || []),
                labResults: (parsed.labResults || []).length === 0 ? DEFAULT_DATA.labResults : (parsed.labResults || []),
                reports: (parsed.reports || []).length === 0 ? DEFAULT_DATA.reports : (parsed.reports || []),
                notifications: (parsed.notifications || []).length === 0 ? DEFAULT_DATA.notifications : (parsed.notifications || [])
            };
        } catch (e) {
            console.error("Failed to parse health data, resetting to default.", e);
            return DEFAULT_DATA;
        }
    });

    useEffect(() => {
        localStorage.setItem('smart_health_sink', JSON.stringify(healthData));
    }, [healthData]);

    const updateField = (field: keyof HealthData, value: any) => {
        setHealthData(prev => ({ ...prev, [field]: value }));
    };

    const addListItem = (listName: string, item: any) => {
        setHealthData(prev => ({
            ...prev,
            [listName]: [...(prev[listName as keyof HealthData] as any[]), item]
        }));
    };

    const removeListItem = (listName: string, index: number) => {
        setHealthData(prev => ({
            ...prev,
            [listName]: (prev[listName as keyof HealthData] as any[]).filter((_, i) => i !== index)
        }));
    };

    const syncReportData = (results: LabResult[]) => {
        setHealthData(prev => ({
            ...prev,
            labResults: [...results, ...prev.labResults].slice(0, 10) // Keep last 10
        }));
    };

    const addReport = (report: MedicalReport) => {
        setHealthData(prev => ({
            ...prev,
            reports: [report, ...prev.reports]
        }));
    };

    const updateReport = (id: string, updates: Partial<MedicalReport>) => {
        setHealthData(prev => ({
            ...prev,
            reports: prev.reports.map(r => r.id === id ? { ...r, ...updates } : r)
        }));
    };

    const handleConnectionAction = (requestId: string, action: 'approved' | 'denied') => {
        setHealthData(prev => {
            const updatedRequests = prev.connectionRequests.map(r => 
                r.id === requestId ? { ...r, status: action } : r
            );

            const request = prev.connectionRequests.find(r => r.id === requestId);
            let updatedApproved = [...prev.approvedDoctorIds];
            if (request && action === 'approved' && !updatedApproved.includes(request.doctorId)) {
                updatedApproved.push(request.doctorId);
                
                // Add notification for care connection
                const newNote: Notification = {
                    id: Math.random().toString(36).substr(2, 9),
                    title: 'Care Team Updated',
                    message: `Dr. ${request.doctorName} is now an approved care provider.`,
                    type: 'connection',
                    timestamp: new Date().toISOString(),
                    read: false,
                    link: '/patient/consultations'
                };
                return {
                    ...prev,
                    connectionRequests: updatedRequests,
                    approvedDoctorIds: updatedApproved,
                    notifications: [newNote, ...prev.notifications]
                };
            }

            return {
                ...prev,
                connectionRequests: updatedRequests,
                approvedDoctorIds: updatedApproved
            };
        });
    };

    const addPrescription = (prescription: Omit<Prescription, 'id' | 'date' | 'status'>) => {
        const newPx: Prescription = {
            ...prescription,
            id: `RX-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Active'
        };

        const newNote: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'New Clinical Directive',
            message: `Dr. ${prescription.doctorName} has issued a new prescription for ${prescription.diagnosis}.`,
            type: 'prescription',
            timestamp: new Date().toISOString(),
            read: false,
            link: '/patient/prescriptions'
        };

        setHealthData(prev => ({
            ...prev,
            prescriptions: [newPx, ...prev.prescriptions],
            notifications: [newNote, ...prev.notifications]
        }));
    };

    const addNotification = (title: string, message: string, type: Notification['type'], link?: string) => {
        const newNote: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            message,
            type,
            timestamp: new Date().toISOString(),
            read: false,
            link
        };
        setHealthData(prev => ({
            ...prev,
            notifications: [newNote, ...prev.notifications]
        }));
    };

    const markNotificationRead = (id: string) => {
        setHealthData(prev => ({
            ...prev,
            notifications: prev.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        }));
    };

    const clearNotifications = () => {
        setHealthData(prev => ({ ...prev, notifications: [] }));
    };

    const requestConnection = (doctor: { id: string, name: string, specialty: string }) => {
        const newReq: ConnectionRequest = {
            id: Math.random().toString(36).substr(2, 9),
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorSpecialty: doctor.specialty,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        const newNote: Notification = {
            id: Math.random().toString(36).substr(2, 9),
            title: 'Connection Requested',
            message: `Doctor ${doctor.name} has requested clinical access to your profile.`,
            type: 'connection',
            timestamp: new Date().toISOString(),
            read: false,
            link: '/patient/consultations'
        };

        setHealthData(prev => ({
            ...prev,
            connectionRequests: [newReq, ...prev.connectionRequests],
            notifications: [newNote, ...prev.notifications]
        }));
    };

    const setPrintData = (type: 'prescription' | 'labReport' | 'tracking' | 'dietPlan' | null, data: any = null) => {
        setHealthData(prev => ({
            ...prev,
            printData: { type, data }
        }));
    };

    const resetToDefault = () => {
        setHealthData(DEFAULT_DATA);
    };

    return (
        <HealthContext.Provider value={{
            healthData,
            updateField,
            updateReport,
            addListItem: addListItem as HealthContextType['addListItem'],
            removeListItem: removeListItem as HealthContextType['removeListItem'],
            syncReportData,
            addReport,
            handleConnectionAction,
            requestConnection,
            addPrescription,
            addNotification,
            markNotificationRead,
            clearNotifications,
            setPrintData,
            resetToDefault
        }}>
            {children}
        </HealthContext.Provider>
    );
};

export const useHealth = () => {
    const context = useContext(HealthContext);
    if (!context) throw new Error('useHealth must be used within a HealthProvider');
    return context;
};
