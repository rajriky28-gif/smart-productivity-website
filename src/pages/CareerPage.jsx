import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, Zap } from 'lucide-react';

// REPLACE THIS with your Google Apps Script Web App URL
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbyv7Wi-bztPO5taq8fryr1ZEtEFDlb7toKM344re43wx-u7a7loDcUM2MSy3FV2iLBu/exec';

const CareerPage = () => {
    // Initial state from localStorage for "Instant Loading"
    const [jobs, setJobs] = useState(() => {
        const cached = localStorage.getItem('smart_jobs_cache');
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(jobs.length === 0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            if (SHEETS_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${SHEETS_API_URL}?action=getJobs`);
                const jobList = await response.json();

                if (Array.isArray(jobList)) {
                    setJobs(jobList);
                    localStorage.setItem('smart_jobs_cache', JSON.stringify(jobList));
                }
            } catch (err) {
                console.error('Sheets fetch failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const categories = ['All', ...new Set(jobs.map(j => j.category))];

    const filteredJobs = jobs.filter(job => {
        const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-black text-white selection:bg-white selection:text-black"
        >
            {/* Legend Section */}
            <section className="h-screen flex items-center justify-center border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
                    <div className="text-[35vw] font-black opacity-[0.03] select-none uppercase tracking-tighter">FUTURE</div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-10 block">Careers & Culture</span>
                        <h1 className="text-5xl md:text-[10rem] font-black tracking-tighter uppercase mb-12 leading-tight">JOIN THE<br className="md:hidden" /> RADIUS</h1>
                        <p className="text-xl md:text-2xl text-gray-500 leading-tight font-medium max-w-2xl mx-auto mb-12">
                            We're looking for architects of productivity. Those who believe that fewer features mean more focus.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Discovery Bar */}
            <section className="py-12 border-b border-white/10 sticky top-20 bg-black/80 backdrop-blur-xl z-40">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                        {/* Search Component */}
                        <div className="flex-1 relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search roles, sectors, or protocols..."
                                className="w-full bg-white/5 border border-white/10 py-6 pl-16 pr-8 text-white focus:outline-none focus:border-white transition-all font-medium placeholder:text-white/20 uppercase tracking-widest text-[10px]"
                            />
                        </div>

                        {/* Category Sidebar/Column replacement - Horizontal row but more visible */}
                        <div className="flex gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-8 py-3 text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap transition-all border ${selectedCategory === cat ? 'bg-white text-black border-white' : 'text-white/40 border-white/10 hover:border-white/40 hover:text-white'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <div className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20">
                            Discovery Engine / 0{filteredJobs.length} results
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-[10px] uppercase tracking-[0.2em] font-black text-white/40 hover:text-white"
                            >
                                Clear Results
                            </button>
                        )}
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
        </motion.div>
    );
};

export default CareerPage;
