import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Zap } from 'lucide-react';

const CareerPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'jobs'));
                const jobList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setJobs(jobList);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const categories = ['All', ...new Set(jobs.map(j => j.category))];
    const filteredJobs = selectedCategory === 'All'
        ? jobs
        : jobs.filter(j => j.category === selectedCategory);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* Legend Section */}
            <section className="h-[60vh] flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <div className="text-[30vw] font-black opacity-[0.03] select-none uppercase tracking-tighter">FUTURE</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Careers & Culture</span>
                        <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter uppercase mb-12 leading-tight">JOIN THE<br className="md:hidden" /> RADIUS</h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-tight font-medium max-w-2xl mx-auto mb-12">
                            We're looking for architects of productivity. Those who believe that fewer features mean more focus.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-24 border-b border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${selectedCategory === cat ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
                            {filteredJobs.length} Active Protocols Found
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Grid */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
                        {loading ? (
                            <div className="col-span-full py-48 text-center bg-black">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block mb-8">
                                    <Zap size={32} />
                                </motion.div>
                                <p className="text-[10px] uppercase tracking-widest font-black text-white/40">Syncing with career hub...</p>
                            </div>
                        ) : filteredJobs.length === 0 ? (
                            <div className="col-span-full py-48 text-center bg-black">
                                <p className="text-2xl font-black uppercase tracking-tighter opacity-20">No active positions in this sector.</p>
                            </div>
                        ) : (
                            filteredJobs.map((job, i) => (
                                <Link
                                    to={`/careers/${job.id}`}
                                    key={job.id}
                                    className="p-12 md:p-20 bg-black hover:bg-white hover:text-black transition-all duration-500 group relative"
                                >
                                    <div className="flex justify-between items-start mb-12">
                                        <div className="text-[10px] font-black opacity-20 group-hover:opacity-100 transition-opacity">/ 0{i + 1}</div>
                                        <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">{job.title}</h3>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 group-hover:opacity-100">{job.category}</span>
                                        <div className="h-px w-8 bg-current opacity-20" />
                                        <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40 group-hover:opacity-100">Full-Time</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Vision Quote */}
            <section className="py-48 text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">
                        <p className="text-3xl font-bold italic opacity-40 mb-8 leading-relaxed">
                            "The best tools are the ones you don't notice."
                        </p>
                        <div className="h-px w-24 bg-white/10 mx-auto" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareerPage;
