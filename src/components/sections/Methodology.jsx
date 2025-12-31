import { motion } from 'framer-motion';

const Methodology = () => {
    const steps = [
        { number: '01', title: 'Distill', desc: 'We strip away every non-essential feature to find the core value proposition.' },
        { number: '02', title: 'Refine', desc: 'Every interaction is polished until it feels instantaneous and invisible.' },
        { number: '03', title: 'Deploy', desc: 'Lightweight, high-performance software delivered directly to your workflow.' },
    ];

    return (
        <section id="methodology" className="py-32 bg-black border-b border-white/10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">Our Methodology</h2>
                    <p className="text-gray-500 uppercase tracking-widest text-sm font-bold">How we build the future</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.2 }}
                            className="p-12 border-r border-white/10 last:border-r-0 hover:bg-white/5 transition-colors"
                        >
                            <div className="text-5xl font-black mb-8 opacity-20">{step.number}</div>
                            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{step.title}</h3>
                            <p className="text-gray-500 font-medium">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Methodology;
