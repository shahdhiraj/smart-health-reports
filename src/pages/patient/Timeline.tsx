import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
    FileText, Pill, Heart, Stethoscope, 
    Activity, Clock, ChevronRight, ShieldAlert,
    Syringe, FileBadge
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

type TimelineEvent = {
    id: string;
    date: Date;
    type: 'report' | 'prescription' | 'surgery' | 'consultation' | 'vaccination' | 'certificate';
    title: string;
    description: string;
    icon: any;
    color: string;
};

const Timeline = () => {
    const { healthData } = useHealth();

    const timelineEvents = useMemo(() => {
        const events: TimelineEvent[] = [];

        // 1. Add Reports (which includes Vaccinations, Health Certificates, Labs, Imaging)
        healthData.reports.forEach(report => {
            let color = 'blue';
            let icon = FileText;
            let type: TimelineEvent['type'] = 'report';

            if (report.type === 'Vaccination Record') {
                color = 'emerald';
                icon = Syringe;
                type = 'vaccination';
            } else if (report.type === 'Health Certificate') {
                color = 'indigo';
                icon = FileBadge;
                type = 'certificate';
            } else if (report.type === 'Imaging') {
                color = 'purple';
                icon = Activity;
            }

            events.push({
                id: report.id,
                date: new Date(report.date),
                type,
                title: report.title,
                description: report.summary,
                icon,
                color
            });
        });

        // 2. Add Prescriptions
        healthData.prescriptions.forEach(rx => {
            events.push({
                id: rx.id,
                date: new Date(rx.date),
                type: 'prescription',
                title: `Prescription by ${rx.doctorName}`,
                description: `${rx.medications.length} medications prescribed.`,
                icon: Pill,
                color: 'emerald'
            });
        });

        // 3. Add Surgeries
        healthData.surgeries.forEach((surg, idx) => {
            events.push({
                id: `surg-${idx}`,
                date: new Date(surg.date),
                type: 'surgery',
                title: surg.name,
                description: `Performed at ${surg.hospital}`,
                icon: Heart,
                color: 'rose'
            });
        });

        // 4. Add Consultations
        healthData.connectionRequests.forEach((req, idx) => {
            events.push({
                id: `cons-${idx}`,
                date: new Date(req.timestamp),
                type: 'consultation',
                title: `Consultation with ${req.doctorName}`,
                description: `${req.doctorSpecialty} - Status: ${req.status}`,
                icon: Stethoscope,
                color: 'indigo'
            });
        });

        // 5. Sort strictly chronologically (newest first)
        return events.sort((a, b) => b.date.getTime() - a.date.getTime());
    }, [healthData]);

    return (
        <div className="w-full pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
                <div>
                    <h1 className="page-title">Lifetime Health Timeline</h1>
                    <p className="page-subtitle">A chronological journey of your medical history.</p>
                </div>
                
                {/* Ongoing Conditions Summary */}
                {healthData.chronicConditions.length > 0 && (
                    <div className="bg-rose-50/80 border border-rose-100 p-4 rounded-2xl flex items-start gap-4 max-w-sm shadow-sm">
                        <ShieldAlert className="w-6 h-6 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                        <div>
                            <h3 className="text-sm font-medium text-rose-800 uppercase tracking-widest mb-1">Ongoing Conditions</h3>
                            <div className="flex flex-wrap gap-2">
                                {healthData.chronicConditions.map((c, i) => (
                                    <span key={i} className="text-[10px] font-medium text-rose-600 bg-rose-100/50 px-2 py-0.5 rounded border border-rose-200/50 uppercase tracking-widest">
                                        {c}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Timeline View */}
            <div className="relative">
                {/* Vertical Line Desktop */}
                <div className="hidden md:block absolute left-1/2 -ml-[1.5px] top-4 bottom-4 w-[3px] bg-gradient-to-b from-primary-200 via-gray-200 to-transparent rounded-full shadow-[0_0_10px_rgba(0,0,0,0.05)]" />
                {/* Vertical Line Mobile */}
                <div className="md:hidden absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-200 via-gray-200 to-transparent" />

                <div className="space-y-12">
                    {timelineEvents.map((event, index) => {
                        const colorMap: Record<string, any> = {
                            blue: { bgLight: 'bg-blue-50', text: 'text-blue-600', bgDark: 'bg-blue-500', border: 'border-blue-100/50' },
                            emerald: { bgLight: 'bg-emerald-50', text: 'text-emerald-600', bgDark: 'bg-emerald-500', border: 'border-emerald-100/50' },
                            indigo: { bgLight: 'bg-indigo-50', text: 'text-indigo-600', bgDark: 'bg-indigo-500', border: 'border-indigo-100/50' },
                            purple: { bgLight: 'bg-purple-50', text: 'text-purple-600', bgDark: 'bg-purple-500', border: 'border-purple-100/50' },
                            rose: { bgLight: 'bg-rose-50', text: 'text-rose-600', bgDark: 'bg-rose-500', border: 'border-rose-100/50' }
                        };
                        const c = colorMap[event.color] || colorMap.blue;
                        
                        const isEven = index % 2 === 0;

                        return (
                        <motion.div 
                            key={event.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`relative flex flex-col md:flex-row items-start md:items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Mobile Date Header (Only visible on small screens) */}
                            <div className="flex md:hidden items-start gap-8 w-full mb-4 px-4">
                                <div className="w-20 pt-3 flex flex-col items-end text-right shrink-0">
                                    <span className="text-xl font-normal text-gray-700">{event.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{event.date.getFullYear()}</span>
                                </div>
                                <div className="relative shrink-0">
                                    <div className={`w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 duration-300`}>
                                        <div className={`w-10 h-10 rounded-xl ${c.bgLight} flex items-center justify-center`}>
                                            <event.icon className={`w-5 h-5 ${c.text}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Center Node */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center shrink-0 z-10">
                                <div className={`w-16 h-16 bg-white rounded-full shadow-sm border-4 border-white flex items-center justify-center relative transition-all group-hover:scale-110 duration-300 group-hover:shadow-sm`}>
                                    <div className={`w-12 h-12 rounded-full ${c.bgLight} flex items-center justify-center`}>
                                        <event.icon className={`w-6 h-6 ${c.text}`} />
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className={`flex-1 w-full md:w-1/2 px-4 md:px-12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                <div className={`flex justify-between items-start mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    <div>
                                        <div className={`flex items-center gap-3 mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                                            <span className={`text-[10px] font-medium ${c.text} ${c.bgLight} px-3 py-1 rounded-full uppercase tracking-widest border ${c.border}`}>
                                                {event.type.replace('-', ' ')}
                                            </span>
                                        </div>
                                        <h3 className="card-title">{event.title}</h3>
                                        <div className={`hidden md:flex flex-col text-gray-500 mt-1 ${isEven ? 'items-end' : 'items-start'}`}>
                                            <span className="text-sm font-medium">{event.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={`bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-sm transition-all duration-300 relative ${isEven ? 'rounded-tr-md' : 'rounded-tl-md'}`}>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                        {event.description}
                                    </p>
                                    
                                    <button className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors shadow-sm ${isEven ? '-left-4' : '-right-4'}`}>
                                        <ChevronRight className={`w-4 h-4 ${isEven ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Empty spacer for the other side on desktop */}
                            <div className="hidden md:block flex-1 w-1/2" />
                        </motion.div>
                        );
                    })}
                </div>

                {timelineEvents.length === 0 && (
                    <div className="text-center py-20">
                        <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="card-title">No History Available</h3>
                        <p className="text-gray-500 mt-2">Your timeline will populate as records are added.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Timeline;
