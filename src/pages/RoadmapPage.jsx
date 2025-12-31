import React from 'react';
import { motion } from 'framer-motion';
import { Milestone, Flag, Compass, CheckCircle2 } from 'lucide-react';

const RoadmapPage = () => {
    const quarters = [
        {
            period: 'Q1 2026',
            status: 'Executing',
            title: 'Foundational Scale',
            goals: ['Global Sync Infrastructure', 'Offline-First Engine', 'Standardized API'],
            icon: <Flag className="w-8 h-8" />
        },
        {
            period: 'Q2 2026',
            status: 'Planning',
            title: 'Cognitive Hub',
            goals: ['Project Zenith Beta', 'Intelligence Dashboard', 'Haptic Ecosystem'],
            icon: <Compass className="w-8 h-8" />
        },
        {
            period: 'Q3 2026',
            status: 'Research',
            title: 'Absolute Sovereignty',
            goals: ['Decentralized Data Nodes', 'Project Void Alpha', 'Privacy Protocols'],
            icon: <Milestone className="w-8 h-8" />
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black pt-20">
            {/* Hero Section */}
            <section className="py-32 relative border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
                    <div className="text-[25vw] font-black uppercase tracking-tighter">Roadmap</div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40 mb-8 block">Project Trajectory</span>
                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase mb-12">THE PATH<br />AHEAD.</h1>
                        <p className="text-xl text-zinc-500 font-medium leading-relaxed">
                            A transparent breakdown of our engineering goals. We don't build features; we architect evolution.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="space-y-40">
                        {quarters.map((q, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                className="flex flex-col md:flex-row gap-20 items-start"
                            >
                                <div className="md:w-1/3">
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="p-4 border border-white/10 rounded-2xl bg-white/5">
                                            {q.icon}
                                        </div>
                                        <div className="h-[1px] flex-1 bg-white/10" />
                                    </div>
                                    <span className="text-sm font-black tracking-[0.3em] uppercase mb-4 block">{q.period}</span>
                                    <div className="text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1 border border-white/20 w-fit mb-6">
                                        {q.status}
                                    </div>
                                    <h2 className="text-4xl font-black uppercase tracking-tighter">{q.title}</h2>
                                </div>

                                <div className="flex-1 grid grid-cols-1 gap-6">
                                    {q.goals.map((goal, j) => (
                                        <div key={j} className="p-10 border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:bg-white hover:text-black transition-all duration-500">
                                            <span className="text-sm font-black uppercase tracking-widest">{goal}</span>
                                            <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity">
                                                <div className="w-2 h-2 rounded-full bg-current" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Historical Milestones */}
            <section className="py-40 bg-zinc-950 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <h3 className="text-[10px] font-black tracking-[0.5em] uppercase text-center mb-20 text-white/20">Legacy Log</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { year: '2024', event: 'Stride Foundation Prototype' },
                            { year: '2025', event: 'NLP Engine V1 Integration' },
                            { year: '2025', event: 'Gesture System Cinematic' },
                            { year: '2025', event: 'Public Beta Launch' }
                        ].map((log, i) => (
                            <div key={i} className="text-center p-8 border border-white/5">
                                <span className="text-xs font-black text-white/10 mb-2 block">{log.year}</span>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{log.event}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Thought */}
            <section className="py-60 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-2xl mx-auto"
                    >
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">THE MARGIN OF ERROR IS ZERO.</h2>
                        <p className="text-zinc-500 font-medium tracking-widest text-xs leading-loose">
                            We iterate until the friction disappears. The roadmap is a promise of constant refinement.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default RoadmapPage;
