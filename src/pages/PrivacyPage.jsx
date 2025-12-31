import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const PrivacyPage = () => {
    const products = [
        {
            id: 'stride',
            name: 'Stride',
            tagline: 'Precision Todo System',
            desc: 'Privacy protocols for our flagship execution engine. Covering local-first architecture and digital sovereignty.',
            icon: <img src={strideLogo} alt="Stride" className="w-20 h-20 object-contain brightness-0 invert group-hover:invert-0 transition-all duration-500" />
        },
        {
            id: 'zenith',
            name: 'Zenith',
            tagline: 'Cognitive Flow',
            desc: 'Early-stage privacy framework for our upcoming cognitive flow architecture.',
            icon: <Monitor className="w-10 h-10" />
        },
        {
            id: 'general',
            name: 'General Policy',
            tagline: 'Standard Terms',
            desc: 'Global data sovereignty standards applicable across all Smart Productivity ecosystems.',
            icon: <Globe className="w-10 h-10" />
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <section className="py-32 relative border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                    <div className="text-[30vw] font-black uppercase tracking-tighter">Secure</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 mb-8 block">Data Sovereignty</span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-12 leading-none">PRIVACY<br />PORTAL.</h1>
                        <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-16">
                            Transparency is our default state. Select your platform to review the specific protocols protecting your digital footprint.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((p, i) => (
                            <Link key={p.id} to={`/privacy/${p.id}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="h-full p-12 border border-white/5 bg-white/[0.02] flex flex-col items-center text-center group hover:bg-white hover:text-black transition-all duration-500"
                                >
                                    <div className="mb-10 w-32 h-32 border border-white/10 group-hover:border-black/10 transition-colors flex items-center justify-center">
                                        {p.icon}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{p.name}</h3>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-black/40 mb-6 block">{p.tagline}</span>
                                    <p className="text-sm text-zinc-500 group-hover:text-black/60 font-medium leading-relaxed">
                                        {p.desc}
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

export default PrivacyPage;
