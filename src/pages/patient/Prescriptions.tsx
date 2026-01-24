import { motion } from 'framer-motion';
import { Pill, Calendar, User, FileText, Download, ChevronRight } from 'lucide-react';

const Prescriptions = () => {
    // Mock data
    const prescriptions = [
        {
            id: 1,
            doctor: 'Dr. Sarah Smith',
            specialty: 'Cardiologist',
            date: '2024-03-15',
            diagnosis: 'Hypertension',
            medicines: [
                { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily' },
                { name: 'Atorvastatin', dosage: '10mg', frequency: 'At night' },
            ],
            status: 'Active',
        },
        {
            id: 2,
            doctor: 'Dr. James Wilson',
            specialty: 'General Physician',
            date: '2024-02-10',
            diagnosis: 'Seasonal Flu',
            medicines: [
                { name: 'Paracetamol', dosage: '500mg', frequency: 'As needed' },
                { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily' },
            ],
            status: 'Completed',
        },
    ];

    return (
        <div className="w-full">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Prescriptions</h1>
                    <p className="text-gray-500 mt-2">View and manage your digital prescriptions.</p>
                </div>
                <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Filter by Date</span>
                </button>
            </div>

            <div className="grid gap-6">
                {prescriptions.map((prescription, index) => (
                    <motion.div
                        key={prescription.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{prescription.diagnosis}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <User className="w-4 h-4" />
                                            <span>{prescription.doctor}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                            <span>{prescription.specialty}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${prescription.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {prescription.status}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                        <Calendar className="w-3 h-3" />
                                        {prescription.date}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                    <Pill className="w-4 h-4" />
                                    Prescribed Medicines
                                </h4>
                                <div className="grid gap-3">
                                    {prescription.medicines.map((med, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-800">{med.name}</p>
                                                <p className="text-xs text-gray-500">{med.dosage}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded-md">{med.frequency}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm px-4 py-2 hover:bg-primary-50 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" />
                                    Download PDF
                                </button>
                                <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                                    View Details
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Prescriptions;
