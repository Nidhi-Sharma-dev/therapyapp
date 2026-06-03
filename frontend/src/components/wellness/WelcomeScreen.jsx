import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

export const WelcomeScreen = ({ onStart }) => {
    return (
        <section className="min-h-[88vh] flex items-center" data-testid="welcome-screen">
            <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7 relative z-10">
                    <motion.p
                        {...fadeUp}
                        className="text-xs sm:text-sm uppercase tracking-[0.32em] text-inkSoft mb-6"
                    >
                        Soundlull · Mood Wellness Sessions
                    </motion.p>
                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.08 }}
                        className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ink"
                    >
                        Quiet the noise.
                        <br />
                        <span className="italic text-sage">Tend to yourself.</span>
                    </motion.h1>
                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.18 }}
                        className="mt-8 text-lg sm:text-xl text-inkSoft max-w-xl leading-relaxed"
                    >
                        A handful of minutes, a soft place to land. Tell us how
                        you are arriving today &mdash; we will gather the
                        sounds that meet you there.
                    </motion.p>
                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.28 }}
                        className="mt-12 flex flex-wrap items-center gap-5"
                    >
                        <button
                            data-testid="welcome-begin-button"
                            onClick={onStart}
                            className="group inline-flex items-center gap-3 bg-ink text-canvas rounded-full pl-8 pr-3 py-3 text-base font-medium transition-all duration-500 hover:bg-sage hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Begin a session
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-canvas text-ink transition-transform duration-500 group-hover:translate-x-1">
                                <ArrowRight size={18} strokeWidth={1.75} />
                            </span>
                        </button>
                        <span className="text-sm text-inkSoft">
                            No sign-in. Just stillness, in five minutes.
                        </span>
                    </motion.div>

                    <motion.dl
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.4 }}
                        className="mt-16 grid grid-cols-3 gap-6 max-w-md"
                    >
                        {[
                            { v: "05–30", k: "minutes" },
                            { v: "5", k: "mood paths" },
                            { v: "100%", k: "yours" },
                        ].map((item) => (
                            <div
                                key={item.k}
                                className="border-t border-line pt-4"
                            >
                                <dt className="font-serif text-3xl text-ink">
                                    {item.v}
                                </dt>
                                <dd className="text-xs uppercase tracking-[0.18em] text-inkSoft mt-1">
                                    {item.k}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="md:col-span-5 relative h-[420px] md:h-[520px]"
                >
                    {/* Layered breathing orbs */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="absolute w-[360px] h-[360px] rounded-full bg-sage/30 blur-3xl animate-breathe-slow" />
                        <div className="absolute w-[260px] h-[260px] rounded-full bg-rose/40 blur-3xl animate-breathe" />
                        <div className="absolute w-[160px] h-[160px] rounded-full bg-sand blur-2xl animate-float-y" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-44 h-44 rounded-full border border-line bg-canvas/70 backdrop-blur-xl flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-ink animate-breathe" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WelcomeScreen;
