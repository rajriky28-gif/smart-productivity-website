import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Globe, MessageSquare, Zap, Twitter, Linkedin, Github, ChevronDown } from 'lucide-react';

const CustomDropdown = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="relative space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-transparent border-b border-white/10 py-4 flex justify-between items-center outline-none focus:border-white transition-colors group"
                >
                    <span className="font-black tracking-widest text-xs uppercase text-left">{selectedOption.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                    {isOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsOpen(false)}
                                className="fixed inset-0 z-[60]"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-white/10 z-[70] overflow-hidden"
                            >
                                {options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            onChange(opt.value);
                                            setIsOpen(false);
                                        }}
                                        className={`w-full p-4 text-left text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all ${value === opt.value ? 'bg-white/10' : ''}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const ContactPage = () => {
    const [status, setStatus] = useState('IDLE');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING');

        try {
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyQH8NJ3FZ7O0OQxLp5bNtfVbQ4T-hLcjeISI-hYlOyHc46vwebQovcY3f9_JB3jfq-/exec';

            // We'll reuse the same product field as "subject" for the sheet integration
            const submissionData = {
                ...formData,
                product: formData.subject // Mapping for existing sheet column
            };

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            setStatus('SUCCESS');
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('ERROR');
        }
    };

    const socialLinks = [
        { icon: <Twitter className="w-5 h-5" />, label: 'Twitter', href: '#' },
        { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', href: '#' },
        { icon: <Github className="w-5 h-5" />, label: 'GitHub', href: '#' }
    ];

    return (
        <div className="bg-black text-white min-h-screen pt-40 pb-32 selection:bg-white selection:text-black">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

                    {/* Left Column: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-8 block">Establish Connection</span>
                        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-12 leading-[0.85]">
                            Get in <br />
                            <span className="text-white/20">Touch.</span>
                        </h1>

                        <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md mb-20 uppercase tracking-tight">
                            Have a question about the Stride ecosystem or an experimental inquiry? Reach out through the direct channel.
                        </p>

                        <div className="space-y-12">
                            <div className="group">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-4">Direct Communication</label>
                                <a href="mailto:support@smart-productivity.in" className="text-2xl font-black uppercase tracking-tighter hover:text-white transition-colors flex items-center gap-4">
                                    support@smart-productivity.in
                                    <div className="w-8 h-px bg-white/20 group-hover:w-12 group-hover:bg-white transition-all" />
                                </a>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/20 block mb-6">Digital Ecosystems</label>
                                <div className="flex gap-6">
                                    {socialLinks.map((social, idx) => (
                                        <motion.a
                                            key={idx}
                                            href={social.href}
                                            whileHover={{ y: -5 }}
                                            className="p-4 border border-white/10 hover:border-white hover:bg-white hover:text-black transition-all"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/[0.02] border border-white/10 p-12 md:p-16 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <MessageSquare className="w-32 h-32" />
                        </div>

                        {status === 'SUCCESS' ? (
                            <div className="text-center py-20">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <Zap className="w-8 h-8 text-white fill-white" />
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Transmission Successful</h3>
                                <p className="text-zinc-500 font-medium uppercase tracking-widest text-xs mb-10">Your message has been stored in the trajectory logs.</p>
                                <button
                                    onClick={() => setStatus('IDLE')}
                                    className="px-12 py-4 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">01 // Full Identity</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="NAME"
                                        value={formData.name}
                                        onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-colors font-black tracking-widest text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">02 // Digital Address</label>
                                    <input
                                        required
                                        type="email"
                                        placeholder="EMAIL"
                                        value={formData.email}
                                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-colors font-black tracking-widest text-xs"
                                    />
                                </div>
                                <CustomDropdown
                                    label="03 // Inquiry Subject"
                                    value={formData.subject}
                                    onChange={(val) => setFormData(p => ({ ...p, subject: val }))}
                                    options={[
                                        { label: 'GENERAL INQUIRY', value: 'General Inquiry' },
                                        { label: 'STRIDE SUPPORT', value: 'Stride Support' },
                                        { label: 'ZENITH ACCESS', value: 'Zenith Access' },
                                        { label: 'PARTNERSHIP', value: 'Partnership' }
                                    ]}
                                />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">04 // Message Depth</label>
                                    <textarea
                                        required
                                        rows="4"
                                        placeholder="HOW CAN WE ASSIST YOUR TRAJECTORY?"
                                        value={formData.message}
                                        onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                                        className="w-full bg-transparent border border-white/10 p-6 outline-none focus:border-white transition-colors font-medium text-sm resize-none"
                                    />
                                </div>
                                <button
                                    disabled={status === 'SENDING'}
                                    type="submit"
                                    className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-wait transition-all flex items-center justify-center gap-4 group"
                                >
                                    {status === 'SENDING' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                                    {status !== 'SENDING' && <Zap className="w-4 h-4 group-hover:fill-current" />}
                                </button>
                                {status === 'ERROR' && (
                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center">Protocol Failure. Please retry.</p>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
