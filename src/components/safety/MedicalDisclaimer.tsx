import { ShieldAlert } from 'lucide-react';

export const MedicalDisclaimer = () => {
    return (
        <div className="mt-8 p-4 bg-gray-50 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
                <ShieldAlert className="w-3 h-3" />
                <span>
                    **Medical Disclaimer**: This application is a support tool and does not replace professional medical judgment.
                    All AI-generated suggestions must be verified by a qualified healthcare provider.
                </span>
            </p>
        </div>
    );
};
