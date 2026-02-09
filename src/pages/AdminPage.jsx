import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    Trash2,
    Layout,
    Type,
    FileText,
    Hash,
    Save,
    AlertCircle,
    CheckCircle,
    ArrowLeft,
    ChevronDown
} from 'lucide-react';

const AdminPage = () => {
    const [jobs, setJobs] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    // Auth Check
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) navigate('/auth');
        });
        return () => unsubscribe();
    }, [navigate]);

    // Job Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        fields: [
            { id: '1', type: 'text', label: 'Full Name', required: true },
            { id: '2', type: 'text', label: 'Email', required: true }
        ]
    });

    const categories = ['Engineering', 'Design', 'Marketing', 'Product', 'Operations'];
    const fieldTypes = [
        { type: 'text', icon: <Type size={14} />, label: 'Text Input' },
        { type: 'number', icon: <Hash size={14} />, label: 'Number Input' },
        { type: 'file', icon: <FileText size={14} />, label: 'PDF Upload' }
    ];

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'jobs'));
            const jobList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setJobs(jobList);
        } catch (err) {
            console.error(err);
        }
    };

    const addField = (type) => {
        const newField = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            label: '',
            required: true
        };
        setFormData({ ...formData, fields: [...formData.fields, newField] });
    };

    const removeField = (id) => {
        setFormData({ ...formData, fields: formData.fields.filter(f => f.id !== id) });
    };

    const updateFieldLabel = (id, label) => {
        const updatedFields = formData.fields.map(f => f.id === id ? { ...f, label } : f);
        setFormData({ ...formData, fields: updatedFields });
    };

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.fields.some(f => !f.label.trim())) {
            setError('Please provide labels for all fields');
            setLoading(false);
            return;
        }

        try {
            await addDoc(collection(db, 'jobs'), {
                ...formData,
                createdAt: new Date().toISOString(),
                active: true
            });
            setSuccess('Job deployment successful');
            setIsCreating(false);
            setFormData({
                title: '',
                category: '',
                description: '',
                fields: [
                    { id: '1', type: 'text', label: 'Full Name', required: true },
                    { id: '2', type: 'text', label: 'Email', required: true }
                ]
            });
            fetchJobs();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(''), 3000);
        }
    };

    const deleteJob = async (id) => {
        if (!window.confirm('Terminate this job protocol?')) return;
        try {
            await deleteDoc(doc(db, 'jobs', id));
            fetchJobs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white px-6 py-32">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-end mb-16 px-6">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-4 block">Command Center</span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Job Protocols</h1>
                    </div>
                    {!isCreating && (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="bg-white text-black px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-gray-200 transition-all"
                        >
                            <Plus size={16} /> Create Job
                        </button>
                    )}
                </div>

                <AnimatePresence mode="wait">
                    {isCreating ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                        >
                            <div className="space-y-12">
                                <button
                                    onClick={() => setIsCreating(false)}
                                    className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-white flex items-center gap-3"
                                >
                                    <ArrowLeft size={14} /> Back to Dashboard
                                </button>

                                <div className="space-y-8">
                                    {/* Primary Info */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-3 block">Position Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="e.g. Lead Designer"
                                                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-medium"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-3 block">Category</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-medium appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled className="bg-black">Select Category</option>
                                                    {categories.map(cat => <option key={cat} value={cat} className="bg-black">{cat}</option>)}
                                                </select>
                                                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-black text-white/40 mb-3 block">Job Description</label>
                                            <textarea
                                                rows="4"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Outline the responsibilities and requirements..."
                                                className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-medium resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Dynamic Fields */}
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <label className="text-[10px] uppercase tracking-widest font-black text-white/40 block">Application Fields</label>
                                            <div className="flex gap-2">
                                                {fieldTypes.map(ft => (
                                                    <button
                                                        key={ft.type}
                                                        onClick={() => addField(ft.type)}
                                                        className="p-2 border border-white/10 hover:border-white text-white/40 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                                                    >
                                                        {ft.icon} {ft.label.split(' ')[0]}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {formData.fields.map((field, idx) => (
                                                <div key={field.id} className="flex gap-4 group">
                                                    <div className="bg-white/5 border border-white/10 p-4 shrink-0 flex items-center text-white/20">
                                                        {fieldTypes.find(ft => ft.type === field.type).icon}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={field.label}
                                                        onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                                                        placeholder="Field Label (e.g. Portfolio URL)"
                                                        className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-white focus:outline-none focus:border-white transition-all font-medium"
                                                    />
                                                    {idx > 1 && (
                                                        <button
                                                            onClick={() => removeField(field.id)}
                                                            className="bg-red-500/10 border border-red-500/20 px-4 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button
                                        disabled={loading || !formData.title || !formData.category}
                                        onClick={handleCreateJob}
                                        className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gray-200 transition-all flex items-center justify-center gap-4 disabled:opacity-30"
                                    >
                                        <Save size={16} /> Deploy Protocol
                                    </button>
                                </div>
                            </div>

                            {/* Preview */}
                            <div className="hidden lg:block relative">
                                <div className="sticky top-32 bg-white text-black p-12 min-h-[600px]">
                                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-black/40 mb-10 block">Interface Preview</span>
                                    <div className="mb-12">
                                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">{formData.title || 'Job Title'}</h2>
                                        <span className="text-[10px] uppercase tracking-widest font-black inline-block px-3 py-1 bg-black text-white">{formData.category || 'Category'}</span>
                                    </div>
                                    <div className="space-y-6">
                                        {formData.fields.map(field => (
                                            <div key={field.id} className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-black opacity-40">{field.label || 'Untitled Field'}</label>
                                                <div className="border border-black/10 px-6 py-4 text-black/20 text-xs font-bold uppercase tracking-widest">
                                                    {field.type === 'file' ? 'Select File (PDF)' : `Input ${field.type}`}
                                                </div>
                                            </div>
                                        ))}
                                        <button className="w-full bg-black text-white py-4 text-[10px] font-black uppercase tracking-widest mt-8">Submit Application</button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/5 border border-white/10"
                        >
                            <div className="grid grid-cols-1 divide-y divide-white/10">
                                {jobs.length === 0 ? (
                                    <div className="p-24 text-center">
                                        <Layout className="mx-auto mb-6 text-white/10" size={64} />
                                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">No active job protocols detected.</p>
                                    </div>
                                ) : (
                                    jobs.map(job => (
                                        <div key={job.id} className="p-8 hover:bg-white/5 transition-colors flex justify-between items-center group">
                                            <div className="flex items-center gap-8">
                                                <div className="text-[10px] font-black text-white/20 w-8">/0{jobs.indexOf(job) + 1}</div>
                                                <div>
                                                    <h3 className="text-xl font-black uppercase tracking-tighter mb-2">{job.title}</h3>
                                                    <div className="flex gap-4">
                                                        <span className="text-[10px] uppercase tracking-widest font-black text-white/40">{job.category}</span>
                                                        <span className="text-[10px] uppercase tracking-widest font-black text-white/20">•</span>
                                                        <span className="text-[10px] uppercase tracking-widest font-black text-white/40">{job.fields.length} Requirements</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => deleteJob(job.id)}
                                                    className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Notifications */}
                <div className="fixed bottom-12 right-12 z-50 flex flex-col gap-4">
                    {success && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-green-500 text-black px-8 py-4 flex items-center gap-4 shadow-2xl">
                            <CheckCircle size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{success}</span>
                        </motion.div>
                    )}
                    {error && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-red-500 text-white px-8 py-4 flex items-center gap-4 shadow-2xl">
                            <AlertCircle size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
