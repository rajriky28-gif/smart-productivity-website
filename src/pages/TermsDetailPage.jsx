import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Gavel } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const TermsDetailPage = () => {
    const { product } = useParams();

    const content = {
        stride: {
            title: 'Stride Terms',
            version: 'UPDATED DEC 29, 2025',
            intro: 'Please read these Terms of Use ("Terms") carefully before using the Stride mobile application (the "Service") operated by Smart Productivity ("us", "we", or "our"). By accessing or using the Service, you agree to be bound by these Terms.',
            sections: [
                { h: '01 // NATURE OF SERVICE', c: 'Stride is designed as an offline-first, local storage application. All data you create (tasks, notes, schedules) is stored exclusively on the internal memory of your device. We do not maintain cloud backups or provide synchronization services.' },
                { h: '02 // ACCOUNTS', c: 'Account creation (Email/Google) is strictly for identity authentication. Your account does not serve as a cloud storage repository for your local content. You are responsible for safeguarding your access credentials.' },
                { h: '03 // DATA LOSS RESPONSIBILITY', c: 'You are solely responsible for your data safety. We are not liable for data loss due to app uninstallation, storage clearing, device theft, damage, or factory resets. Tasks do not transfer automatically between devices.' },
                { h: '04 // INTELLECTUAL PROPERTY', c: 'The Service and its original content, features, and functionality remain the exclusive property of Smart Productivity, protected by the copyright, trademark, and other laws of India.' },
                { h: '05 // USER CONTENT', c: 'You retain all rights to the information you enter into Stride. Since data is local, we do not claim ownership, access, or use your content for any purpose other than local display within the application.' },
                { h: '06 // LIMITATION OF LIABILITY', c: 'Smart Productivity disclaims all liability for indirect, incidental, or consequential damages, including loss of data or profits, arising from the local-storage nature of the application.' },
                { h: '07 // TERMINATION', c: 'We may suspend authentication access immediately for breaches of these terms. Upon termination, your right to use the Service ceases. You may terminate your account via app settings or by discontinuing use.' },
                { h: '08 // GOVERNING LAW', c: 'These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.' },
                { h: '09 // CHANGES', c: 'We reserve the right to modify or replace these Terms at any time. Continued use of the Service after revisions constitutes your agreement to the updated framework.' },
                { h: '10 // CONTACT US', c: 'For legal inquiries or technical clarification regarding these terms, reach the architectural team at support@smart-productivity.in or via our portal at https://smart-productivity.in.' }
            ]
        },
        zenith: {
            title: 'Zenith Beta Terms',
            version: 'ALPHA-7',
            intro: 'Provisional terms for Project Zenith. This is a research instrument under constant architectural refinement.',
            sections: [
                { h: 'EXPERIMENTAL NATURE', c: 'Zenith is provided "as-is". Features may be deprecated or overhauled without prior notice during the alpha cycle.' },
                { h: 'CONFIDENTIALITY', c: 'Access to Zenith is private. Sharing interface captures or architectural details without written consent is prohibited.' },
                { h: 'BETA LIABILITY', c: 'Smart Productivity holds zero liability for data anomalies occurring within the Zenith experimental hub.' }
            ]
        },
        cloud: {
            title: 'Cloud SLA',
            version: 'V4.0',
            intro: 'Service Level Agreements for the distributed Smart Productivity cloud infrastructure.',
            sections: [
                { h: 'CORE AVAILABILITY', c: 'Our distributed nodes are engineered for redundancy. We guarantee critical data path availability of 99.95%.' },
                { h: 'DATA INTEGRITY', c: 'Point-in-time recovery is available for all cloud-stored trajectories. We maintain a zero-data-loss policy for encrypted snapshots.' },
                { h: 'GOVERNANCE', c: 'All cloud operations are governed by the jurisdiction of high-security digital sovereignty laws.' }
            ]
        }
    };

    const activeContent = content[product] || content.stride;

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <div className="container mx-auto px-6 py-32">
                <Link to="/terms" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors mb-20">
                    <ArrowLeft className="w-4 h-4" /> Back to Selection
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                        {product === 'stride' && (
                            <img src={strideLogo} alt="Stride Logo" className="w-16 h-16 object-contain brightness-0 invert" />
                        )}
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase">{activeContent.title}</h1>
                        <span className="text-[10px] px-3 py-1 border border-white/20 font-black tracking-widest text-white/40">{activeContent.version}</span>
                    </div>

                    <p className="text-xl text-zinc-400 font-medium leading-relaxed mb-24 border-l-2 border-white/10 pl-10 italic">
                        "{activeContent.intro}"
                    </p>

                    <div className="space-y-32">
                        {activeContent.sections.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="grid md:grid-cols-3 gap-10"
                            >
                                <div className="text-[10px] font-black tracking-[0.5em] uppercase text-white/20">
                                    Article {i + 1} // {s.h}
                                </div>
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-black uppercase mb-6 tracking-tight">{s.h}</h3>
                                    <p className="text-zinc-500 font-medium leading-[2] tracking-wide">
                                        {s.c}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-40 p-12 bg-white text-black text-center">
                        <Gavel className="w-12 h-12 mx-auto mb-8 text-black" />
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-black">Agreement via Action.</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-black/40">Effective Dec 30, 2025</p>
                        <button className="px-10 py-5 border-2 border-black font-black uppercase tracking-[0.3em] text-[10px] text-black hover:bg-black hover:text-white transition-all">
                            Confirm Agreement
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsDetailPage;
