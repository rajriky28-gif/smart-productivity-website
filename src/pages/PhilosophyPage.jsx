import { motion } from 'framer-motion';
import { Target, Zap, Shield, ArrowRight, Quote } from 'lucide-react';

const PhilosophyPage = () => {
    const principles = [
        {
            icon: <Zap size={32} />,
            title: 'Clarity over Features',
            desc: 'We do not build for the consensus. We build for the individual who demands absolute focus. Every pixel must justify its existence.',
            details: 'In a world of digital noise, silence is a feature. We strip away the unnecessary until only the essential remains.'
        },
        {
            icon: <Target size={32} />,
            title: 'Velocity as a Metric',
            desc: 'Software should move at the speed of thought. If a tool slows you down, it is a liability, not an asset.',
            details: 'We optimize for latency-free interactions, ensuring that the gap between intent and action is non-existent.'
        },
        {
            icon: <Shield size={32} />,
            title: 'Digital Sovereignty',
            desc: 'Your data is an extension of your mind. It belongs to you, and no one else.',
            details: 'Privacy is not a setting; it is a foundation. We build with encryption and local-first principles at our core.'
        }
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
                    <div className="text-[35vw] font-black opacity-[0.03] select-none uppercase tracking-tighter">Ethos</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Our Philosophy</span>
                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-none">PURE<br />INTENT</h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-tight font-medium max-w-2xl mx-auto mb-12">
                            Challenging the status quo of software complexity. We build for those who prioritize output over organization.
                        </p>
                        <div className="h-[1px] w-24 bg-white/20 mx-auto"></div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Explore Ethos</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </section>

            {/* Narrative Section */}
            <section className="py-48 border-b border-white/5 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            className="relative"
                        >
                            <Quote size={80} className="text-white opacity-10 absolute -top-12 -left-8" />
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-tight">
                                THE DEATH OF<br />DIGITAL NOISE.
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed font-medium mb-12">
                                Modern tools focus on managing work rather than doing it. We believe the best tool is one that disappears, leaving nothing but you and your flow.
                            </p>
                            <div className="text-sm font-black uppercase tracking-[0.3em] text-white/40">
                                — Smart Productivity Manifest
                            </div>
                        </motion.div>

                        <div className="aspect-square bg-white/5 border border-white/5 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                            <div className="absolute inset-20 border border-white/10 flex items-center justify-center">
                                <div className="text-8xl font-black opacity-[0.03] animate-pulse">FLOW</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principles Grid */}
            <section className="py-48 bg-white text-black relative z-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-20 items-end mb-32 border-b-2 border-black pb-12">
                        <div className="flex-1">
                            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-black/40 mb-6 block">Core Values</span>
                            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-black">GUIDING<br />PRINCIPLES</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {principles.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <div className="mb-8 text-black group-hover:scale-110 transition-transform duration-500 w-fit">{p.icon}</div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 underline decoration-2 underline-offset-8 text-black">{p.title}</h3>
                                <p className="text-gray-500 font-bold mb-8 uppercase tracking-widest text-xs leading-loose">{p.desc}</p>
                                <p className="text-gray-700 font-medium leading-relaxed">{p.details}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Movement */}
            <section className="py-64 bg-black border-t border-white/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-12">THE FUTURE<br />IS SYSTEMIC.</h2>
                        <p className="text-gray-500 mb-16 uppercase tracking-[0.4em] text-[10px] font-black leading-loose max-w-xl mx-auto">
                            We are building more than tools. We are building a methodology for the future of work. Join us in the evolution.
                        </p>
                        <button className="group relative px-20 py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/90 transition-all transform hover:-translate-y-2">
                            Join the Movement
                            <ArrowRight size={16} className="inline-block ml-4 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    );
};

export default PhilosophyPage;
