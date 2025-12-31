import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        { name: 'Alex Rivera', role: 'Product Lead', quote: 'Stride changed how I approach my morning routine. No friction, just focus.' },
        { name: 'Sarah Chen', role: 'Developer', quote: 'The cleanest interface I have ever used. It feels like the software knows what I need next.' },
        { name: 'Marcus Holt', role: 'Designer', quote: 'Smart Productivity gets it. Minimalism isn\'t about less, it\'s about better.' },
    ];

    return (
        <section id="testimonials" className="py-32 bg-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-black uppercase tracking-tighter border-l-4 border-white pl-8">Voices of Flow</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((item, i) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ delay: i * 0.1 }}
                            className="relative"
                        >
                            <div className="text-6xl font-serif absolute -top-8 -left-4 opacity-10">"</div>
                            <p className="text-xl font-medium mb-8 text-white relative z-10">{item.quote}</p>
                            <div>
                                <div className="font-black uppercase tracking-widest text-xs mb-1">{item.name}</div>
                                <div className="text-gray-500 uppercase tracking-widest text-[10px]">{item.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
