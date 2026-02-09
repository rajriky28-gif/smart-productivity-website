import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    ArrowLeft,
    Upload,
    CheckCircle,
    Loader2,
    AlertCircle,
    Send,
    FileText
} from 'lucide-react';

// REPLACE THIS with your Google Apps Script Web App URL
const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbyv7Wi-bztPO5taq8fryr1ZEtEFDlb7toKM344re43wx-u7a7loDcUM2MSy3FV2iLBu/exec';

const JobApplicationPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({});
    const [files, setFiles] = useState({});

    useEffect(() => {
        const fetchJob = async () => {
            if (SHEETS_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
                setError('Protocol configuration missing');
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${SHEETS_API_URL}?action=getJobs`);
                const jobList = await response.json();
                const currentJob = jobList.find(j => j.id === jobId);

                if (currentJob) {
                    setJob(currentJob);
                } else {
                    setError('Position protocol not found in Sheets');
                }
            } catch (err) {
                setError('Authentication error with central database');
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [jobId]);

    const handleInputChange = (fieldId, value) => {
        setFormData(prev => ({ ...prev, [fieldId]: value }));
    };

    const handleFileChange = (fieldId, file) => {
        if (file && file.type !== 'application/pdf') {
            setError('System only accepts valid PDF documents');
            return;
        }
        setError('');
        setFiles(prev => ({ ...prev, [fieldId]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        if (SHEETS_API_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
            setError('API configuration required for transmission');
            setSubmitting(false);
            return;
        }

        try {
            const uploadedFiles = {};

            // Upload files to Firebase Storage (for reliable hosting)
            for (const [fieldId, file] of Object.entries(files)) {
                if (file) {
                    const storageRef = ref(storage, `applications/${jobId}/${Date.now()}_${file.name}`);
                    const snapshot = await uploadBytes(storageRef, file);
                    const url = await getDownloadURL(snapshot.ref);
                    // Use label as key for Sheets compatibility
                    const fieldLabel = job.fields.find(f => f.id === fieldId)?.label || fieldId;
                    uploadedFiles[fieldLabel] = url;
                }
            }

            // Map standard form data to labels
            const responses = {};
            job.fields.forEach(field => {
                if (field.type !== 'file') {
                    responses[field.label] = formData[field.id] || 'N/A';
                }
            });

            // Prepare submission for Sheets
            const submissionData = {
                action: 'submitApplication',
                jobId: job.id,
                jobTitle: job.title,
                email: formData['2'] || 'anonymous@protocol.com', // fallback to email field ID '2' or anon
                responses: { ...responses, ...uploadedFiles },
                submittedAt: new Date().toLocaleString(),
            };

            // Sync to Google Sheets
            const response = await fetch(SHEETS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(submissionData)
            });
            const result = await response.json();

            if (result.status === 'success') {
                setSuccess(true);
                setTimeout(() => navigate('/careers'), 4000);
            } else {
                throw new Error(result.error || 'Sheets sync protocol failure');
            }
        } catch (err) {
            console.error(err);
            setError('Submission protocol failed. Please verify connection.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="animate-spin text-white/20" size={40} />
        </div>
    );

    if (error && !job) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
            <AlertCircle className="text-red-500 mb-8" size={64} />
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">{error}</h2>
            <Link to="/careers" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all">
                Return to Directory
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black pt-32 pb-64 px-6 md:px-0">
            <div className="container mx-auto max-w-3xl">
                <Link to="/careers" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.6em] text-white/40 hover:text-white transition-colors mb-20">
                    <ArrowLeft size={14} /> Back to Careers
                </Link>

                <div className="mb-24">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 mb-6 block">{job.category} Sector</span>
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 line-tight">{job.title}</h1>
                    <div className="h-px w-24 bg-white/20 mb-12" />
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                        {job.description}
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white text-black p-20 text-center"
                        >
                            <CheckCircle className="mx-auto mb-8" size={64} />
                            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Transmission Successful</h2>
                            <p className="text-black/60 font-medium uppercase tracking-widest text-xs">Your application protocol has been initialized. Redirecting...</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20">Application Protocol</h2>

                            <div className="grid grid-cols-1 gap-12">
                                {job.fields.map((field) => (
                                    <div key={field.id} className="space-y-4 group">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 group-focus-within:text-white transition-colors">
                                            {field.label} {field.required && <span className="text-white/20 ml-2">REQUIRED</span>}
                                        </label>

                                        {field.type === 'file' ? (
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    required={field.required}
                                                    onChange={(e) => handleFileChange(field.id, e.target.files[0])}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="bg-white/5 border border-white/10 p-12 flex flex-col items-center gap-4 transition-all group-hover:bg-white/10 group-hover:border-white/20">
                                                    {files[field.id] ? (
                                                        <>
                                                            <FileText size={32} className="text-white" />
                                                            <span className="text-xs font-bold text-white truncate max-w-full italic">{files[field.id].name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload size={32} className="text-white/20 group-hover:text-white/60 transition-colors" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Upload PDF Protocol</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                required={field.required}
                                                placeholder={`Enter ${field.label}...`}
                                                value={formData[field.id] || ''}
                                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 px-8 py-6 text-white focus:outline-none focus:border-white transition-all font-medium placeholder:text-white/10"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {error && (
                                <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-4">
                                    <AlertCircle size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                                </div>
                            )}

                            <button
                                disabled={submitting}
                                className="w-full py-8 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-gray-200 transition-all flex items-center justify-center gap-4 disabled:opacity-30 group"
                            >
                                {submitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Initiate Submission
                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default JobApplicationPage;
