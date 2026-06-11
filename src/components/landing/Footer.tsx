import { Stethoscope, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = ({ isDark }: { isDark: boolean }) => {
    return (
        <footer className={`pt-20 pb-10 border-t ${isDark ? 'bg-[#020817] border-white/10 text-gray-400' : 'bg-white border-gray-200 text-gray-600'}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-white" />
                            </div>
                            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>SmartHealth</span>
                        </div>
                        <p className="mb-6 max-w-sm">
                            The intelligent digital infrastructure for lifelong health records, AI-driven report analysis, and paperless healthcare management.
                        </p>
                        <div className="flex items-center gap-4">
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                                <Github className="w-5 h-5" />
                            </button>
                            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDark ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                                <Linkedin className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Platform</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">AI Report Reader</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Digital Health Vault</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Voice Assistant</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Population Analytics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className={`font-bold mb-6 uppercase tracking-wider text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">HIPAA Compliance</a></li>
                            <li><a href="#" className="hover:text-primary-500 transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>

                </div>

                <div className={`pt-8 border-t text-sm text-center md:text-left flex flex-col md:flex-row items-center justify-between ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                    <p>&copy; {new Date().getFullYear()} SmartHealth Ecosystem. All rights reserved.</p>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
