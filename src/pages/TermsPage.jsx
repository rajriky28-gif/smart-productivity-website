import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Terminal, Box, Scale } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const TermsPage = () => {
    const products = [
        {
            id: 'stride',
            name: 'Stride',
            tagline: 'Service License Agreement',
            desc: 'Usage terms for our flagship todo engine. Governing execution, local storage, and license scopes.',
            icon: <img src={strideLogo} alt="Stride" className="w-20 h-20 object-contain brightness-0 invert group-hover:invert-0 transition-all duration-500" />
        },
        {
            id: 'zenith',
            name: 'Zenith',
            tagline: 'Beta Access Terms',
            desc: 'Terms governing early access to our cognitive flow architecture and research tools.',
            icon: <Box className="w-10 h-10" />
        },
        {
            id: 'cloud',
            name: 'Cloud Services',
            tagline: 'Platform SLA',
            desc: 'General service level agreements for our distributed cloud infrastructure and data processing.',
            icon: <Scale className="w-10 h-10" />
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <section className="py-32 relative border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                    <div className="text-[30vw] font-black uppercase tracking-tighter">Legals</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto"
                    >
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 mb-8 block">Execution Framework</span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-12 leading-none">TERMS OF<br />SERVICE.</h1>
                        <p className="text-xl text-zinc-500 font-medium leading-relaxed mb-16">
                            Precision in code, precision in agreement. Select a product to review the foundational terms governing its usage and your rights.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((p, i) => (
                            <Link key={p.id} to={`/terms/${p.id}`}>
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

export default TermsPage;
