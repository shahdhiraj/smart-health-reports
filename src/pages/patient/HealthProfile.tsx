import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Activity, Heart, AlertCircle, Shield,
    Coffee, FileText, Plus, Trash2,
    Save
} from 'lucide-react';

const HealthProfile = () => {
    const [formData, setFormData] = useState({
        // Personal
        fullName: 'John Doe',
        dateOfBirth: '1985-06-15',
        gender: 'Male',
        bloodGroup: 'O+',
        height: '175',
        weight: '70',
        maritalStatus: 'Married',
        occupation: 'Software Engineer',
        nationalId: '123-456-789',
        organDonor: true,

        // Medical
        allergies: '',
        chronicConditions: '',
        surgeries: '',
        familyHistory: {
            diabetes: false,
            hypertension: false,
            heartDisease: false,
            cancer: false,
            asthma: false,
            other: ''
        },

        // Medications List (Dynamic)
        currentMedications: [
            { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Daily' }
        ],

        // Lifestyle
        smoking: 'Non-smoker',
        alcohol: 'Occasional',
        exercise: 'Moderate (3-4 times/week)',
        diet: 'Non-Vegetarian',
        sleepHours: '7-8 hours',
        stressLevel: 'Moderate',

        // Insurance
        insuranceProvider: '',
        policyNumber: '',
        policyExpiry: '',

        // Emergency
        emergencyName: '',
        emergencyRelation: '',
        emergencyPhone: ''
    });

    const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFamilyHistoryChange = (condition: string) => {
        setFormData(prev => ({
            ...prev,
            familyHistory: {
                ...prev.familyHistory,
                // @ts-ignore
                [condition]: !prev.familyHistory[condition]
            }
        }));
    };

    const addMedication = () => {
        if (newMed.name) {
            setFormData(prev => ({
                ...prev,
                currentMedications: [...prev.currentMedications, newMed]
            }));
            setNewMed({ name: '', dosage: '', frequency: '' });
        }
    };

    const removeMedication = (index: number) => {
        setFormData(prev => ({
            ...prev,
            currentMedications: prev.currentMedications.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved:', formData);
        alert('Complete health profile updated successfully!');
    };

    const SectionHeader = ({ icon: Icon, title, color }: { icon: any, title: string, color: string }) => (
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className={`p-2 bg-${color}-50 rounded-lg text-${color}-600`}>
                <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
    );

    const InputField = ({ label, name, type = 'text', placeholder, value, fullWidth = false }: any) => (
        <div className={fullWidth ? 'col-span-full' : ''}>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all font-medium text-gray-800"
            />
        </div>
    );

    const SelectField = ({ label, name, options, value }: any) => (
        <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{label}</label>
            <select
                name={name}
                value={value}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all bg-white font-medium text-gray-800"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Complete Health Record</h1>
                    <p className="text-gray-500 mt-2">Your comprehensive digital health identity.</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg">
                    <Shield className="w-4 h-4" />
                    Profile Strength: Excellent
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Personal & Social Information */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <SectionHeader icon={User} title="Personal & Social Information" color="primary" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <InputField label="Full Name" name="fullName" value={formData.fullName} />
                        <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} />
                        <SelectField
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            options={['Male', 'Female', 'Other', 'Prefer not to say']}
                        />
                        <SelectField
                            label="Marital Status"
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            options={['Single', 'Married', 'Divorced', 'Widowed']}
                        />
                        <InputField label="Occupation" name="occupation" value={formData.occupation} />
                        <InputField label="National ID / SSN" name="nationalId" value={formData.nationalId} />
                        <div className="flex items-center h-full pt-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${formData.organDonor ? 'bg-primary-600' : 'bg-gray-200'}`}
                                    onClick={() => setFormData(prev => ({ ...prev, organDonor: !prev.organDonor }))}>
                                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${formData.organDonor ? 'translate-x-6' : ''}`} />
                                </div>
                                <span className="font-medium text-gray-700">Organ Donor</span>
                            </label>
                        </div>
                    </div>
                </motion.div>

                {/* Physical Profile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <SectionHeader icon={Activity} title="Physical Profile" color="blue" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <SelectField
                            label="Blood Group"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']}
                        />
                        <InputField label="Height (cm)" name="height" type="number" value={formData.height} />
                        <InputField label="Weight (kg)" name="weight" type="number" value={formData.weight} />
                        <div className="p-4 bg-gray-50 rounded-xl flex flex-col justify-center items-center">
                            <span className="text-xs font-bold text-gray-400 uppercase">BMI</span>
                            <span className="text-2xl font-bold text-gray-800">
                                {((Number(formData.weight) / ((Number(formData.height) / 100) ** 2)) || 0).toFixed(1)}
                            </span>
                            <span className="text-xs font-medium text-green-600">Normal Weight</span>
                        </div>
                    </div>
                </motion.div>

                {/* Comprehensive Medical History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <SectionHeader icon={Heart} title="Medical History" color="rose" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Chronic Conditions</label>
                            <textarea
                                name="chronicConditions"
                                value={formData.chronicConditions}
                                onChange={handleChange}
                                rows={3}
                                placeholder="List conditions like Diabetes, Hypertension..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Known Allergies</label>
                            <textarea
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Food, Drug, or Environmental allergies..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all resize-none font-medium"
                            />
                        </div>
                    </div>

                    <div className="mb-8">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Family Medical History</label>
                        <div className="flex flex-wrap gap-4">
                            {Object.entries(formData.familyHistory).map(([key, value]) => {
                                if (key === 'other') return null;
                                return (
                                    <label key={key} className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer transition-all ${value ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}>
                                        <input
                                            type="checkbox"
                                            checked={value as boolean}
                                            onChange={() => handleFamilyHistoryChange(key)}
                                            className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                                        />
                                        <span className="capitalize font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Medications List */}
                    <div className="bg-gray-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Current Medications
                            </h3>
                        </div>

                        <div className="space-y-3 mb-4">
                            {formData.currentMedications.map((med, index) => (
                                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold text-xs">Rx</div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{med.name}</p>
                                            <p className="text-xs text-gray-500">{med.dosage} • {med.frequency}</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMedication(index)}
                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <input
                                placeholder="Drug Name"
                                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                                value={newMed.name}
                                onChange={e => setNewMed({ ...newMed, name: e.target.value })}
                            />
                            <input
                                placeholder="Dosage"
                                className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                                value={newMed.dosage}
                                onChange={e => setNewMed({ ...newMed, dosage: e.target.value })}
                            />
                            <input
                                placeholder="Freq"
                                className="w-24 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-primary-500"
                                value={newMed.frequency}
                                onChange={e => setNewMed({ ...newMed, frequency: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={addMedication}
                                className="bg-primary-600 text-white p-2 rounded-lg hover:bg-primary-700"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Lifestyle & Habits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                >
                    <SectionHeader icon={Coffee} title="Lifestyle & Habits" color="emerald" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <SelectField
                            label="Smoking Status"
                            name="smoking"
                            value={formData.smoking}
                            options={['Non-smoker', 'Former Smoker', 'Occasional', 'Regular']}
                        />
                        <SelectField
                            label="Alcohol Consumption"
                            name="alcohol"
                            value={formData.alcohol}
                            options={['None', 'Occasional', 'Social', 'Regular']}
                        />
                        <SelectField
                            label="Exercise Frequency"
                            name="exercise"
                            value={formData.exercise}
                            options={['Sedentary', 'Light', 'Moderate', 'Active', 'Athlete']}
                        />
                        <SelectField
                            label="Dietary Preference"
                            name="diet"
                            value={formData.diet}
                            options={['Non-Vegetarian', 'Vegetarian', 'Vegan', 'Keto', 'Other']}
                        />
                        <SelectField
                            label="Average Sleep"
                            name="sleepHours"
                            value={formData.sleepHours}
                            options={['< 5 hours', '5-6 hours', '7-8 hours', '9+ hours']}
                        />
                        <SelectField
                            label="Stress Level"
                            name="stressLevel"
                            value={formData.stressLevel}
                            options={['Low', 'Moderate', 'High', 'Severe']}
                        />
                    </div>
                </motion.div>

                {/* Emergency & Insurance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <SectionHeader icon={Shield} title="Insurance" color="blue" />
                        <div className="space-y-4">
                            <InputField label="Insurance Provider" name="insuranceProvider" placeholder="e.g. Blue Cross" value={formData.insuranceProvider} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Policy Number" name="policyNumber" value={formData.policyNumber} />
                                <InputField label="Expiry Date" name="policyExpiry" type="date" value={formData.policyExpiry} />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <SectionHeader icon={AlertCircle} title="Emergency Contact" color="orange" />
                        <div className="space-y-4">
                            <InputField label="Primary Contact Name" name="emergencyName" value={formData.emergencyName} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Relationship" name="emergencyRelation" value={formData.emergencyRelation} />
                                <InputField label="Phone Number" name="emergencyPhone" value={formData.emergencyPhone} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-end pt-4 pb-12"
                >
                    <button
                        type="submit"
                        className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 font-bold"
                    >
                        <Save className="w-5 h-5" />
                        Save Comprehensive Profile
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default HealthProfile;
