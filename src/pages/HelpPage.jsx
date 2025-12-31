import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LifeBuoy, Zap, Shield, HelpCircle, Search } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const HelpPage = () => {
    const categories = [
        {
            id: 'stride',
            name: 'Stride Support',
            tagline: 'Technical Guides',
            desc: 'Master the velocity engine. Documentation on NLP parsing, gestures, and digital sovereignty.',
            icon: <img src={strideLogo} alt="Stride" className="w-20 h-20 object-contain brightness-0 invert group-hover:invert-0 transition-all duration-500" />
        },
        {
            id: 'zenith',
            name: 'Zenith Alpha',
            tagline: 'Experimental Support',
            desc: 'Guides for our cognitive hub research. Reporting anomalies and flow optimization.',
            icon: <HelpCircle className="w-10 h-10" />
        },
        {
            id: 'account',
            name: 'Account & Security',
            tagline: 'Ecosystem Access',
            desc: 'Managing your digital identity, data sovereignty, and security keys.',
            icon: <Shield className="w-10 h-10" />
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <section className="py-32 relative border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                    <div className="text-[30vw] font-black uppercase tracking-tighter">Support</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 mb-8 block">Execution Support</span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-12 leading-none">SELECT<br />PRODUCT.</h1>

                        <div className="relative max-w-xl mx-auto mb-16 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="SEARCH FOR SOLUTIONS..."
                                className="w-full bg-white/5 border border-white/10 rounded-full py-6 pl-16 pr-8 text-xs font-black tracking-widest outline-none focus:border-white/40 transition-all uppercase"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Product Selection */}
            <section className="py-40 bg-zinc-950/50">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
                        {categories.map((c, i) => (
                            <Link key={c.id} to={`/help/${c.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="relative overflow-hidden p-10 border border-white/5 bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="relative z-10 mb-10 w-32 h-32 border border-white/10 group-hover:border-black/10 transition-colors flex items-center justify-center mx-auto">
                                        {c.icon}
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{c.name}</h3>
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-black/40 mb-6 block">{c.tagline}</span>
                                    <p className="text-base text-zinc-500 group-hover:text-black/60 font-medium leading-relaxed">
                                        {c.desc}
                                    </p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpPage;
