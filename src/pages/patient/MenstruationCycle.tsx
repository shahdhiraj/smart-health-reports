import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, Activity, Plus, Save, ActivitySquare, Baby, CheckCircle2,
    Sprout, Info, ShieldCheck, SunMedium, Scale, Smile, Meh, Frown,
    Flame, Footprints, Sparkles, Loader2, Target, ChevronRight, ChevronLeft
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';

const PREGNANCY_STAGES = [
    { start: 0, end: 4, size: "Poppy Seed", img: "/poppy_seed.png", desc: "Your baby's neural tube is forming." },
    { start: 5, end: 7, size: "Sweet Pea", img: "/sweet_pea.png", desc: "Major organs are assembling. The tiny heart starts beating!" },
    { start: 8, end: 11, size: "Raspberry", img: "/raspberry.png", desc: "Cartilage and bones form. Constant movement begins." },
    { start: 12, end: 15, size: "Plum", img: "/plum.png", desc: "Reflexes develop nicely. Baby might suck their thumb!" },
    { start: 16, end: 19, size: "Avocado", img: "/avocado.png", desc: "Skeleton hardening. First 'flutters' or quickening occurs." },
    { start: 20, end: 23, size: "Banana", img: "/nano_banana.png", desc: "Halfway! Practicing swallowing, taste buds developing." },
    { start: 24, end: 27, size: "Ear of Corn", img: "/ear_of_corn.png", desc: "Lungs develop surfactant. Actively gaining baby fat." },
    { start: 28, end: 31, size: "Eggplant", img: "/eggplant.png", desc: "Trimester 3! Eyesight developing, can sense light." },
    { start: 32, end: 35, size: "Squash", img: "/squash.png", desc: "Taking up maximum room. Brain growing rapidly." },
    { start: 36, end: 40, size: "Watermelon", img: "/watermelon.png", desc: "Almost time! Storing energy for delivery." },
];

const CARE_IMAGES = [
    "/pregnant_care.png",
    "/care_2.png",
    "/care_3.png"
];

const getPregnancyDetails = (weeks: number) => {
    let trimester = 1;
    let careTips = ["Start a daily prenatal vitamin with Folic Acid", "Avoid raw meats and unpasteurized dairy", "Schedule your first OB-GYN ultrasound visit", "Stay heavily hydrated and rest well"];    

    if (weeks >= 14) trimester = 2;
    if (weeks >= 28) trimester = 3;

    if (weeks >= 12 && weeks < 16) { 
        careTips = ["Maintain hydration levels", "Start gentle stretching or prenatal yoga", "Discuss NIPT genetic screening with your doctor", "Stock up on comfortable, stretchy clothing"]; 
    }
    else if (weeks >= 16 && weeks < 20) { 
        careTips = ["Schedule your 20-week anatomy scan", "Try side-sleeping to improve blood flow", "Start moisturizing your belly to prevent itching"]; 
    }
    else if (weeks >= 20 && weeks < 24) { 
        careTips = ["Have your anatomy scan", "Sleep on your side, preferably the left", "Look into childbirth or breastfeeding classes"]; 
    }
    else if (weeks >= 24 && weeks < 28) { 
        careTips = ["Prepare for your glucose screening test", "Discuss birth plan preferences", "Start organizing the nursery"]; 
    }
    else if (weeks >= 28 && weeks < 32) { 
        careTips = ["Start monitoring daily kick counts", "Plan your maternity leave", "Take a childbirth class if you haven't yet"]; 
    }
    else if (weeks >= 32 && weeks < 36) { 
        careTips = ["Pack your hospital bag", "Finalize pediatric care choices", "Practice breathing techniques"]; 
    }
    else if (weeks >= 36) { 
        careTips = ["Ensure the car seat is properly installed", "Rest as much as possible", "Keep your hospital bag in the car"]; 
    }

    const currentStage = PREGNANCY_STAGES.find(s => weeks >= s.start && weeks <= s.end) || PREGNANCY_STAGES[0];
    return { size: currentStage.size, trimester, description: currentStage.desc, careTips };
};

const getDailyInsight = (day: number) => {
    const insights = [
        "Day 1: Hydration Check! Your blood volume is expanding by up to 50% to support the baby. Drink plenty of water today.",
        "Day 2: Structural Focus! Your body is working overtime. Make sure you are taking small breaks to rest your legs and back.",
        "Day 3: Nutrition Goal! A healthy, varied diet is crucial right now. Focus on absorbing protein, iron, and leafy greens.",
        "Day 4: Circulation Boost! Mild exercise, like a 20-minute rhythmic walk, can significantly help boost your changing circulation.",
        "Day 5: Immunity Shield! Taking your prenatal vitamins daily is your best defense against developmental gaps and fatigue.",
        "Day 6: Posture Check! Your center of gravity is actively shifting. Try practicing good, aligned posture and wear supportive shoes.",
        "Day 7: Bonding Time! Talk, read, or sing out loud. During later trimesters, your baby can actively hear and recognize your voice."
    ];
    return insights[day % 7];
};

const generateAISymptomSuggestions = (symptoms: string) => {
    const s = symptoms.toLowerCase();
    const suggestions = [];

    if (s.includes('nausea') || s.includes('vomit') || s.includes('sickness')) {
        suggestions.push("Nausea/Morning Sickness: Eat small, frequent meals. Give ginger tea or vitamin B6 a try. Keep crackers by your bedside to eat before standing up.");
    }
    if (s.includes('backache') || s.includes('back pain') || s.includes('back')) {
        suggestions.push("Backache: Consider a maternity support belt. Practice gentle pelvic tilts. Apply a warm (not hot) compress to the lower back and rest.");
    }
    if (s.includes('heartburn') || s.includes('acid') || s.includes('reflux')) {
        suggestions.push("Heartburn: Avoid spicy, greasy, or acidic foods. Try not to lie down immediately after eating. A small glass of milk may help soothe the acid.");
    }
    if (s.includes('swell') || s.includes('swollen') || s.includes('edema')) {
        suggestions.push("Swelling: Elevate your feet above your heart when sitting down. Limit sodium intake, but paradoxically, keep drinking plenty of water!");
    }
    if (s.includes('fatigue') || s.includes('tired') || s.includes('exhaust')) {
        suggestions.push("Fatigue: Your body is working incredibly hard. Sneak in short daytime naps if possible. Discuss checking your iron levels with your OB-GYN if it persists.");
    }
    if (s.includes('cramp')) {
        suggestions.push("Cramping: For leg cramps, boost magnesium-rich foods, gently stretch your calf muscles before bed, and stay hydrated. (If abdominal cramping is severe, contact a doctor immediately).");
    }
    if (s.includes('headache') || s.includes('migraine')) {
        suggestions.push("Headaches: Focus on hydration, getting enough sleep, and managing stress. A cold compress on the forehead or neck can help. Avoid OTC meds without consulting your doctor first.");
    }
    
    if (suggestions.length === 0 && s.length > 2) {
        suggestions.push("General Guidance: Rest well and closely monitor this symptom. If it becomes severe, unmanageable, or comes with a fever or bleeding, contact your OB-GYN immediately.");
    }

    return suggestions;
};

const MenstruationCycle = () => {
    const { healthData, updateField } = useHealth();
    const sliderRef = useRef<HTMLDivElement>(null);

    // Ensure data exists for backwards compatibility
    const mData = healthData.menstruationData || {
        cycleLength: 28,
        periodLength: 5,
        lastPeriodStart: new Date().toISOString().split('T')[0],
        trackedCycles: [],
        pregnancyStatus: 'none',
        pregnancyLog: []
    };

    const [newCycleStart, setNewCycleStart] = useState('');
    const [newCycleEnd, setNewCycleEnd] = useState('');
    const [cycleSymptoms, setCycleSymptoms] = useState('');

    // Pregnancy Log State
    const [logMood, setLogMood] = useState('Happy');
    const [logWeight, setLogWeight] = useState('');
    const [logSymptoms, setLogSymptoms] = useState('');
    const [logKicks, setLogKicks] = useState('');
    const [isAnalyzingSymptoms, setIsAnalyzingSymptoms] = useState(false);
    const [currentAISuggestions, setCurrentAISuggestions] = useState<string[]>([]);
    
    // Care banner auto-slider state
    const [currentCareImageIdx, setCurrentCareImageIdx] = useState(0);

    const handleSaveSettings = (cycleLength: number, periodLength: number, lastPeriodStart: string) => {
        updateField('menstruationData', {
            ...mData,
            cycleLength,
            periodLength,
            lastPeriodStart
        });
    };

    const handleLogCycle = () => {
        if (!newCycleStart || !newCycleEnd) return;
        
        const newCycle = {
            startDate: newCycleStart,
            endDate: newCycleEnd,
            symptoms: cycleSymptoms.split(',').map(s => s.trim()).filter(s => s)
        };

        updateField('menstruationData', {
            ...mData,
            trackedCycles: [newCycle, ...(mData.trackedCycles || [])],
            lastPeriodStart: newCycleStart
        });

        setNewCycleStart('');
        setNewCycleEnd('');
        setCycleSymptoms('');
    };

    const handleAnalyzeSymptoms = () => {
        if (!logSymptoms.trim()) return;
        setIsAnalyzingSymptoms(true);
        setCurrentAISuggestions([]);
        
        // Simulate AI loading/thinking time
        setTimeout(() => {
            const results = generateAISymptomSuggestions(logSymptoms);
            setCurrentAISuggestions(results);
            setIsAnalyzingSymptoms(false);
        }, 1200);
    }

    const handleSavePregnancyLog = () => {
        if (!logWeight && !logSymptoms && !logKicks) return;

        const newLog = {
            date: new Date().toISOString().split('T')[0],
            mood: logMood,
            weight: logWeight,
            symptoms: logSymptoms,
            kicks: logKicks,
            aiInsight: currentAISuggestions.length > 0 ? currentAISuggestions : undefined
        };

        updateField('menstruationData', {
            ...mData,
            pregnancyLog: [newLog, ...(mData.pregnancyLog || [])]
        });

        setLogWeight('');
        setLogSymptoms('');
        setLogKicks('');
        setLogMood('Happy');
        setCurrentAISuggestions([]);
    };

    const calculateNextPeriod = () => {
        if (!mData.lastPeriodStart) return 'Not enough data';
        const lastDate = new Date(mData.lastPeriodStart);
        lastDate.setDate(lastDate.getDate() + mData.cycleLength);
        return lastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    const calculateOvulation = () => {
        if (!mData.lastPeriodStart) return 'Not enough data';
        const lastDate = new Date(mData.lastPeriodStart);
        lastDate.setDate(lastDate.getDate() + mData.cycleLength - 14);
        return lastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }

    const calculatePregnancyStats = () => {
        if (!mData.lastPeriodStart) return null;
        const lmp = new Date(mData.lastPeriodStart);
        const today = new Date();
        const diffTime = today.getTime() - lmp.getTime();
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        const weeks = Math.floor(diffDays / 7);
        const days = diffDays % 7;
        
        const dueDate = new Date(lmp.getTime());
        dueDate.setDate(dueDate.getDate() + 280);

        const progressPercent = Math.min(100, Math.max(0, (weeks / 40) * 100));

        return { weeks, days, totalDays: diffDays, progressPercent, dueDate: dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
    };

    const pStats = calculatePregnancyStats();
    const isPregnant = mData.pregnancyStatus === 'pregnant';
    const isTrying = mData.pregnancyStatus === 'trying';
    const pregnancyDetails = pStats ? getPregnancyDetails(pStats.weeks) : null;
    const dailyInsight = pStats ? getDailyInsight(pStats.days) : "";

    // Auto-scroll slider to active stage when component mounts
    useEffect(() => {
        if (isPregnant && pStats && sliderRef.current) {
            const activeIndex = PREGNANCY_STAGES.findIndex(s => pStats.weeks >= s.start && pStats.weeks <= s.end);
            if (activeIndex > 0) {
                const cardWidth = 260; // Approx card width + gap
                sliderRef.current.scrollTo({ left: activeIndex * cardWidth, behavior: 'smooth' });
            }
        }
    }, [isPregnant, pStats?.weeks]);

    const scrollSlider = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const cardWidth = 260;
            const currentScroll = sliderRef.current.scrollLeft;
            sliderRef.current.scrollTo({
                left: direction === 'left' ? currentScroll - cardWidth : currentScroll + cardWidth,
                behavior: 'smooth'
            });
        }
    };

    // Auto-slide the Care Images banner every 5 seconds
    useEffect(() => {
        if (!isPregnant) return;
        const interval = setInterval(() => {
            setCurrentCareImageIdx((prev) => (prev + 1) % CARE_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPregnant]);

    return (
        <div className="w-full pb-20">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="page-title">{isPregnant ? 'Pregnancy Tracking' : 'Cycle Tracking'}</h1>
                <p className="text-gray-500 mt-2">
                    {isPregnant ? 'Monitor your daily pregnancy journey, vitals, and clinical milestones with visual insights.' : 'Monitor and manage your menstruation cycle.'}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. Overview Card (Span 4) */}
                <motion.div className={`lg:col-span-4 rounded-3xl p-8 text-white shadow-sm transition-colors relative overflow-hidden ${isPregnant ? 'bg-gradient-to-br from-indigo-600 to-purple-700 shadow-indigo-500/20' : 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20'}`}>
                    {isPregnant && (
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-10 blur-xl">
                            <Baby className="w-48 h-48" />
                        </div>
                    )}
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="p-3 bg-white/20 rounded-xl">
                            {isPregnant ? <Baby className="w-6 h-6 text-white" /> : <Heart className="w-6 h-6 text-white" />}
                        </div>
                        <h2 className="text-xl font-medium">{isPregnant ? 'Journey Status' : 'Cycle Status'}</h2>
                    </div>

                    <div className="mb-6 text-center flex flex-col justify-center items-center py-6 bg-white/10 rounded-3xl border border-white/20 relative z-10">
                        {isPregnant && pStats && pregnancyDetails ? (
                            <>
                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 rounded-full text-[10px] font-medium uppercase tracking-widest backdrop-blur-sm">
                                    Trimester {pregnancyDetails.trimester}
                                </div>
                                <p className="text-sm font-medium text-white/80 uppercase tracking-widest mb-2 mt-4">Estimated Due Date</p>
                                <h3 className="text-3xl font-medium">{pStats.dueDate}</h3>
                                <div className="mt-4 px-4 py-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <p className="text-sm text-white font-medium">{pStats.weeks} Weeks, {pStats.days} Days</p>
                                </div>

                                <div className="w-full px-6 mt-6">
                                    <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest mb-1.5 opacity-80">
                                        <span>Day 1</span>
                                        <span>Day 280</span>
                                    </div>
                                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }} animate={{ width: `${pStats.progressPercent}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className="h-full bg-white rounded-full"
                                        />
                                    </div>
                                    <p className="text-[9px] font-medium mt-1.5 opacity-70 uppercase tracking-widest text-right">Day {pStats.totalDays} of 280</p>
                                </div>
                            </>
                        ) : isTrying ? (
                            <>
                                <p className="text-sm font-medium text-rose-100 uppercase tracking-widest mb-2">Estimated Ovulation</p>
                                <h3 className="text-3xl font-medium">{calculateOvulation()}</h3>
                                <p className="text-[11px] text-pink-100 mt-2 font-medium uppercase tracking-wider bg-white/20 px-3 py-1 rounded-lg">Trying to Conceive</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm font-medium text-rose-100 uppercase tracking-widest mb-2">Next Predicted Cycle</p>
                                <h3 className="text-3xl font-medium">{calculateNextPeriod()}</h3>
                                <p className="text-sm text-pink-100 mt-2">Based on {mData.cycleLength}-day cycle</p>
                            </>
                        )}
                    </div>

                    <div className="flex bg-white/10 p-1 rounded-xl mb-4 relative z-10 backdrop-blur-md">
                        <button onClick={() => updateField('menstruationData', {...mData, pregnancyStatus: 'none'})} className={`flex-1 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded-lg transition-all ${(!mData.pregnancyStatus || mData.pregnancyStatus === 'none') ? (isPregnant ? 'bg-white text-indigo-800 shadow' : 'bg-white text-rose-800 shadow') : 'text-white/60 hover:text-white'}`}>Tracking</button>
                        <button onClick={() => updateField('menstruationData', {...mData, pregnancyStatus: 'trying'})} className={`flex-1 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded-lg transition-all ${mData.pregnancyStatus === 'trying' ? (isPregnant ? 'bg-white text-indigo-800 shadow' : 'bg-white text-rose-800 shadow') : 'text-white/60 hover:text-white'}`}>Trying</button>
                        <button onClick={() => updateField('menstruationData', {...mData, pregnancyStatus: 'pregnant'})} className={`flex-1 py-1.5 text-[10px] font-medium uppercase tracking-wider rounded-lg transition-all ${mData.pregnancyStatus === 'pregnant' ? 'bg-white text-indigo-800 shadow' : 'text-white/60 hover:text-white'}`}>Pregnant</button>
                    </div>

                    {isPregnant ? (
                        <div className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm relative z-10 mt-4">
                            <div className="flex items-center gap-2 mb-2 opacity-90">
                                <SunMedium className="w-4 h-4" />
                                <h4 className="text-[10px] font-medium uppercase tracking-widest">Today's Insight</h4>
                            </div>
                            <p className="text-sm font-medium leading-relaxed italic">{dailyInsight}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4 relative z-10">
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                                <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Cycle Length</p>
                                <p className="text-xl font-medium">{mData.cycleLength} Days</p>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                                <p className="text-xs text-white/80 uppercase tracking-wider mb-1">Period Length</p>
                                <p className="text-xl font-medium">{mData.periodLength} Days</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* 2. Visual Slider, Care & Logging (Span 8) */}
                <motion.div className="lg:col-span-8 flex flex-col gap-8 w-full max-w-full overflow-hidden">
                    
                    {/* Visual Slider Stage Content (ONLY WHEN PREGNANT) */}
                    {isPregnant && pStats && pregnancyDetails && (
                        <>
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-100 flex flex-col overflow-hidden">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <Sprout className="w-4 h-4" />
                                    </div>
                                    <h3 className="font-medium text-gray-800 p-0 m-0">Visual Timeline Journey</h3>
                                    
                                    <div className="ml-auto flex items-center gap-2">
                                        <button onClick={() => scrollSlider('left')} className="p-1.5 bg-white border border-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => scrollSlider('right')} className="p-1.5 bg-white border border-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors shadow-sm cursor-pointer">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Image Slider */}
                                <div 
                                    ref={sliderRef}
                                    className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x snap-mandatory"
                                >
                                    {PREGNANCY_STAGES.map((stage, idx) => {
                                        const isActive = pStats.weeks >= stage.start && pStats.weeks <= stage.end;
                                        return (
                                            <div 
                                                key={idx} 
                                                className={`min-w-[240px] w-[240px] shrink-0 snap-center rounded-3xl p-4 border-2 transition-all ${isActive ? 'bg-indigo-50 border-indigo-500 shadow-sm transform scale-[1.02]' : 'bg-gray-50 border-transparent opacity-60 grayscale-[30%] hover:opacity-100 hover:grayscale-0'}`}
                                            >
                                                <div className="h-32 w-full rounded-2xl overflow-hidden mb-4 shadow-sm relative group">
                                                    <img src={stage.img} alt={stage.size} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    {isActive && <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-medium px-2 py-1 uppercase tracking-widest rounded-md shadow-sm">Current</div>}
                                                </div>
                                                <p className="text-[10px] font-medium text-indigo-400 uppercase tracking-widest mb-1">Weeks {stage.start}-{stage.end}</p>
                                                <h4 className="text-xl font-medium text-gray-800 mb-2">{stage.size}</h4>
                                                <p className="text-xs text-gray-600 font-medium leading-relaxed italic">"{stage.desc}"</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Clinical Care Guidelines with Suggestion Image */}
                            <div className="bg-white rounded-3xl shadow-sm border border-indigo-100 overflow-hidden grid grid-cols-1 md:grid-cols-5">
                                <div className="md:col-span-2 relative min-h-[250px] md:h-auto overflow-hidden group">
                                    {/* Care Suggestion Auto-sliding Header Image */}
                                    <AnimatePresence mode="wait">
                                        <motion.img 
                                            key={currentCareImageIdx}
                                            src={CARE_IMAGES[currentCareImageIdx]} 
                                            alt="Pregnancy Care" 
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1.2 }}
                                            className="absolute inset-0 w-full h-full object-cover" 
                                        />
                                    </AnimatePresence>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 z-10 pointer-events-none">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                            <h3 className="font-medium text-white">Care Guide</h3>
                                        </div>
                                        <p className="text-xs text-white/80 font-medium tracking-wide">Trimester {pregnancyDetails.trimester} Protocol</p>
                                    </div>
                                    <div className="absolute bottom-6 right-6 flex gap-1.5 z-10">
                                        {CARE_IMAGES.map((_, i) => (
                                            <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-sm ${i === currentCareImageIdx ? 'bg-white scale-125 w-3' : 'bg-white/50'}`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="md:col-span-3 p-6 flex flex-col">
                                    <h4 className="text-sm font-medium text-gray-800 mb-4 px-1">Recommended Actions for Week {pStats.weeks}</h4>
                                    <div className="flex-1 space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                        {pregnancyDetails.careTips.map((tip, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-50/50 hover:bg-emerald-50 transition-colors rounded-xl border border-emerald-100/50">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                <p className="text-sm font-medium text-emerald-900">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Log New Data */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-2 rounded-lg ${isPregnant ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                                {isPregnant ? <ActivitySquare className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                            </div>
                            <h2 className="section-title">{isPregnant ? "Today's Clinical Log" : 'Log Past Cycle'}</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {isPregnant ? (
                                <>
                                    {/* Pregnancy Daily Log */}
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Current Weight (kg)</label>
                                        <div className="relative">
                                            <Scale className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input 
                                                type="number" 
                                                value={logWeight}
                                                onChange={e => setLogWeight(e.target.value)}
                                                placeholder="e.g. 68.5"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 outline-none transition-all text-sm font-medium text-gray-800"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Overall Mood</label>
                                        <div className="flex gap-2">
                                            {[
                                                { id: 'Happy', Icon: Smile, color: 'emerald' },
                                                { id: 'Neutral', Icon: Meh, color: 'blue' },
                                                { id: 'Stressed', Icon: Frown, color: 'rose' },
                                                { id: 'Fatigued', Icon: Flame, color: 'amber' }
                                            ].map((m) => (
                                                <button 
                                                    key={m.id}
                                                    onClick={() => setLogMood(m.id)}
                                                    className={`flex-1 p-2 rounded-xl border flex justify-center transition-all ${logMood === m.id ? `bg-${m.color}-50 border-${m.color}-200 text-${m.color}-600 shadow-sm` : 'border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                                                    title={m.id}
                                                >
                                                    <m.Icon className="w-5 h-5" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {pStats && pStats.weeks >= 28 && (
                                        <div>
                                            <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Kick Count (Over 2 hours)</label>
                                            <div className="relative">
                                                <Footprints className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input 
                                                    type="number" 
                                                    value={logKicks}
                                                    onChange={e => setLogKicks(e.target.value)}
                                                    placeholder="Target is usually 10 kicks"
                                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 outline-none transition-all text-sm font-medium text-gray-800"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className={pStats && pStats.weeks >= 28 ? "md:col-span-1" : "md:col-span-2"}>
                                        <label className="block flex justify-between items-end mb-1.5 ml-1">
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Symptoms Today</span>
                                            {logSymptoms.trim().length > 0 && (
                                              <button 
                                                onClick={handleAnalyzeSymptoms}
                                                disabled={isAnalyzingSymptoms}
                                                className="text-[10px] font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-widest transition-colors"
                                              >
                                                  {isAnalyzingSymptoms ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                                                  AI Analyze
                                              </button>
                                            )}
                                        </label>
                                        <div className="relative">
                                            <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            <input 
                                                type="text" 
                                                value={logSymptoms}
                                                onChange={e => setLogSymptoms(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleAnalyzeSymptoms()}
                                                placeholder="e.g. Nausea, Backache"
                                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 outline-none transition-all text-sm font-medium text-gray-800"
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {currentAISuggestions.length > 0 && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="mt-3 overflow-hidden"
                                                >
                                                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 shadow-inner">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Sparkles className="w-4 h-4 text-indigo-500" />
                                                            <h5 className="text-[10px] font-medium text-indigo-800 uppercase tracking-widest">AI Relief Suggestions</h5>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {currentAISuggestions.map((sug, j) => (
                                                                <p key={j} className="text-sm font-medium text-gray-800 leading-relaxed border-l-2 border-indigo-400 pl-3">
                                                                    {sug}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Start Date</label>
                                        <input type="date" value={newCycleStart} onChange={e => setNewCycleStart(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all text-sm font-medium text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">End Date</label>
                                        <input type="date" value={newCycleEnd} onChange={e => setNewCycleEnd(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all text-sm font-medium text-gray-800" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Symptoms (comma separated)</label>
                                        <input type="text" value={cycleSymptoms} onChange={e => setCycleSymptoms(e.target.value)} placeholder="e.g. Cramps, Headache, Fatigue" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-rose-400 focus:ring-4 focus:ring-rose-400/10 outline-none transition-all text-sm font-medium text-gray-800" />
                                    </div>
                                </>
                            )}
                        </div>
                        
                        <button 
                            onClick={isPregnant ? handleSavePregnancyLog : handleLogCycle}
                            className={`${isPregnant ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/20'} text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm w-full md:w-auto`}
                        >
                            <Save className="w-4 h-4" />
                            {isPregnant ? 'Save Clinical Log' : 'Log Cycle'}
                        </button>
                    </div>

                    {/* Settings Block */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-lg">
                                <ActivitySquare className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">{isPregnant ? 'Core Journey Settings' : 'Cycle Settings'}</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
                            {!isPregnant && (
                                <>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Avg. Cycle Length (Days)</label>
                                        <input type="number" value={mData.cycleLength} onChange={e => handleSaveSettings(Number(e.target.value), mData.periodLength, mData.lastPeriodStart)} className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-gray-400 focus:ring-4 focus:ring-gray-400/10 outline-none transition-all text-sm font-medium text-gray-800" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Avg. Period Length (Days)</label>
                                        <input type="number" value={mData.periodLength} onChange={e => handleSaveSettings(mData.cycleLength, Number(e.target.value), mData.lastPeriodStart)} className="w-full px-4 py-2.5 rounded-xl border border-gray-100 focus:border-gray-400 focus:ring-4 focus:ring-gray-400/10 outline-none transition-all text-sm font-medium text-gray-800" />
                                    </div>
                                </>
                            )}
                            <div className={isPregnant ? "md:col-span-3" : ""}>
                                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1.5 ml-1">{isPregnant ? 'LMP (Last Menstrual Period) to calculate Due Date' : (isTrying ? 'Last Period Date' : 'Last Period Start')}</label>
                                <input type="date" value={mData.lastPeriodStart} onChange={e => handleSaveSettings(mData.cycleLength, mData.periodLength, e.target.value)} className={`w-full px-4 py-2.5 rounded-xl border border-gray-100 outline-none transition-all text-sm font-medium text-gray-800 ${isPregnant ? 'focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10' : 'focus:border-gray-400 focus:ring-4 focus:ring-gray-400/10'}`} />
                                {isPregnant && (
                                    <div className="flex items-start gap-2 mt-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-50 w-full">
                                        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-indigo-800/80 font-medium leading-relaxed">
                                            Clinical baseline due dates and structural progress weeks are calculated automatically using Naegele's rule from the first day of your last period. 
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* 3. Pregnancy Log or Cycle History (Span 12) */}
                {isPregnant && mData.pregnancyLog && mData.pregnancyLog.length > 0 && (
                    <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Activity className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Pregnancy Timeline Logs</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mData.pregnancyLog.map((log: any, i: number) => (
                                <div key={i} className="p-5 border border-indigo-50 bg-indigo-50/30 rounded-3xl group flex flex-col justify-between hover:shadow-sm transition-shadow">
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">{log.date}</p>
                                            <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-medium text-gray-600 shadow-sm">{log.mood}</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {log.weight && <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-lg border border-blue-100">{log.weight} kg</span>}
                                            {log.kicks && <span className="px-3 py-1.5 bg-rose-50 text-rose-700 text-[10px] font-medium rounded-lg border border-rose-100">{log.kicks} Kicks</span>}
                                        </div>

                                        {log.symptoms ? (
                                            <p className="text-sm font-medium text-gray-800 italic bg-white p-3 rounded-xl border border-gray-50">"{log.symptoms}"</p>
                                        ) : (
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest">No symptoms logged.</p>
                                        )}

                                        {log.aiInsight && log.aiInsight.length > 0 && (
                                            <div className="mt-4 p-4 bg-white border border-indigo-100 rounded-2xl space-y-2">
                                                <div className="flex items-center gap-1.5 mb-2">
                                                    <Sparkles className="w-4 h-4 text-indigo-500" />
                                                    <span className="text-[10px] font-medium text-indigo-800 uppercase tracking-widest">Saved AI Relief Note</span>
                                                </div>
                                                {log.aiInsight.map((ins: string, idx: number) => (
                                                    <p key={idx} className="text-[11px] font-medium text-gray-600 leading-relaxed">{ins}</p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 3. Cycle History */}
                {!isPregnant && mData.trackedCycles.length > 0 && (
                    <motion.div className="lg:col-span-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                <Activity className="w-5 h-5" />
                            </div>
                            <h2 className="section-title">Past Cycle History</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {mData.trackedCycles.map((cycle: any, i: number) => (
                                <div key={i} className="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl group">
                                    <p className="text-xs text-gray-500 font-medium mb-1">
                                        {new Date(cycle.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} 
                                        {' - '} 
                                        {new Date(cycle.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </p>
                                    
                                    {cycle.symptoms && cycle.symptoms.length > 0 ? (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {cycle.symptoms.map((sym: string, idx: number) => (
                                                <span key={idx} className="px-2.5 py-1 bg-white border border-gray-50 text-gray-600 text-[10px] font-medium rounded-full">
                                                    {sym}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">No symptoms logged</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default MenstruationCycle;
