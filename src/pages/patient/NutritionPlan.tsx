import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Utensils, Zap, Droplets, RefreshCw, 
    Plus, X, CheckCircle, Flame, Dumbbell, 
    Footprints, Lightbulb, Camera, 
    Brain, Settings2, Trash2, Edit3, Save, Download, Activity, ShoppingCart
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import CameraScanner from '../../components/clinical/CameraScanner';

const NutritionPlan = () => {
    const { healthData, setPrintData } = useHealth();
    
    // Core Health State
    const [waterLevel, setWaterLevel] = useState(() => {
        const saved = localStorage.getItem('smart_health_water');
        return saved ? parseFloat(saved) : 1.2;
    });

    const [isRegenerating, setIsRegenerating] = useState(false);
    const [notif, setNotif] = useState<string | null>(null);
    const [caloriesBurned, setCaloriesBurned] = useState(420);
    const [hydrationGoal, setHydrationGoal] = useState(2.5);
    
    // CRUD & Customization State
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [showMealModal, setShowMealModal] = useState(false);
    const [showExerciseModal, setShowExerciseModal] = useState(false);
    const [editingMealIndex, setEditingMealIndex] = useState<number | null>(null);
    const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
    const [showGroceryModal, setShowGroceryModal] = useState(false);
    const [groceryItems, setGroceryItems] = useState<{name: string, category: string, checked: boolean}[]>([
        { name: 'Oats', category: 'Pantry', checked: false },
        { name: 'Blueberries', category: 'Produce', checked: false },
        { name: 'Almonds', category: 'Pantry', checked: false },
        { name: 'Chicken Breast', category: 'Proteins', checked: false },
        { name: 'Quinoa', category: 'Pantry', checked: false },
        { name: 'Greek Yogurt', category: 'Dairy', checked: false },
        { name: 'Salmon', category: 'Proteins', checked: false },
        { name: 'Broccoli', category: 'Produce', checked: false },
        { name: 'Honey', category: 'Pantry', checked: false }
    ]);

    const toggleGroceryItem = (index: number) => {
        const newItems = [...groceryItems];
        newItems[index].checked = !newItems[index].checked;
        setGroceryItems(newItems);
    };
    
    const [config, setConfig] = useState({
        dietType: 'Vegetarian',
        dailyCalorieGoal: 2000,
        macroFocus: 'Balanced',
        healthGoal: 'Maintenance'
    });

    const [newExercise, setNewExercise] = useState({
        name: '',
        duration: '30 min',
        burn: 200,
        type: 'Cardio',
        icon: Footprints
    });

    const [exerciseLog, setExerciseLog] = useState([
        { id: 1, name: 'Morning Yoga', duration: '20 min', burn: 120, type: 'Flexibility', icon: Zap },
        { id: 2, name: 'Brisk Walking', duration: '45 min', burn: 300, type: 'Cardio', icon: Footprints }
    ]);

    const [meals, setMeals] = useState([
        { time: '08:00 AM', name: 'Oatmeal with Blueberries & Nuts', calories: 350, protein: 12, type: 'Breakfast', category: 'Vegetarian' },
        { time: '01:00 PM', name: 'Grilled Chicken Salad with Quinoa', calories: 450, protein: 35, type: 'Lunch', category: 'High Protein' },
        { time: '04:30 PM', name: 'Greek Yogurt with Honey', calories: 150, protein: 10, type: 'Snack', category: 'Low Fat' },
        { time: '08:00 PM', name: 'Baked Salmon with Steamed Vegetables', calories: 400, protein: 30, type: 'Dinner', category: 'Keto Friendly' }
    ]);

    const [newMeal, setNewMeal] = useState({
        time: '12:00 PM',
        name: '',
        calories: 0,
        protein: 0,
        type: 'Lunch',
        category: config.dietType
    });

    const [isScanningMeal, setIsScanningMeal] = useState(false);
    const [isAnalyzingMeal, setIsAnalyzingMeal] = useState(false);
    const [mealAnalysisStep, setMealAnalysisStep] = useState('');

    useEffect(() => {
        localStorage.setItem('smart_health_water', waterLevel.toString());
    }, [waterLevel]);

    const handleAddWater = (amount: number) => {
        setWaterLevel(prev => Math.min(prev + amount, 3.5));
    };

    const handleRegenerate = () => {
        setIsRegenerating(true);
        setTimeout(() => {
            setIsRegenerating(false);
            setNotif(`AI has optimized your ${config.dietType} plan for ${config.healthGoal}.`);
            setTimeout(() => setNotif(null), 3000);
        }, 2000);
    };

    const handleMealScan = async () => {
        setIsScanningMeal(false);
        setIsAnalyzingMeal(true);
        setMealAnalysisStep('Initializing Vision-Macro Protocol...');

        const steps = [
            { text: 'Analyzing Plate Composition...', delay: 1500 },
            { text: 'Identifying Ingredients: Avocado, Eggs, Whole Grain Bread...', delay: 1200 },
            { text: 'Estimating Portion Volume (approx. 320g)...', delay: 1000 },
            { text: 'Calculating Macro Distribution...', delay: 1200 },
            { text: 'Syncing Nutritional Value to Energy Protocol...', delay: 800 }
        ];

        for (const step of steps) {
            setMealAnalysisStep(step.text);
            await new Promise(r => setTimeout(r, step.delay));
        }

        const mealFromScan = {
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            name: 'Avocado Toast with Poached Eggs',
            calories: 380,
            protein: 18,
            type: 'Meal (Scan)',
            category: 'High Protein'
        };

        setMeals([mealFromScan, ...meals]);
        setIsAnalyzingMeal(false);
        setMealAnalysisStep('');
        setNotif("Meal Logged successfully via AI Scan!");
    };

    const suggestedActivities = [
        { name: 'Strength Training', duration: '45 min', baseBurn: 350, type: 'Power', icon: Dumbbell },
        { name: 'HIIT Session', duration: '20 min', baseBurn: 250, type: 'Intensity', icon: Flame },
        { name: 'Brisk Walking', duration: '30 min', baseBurn: 180, type: 'Cardio', icon: Footprints }
    ];

    const handleLogExercise = (activity: any) => {
        const newLog = {
            id: Date.now(),
            ...activity,
            burn: activity.baseBurn || activity.burn
        };
        setExerciseLog([newLog, ...exerciseLog]);
        setCaloriesBurned(prev => prev + (activity.baseBurn || activity.burn));
        
        if ((activity.baseBurn || activity.burn) >= 250) {
            setHydrationGoal(prev => prev + 0.25);
            setNotif(`Logged ${activity.name}! +${activity.baseBurn || activity.burn} kcal. Hydration goal adjusted.`);
        } else {
            setNotif(`Logged ${activity.name}! +${activity.baseBurn || activity.burn} kcal burned.`);
        }
        
        setTimeout(() => setNotif(null), 3000);
    };

    const saveExercise = () => {
        if (!newExercise.name) return;
        
        if (editingExerciseIndex !== null) {
            const oldBurn = exerciseLog[editingExerciseIndex].burn;
            const updated = [...exerciseLog];
            updated[editingExerciseIndex] = { ...newExercise, id: exerciseLog[editingExerciseIndex].id };
            setExerciseLog(updated);
            setCaloriesBurned(prev => prev - oldBurn + newExercise.burn);
            setNotif("Exercise record updated.");
        } else {
            const newLog = { ...newExercise, id: Date.now() };
            setExerciseLog([newLog, ...exerciseLog]);
            setCaloriesBurned(prev => prev + newExercise.burn);
            setNotif("New activity logged.");
        }
        
        setShowExerciseModal(false);
        setEditingExerciseIndex(null);
        setNewExercise({ name: '', duration: '30 min', burn: 200, type: 'Cardio', icon: Footprints });
        setTimeout(() => setNotif(null), 3000);
    };

    const deleteExercise = (index: number) => {
        const burnToRemove = exerciseLog[index].burn;
        setExerciseLog(exerciseLog.filter((_, i) => i !== index));
        setCaloriesBurned(prev => prev - burnToRemove);
        setNotif("Activity removed from log.");
        setTimeout(() => setNotif(null), 3000);
    };

    const openEditExercise = (index: number) => {
        setNewExercise(exerciseLog[index]);
        setEditingExerciseIndex(index);
        setShowExerciseModal(true);
    };

    const saveMeal = () => {
        if (!newMeal.name) return;
        
        if (editingMealIndex !== null) {
            const updated = [...meals];
            updated[editingMealIndex] = newMeal;
            setMeals(updated);
            setNotif("Meal updated successfully.");
        } else {
            setMeals([newMeal, ...meals]);
            setNotif("New meal added to your plan.");
        }
        
        setShowMealModal(false);
        setEditingMealIndex(null);
        setNewMeal({ time: '12:00 PM', name: '', calories: 0, protein: 0, type: 'Lunch', category: config.dietType });
        setTimeout(() => setNotif(null), 3000);
    };

    const deleteMeal = (index: number) => {
        setMeals(meals.filter((_, i) => i !== index));
        setNotif("Meal removed from your plan.");
        setTimeout(() => setNotif(null), 3000);
    };

    const openEditMeal = (index: number) => {
        setNewMeal(meals[index]);
        setEditingMealIndex(index);
        setShowMealModal(true);
    };

    const handleDownloadDirective = () => {
        setPrintData('dietPlan', {
            summary: `Clinical ${config.dietType} regimen optimized for ${config.healthGoal}. Daily target: ${config.dailyCalorieGoal} kcal. Focus: ${config.macroFocus}.`,
            meals: meals,
            doctorName: 'Dr. Sarah Smith',
            doctorSpecialty: 'SENIOR NUTRITIONIST'
        });
        
        window.print();
        
        setTimeout(() => {
            setPrintData(null);
        }, 1000);
    };

    const getHydrationInsight = () => {
        const diff = hydrationGoal - waterLevel;
        if (diff <= 0) return { text: "Peak hydration achieved! Excellent consistency.", color: "emerald" };
        if (caloriesBurned > 600 && waterLevel < 2) return { text: "High activity detected. You need at least 1L more to recover.", color: "amber" };
        if (diff < 0.5) return { text: "Almost there! Just one more small glass.", color: "primary" };
        return { text: `You're ${diff.toFixed(1)}L away from your daily goal. Keep it up!`, color: "blue" };
    };

    const hydrationInsight = getHydrationInsight();

    const totalIntake = meals.reduce((acc, m) => acc + m.calories, 0);
    const netCalories = totalIntake - caloriesBurned;

    return (
        <div className="w-full relative p-6">
            <AnimatePresence>
                {(isRegenerating || isAnalyzingMeal) && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] bg-white/80 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                    >
                        <RefreshCw className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                        <h2 className="section-title">
                            {isRegenerating ? 'AI Nutritionist is generating your plan...' : 'Neural Vision Extraction...'}
                        </h2>
                        <p className="text-gray-500 font-medium mt-2">
                            {isRegenerating ? `Optimizing ${config.dietType} macros for ${config.healthGoal}.` : mealAnalysisStep}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {notif && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: -20, x: 20 }}
                        className="fixed top-6 right-6 z-[300] bg-gray-900/95 text-white px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 border border-white/10 backdrop-blur-xl"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-sm tracking-tight">{notif}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Grocery Modal */}
            <AnimatePresence>
                {showGroceryModal && (
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowGroceryModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-sm overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            <div className="p-8 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                                        <ShoppingCart className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">AI Grocery List</h3>
                                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Extracted from {config.dietType} Plan</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowGroceryModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X className="w-6 h-6 text-gray-500" /></button>
                            </div>

                            <div className="p-8 overflow-y-auto flex-1 space-y-6">
                                {['Produce', 'Proteins', 'Dairy', 'Pantry'].map(category => {
                                    const items = groceryItems.map((item, i) => ({ ...item, originalIndex: i })).filter(item => item.category === category);
                                    if (items.length === 0) return null;
                                    return (
                                        <div key={category}>
                                            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                {category}
                                                <span className="flex-1 h-px bg-gray-100"></span>
                                            </h4>
                                            <div className="space-y-2">
                                                {items.map(item => (
                                                    <div 
                                                        key={item.name}
                                                        onClick={() => toggleGroceryItem(item.originalIndex)}
                                                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${item.checked ? 'bg-emerald-50/50 border-emerald-100' : 'bg-white border-gray-100 hover:border-emerald-200 shadow-sm'}`}
                                                    >
                                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${item.checked ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/30' : 'bg-transparent border-gray-50'}`}>
                                                            {item.checked && <CheckCircle className="w-4 h-4" />}
                                                        </div>
                                                        <span className={`font-medium text-sm transition-all ${item.checked ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-6 bg-white border-t border-gray-100">
                                <button 
                                    onClick={() => {
                                        setNotif("Grocery List Sent to your phone!");
                                        setShowGroceryModal(false);
                                        setTimeout(() => setNotif(null), 3000);
                                    }}
                                    className="w-full py-4 bg-gray-900 text-white rounded-2xl font-medium tracking-widest uppercase text-xs hover:bg-black transition-all shadow-sm flex items-center justify-center gap-2"
                                >
                                    <Download className="w-4 h-4" /> Save to Device
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Config Modal */}
            <AnimatePresence>
                {showConfigModal && (
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfigModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-sm overflow-hidden"
                        >
                            <div className="p-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-800">
                                        <Settings2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="card-title">AI Preferences</h3>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">Digital Nutritionist Config</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Dietary Type</label>
                                        <select 
                                            value={config.dietType}
                                            onChange={(e) => setConfig({...config, dietType: e.target.value})}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-medium transition-all"
                                        >
                                            {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 'High Protein'].map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Health Directive</label>
                                        <select 
                                            value={config.healthGoal}
                                            onChange={(e) => setConfig({...config, healthGoal: e.target.value})}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none font-medium transition-all"
                                        >
                                            {['Maintenance', 'Weight Loss', 'Muscle Growth', 'Metabolic Recovery'].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
            {/* Exercise Modal */}
            <AnimatePresence>
                {showExerciseModal && (
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowExerciseModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-sm overflow-hidden"
                        >
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                                            <Flame className="w-6 h-6" />
                                        </div>
                                        <h3 className="card-title">
                                            {editingExerciseIndex !== null ? 'Update Activity' : 'Log New Activity'}
                                        </h3>
                                    </div>
                                    <button onClick={() => setShowExerciseModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Type</label>
                                            <select 
                                                value={newExercise.type}
                                                onChange={(e) => setNewExercise({...newExercise, type: e.target.value})}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium"
                                            >
                                                {['Cardio', 'Power', 'Flexibility', 'HIIT', 'Endurance'].map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Duration</label>
                                            <input 
                                                type="text" 
                                                value={newExercise.duration}
                                                onChange={(e) => setNewExercise({...newExercise, duration: e.target.value})}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium text-sm"
                                                placeholder="30 min"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Activity Name</label>
                                        <input 
                                            type="text" 
                                            value={newExercise.name}
                                            onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-rose-500 transition-all"
                                            placeholder="e.g. Swimming Laps"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Total Burn (kcal)</label>
                                        <input 
                                            type="number" 
                                            value={newExercise.burn}
                                            onChange={(e) => setNewExercise({...newExercise, burn: parseInt(e.target.value) || 0})}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-sm"
                                        />
                                    </div>

                                    <button 
                                        onClick={saveExercise}
                                        className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-medium tracking-widest uppercase text-xs hover:bg-rose-700 transition-all shadow-sm shadow-rose-600/20 flex items-center justify-center gap-3"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingExerciseIndex !== null ? 'Update Record' : 'Commit to Log'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest flex justify-between">
                                            Daily Target <span>{config.dailyCalorieGoal} kcal</span>
                                        </label>
                                        <input 
                                            type="range" 
                                            min="1200" 
                                            max="4000" 
                                            step="50"
                                            value={config.dailyCalorieGoal}
                                            onChange={(e) => setConfig({...config, dailyCalorieGoal: parseInt(e.target.value)})}
                                            className="w-full accent-primary-600"
                                        />
                                    </div>

                                    <button 
                                        onClick={() => setShowConfigModal(false)}
                                        className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-medium tracking-widest uppercase text-xs hover:bg-black transition-all shadow-sm shadow-gray-200"
                                    >
                                        Apply & Recalibrate AI
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Add/Edit Meal Modal */}
            <AnimatePresence>
                {showMealModal && (
                    <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMealModal(false)}
                            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-sm overflow-hidden"
                        >
                            <div className="p-10">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
                                            <Utensils className="w-6 h-6" />
                                        </div>
                                        <h3 className="card-title">
                                            {editingMealIndex !== null ? 'Update Meal' : 'Add New Meal'}
                                        </h3>
                                    </div>
                                    <button onClick={() => setShowMealModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-6 h-6 text-gray-400" /></button>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Meal Type</label>
                                            <select 
                                                value={newMeal.type}
                                                onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium"
                                            >
                                                {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Pre-Workout', 'Post-Workout'].map(t => (
                                                    <option key={t} value={t}>{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Time</label>
                                            <input 
                                                type="text" 
                                                value={newMeal.time}
                                                onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-medium text-sm"
                                                placeholder="08:00 AM"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Dish Name</label>
                                        <input 
                                            type="text" 
                                            value={newMeal.name}
                                            onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                                            className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-sm focus:ring-2 focus:ring-primary-500 transition-all"
                                            placeholder="e.g. Grilled Chicken Breast"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Calories (kcal)</label>
                                            <input 
                                                type="number" 
                                                value={newMeal.calories}
                                                onChange={(e) => setNewMeal({...newMeal, calories: parseInt(e.target.value) || 0})}
                                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Protein (g)</label>
                                            <input 
                                                type="number" 
                                                value={newMeal.protein}
                                                onChange={(e) => setNewMeal({...newMeal, protein: parseInt(e.target.value) || 0})}
                                                className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        onClick={saveMeal}
                                        className="w-full py-5 bg-primary-600 text-white rounded-[2rem] font-medium tracking-widest uppercase text-xs hover:bg-primary-700 transition-all shadow-sm shadow-primary-600/20 flex items-center justify-center gap-3"
                                    >
                                        <Save className="w-4 h-4" />
                                        {editingMealIndex !== null ? 'Sync Update' : 'Log Dietary Record'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="page-title">AI Nutrition Portal</h1>
                    <p className="page-subtitle">
                        <Brain className="w-4 h-4 text-primary-500" />
                        Neural-optimized dietary regimens for {healthData.fullName}.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button 
                         onClick={() => setShowGroceryModal(true)}
                         className="flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-6 py-4 rounded-2xl hover:bg-emerald-100 transition-all font-medium text-xs uppercase tracking-widest shadow-sm"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Grocery List
                    </button>
                    <button 
                         onClick={handleDownloadDirective}
                         className="flex items-center gap-2 bg-white border border-gray-100 px-6 py-4 rounded-2xl hover:bg-gray-50 transition-all font-medium text-xs uppercase tracking-widest shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        Official Directive
                    </button>
                    <button 
                        onClick={handleRegenerate}
                        disabled={isRegenerating}
                        className="bg-gray-900 text-white px-6 py-4 rounded-2xl hover:bg-black transition-all font-medium text-xs uppercase tracking-widest shadow-sm shadow-gray-200 flex items-center gap-3"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRegenerating && 'animate-spin'}`} />
                        Regenerate Plan
                    </button>
                    <button 
                        onClick={() => setShowConfigModal(true)}
                        className="p-4 bg-white border border-gray-50 rounded-2xl hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Settings2 className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Meal Plan List */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm relative overflow-hidden ring-1 ring-gray-100">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-5">
                            <Utensils className="w-32 h-32" />
                        </div>
                        
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-xl font-medium text-gray-800 flex items-center gap-3">
                                    Today's Regimen
                                </h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Active Plan: {config.dietType}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => {
                                        setEditingMealIndex(null);
                                        setNewMeal({ time: '12:00 PM', name: '', calories: 0, protein: 0, type: 'Lunch', category: config.dietType });
                                        setShowMealModal(true);
                                    }}
                                    className="p-3 bg-white border border-gray-50 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                                    title="Add Manual Entry"
                                >
                                    <Plus className="w-5 h-5 text-gray-600" />
                                </button>
                                <button 
                                    onClick={() => setIsScanningMeal(true)}
                                    className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl flex items-center gap-2 hover:bg-black transition-all active:scale-95 shadow-sm shadow-gray-200"
                                >
                                    <Camera className="w-4 h-4" />
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Neural Scan</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {meals.map((meal, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative flex items-center gap-8 p-6 rounded-[2rem] hover:bg-gray-50/80 transition-all border border-transparent hover:border-gray-100 shadow-hover"
                                >
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm relative shrink-0 ${
                                        meal.type.includes('Breakfast') ? 'bg-orange-50 text-orange-500' :
                                        meal.type.includes('Lunch') ? 'bg-emerald-50 text-emerald-500' :
                                        meal.type.includes('Snack') ? 'bg-primary-50 text-primary-500' : 'bg-rose-50 text-rose-500'
                                    }`}>
                                        <Zap className="w-7 h-7" />
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{meal.time} • {meal.type}</span>
                                            <span className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[9px] font-medium text-primary-600 uppercase tracking-tighter">{meal.category}</span>
                                        </div>
                                        <h3 className="text-base font-medium text-gray-800 tracking-tight group-hover:text-primary-600 transition-colors leading-tight">{meal.name}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="flex items-center gap-2">
                                                <Flame className="w-3.5 h-3.5 text-orange-400" />
                                                <span className="text-xs font-medium text-gray-500 tracking-tight">{meal.calories} kcal</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Activity className="w-3.5 h-3.5 text-primary-400" />
                                                <span className="text-xs font-medium text-gray-500 tracking-tight">{meal.protein}g protein</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                                        <button 
                                            onClick={() => openEditMeal(index)}
                                            className="p-3 bg-white border border-gray-50 text-gray-400 hover:text-primary-600 hover:border-primary-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => deleteMeal(index)}
                                            className="p-3 bg-white border border-gray-50 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-xl transition-all shadow-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Exercise Section */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm ring-1 ring-gray-100">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="section-title flex items-center gap-3">
                                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-2xl"><Flame className="w-6 h-6" /></div>
                                Active Calorie Burn
                            </h2>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => {
                                        setEditingExerciseIndex(null);
                                        setNewExercise({ name: '', duration: '30 min', burn: 200, type: 'Cardio', icon: Footprints });
                                        setShowExerciseModal(true);
                                    }}
                                    className="p-3 bg-white border border-gray-50 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
                                    title="Manual Log Entry"
                                >
                                    <Plus className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] hover:text-primary-600 transition-colors">See Archive</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {suggestedActivities.map((act) => (
                                <button
                                    key={act.name}
                                    onClick={() => handleLogExercise(act)}
                                    className="p-6 rounded-[2.2rem] bg-gray-50/50 hover:bg-rose-50/50 group text-left transition-all border border-transparent hover:border-rose-100"
                                >
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-rose-500 shadow-sm mb-6 transition-colors">
                                        <act.icon className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-medium text-gray-800 text-sm group-hover:text-rose-700 tracking-tight leading-none">{act.name}</h4>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-1">{act.duration} • {act.baseBurn} kcal</p>
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                <span className="w-12 h-px bg-gray-100" />
                                Historical Log
                                <span className="w-12 h-px bg-gray-100" />
                            </p>
                            {exerciseLog.map((log, exIndex) => (
                                <div key={log.id} className="group flex items-center justify-between p-5 bg-gray-50/30 rounded-2xl border border-transparent hover:border-gray-100 transition-all shadow-hover">
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                            {log.icon ? <log.icon className="w-5 h-5 text-rose-500" /> : <Flame className="w-5 h-5 text-rose-500" />}
                                        </div>
                                        <div>
                                            <h5 className="card-title">{log.name}</h5>
                                            <p className="text-[10px] text-gray-400 font-medium uppercase">{log.duration} • {log.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="text-right">
                                            <p className="text-lg font-medium text-rose-600 tabular-nums">+{log.burn}</p>
                                            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-widest">KCAL BURNED</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all scale-95 group-hover:scale-100">
                                            <button 
                                                onClick={() => openEditExercise(exIndex)}
                                                className="p-2 bg-white border border-gray-50 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-lg transition-all shadow-sm"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button 
                                                onClick={() => deleteExercise(exIndex)}
                                                className="p-2 bg-white border border-gray-50 text-gray-400 hover:text-rose-600 hover:border-rose-100 rounded-lg transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-8">
                    {/* Energy Balance Card */}
                    <div className="bg-primary-600 p-10 rounded-[3rem] shadow-sm shadow-primary-600/20 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                            <Zap className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-medium flex items-center gap-3 mb-10">
                            <Activity className="w-6 h-6 text-primary-200" />
                            Energy Balance
                        </h3>

                        <div className="mb-12 flex items-baseline justify-between transition-all hover:scale-[1.01]">
                            <div>
                                <p className="text-[11px] font-medium text-primary-200 uppercase tracking-widest mb-1.5">Net Intake</p>
                                <p className="text-5xl font-medium tabular-nums tracking-tighter">{netCalories}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] font-medium text-primary-200 uppercase tracking-widest mb-1.5">Target</p>
                                <p className="text-xl font-medium tabular-nums opacity-60 tracking-tight">{config.dailyCalorieGoal}</p>
                            </div>
                        </div>

                        <div className="space-y-8 mt-10">
                            {[
                                { label: 'Intake Distribution', current: totalIntake, target: 2500, color: 'white' },
                                { label: 'Active Expenditure', current: caloriesBurned, target: 800, color: 'primary-200' }
                            ].map((macro) => (
                                <div key={macro.label}>
                                    <div className="flex justify-between text-[10px] font-medium uppercase tracking-widest mb-3 text-primary-200">
                                        <span>{macro.label}</span>
                                        <span className="tabular-nums">{macro.current} / {macro.target}</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min((macro.current / macro.target) * 100, 100)}%` }}
                                            className={`h-full ${macro.color === 'white' ? 'bg-white' : 'bg-primary-300'} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hydration Card */}
                    <div className="bg-white p-10 rounded-[3rem] shadow-sm ring-1 ring-gray-100">
                        <h3 className="text-lg font-medium text-gray-800 flex items-center gap-3 mb-10">
                            <Droplets className="w-6 h-6 text-primary-500" />
                            Liquid Intake
                        </h3>

                        <div className="flex items-end justify-between mb-10">
                            <div className="flex items-baseline gap-2">
                                <p className="text-4xl font-medium text-gray-800 tabular-nums tracking-tighter">{waterLevel.toFixed(1)}</p>
                                <p className="text-xl font-medium text-gray-300">L</p>
                            </div>
                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">Goal: {hydrationGoal.toFixed(1)}L</p>
                        </div>

                        <motion.div 
                            key={hydrationInsight.text}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-3xl mb-10 bg-${hydrationInsight.color}-50 border border-${hydrationInsight.color}-100/50 flex items-start gap-4`}
                        >
                            <div className={`p-2.5 bg-white rounded-xl shadow-sm text-${hydrationInsight.color}-500`}>
                                <Lightbulb className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                                <p className="text-[9px] font-medium text-gray-400 uppercase tracking-widest mb-1.5">Diagnostic Insight</p>
                                <p className={`text-xs font-medium text-${hydrationInsight.color}-700 leading-relaxed tracking-tight`}>
                                    {hydrationInsight.text}
                                </p>
                            </div>
                        </motion.div>

                        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-none">
                            {[0.25, 0.5, 0.75].map((amount) => (
                                <button 
                                    key={amount}
                                    onClick={() => handleAddWater(amount)}
                                    className="px-6 py-4 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 border border-gray-100 rounded-2xl font-medium text-xs uppercase tracking-widest text-gray-500 transition-all active:scale-95 shadow-sm"
                                >
                                    +{amount}L
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-5 gap-4">
                            {[1, 2, 3, 4, 5].map((drop) => (
                                <div key={drop} className={`h-16 rounded-[1.2rem] flex items-center justify-center transition-all duration-500 ${
                                    waterLevel >= drop * 0.5 ? 'bg-primary-500 text-white shadow-sm shadow-primary-500/30' : 'bg-gray-50 text-gray-200'
                                }`}>
                                    <Droplets className={`w-8 h-8 ${waterLevel >= drop * 0.5 && 'animate-bounce'}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CameraScanner 
                isOpen={isScanningMeal} 
                onClose={() => setIsScanningMeal(false)} 
                onCapture={handleMealScan}
                title="Neural Vision Scanner"
                subtitle="Macro-Composition Analysis"
                scanModeLabel="Extract Focus"
            />
        </div>
    );
};

export default NutritionPlan;
