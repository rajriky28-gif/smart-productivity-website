import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Target, Layers, Clock, Shield, Sparkles, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import strideLogo from '../assets/stride-logo.png';

const ProductsPage = () => {
    const [showWaitlistMessage, setShowWaitlistMessage] = useState(false);

    const handleWaitlistClick = () => {
        setShowWaitlistMessage(true);
        setTimeout(() => setShowWaitlistMessage(false), 3000);
    };
    const tools = [
        {
            id: 'stride',
            name: 'Stride',
            logo: strideLogo,
            tagline: 'Precision Velocity Engine',
            desc: 'Our flagship productivity instrument. Engineered with a Natural Language Engine and tactile gesture-based controls. It doesn\'t just track tasks; it optimizes your entire daily trajectory.',
            status: 'Available',
            features: ['NLP Intelligence', 'Tactile Gestures', 'Local Data Sovereignty', 'Focus Engine']
        },
        {
            id: 'future-1',
            name: 'Tool 02',
            tagline: 'Coming Soon',
            desc: 'A new instrument for digital efficiency is currently under development. Reimagining standard workflows through the lens of minimalism.',
            status: 'In Development',
            features: ['Stealth Mode', 'High Performance']
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-white"
        >
            {/* Hero Section - Full Viewport */}
            <section className="h-screen flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <div className="text-[40vw] font-black opacity-[0.03] select-none uppercase tracking-tighter">Tools</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Product Ecosystem</span>
                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-none">THE TOOLS</h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-tight font-medium max-w-2xl mx-auto mb-12">
                            Precision instruments for high-performance individuals.
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
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </section>

            {/* Main Product Grid */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-48">
                        {tools.map((tool, i) => (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.2 }}
                                className="group border border-white/5 bg-white/[0.02] overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row">
                                    <div className="flex-1 aspect-square md:aspect-auto bg-white/5 border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden flex items-center justify-center min-h-[400px]">
                                        <div className="text-9xl font-black text-white opacity-[0.03] group-hover:scale-110 transition-transform duration-1000 select-none">
                                            0{i + 1}
                                        </div>
                                        {tool.status === 'Available' && (
                                            <div className="absolute inset-10 border border-white/10 flex items-center justify-center">
                                                <div className="w-1/2 h-[1px] bg-white/20 absolute rotate-45"></div>
                                                <div className="w-1/2 h-[1px] bg-white/20 absolute -rotate-45"></div>
                                                {tool.logo && (
                                                    <motion.img
                                                        src={tool.logo}
                                                        alt={tool.name}
                                                        className="w-32 h-32 object-contain relative z-10 brightness-0 invert"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
                                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-10 flex items-center gap-4">
                                            <span className="w-8 h-[1px] bg-white/10"></span>
                                            {tool.status}
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">{tool.name}</h2>
                                        <div className="text-sm font-black uppercase tracking-[0.3em] text-white/40 mb-8">{tool.tagline}</div>
                                        <p className="text-gray-500 text-lg leading-relaxed mb-12 max-w-md">{tool.desc}</p>

                                        <div className="flex flex-wrap gap-3 mb-12">
                                            {tool.features.map(f => (
                                                <span key={f} className="text-[9px] uppercase tracking-widest font-black px-4 py-2 bg-white/5 border border-white/10 text-white/40">{f}</span>
                                            ))}
                                        </div>

                                        {tool.id === 'stride' ? (
                                            <Link
                                                to="/stride"
                                                className="flex items-center gap-6 px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all w-fit shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]"
                                            >
                                                Explore Stride <ArrowRight size={14} />
                                            </Link>
                                        ) : tool.status === 'Available' ? (
                                            <button className="flex items-center gap-6 px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all w-fit shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]">
                                                Launch Project <ArrowRight size={14} />
                                            </button>
                                        ) : (
                                            <button className="px-12 py-5 border border-white/10 text-white/20 font-black uppercase tracking-widest text-[10px] cursor-not-allowed w-fit">
                                                Coming Soon
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Design Standards Section - Fixed Contrast */}
            <section className="py-48 bg-white text-black relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-20 items-end mb-32">
                        <div className="flex-1">
                            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-black/40 mb-6 block">Our DNA</span>
                            <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none text-black">DESIGN<br />STANDARDS</h2>
                        </div>
                        <div className="w-full md:w-1/3 h-[2px] bg-black mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: <Zap size={32} />, title: 'Latency Zero', desc: 'Instantaneous response. Velocity as a feature.' },
                            { icon: <Target size={32} />, title: 'Focus First', desc: 'No clutter. No noise. Pure utility with extreme aesthetics.' },
                            { icon: <Shield size={32} />, title: 'Data Privacy', desc: 'Your productivity is your own. Foundationally private.' },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: i * 0.1 }}
                                className="border-t border-black/10 pt-12"
                            >
                                <div className="mb-8 text-black">{feature.icon}</div>
                                <h3 className="text-xl font-black uppercase tracking-widest mb-4 text-black">{feature.title}</h3>
                                <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Future CTA */}
            <section className="py-64 bg-black border-t border-white/10 text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-white">NEXT HORIZON</h2>
                        <p className="text-gray-500 mb-16 uppercase tracking-[0.4em] text-[10px] font-black leading-loose">
                            Refining the next instrument of efficiency.<br />Revealed when perfection is reached.
                        </p>
                        <button
                            onClick={handleWaitlistClick}
                            className="group relative px-20 py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/90 transition-all transform hover:-translate-y-2"
                        >
                            Join the Private Waitlist
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-1 bg-white transition-all duration-500"></span>
                        </button>
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {showWaitlistMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-12 py-6 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl border border-black/10 flex items-center gap-4"
                    >
                        <Zap size={16} className="fill-black" />
                        Waitlist feature is under development
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductsPage;
