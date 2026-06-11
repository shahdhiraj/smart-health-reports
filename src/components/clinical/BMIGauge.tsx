import React from 'react';
import { Activity } from 'lucide-react';

interface BMIGaugeProps {
    bmi: number;
    showTitle?: boolean;
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, showTitle = true }) => {
    const getCategory = (val: number) => {
        if (val < 18.5) return { label: 'UNDERWEIGHT', color: 'bg-amber-400', textColor: 'text-amber-600', bgColor: 'bg-amber-50', position: (val / 18.5) * 20 };
        if (val < 25) return { label: 'HEALTHY', color: 'bg-emerald-500', textColor: 'text-emerald-600', bgColor: 'bg-emerald-50', position: 25 + ((val - 18.5) / 6.5) * 25 };
        if (val < 30) return { label: 'OVERWEIGHT', color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', position: 55 + ((val - 25) / 5) * 20 };
        return { label: 'OBESE', color: 'bg-rose-500', textColor: 'text-rose-600', bgColor: 'bg-rose-50', position: 80 + Math.min((val - 30) / 10 * 20, 20) };
    };

    const category = getCategory(bmi);

    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-md transition-all">
            {showTitle && (
                <div className="flex items-center justify-between mb-3">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] font-sans">
                        BMI INDEX & CATEGORY
                    </p>
                    <Activity className="w-3 h-3 text-gray-300" />
                </div>
            )}
            
            <div className="flex items-center gap-4">
                <div className="flex flex-col border-r border-gray-100 pr-4">
                    <span className="text-2xl font-bold text-gray-900 tracking-tighter leading-none">
                        {bmi.toFixed(1)}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5 italic">
                        KG/M²
                    </span>
                </div>
                
                <div className="flex-1 space-y-3">
                    <div className="flex justify-start">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${category.bgColor} ${category.textColor} border border-${category.textColor.split('-')[1]}-100`}>
                            {category.label}
                        </span>
                    </div>
                    
                    <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                            className={`absolute top-0 left-0 h-full ${category.color} rounded-full transition-all duration-1000 ease-out shadow-sm shadow-${category.color.split('-')[1]}-400/10`}
                            style={{ width: `${category.position}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BMIGauge;
