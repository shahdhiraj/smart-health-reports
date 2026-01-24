import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, FileText, User } from 'lucide-react';

const PrescriptionEditor = () => {
    const [medicines, setMedicines] = useState([
        { name: '', dosage: '', frequency: '', duration: '' }
    ]);

    const addMedicine = () => {
        setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '' }]);
    };

    const removeMedicine = (index: number) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newMedicines = [...medicines];
        newMedicines[index] = { ...newMedicines[index], [field]: value };
        setMedicines(newMedicines);
    };

    return (
        <div className="w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">New Prescription</h1>
                <p className="text-gray-500 mt-2">Create and issue a digital prescription.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Patient Details Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary-600" />
                            Patient Details
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
                                <select className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all">
                                    <option>John Doe</option>
                                    <option>Jane Smith</option>
                                    <option>Robert Johnson</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                                    placeholder="Enter diagnosis..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Medicines Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary-600" />
                                Prescribed Medicines
                            </h2>
                            <button
                                onClick={addMedicine}
                                className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Medicine
                            </button>
                        </div>

                        <div className="space-y-4">
                            {medicines.map((med, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group"
                                >
                                    <button
                                        onClick={() => removeMedicine(index)}
                                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <input
                                                type="text"
                                                placeholder="Medicine Name"
                                                value={med.name}
                                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Dosage (e.g. 500mg)"
                                                value={med.dosage}
                                                onChange={(e) => handleChange(index, 'dosage', e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Frequency (e.g. 2x daily)"
                                                value={med.frequency}
                                                onChange={(e) => handleChange(index, 'frequency', e.target.value)}
                                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none bg-white"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium transition-colors">
                            Save Draft
                        </button>
                        <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200">
                            <Save className="w-4 h-4" />
                            Issue Prescription
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionEditor;
