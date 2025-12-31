import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, ArrowRight } from 'lucide-react';

const UpcomingPage = () => {
    return (
        <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black overflow-hidden">
            {/* Hero Section */}
            <section className="h-screen relative flex items-center justify-center border-b border-white/5 pt-20">
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                    <motion.h1
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "easeOut" }}
                        className="text-[30vw] font-black tracking-tighter uppercase whitespace-nowrap"
                    >
                        VOID
                    </motion.h1>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center -mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full mb-8 bg-white/5">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/60">Researching Singularity</span>
                        </div>
                        <h2 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-[0.85]">
                            THE NEXT<br />
                            <span className="text-transparent border-text text-white/30">HORIZON.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed mb-16">
                            Beyond Stride. We are currently architecting the next instrument of digital evolution.
                            Zero latency. Absolute focus.
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent mx-auto"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="py-40 bg-white text-black border-y border-zinc-200">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-20 items-center">
                        <div className="flex-1">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-400 mb-6 block">The Lab</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-10 text-black">SCIENTIFIC<br />MINIMALISM.</h2>
                            <p className="text-zinc-600 text-lg font-medium leading-relaxed max-w-md">
                                Every tool begins as a research paper. We study neuro-efficiency to build software that aligns with human cognition, not against it.
                            </p>
                        </div>
                        <div className="flex-1 grid grid-cols-1 gap-6">
                            {[
                                { id: '01', title: 'Latency induced cognitive load', status: 'Published' },
                                { id: '02', title: 'Haptic feedback as progress metric', status: 'Peer Review' },
                                { id: '03', title: 'The architecture of deep work', status: 'Ongoing' }
                            ].map((paper) => (
                                <div key={paper.id} className="p-8 border border-zinc-200 group hover:bg-black hover:text-white transition-all duration-500 flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] font-bold text-zinc-400 mb-2 block">{paper.id}</span>
                                        <h4 className="font-black uppercase tracking-tight text-black group-hover:text-white">{paper.title}</h4>
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 border border-current">{paper.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Teaser Grid */}
            <section className="py-40 border-b border-white/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl font-black tracking-[0.3em] uppercase opacity-40">Classified Units</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="p-12 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <Lock className="w-6 h-6 text-white/20" />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 mb-10 block">Project Codename: Zenith</span>
                            <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">REDACTED</h3>
                            <div className="space-y-4 mb-12">
                                <div className="h-2 w-full bg-white/5 rounded-full" />
                                <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                            </div>
                            <p className="text-zinc-600 text-sm font-medium italic">
                                "Solving the paradox of focus and communication. Expected Q3 2026."
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="p-12 border border-white/5 bg-white/[0.02] rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8">
                                <Sparkles className="w-6 h-6 text-white/20" />
                            </div>
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white/20 mb-10 block">Project Codename: Void</span>
                            <h3 className="text-4xl font-black mb-8 tracking-tighter uppercase">REDACTED</h3>
                            <div className="space-y-4 mb-12">
                                <div className="h-2 w-full bg-white/5 rounded-full" />
                                <div className="h-2 w-1/2 bg-white/5 rounded-full" />
                                <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                            </div>
                            <p className="text-zinc-600 text-sm font-medium italic">
                                "A new medium for decentralized creative sovereignty. Under research."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Evolution Timeline */}
            <section className="py-40 border-b border-white/5 bg-zinc-950">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black tracking-[0.5em] uppercase text-center mb-32 opacity-20">Path to Singularity</h2>
                    <div className="max-w-4xl mx-auto space-y-32">
                        {[
                            { phase: '01', name: 'STRIDE', desc: 'FOUNDATIONAL EXECUTION ENGINE.', status: 'DEPLOYED' },
                            { phase: '02', name: 'ZENITH', desc: 'COGNITIVE FLOW ARCHITECTURE.', status: 'SIMULATING' },
                            { phase: '03', name: 'VOID', desc: 'ABSOLUTE DIGITAL SOVEREIGNTY.', status: 'THEORETICAL' }
                        ].map((p, i) => (
                            <div key={i} className="flex flex-col md:flex-row gap-10 items-center">
                                <div className="text-6xl font-black text-white/10">{p.phase}</div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
                                        <h3 className="text-3xl font-black tracking-tighter">{p.name}</h3>
                                        <span className="text-[9px] px-3 py-1 border border-white/20 text-white/40 font-black tracking-widest">{p.status}</span>
                                    </div>
                                    <p className="text-zinc-500 font-medium tracking-widest text-xs">{p.desc}</p>
                                </div>
                                <div className="hidden md:block w-32 h-[1px] bg-white/10" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Private Access section */}
            <section className="py-60 relative">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-12">
                            BECOME A<br />FOUNDER.
                        </h2>
                        <p className="text-zinc-500 mb-16 text-lg md:text-xl font-medium max-w-xl mx-auto">
                            Join our private alpha list. Founders get lifetime access to all future instruments revealed on the horizon.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <input
                                type="email"
                                placeholder="ENTER EMAIL ADDRESS"
                                className="w-full md:w-96 bg-zinc-900 border border-white/10 px-8 py-6 rounded-full text-xs font-black tracking-widest focus:outline-none focus:border-white transition-colors"
                            />
                            <button className="w-full md:w-auto px-12 py-6 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-zinc-200 transition-all flex items-center justify-center gap-3">
                                SECURE ACCESS <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        <p className="mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
                            0.01% Acceptance Rate. Elite applications only.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default UpcomingPage;
