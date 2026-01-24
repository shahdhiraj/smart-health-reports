import { useState } from 'react';
import { Brain, Sparkles, FileText, Activity, Save } from 'lucide-react';

const AISettings = () => {
    const [settings, setSettings] = useState({
        clinicalDecisionSupport: true,
        patientRiskScoring: true,
        autoGenerateReports: false,
        imageAnalysis: true,
        naturalLanguageSearch: false,
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">AI Configuration</h1>
                <p className="text-gray-500 mt-2">Manage global AI features and model parameters.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                            <Brain className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Core AI Features</h2>
                    </div>

                    <div className="space-y-6">
                        <SettingToggle
                            icon={<Activity className="w-5 h-5 text-blue-500" />}
                            title="Clinical Decision Support"
                            description="Enable AI-driven treatment suggestions and drug interaction warnings for doctors."
                            enabled={settings.clinicalDecisionSupport}
                            onToggle={() => toggleSetting('clinicalDecisionSupport')}
                        />
                        <div className="h-px bg-gray-50" />
                        <SettingToggle
                            icon={<Activity className="w-5 h-5 text-red-500" />}
                            title="Patient Risk Scoring"
                            description="Automatically calculate high-risk patient scores based on daily vitals and history."
                            enabled={settings.patientRiskScoring}
                            onToggle={() => toggleSetting('patientRiskScoring')}
                        />
                        <div className="h-px bg-gray-50" />
                        <SettingToggle
                            icon={<FileText className="w-5 h-5 text-green-500" />}
                            title="Auto-Generate Summaries"
                            description="Draft consultation summaries automatically using transcription."
                            enabled={settings.autoGenerateReports}
                            onToggle={() => toggleSetting('autoGenerateReports')}
                        />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Advanced Modules</h2>
                    </div>

                    <div className="space-y-6">
                        <SettingToggle
                            icon={<Brain className="w-5 h-5 text-indigo-500" />}
                            title="Report Trends Analysis"
                            description="Analyze historical PDF reports for trend extraction."
                            enabled={settings.imageAnalysis}
                            onToggle={() => toggleSetting('imageAnalysis')}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                        Reset Defaults
                    </button>
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
                        <Save className="w-5 h-5" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

const SettingToggle = ({ icon, title, description, enabled, onToggle }: any) => (
    <div className="flex items-start justify-between">
        <div className="flex gap-4">
            <div className="mt-1 p-2 bg-gray-50 rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 max-w-sm mt-1">{description}</p>
            </div>
        </div>
        <button
            onClick={onToggle}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out shrink-0 ${enabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
        >
            <span
                className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </button>
    </div>
);

export default AISettings;
