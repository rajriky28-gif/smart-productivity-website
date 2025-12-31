import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import strideLogo from '../assets/stride-logo.png';
import playstoreLogo from '../assets/playstore-logo.png';
import {
    Zap,
    Target,
    Layers,
    Calendar,
    Search,
    Trophy,
    ArrowRight,
    MousePointer2,
    Lock,
    MessageSquare,
    Clock,
    ClipboardList
} from 'lucide-react';

const StridePage = () => {
    const [toast, setToast] = useState({ show: false, message: '' });

    const triggerToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const handleWaitlistClick = () => {
        triggerToast("Waitlist feature is under development");
    };

    const handleExperienceClick = () => {
        triggerToast("Flow Experience is coming soon");
    };
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const features = [
        {
            icon: <Zap className="w-6 h-6" />,
            title: "NLP EXTRACTION",
            description: "Type tasks in plain English. Stride automatically fletches date, time, and priority."
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "FOCUS ENGINE",
            description: "Integrated Pomodoro suite with custom sessions and automated DND protection."
        },
        {
            icon: <Layers className="w-6 h-6" />,
            title: "SYSTEMIC TEMPLATES",
            description: "Use professional blueprints or forge your own for recurring weekly success."
        },
        {
            icon: <Trophy className="w-6 h-6" />,
            title: "TROPHY SYSTEM",
            description: "Gamified achievement engine rewarding consistency and speed demon execution."
        },
        {
            icon: <Search className="w-6 h-6" />,
            title: "INSTANT SEARCH",
            description: "Global retrieval engine that finds any task in sub-millisecond speeds."
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "WEEKLY REPORTS",
            description: "Deep analytical snapshots of your focus time and daily activity curves."
        }
    ];

    return (
        <div className="bg-black text-white selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="h-screen relative flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 2 }}
                        className="text-[25vw] font-black tracking-tighter"
                    >
                        STRIDE
                    </motion.h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 text-center px-4"
                >
                    <motion.div variants={itemVariants} className="inline-block px-3 py-1 border border-white/20 rounded-full mb-6">
                        <span className="text-xs tracking-[0.3em] font-medium uppercase">Flagship Product</span>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex justify-center mb-8">
                        <img src={strideLogo} alt="Stride Logo" className="w-32 h-32 object-contain brightness-0 invert" />
                    </motion.div>
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                        VELOCITY <br className="md:hidden" />
                        <span className="text-transparent border-text text-white/40">ENGINE.</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                        The most advanced productivity tool ever built for the modern professional.
                        Engineered for those who treat work as a high-performance art.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <button
                            onClick={handleExperienceClick}
                            className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 mx-auto group"
                        >
                            EXPERIENCE FLOW
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </motion.div>

                <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-2 pointer-events-none">
                    <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-500">Scroll to Explore</span>
                </div>
            </section>

            {/* Intelligence Section (NLP) */}
            <section className="py-32 bg-white text-black border-y border-zinc-200">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-5xl font-black tracking-tight leading-none">
                                NATURAL <br />
                                INTELLECT.
                            </h2>
                            <p className="text-lg text-zinc-600 font-light max-w-md">
                                Stop filling forms. Start taking action. Stride's NLP engine translates your thoughts into structured execution paths instantly.
                            </p>
                            <div className="space-y-4">
                                {['Plain English Detection', 'Auto-Time Fetching', 'Priority Identification'].map((feat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-[1px] bg-black" />
                                        <span className="text-sm font-bold tracking-widest uppercase">{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative p-8 bg-zinc-100 rounded-3xl border border-zinc-200 shadow-2xl"
                        >
                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                                    <span className="text-xs text-zinc-400 block mb-2 font-mono uppercase tracking-tighter">Input</span>
                                    <p className="font-medium">"Meeting with design team tomorrow at 4pm urgent"</p>
                                </div>
                                <div className="bg-zinc-900 text-white p-6 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center text-xs text-zinc-500 uppercase tracking-widest">
                                        <span>Detected Map</span>
                                        <Zap className="w-3 h-3 text-white fill-white" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-zinc-800 rounded-lg">
                                            <span className="text-[10px] block text-zinc-500 mb-1 font-mono">Title</span>
                                            <span className="text-sm font-bold">Design Meeting</span>
                                        </div>
                                        <div className="p-3 bg-zinc-800 rounded-lg">
                                            <span className="text-[10px] block text-zinc-500 mb-1 font-mono">Time</span>
                                            <span className="text-sm font-bold">4:00 PM</span>
                                        </div>
                                        <div className="p-3 bg-zinc-800 rounded-lg border border-white/20">
                                            <span className="text-[10px] block text-zinc-500 mb-1 font-mono">Priority</span>
                                            <span className="text-sm font-black text-red-500">URGENT</span>
                                        </div>
                                        <div className="p-3 bg-zinc-800 rounded-lg">
                                            <span className="text-[10px] block text-zinc-500 mb-1 font-mono">Date</span>
                                            <span className="text-sm font-bold">Tomorrow</span>
                                        </div>
                                    </div>
                                    <div className="w-full py-3 bg-indigo-600 rounded-xl font-bold text-sm tracking-widest uppercase text-center cursor-default">
                                        Confirm Extraction
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">POWERED BY PRECISION.</h2>
                        <div className="w-20 h-1 bg-white mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-8 border border-white/10 rounded-3xl bg-zinc-900/50 hover:bg-zinc-900 transition-colors group"
                            >
                                <div className="mb-6 p-4 bg-white text-black rounded-2xl inline-block transition-transform group-hover:scale-110">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-4 tracking-widest">{feature.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gestures Section */}
            <section className="py-32 bg-zinc-100 text-black overflow-hidden border-t border-zinc-200">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="flex-1 order-2 md:order-1 relative">
                            <div className="w-full aspect-[9/16] max-w-[320px] bg-black rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-zinc-800 mx-auto">
                                <div className="h-full bg-zinc-900 rounded-[2rem] overflow-hidden flex flex-col p-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="w-10 h-1 bg-zinc-800 rounded-full" />
                                        <div className="w-4 h-4 rounded-full bg-zinc-800" />
                                    </div>

                                    <motion.div
                                        animate={{ x: [0, 80, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-4 bg-zinc-800 rounded-xl mb-4 relative"
                                    >
                                        <div className="h-4 w-2/3 bg-zinc-700 rounded mb-2" />
                                        <div className="h-2 w-1/2 bg-zinc-700 rounded" />
                                        <div className="absolute right-full top-0 h-full w-full bg-green-500 flex items-center justify-end px-4">
                                            <Zap className="text-white w-6 h-6" />
                                        </div>
                                    </motion.div>

                                    <div className="p-4 bg-white/5 rounded-xl mb-4 opacity-50">
                                        <div className="h-4 w-3/4 bg-zinc-700 rounded mb-2" />
                                        <div className="h-2 w-1/3 bg-zinc-700 rounded" />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-10 top-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl border border-zinc-200 max-w-[200px] hidden lg:block">
                                <MousePointer2 className="w-6 h-6 mb-3" />
                                <h4 className="font-bold text-xs tracking-widest uppercase mb-1">Tactile Mastery</h4>
                                <p className="text-[10px] text-zinc-500">Left for deletion. Right for glory. Every interaction is cinematic.</p>
                            </div>
                        </div>

                        <div className="flex-1 order-1 md:order-2 space-y-10">
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-black uppercase">
                                PULSE OF <br className="md:hidden" />
                                ACTION.
                            </h2>
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { title: "SWIPE RIGHT", desc: "Mark as complete. Feel the haptic pulse of progress." },
                                    { title: "SWIPE LEFT", desc: "Instant deletion. Keep your trajectory clean." },
                                    { title: "LONG PRESS", desc: "Omnipotent control. Edit, reschedule, or duplicate in 400ms." }
                                ].map((item, i) => (
                                    <div key={i} className="group">
                                        <h3 className="text-sm font-black tracking-[0.3em] mb-2 group-hover:text-indigo-600 transition-colors uppercase italic underline decoration-2 underline-offset-4 text-black">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-zinc-600 font-medium">
                                            {item.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gamification / Trophies */}
            <section className="py-32 border-b border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <Trophy className="w-12 h-12 mx-auto mb-6 text-yellow-500" />
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">THE REWARD OF RIGOR.</h2>
                        <p className="text-zinc-500 max-w-xl mx-auto font-light">
                            We turn discipline into status. Earn trophies as you conquer your day.
                            Consistency isn't just a habit—it's a leaderboard.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 overflow-x-auto pb-10 no-scrollbar">
                        {[
                            { label: 'Speed Demon', icon: '⚡' },
                            { label: 'Early Bird', icon: '☀️' },
                            { label: 'Unstoppable', icon: '🚀' },
                            { label: 'Task Master', icon: '🎯' },
                            { label: 'Consistency', icon: '🔥' }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/20 flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                                    {t.icon}
                                </div>
                                <span className="text-[10px] tracking-widest font-black uppercase text-zinc-400">{t.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-white" />
                <div className="container mx-auto px-4 relative z-10 text-center text-black">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 text-black uppercase leading-tight">
                        JOIN THE <br className="md:hidden" />
                        VELOCITY.
                    </h2>
                    <p className="text-zinc-600 max-w-md mx-auto mb-12 text-lg">
                        Stride is currently in private beta. Be the first to experience the future of effort.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={handleWaitlistClick}
                            className="px-12 py-5 bg-black text-white rounded-full font-bold hover:bg-zinc-800 transition-all tracking-widest"
                        >
                            JOIN WAITLIST
                        </button>
                        <Link
                            to="/roadmap"
                            className="px-12 py-5 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition-all tracking-widest inline-block text-center"
                        >
                            VIEW ROADMAP
                        </Link>
                    </div>
                </div>
            </section>

            {/* Google Play Download Section */}
            <section className="py-24 bg-zinc-50 border-t border-zinc-200">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-sm font-black tracking-[0.4em] uppercase mb-8 text-zinc-400">Available Now</h3>
                    <div className="flex flex-col items-center gap-6">
                        <h2 className="text-3xl font-black text-black tracking-tight">CARRY FLOW IN YOUR POCKET.</h2>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.smartproductivity.stride"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white px-8 py-4 rounded-2xl flex items-center gap-4 hover:bg-zinc-900 transition-all shadow-xl group"
                        >
                            <img
                                src={playstoreLogo}
                                alt="Google Play"
                                className="w-8 h-8 object-contain"
                            />
                            <div className="text-left">
                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">Get it on</div>
                                <div className="text-lg font-black leading-none">Google Play</div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* Notification Overlay */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] bg-white text-black px-12 py-6 font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl border border-black/10 flex items-center gap-4 text-center min-w-[300px]"
                    >
                        <Zap size={16} className="fill-black flex-shrink-0" />
                        {toast.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StridePage;
