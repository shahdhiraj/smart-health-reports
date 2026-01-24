import { motion } from 'framer-motion';
import { Utensils, Droplet, Flame, ChevronRight, Apple } from 'lucide-react';

const NutritionPlan = () => {
    const mealPlan = [
        {
            time: 'Breakfast • 08:00 AM',
            meal: 'Oatmeal with Blueberries & Nuts',
            calories: 350,
            protein: '12g',
            carbs: '45g',
            fat: '10g',
            type: 'Vegetarian'
        },
        {
            time: 'Lunch • 01:00 PM',
            meal: 'Grilled Chicken Salad with Quinoa',
            calories: 450,
            protein: '35g',
            carbs: '30g',
            fat: '15g',
            type: 'High Protein'
        },
        {
            time: 'Snack • 04:30 PM',
            meal: 'Greek Yogurt with Honey',
            calories: 150,
            protein: '10g',
            carbs: '12g',
            fat: '2g',
            type: 'Low Fat'
        },
        {
            time: 'Dinner • 08:00 PM',
            meal: 'Baked Salmon with Steamed Vegetables',
            calories: 400,
            protein: '30g',
            carbs: '10g',
            fat: '20g',
            type: 'Keto Friendly'
        }
    ];

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">AI Nutrition Plan</h1>
                <p className="text-gray-500 mt-2">Personalized meal plans optimized for your health goals.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Daily Overview */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Today's Meals */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                <Utensils className="w-5 h-5 text-primary-600" />
                                Today's Meal Plan
                            </h2>
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                                On Track
                            </span>
                        </div>

                        <div className="space-y-4">
                            {mealPlan.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors gap-4"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                            <Apple className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{item.time}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-xs text-gray-500">{item.type}</span>
                                            </div>
                                            <h3 className="font-bold text-gray-800">{item.meal}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {item.calories} kcal • {item.protein} Protein
                                            </p>
                                        </div>
                                    </div>
                                    <button className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-gray-400 hover:text-primary-600 hover:border-primary-600 transition-colors">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tracking Sidebars */}
                <div className="space-y-6">
                    {/* Calories Ring */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary-600 p-6 rounded-2xl text-white shadow-lg shadow-primary-200"
                    >
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Flame className="w-5 h-5" />
                            Calories & Macros
                        </h3>
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <p className="text-primary-200 text-sm">Consumed</p>
                                <p className="text-3xl font-bold">1,350</p>
                            </div>
                            <div className="text-right">
                                <p className="text-primary-200 text-sm">Target</p>
                                <p className="text-3xl font-bold">2,000</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-primary-100">Protein</span>
                                    <span>87g / 150g</span>
                                </div>
                                <div className="h-2 bg-primary-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[58%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-primary-100">Carbs</span>
                                    <span>120g / 200g</span>
                                </div>
                                <div className="h-2 bg-primary-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[60%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-primary-100">Fats</span>
                                    <span>45g / 65g</span>
                                </div>
                                <div className="h-2 bg-primary-900/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white w-[70%]" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hydration */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Droplet className="w-5 h-5 text-blue-500" />
                            Hydration
                        </h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1">
                                <p className="text-3xl font-bold text-gray-800">1.2<span className="text-sm text-gray-500 font-normal ml-1">L</span></p>
                                <p className="text-sm text-gray-500">of 2.5L Goal</p>
                            </div>
                            <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                                + Add Water
                            </button>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {[1, 1, 1, 0, 0].map((fill, i) => (
                                <div key={i} className={`h-12 rounded-lg flex items-end justify-center pb-1 ${fill ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'}`}>
                                    <Droplet className={`w-4 h-4 ${fill ? 'fill-current' : ''}`} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default NutritionPlan;
