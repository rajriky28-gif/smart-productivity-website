import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Shield } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const PrivacyDetailPage = () => {
    const { platform } = useParams();

    const content = {
        stride: {
            title: 'Stride Privacy',
            version: 'UPDATED DEC 29, 2025',
            intro: 'Stride is a local-first application. Your task data is stored securely on your device and is not uploaded to our servers. We only collect basic authentication details to manage your account access.',
            sections: [
                { h: '01 // INFORMATION WE COLLECT', c: 'We collet limited Personal Data (Email & Name) via Google Sign-In solely for authentication. User Content (tasks, notes, schedules) is stored EXCLUSIVELY on your device and is never transmitted to our servers. Anonymous crash logs may be collected via Google Play Services.' },
                { h: '02 // HOW WE USE YOUR DATA', c: 'Since we hold very little data, our usage is strictly limited: Authentication (to verify your identity when you open the app) and Customer Support (to respond to your direct inquiries).' },
                { h: '03 // DATA STORAGE & SECURITY', c: 'Your task data resides exclusively in your device\'s internal memory. Login credentials (email/password) are managed securely through Google Firebase Authentication, which utilizes industry-standard encryption.' },
                { h: '04 // IMPORTANT: DATA LOSS', c: 'Stride does NOT sync tasks to the cloud. Uninstalling the app, clearing app data, or losing your device will result in the PERMANENT DELETION of all your tasks and data. We cannot recover this for you.' },
                { h: '05 // THIRD-PARTY SERVICES', c: 'We use Google Firebase Authentication for account management and Google Play Services for distribution and system libraries. Both services adhere to rigorous security standards.' },
                { h: '06 // CHILDREN\'S PRIVACY', c: 'Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.' },
                { h: '07 // POLICY CHANGES', c: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page with an updated timestamp.' },
                { h: '08 // CONTACT US', c: 'If you have any questions regarding your digital sovereignty, contact the architecture team at support@smart-productivity.in or visit https://smart-productivity.in.' }
            ]
        },
        zenith: {
            title: 'Zenith Privacy',
            version: 'ALPHA 0.1',
            intro: 'Privacy framework for our upcoming cognitive hub. Built on the principle of absolute digital sovereignty.',
            sections: [
                { h: 'NEURAL PRIVACY', c: 'Cognitive flow patterns are processed using differential privacy to prevent individual profiling.' },
                { h: 'ZERO-KNOWLEDGE', c: 'Encryption protocols where even Smart Productivity cannot access your project architectures.' },
                { h: 'STEALTH LOGS', c: 'System logs are purged every 24 hours to maintain a clean digital footprint.' }
            ]
        },
        general: {
            title: 'General Policy',
            version: '2026.1',
            intro: 'Global data standards across the Smart Productivity ecosystem.',
            sections: [
                { h: 'DATA RIGHTS', c: 'Your data belongs to you. You can export or purge your entire ecosystem history with a single command.' },
                { h: 'MODULAR SECURITY', c: 'Security layers that adapt to the platform, whether you are on a high-performance workstation or mobile.' },
                { h: 'ETHICAL FOUNDATION', c: 'We do not engage in surveillance capitalism. Our revenue is derived from utility, not data.' }
            ]
        }
    };

    const activeContent = content[platform] || content.stride;

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <div className="container mx-auto px-6 py-32">
                <Link to="/privacy" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors mb-20">
                    <ArrowLeft className="w-4 h-4" /> Back to Selection
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                        {platform === 'stride' && (
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
                                    Section {i + 1} // {s.h}
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
                        <Shield className="w-12 h-12 mx-auto mb-8 text-black" />
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 text-black">Sovereignty is a Human Right.</h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-10 text-black/40">Updated Dec 30, 2025</p>
                        <button className="px-10 py-5 border-2 border-black font-black uppercase tracking-[0.3em] text-[10px] text-black hover:bg-black hover:text-white transition-all">
                            Accept & Continue
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyDetailPage;
