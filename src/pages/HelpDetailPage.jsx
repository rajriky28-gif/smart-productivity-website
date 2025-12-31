import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, MessageSquare, Zap, BookOpen, Clock, Shield, Target, PenTool, Layout, ChevronRight, X } from 'lucide-react';
import strideLogo from '../assets/stride-logo.png';

const HELP_DATA = {
    stride: {
        title: 'Stride Support',
        guides: [
            {
                id: 'getting-started',
                title: 'Welcome to Stride: The Beginner’s Guide',
                desc: 'Learn how to set up your account, navigate the interface, and create your first task.',
                icon: <Layout className="w-5 h-5" />,
                content: `Welcome to Stride! Stride is designed to be a calm, distraction-free system for your tasks. Unlike complex project management tools, Stride focuses on one thing: helping you do meaningful work today.

1. Creating Your Account
Stride stores your tasks locally for maximum privacy. We use a secure login system to keep your access safe. Register with Google or Email. Note that since data is local, logging in on a different phone won't automatically sync tasks from the old phone.

2. Tour the Interface
- Today View: Your command center for current tasks.
- Plus (+) Button: Your primary tool for adding new tasks.
- Sidebar: Access Upcoming, Overdue, and Settings.

3. Creating Your First Task
Tap the + button, type your task (e.g., "Read 10 pages"), and save. Stride's smart recognition will handle dates automatically.

4. Completing Tasks
Tap the circle next to the task name. It will be crossed out with a satisfying animation. Completed tasks move to the History section.

5. Troubleshooting Login
If you see "Account already exists," try signing in with Google. You need internet for the initial login, but Stride works offline thereafter.`
            },
            {
                id: 'quick-add',
                title: 'How to Use Quick Add',
                desc: 'Capture tasks at the speed of thought using natural language shortcuts.',
                icon: <Zap className="w-5 h-5" />,
                content: `Speed is essential for a clear mind. Stride’s Quick Add is designed to be the fastest way to get tasks out of your head and into your system.

1. The Basics
Instead of manual picking, just type naturally. To open Quick Add: Tap the large + button at the bottom of your screen.

2. Date & Time Shortcuts
- "Submit report tomorrow" → Sets date to tomorrow.
- "Call Mom next Friday" → Sets date to the upcoming Friday.
- "Meeting at 5pm" → Sets a reminder for 5:00 PM today.
- "Dentist appointment Sep 20 at 10am" → Sets specific date and time.

3. Recurring Tasks (Habits)
Use the keyword "every" to create repeating tasks:
- "Read 10 pages every day"
- "Clean the house every Sunday"

4. Priorities & Lists
Categorize using symbols:
- !high or !1 → Urgent (Red)
- !med or !2 → Medium (Yellow)
- !low or !3 → Low (Blue)
- #Work or #Groceries → Assigns to a project/list.

5. Pro Tip: Escaping Smart Text
If Stride highlights a word you didn't mean to be a date, simply tap the highlighted word to "un-parse" it.`
            },
            {
                id: 'focus-mode',
                title: 'Deep Work with Focus Mode',
                desc: 'Eliminate distractions and master your attention span using the built-in timer.',
                icon: <Target className="w-5 h-5" />,
                content: `Multitasking is a myth. Stride’s Focus Mode helps you enter a "flow state" by locking your interface to a single task.

1. How to Start a Session
Select a task, tap the timer icon. The background dims, and only your current goal and the countdown remain.

2. The Pomodoro Technique
By default, Stride uses Pomodoro:
- Focus (25 min): Intense work.
- Short Break (5 min): Step away and recharge.
- Long Break (15 min): After 4 sessions, take a longer recharge.

3. Customizing Your Timer
Tailor it in Settings > Focus:
- Deep Work: 50 or 90 minutes.
- Quick Sprints: 15 minutes.
- White Noise: Choose Rain, Cafe, or White Noise in the timer screen.

4. Keeping the Screen On
Enable "Keep Screen On" to keep your phone as a visual accountability timer on your desk.

5. Tracking Your Focus
Every minute spent in Focus Mode is recorded in your Reports tab to see your improvement over time.`
            },
            {
                id: 'planning',
                title: 'Mastering Your Schedule',
                desc: 'How to prioritize tasks, handle overdue items, and break down complex projects.',
                icon: <Clock className="w-5 h-5" />,
                content: `A to-do list is only useful if it’s realistic. Stride gives you the tools to organize, prioritize, and reschedule without the stress.

1. Using Priority Levels
- 🔴 High (P1): "Must do today." Bubbles to the top.
- 🟡 Medium (P2): "Should do." Can wait if time runs out.
- 🔵 Low (P3): "Nice to do." Fits into gaps.

2. Managing Overdue Tasks
Overdue tasks are grouped in a red section in your Today view.
- Swipe to Reschedule: Swipe right to push to Tomorrow or Next Week.
- "Reschedule All": Fresh start in one click.

3. Breaking Down Tasks (Subtasks)
Tap a task to open Detail View and add subtasks. As you check them off, the main task's circle turns into a progress ring.

4. Planning Ahead (Upcoming View)
Use the Upcoming View to look at your week. Drag and drop tasks to balance the load and prevent burnout.`
            },
            {
                id: 'reports',
                title: 'Understanding Your Productivity Trends',
                desc: 'Visualize your progress with daily charts, weekly summaries, and focus statistics.',
                icon: <PenTool className="w-5 h-5" />,
                content: `Stride analyzes how you work, acting as a "health check" for your productivity.

1. The Insight Dashboard
- Daily Pulse: Completed vs. Added graph.
- Completion Rate: Aim for 80% to avoid burnout.

2. Weekly Summary
Generated every Monday morning for reflection. It highlights your wins, focus hours, and identifies tasks you procrastinate on (rescheduled 3+ times).

3. Streaks
Watch the flame icon grow. A streak count is a powerful motivator to get just one thing done every day.

4. Focus Statistics
See where your time went. Track total focus hours and session averages to adjust your settings for the next week.`
            },
            {
                id: 'account-data',
                title: 'Managing Your Account & Data Privacy',
                desc: 'Learn how your data is stored, how to export backups, and how to keep your information safe.',
                icon: <Shield className="w-5 h-5" />,
                content: `Your data belongs to you. Stride keeps your data right in your hands, not on our servers.

1. How Your Data is Stored (Offline-First)
All tasks live on your device's internal memory. This means tasks do not sync between devices automatically.

2. Why Log In?
- Security: Acts as a secure key to your private data.
- Settings: Saves your theme and notification preferences.

3. Exporting Your Data (Backups)
Create your own backups in Settings > Account:
- CSV: For Excel/Google Sheets.
- PDF: Printable document.
- JSON: Raw data file.

4. ⚠️ Critical Warning
- Do NOT Uninstall: Tasks will be deleted permanently.
- Do NOT Clear Data: This wipes your list.
- New Phone: You must manually export and re-import tasks.

5. Deleting Your Account
Removes your credentials from our auth system. Remember to uninstall the app to wipe local data.`
            }
        ],
        articles: [
            // General Questions
            { q: 'What is Stride?', a: 'Stride is a calm, focused to-do list application designed to help you organize your day without the stress. It combines powerful task management with tools like Focus Mode to help you actually get work done.' },
            { q: 'Is Stride free to use?', a: 'Yes! Stride is completely free to download and use. You have full access to unlimited tasks, lists, and the focus timer without any hidden paywalls.' },
            { q: 'Is Stride available on iOS (iPhone)?', a: 'Currently, Stride is available exclusively for Android devices. We are working hard to bring Stride to the Apple App Store in the future.' },
            { q: 'Can I use Stride on my computer (Web version)?', a: 'Not yet. Stride is currently a mobile-only application optimized for Android. We are exploring a web version for the future, but for now, your data lives securely on your phone.' },

            // Data, Sync & Privacy
            { q: 'Does Stride sync my tasks across devices?', a: 'No. Stride is an "Offline-First" application. All your tasks, notes, and history are stored directly on your device\'s internal memory, not on a cloud server.' },
            { q: 'If I delete the app, will I lose my data?', a: 'Yes. Because your data is stored locally, uninstalling the app deletes that data permanently. Please do not uninstall the app unless you have exported a backup.' },
            { q: 'Why do I need to log in if there is no cloud sync?', a: 'The login system acts as a secure "key" for your local data. It prevents unauthorized access if someone borrows your phone and saves your personal preferences.' },
            { q: 'How do I backup my data?', a: 'Go to Settings > Account > Export Data. You can save your tasks as a CSV (Excel) or PDF file and email it to yourself for safekeeping.' },

            // Features & Usage
            { q: 'How do I use "Quick Add" for dates?', a: 'When typing a task, include the date naturally. Example: "Pay rent tomorrow at 5pm". Stride will automatically set the due date and reminder for you.' },
            { q: 'How do I create a repeating task (habit)?', a: 'Use the word "every" in your task name. Example: "Gym every morning". Once completed, Stride will automatically recreate it for the next cycle.' },
            { q: 'Can I change the Focus Mode timer duration?', a: 'Yes. Go to Settings > Focus Mode and select a duration between 15 minutes and 90 minutes. The default is 25 minutes.' },
            { q: 'What do the Priority colors mean?', a: '🔴 Red (High): Urgent tasks. 🟡 Yellow (Medium): Important tasks. 🔵 Blue (Low): General tasks or chores.' },
            { q: 'How do I delete a task?', a: 'Swipe Left on the task card or tap the task to open details and tap the "Trash" icon. Note: Deleted tasks cannot be recovered.' },

            // Troubleshooting
            { q: 'I am not receiving reminders/notifications.', a: 'Ensure Notifications are "Allowed" in phone Settings > Apps > Stride, and set Battery to "Unrestricted" or "No Optimization".' },
            { q: 'The "Smart Date" is highlighting words I don\'t want it to.', a: 'If a word like "Tomorrow" shouldn\'t be a date, simply tap the highlighted word once to turn off smart recognition for it.' },
            { q: 'I forgot my password.', a: 'On the login screen, tap "Forgot Password?". (Note: If you signed up with Google, you must reset through Google settings).' },
            { q: 'The app crashes or freezes.', a: 'Ensure you have the latest version from the Play Store. If it persists, contact support@smart-productivity.in with your device details.' },

            // Contact
            { q: 'I have a feature request!', a: 'We love hearing ideas! Please email us at support@smart-productivity.in. Many of our best features came from user suggestions.' }
        ],
        formValue: 'STRIDE'
    },
    zenith: {
        title: 'Zenith Alpha',
        guides: [],
        articles: [
            { q: 'What is Project Zenith?', a: 'Zenith is our experimental cognitive hub exploring neural efficiency.' }
        ],
        formValue: 'ZENITH'
    },
    account: {
        title: 'Account & Security',
        guides: [],
        articles: [
            { q: 'How is my data secured?', a: 'We employ AES-256 encryption at rest and TLS 1.3.' }
        ],
        formValue: 'ACCOUNT'
    }
};

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
                    <span className="font-black tracking-widest text-xs uppercase">{selectedOption.label}</span>
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

const HelpDetailPage = () => {
    const { category } = useParams();
    const [openIndex, setOpenIndex] = useState(null);
    const [status, setStatus] = useState('IDLE');
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [showAllFaqs, setShowAllFaqs] = useState(false);

    const active = useMemo(() => {
        const key = category?.toLowerCase();
        return HELP_DATA[key] || HELP_DATA.stride;
    }, [category]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        product: active?.formValue || 'STRIDE',
        message: ''
    });

    useEffect(() => {
        if (active) {
            setFormData(prev => ({ ...prev, product: active.formValue }));
            setSelectedGuide(null);
            setOpenIndex(null);
            setShowAllFaqs(false);
        }
    }, [category, active]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING');
        try {
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFuHn7qXhwVQJTOFgE8ke0z2gSa-wE0V2KiNwYDE9_IGf7W2IW3vJF2eTqcsIrGvs0wA/exec';
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setStatus('SUCCESS');
            setFormData(prev => ({ ...prev, name: '', email: '', message: '' }));
        } catch (error) {
            setStatus('ERROR');
        }
    };

    if (!active) return null;

    const faqList = active.articles || [];
    const displayedFaqs = showAllFaqs ? faqList : faqList.slice(0, 5);

    return (
        <div className="bg-black text-white min-h-screen pt-32 selection:bg-white selection:text-black">
            <div className="container mx-auto px-6 py-32">
                <Link to="/help" className="inline-flex items-center gap-4 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 hover:text-white transition-colors mb-20 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Knowledge Base
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl"
                >
                    <div className="flex items-center gap-6 mb-8">
                        {category === 'stride' && strideLogo && (
                            <img src={strideLogo} alt="Stride Logo" className="w-20 h-20 object-contain brightness-0 invert" />
                        )}
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-white/40 block">Product Ecosystem</span>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-24 leading-none">{active.title}</h1>

                    {/* Guides Section (Knowledge Base) */}
                    {active.guides && active.guides.length > 0 && (
                        <div className="mb-40">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-1 h-8 bg-white" />
                                <h2 className="text-2xl font-black uppercase tracking-tighter">Knowledge Base Articles</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {active.guides.map((guide) => (
                                    <motion.div
                                        key={guide.id}
                                        whileHover={{ y: -5 }}
                                        onClick={() => setSelectedGuide(guide)}
                                        className="p-8 border border-white/5 bg-white/[0.02] hover:bg-white hover:text-black transition-all cursor-pointer group flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="mb-6 p-4 bg-white/5 group-hover:bg-black/5 rounded-xl inline-block transition-colors">
                                                {guide.icon}
                                            </div>
                                            <h3 className="text-xl font-black uppercase tracking-tight mb-4">{guide.title}</h3>
                                            <p className="text-zinc-500 group-hover:text-black/60 text-sm font-medium leading-relaxed mb-6">
                                                {guide.desc}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100">
                                            Read Article <ChevronRight className="w-3 h-3" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQs Section */}
                    <div className="mb-40">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-1 h-8 bg-white" />
                            <h2 className="text-2xl font-black uppercase tracking-tighter">System FAQs</h2>
                        </div>
                        <div className="space-y-4 max-w-4xl">
                            {displayedFaqs.map((article, i) => (
                                <div key={i} className="border border-white/5 bg-white/[0.02] overflow-hidden">
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full p-10 flex justify-between items-center text-left group hover:bg-white hover:text-black transition-all duration-300"
                                    >
                                        <span className="text-lg font-black uppercase tracking-tight">{article.q}</span>
                                        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                <div className="p-10 pt-0 text-zinc-500 font-medium leading-relaxed max-w-2xl tracking-tight">
                                                    {article.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>

                        {faqList.length > 5 && (
                            <button
                                onClick={() => setShowAllFaqs(!showAllFaqs)}
                                className="mt-12 px-10 py-4 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all flex items-center gap-4 group"
                            >
                                {showAllFaqs ? 'Show Less' : 'Read All FAQs'}
                                <ChevronDown className={`w-4 h-4 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`} />
                            </button>
                        )}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-40 pt-20 border-t border-white/10">
                        <div className="text-center mb-20 text-center">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">DIRECT INQUIRY.</h2>
                            <p className="text-zinc-500 font-medium uppercase tracking-[0.3em] text-[10px]">Reach the architect for product-specific challenges.</p>
                        </div>

                        {status === 'SUCCESS' ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-20 border border-white/10 bg-white/5 text-center">
                                <h3 className="text-2xl font-black uppercase tracking-widest mb-4">Transmission Successful</h3>
                                <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Your inquiry has been stored in the trajectory logs.</p>
                                <button onClick={() => setStatus('IDLE')} className="mt-10 px-8 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Submit Another</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">01 // Full Identity</label>
                                        <input required type="text" placeholder="NAME" value={formData.name} onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-colors font-black tracking-widest text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">02 // Digital Address</label>
                                        <input required type="email" placeholder="EMAIL" value={formData.email} onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))} className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-white transition-colors font-black tracking-widest text-xs" />
                                    </div>
                                    <CustomDropdown
                                        label="03 // Product Focus"
                                        value={formData.product}
                                        onChange={(val) => setFormData(p => ({ ...p, product: val }))}
                                        options={[
                                            { label: 'STRIDE', value: 'STRIDE' },
                                            { label: 'ZENITH', value: 'ZENITH' },
                                            { label: 'ACCOUNT', value: 'ACCOUNT' }
                                        ]}
                                    />
                                </div>
                                <div className="flex flex-col h-full">
                                    <div className="space-y-2 flex-1 flex flex-col">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">04 // Inquiry Depth</label>
                                        <textarea required placeholder="DESCRIBE YOUR COGNITIVE FRICTION..." value={formData.message} onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))} className="flex-1 w-full bg-transparent border border-white/10 p-6 outline-none focus:border-white transition-colors font-medium text-sm resize-none" />
                                    </div>
                                    <button disabled={status === 'SENDING'} type="submit" className="mt-8 w-full py-6 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-wait transition-all flex items-center justify-center gap-4 group">
                                        {status === 'SENDING' ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}
                                        {status !== 'SENDING' && <Zap className="w-4 h-4 group-hover:fill-current" />}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Article Reader Overlay */}
            <AnimatePresence>
                {selectedGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6"
                    >
                        <div className="w-full max-w-4xl h-[85vh] bg-black border border-white/10 flex flex-col shadow-[0_0_100px_rgba(255,255,255,0.05)]">
                            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-black">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white text-black rounded-lg">
                                        {selectedGuide.icon}
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">{selectedGuide.title}</h3>
                                </div>
                                <button onClick={() => setSelectedGuide(null)} className="p-4 hover:bg-white/5 transition-colors group">
                                    <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                                <div className="max-w-2xl mx-auto">
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-8">System Article // Knowledge Base</p>
                                    <div className="prose prose-invert prose-zinc max-w-none">
                                        {selectedGuide.content.split('\n\n').map((para, idx) => {
                                            if (para.match(/^\d\./)) {
                                                return <h4 key={idx} className="text-white text-2xl font-black uppercase tracking-tighter mt-12 mb-6">{para}</h4>;
                                            }
                                            return <p key={idx} className="text-zinc-400 text-lg leading-relaxed mb-6 font-medium bg-white/[0.02] p-6 border-l-2 border-white/10 whitespace-pre-line">{para}</p>;
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 border-t border-white/10 flex justify-between items-center bg-black/50">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">End of Transmission</span>
                                <button onClick={() => setSelectedGuide(null)} className="px-8 py-3 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Close Reader</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HelpDetailPage;
