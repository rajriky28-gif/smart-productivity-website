import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import strideLogo from '../../assets/stride-logo.png';

const Products = () => {
    return (
        <section id="products" className="py-32 bg-white text-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="mb-20"
                >
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-black">Our Tools</h2>
                    <div className="w-20 h-2 bg-black" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-6 mb-8">
                            <img src={strideLogo} alt="Stride Logo" className="w-16 h-16 object-contain" />
                            <div>
                                <span className="text-xs uppercase tracking-widest font-bold mb-1 block text-gray-500">Flagship Product</span>
                                <h3 className="text-4xl md:text-6xl font-black tracking-tight text-black leading-none">STRIDE</h3>
                            </div>
                        </div>
                        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
                            A minimalist todo app designed for speed and clarity. Stride strips away the noise, leaving you with just what matters: your tasks and your progress.
                        </p>

                        <ul className="space-y-4 mb-12">
                            {['Natural Language Parsing', 'Gesture-based Navigation', 'Local Data Sovereignty', 'Focus Engine'].map((feature) => (
                                <li key={feature} className="flex items-center gap-3 font-bold uppercase text-sm tracking-widest text-black">
                                    <CheckCircle2 size={20} />
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to="/stride"
                            className="flex items-center gap-4 text-sm font-black uppercase tracking-[0.2em] border-b-2 border-black pb-2 w-fit hover:gap-6 transition-all"
                        >
                            Explore Stride <ArrowRight size={18} />
                        </Link>
                    </motion.div>

                    {/* Mobile Phone Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="flex items-center justify-center"
                    >
                        {/* Phone Frame */}
                        <div className="relative w-[280px] h-[580px] bg-black rounded-[50px] p-3 shadow-2xl">
                            {/* Screen Bezel */}
                            <div className="relative w-full h-full bg-white rounded-[40px] overflow-hidden">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-black rounded-b-3xl z-10"></div>

                                {/* Screen Content Area - Replicating Stride UI Feel */}
                                <div className="w-full h-full bg-white flex flex-col p-6 pt-12">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black tracking-widest uppercase">Dec 30</div>
                                            <div className="text-xl font-black">Good evening.</div>
                                        </div>
                                        <div className="w-8 h-8 bg-black rounded-full" />
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { t: 'Review product vision', p: 'High' },
                                            { t: 'Update brand guidelines', p: 'Med' },
                                            { t: 'Stride interface audit', p: 'Urgent' }
                                        ].map((task, i) => (
                                            <div key={i} className="p-4 border border-black/5 rounded-2xl flex justify-between items-center group">
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{task.p}</div>
                                                    <div className="text-xs font-black">{task.t}</div>
                                                </div>
                                                <div className="w-4 h-4 rounded-full border border-black/20" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pb-4">
                                        <div className="w-full p-3 bg-black text-white rounded-xl text-center text-[10px] font-black tracking-widest uppercase">
                                            + New Task
                                        </div>
                                    </div>
                                </div>

                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-black/20 rounded-full"></div>
                            </div>

                            {/* Side Buttons */}
                            <div className="absolute -right-[2px] top-[120px] w-[3px] h-[50px] bg-black rounded-r"></div>
                            <div className="absolute -right-[2px] top-[180px] w-[3px] h-[50px] bg-black rounded-r"></div>
                            <div className="absolute -left-[2px] top-[150px] w-[3px] h-[70px] bg-black rounded-l"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Products;
