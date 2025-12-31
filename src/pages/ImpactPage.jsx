import { motion } from 'framer-motion';
import { Globe, Users, Clock, CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

const ImpactPage = () => {
    const metrics = [
        { label: 'Active Users', value: '1.2M+', icon: <Users size={24} />, desc: 'High-performance individuals globally.' },
        { label: 'Tasks Completed', value: '500M+', icon: <CheckCircle size={24} />, desc: 'Executed through our minimalist system.' },
        { label: 'Hours Saved', value: '12M+', icon: <Clock size={24} />, desc: 'Reclaimed from digital noise and clutter.' },
        { label: 'Global Reach', value: '180+', icon: <Globe size={24} />, desc: 'Countries embracing the Stride methodology.' }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-white selection:bg-white selection:text-black"
        >
            {/* Hero Section */}
            <section className="h-screen flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <div className="text-[35vw] font-black opacity-[0.03] select-none uppercase tracking-tighter">Scale</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Our Impact</span>
                        <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-tight">GLOBAL<br className="md:hidden" /> RADIUS</h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-tight font-medium max-w-2xl mx-auto mb-12">
                            Quantifying the shift from standard workflows to pure execution. Our reach is global, our focus is singular.
                        </p>
                        <div className="h-[1px] w-24 bg-white/20 mx-auto"></div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-4 left-0 w-full flex justify-center pointer-events-none">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center gap-4"
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">View Metrics</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                    </motion.div>
                </div>
            </section>

            {/* Metrics Grid */}
            <section className="py-48 bg-white text-black relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {metrics.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 border border-black/5 bg-gray-50 hover:bg-black hover:text-white transition-all duration-500 group"
                            >
                                <div className="mb-8 text-black group-hover:text-white transition-colors">{m.icon}</div>
                                <div className="text-5xl font-black uppercase tracking-tighter mb-4">{m.value}</div>
                                <div className="text-[10px] uppercase tracking-[0.3em] font-black opacity-40 mb-6">{m.label}</div>
                                <p className="text-sm font-medium leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Human Stories / Case Study Section */}
            <section className="py-48 bg-black">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            className="flex-1"
                        >
                            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Success Protocol</span>
                            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-tight">PRECISION<br className="md:hidden" /> IN PRACTICE.</h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-medium mb-12">
                                We measure success not by how long people use our apps, but by how quickly they get things done and leave them.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { title: 'Executive Focus', stat: '40% Less App Switching' },
                                    { title: 'Developer Velocity', stat: '2hr Daily Deep Work Gain' },
                                    { title: 'Creative Momentum', stat: '30% Faster Idea Capture' }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-6">
                                        <span className="text-xs uppercase tracking-widest font-black text-white/50">{item.title}</span>
                                        <span className="text-xs uppercase tracking-widest font-black text-white">{item.stat}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex-1 w-full aspect-[4/5] bg-white/5 relative overflow-hidden border border-white/10 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                <TrendingUp size={300} strokeWidth={1} />
                            </div>
                            <div className="absolute bottom-12 left-12 z-20">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-4 block">Visualized Data</span>
                                <div className="text-2xl font-black uppercase tracking-tighter">The Velocity Curve.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ethical Impact CTA */}
            <section className="py-64 bg-white text-black text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[60vw] font-black uppercase tracking-tighter leading-none">ETHICS</div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12 text-black leading-tight">DATA ETHICS<br className="md:hidden" /> BY DEFAULT.</h2>
                        <p className="text-gray-500 mb-16 uppercase tracking-[0.4em] text-[10px] font-black leading-loose max-w-xl mx-auto">
                            We do not monetize your focus. We do not sell your data. Our only incentive is the quality of your output.
                        </p>
                        <button className="group relative px-20 py-8 bg-black text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-black/90 transition-all transform hover:-translate-y-2">
                            Our Commitment
                            <ArrowRight size={16} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default ImpactPage;
