import Hero from '../components/sections/Hero';
import Vision from '../components/sections/Vision';
import Methodology from '../components/sections/Methodology';
import Products from '../components/sections/Products';
import Testimonials from '../components/sections/Testimonials';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Hero />

            <section id="philosophy" className="py-32 border-y border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { title: 'Clarity', desc: 'Removing distraction to find focus.' },
                            { title: 'Speed', desc: 'Software that moves at the speed of thought.' },
                            { title: 'Design', desc: 'Black and white. Pure logic. No noise.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="p-12 border border-white/10 hover:border-white/30 transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                            >
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-gray-500 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Vision />
            <Methodology />
            <Products />
            <Testimonials />

            <section id="impact" className="py-32 border-t border-white/5 bg-white text-black">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="py-20"
                    >
                        <h2 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter opacity-10 text-black">RESULTS</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <div className="text-5xl font-black mb-2">1M+</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400">Tasks Completed</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black mb-2">99.9%</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400">System Uptime</div>
                            </div>
                            <div>
                                <div className="text-5xl font-black mb-2">0</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-gray-400">Bloat Guaranteed</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
