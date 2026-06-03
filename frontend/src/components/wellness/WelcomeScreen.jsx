import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
};

const HERO_IMAGE =
    "https://images.pexels.com/photos/7418090/pexels-photo-7418090.jpeg?auto=compress&cs=tinysrgb&w=1600";

export const WelcomeScreen = ({ onStart }) => {
    return (
        <section
            className="relative min-h-[92vh] flex items-center overflow-hidden"
            data-testid="welcome-screen"
        >
            {/* Hero image with overlay */}
            <div className="absolute inset-0 -z-0">
                <img
                    src={HERO_IMAGE}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/30" />
            </div>

            <div className="aurora -z-0" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-10 items-center w-full">
                <div className="md:col-span-7">
                    <motion.div
                        {...fadeUp}
                        className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8"
                    >
                        <Sparkles size={14} strokeWidth={1.5} className="text-gold" />
                        <span className="text-xs uppercase tracking-[0.28em] text-creamSoft">
                            Mood Wellness Sessions
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-cream"
                    >
                        Sound that{" "}
                        <span
                            className="italic text-gold"
                            style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
                        >
                            holds you
                        </span>
                        <br />
                        through the noise.
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.2 }}
                        className="mt-8 text-lg sm:text-xl text-creamSoft max-w-xl leading-relaxed"
                    >
                        Tell us how you are arriving. We will gather a tailored
                        audio landscape &mdash; calibrated to your mood, your
                        intensity, your time. A handful of minutes is enough.
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.3 }}
                        className="mt-12 flex flex-wrap items-center gap-5"
                    >
                        <button
                            data-testid="welcome-begin-button"
                            onClick={onStart}
                            className="btn-gold group inline-flex items-center gap-3 rounded-full pl-8 pr-3 py-3.5 text-base font-medium"
                        >
                            Begin a session
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-night text-gold transition-transform duration-500 group-hover:rotate-45">
                                <ArrowUpRight size={18} strokeWidth={1.75} />
                            </span>
                        </button>
                        <div className="flex items-center gap-3 text-sm text-creamSoft">
                            <span className="w-2 h-2 rounded-full bg-sage animate-breathe" />
                            <span>No sign-in. No tracking.</span>
                        </div>
                    </motion.div>

                    <motion.dl
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.45 }}
                        className="mt-16 grid grid-cols-3 gap-6 max-w-xl"
                    >
                        {[
                            { v: "05–30", k: "minutes per session", accent: "gold" },
                            { v: "5", k: "mood pathways", accent: "sage" },
                            { v: "∞", k: "ways to land", accent: "coral" },
                        ].map((item) => (
                            <div
                                key={item.k}
                                className="border-t border-line pt-4"
                            >
                                <dt
                                    className={`font-serif text-3xl sm:text-4xl ${
                                        item.accent === "gold"
                                            ? "text-gold"
                                            : item.accent === "sage"
                                                ? "text-sage"
                                                : "text-coral"
                                    }`}
                                    style={{ fontVariationSettings: '"SOFT" 80, "opsz" 144' }}
                                >
                                    {item.v}
                                </dt>
                                <dd className="text-xs uppercase tracking-[0.2em] text-muted mt-2 leading-relaxed">
                                    {item.k}
                                </dd>
                            </div>
                        ))}
                    </motion.dl>
                </div>

                {/* Right-side glass session card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="md:col-span-5 relative"
                >
                    <div className="glass-strong rounded-[2rem] p-8 sm:p-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-sage/10 pointer-events-none" />

                        <p className="text-[10px] uppercase tracking-[0.32em] text-gold mb-5 relative">
                            Tonight&rsquo;s suggestion
                        </p>

                        <div className="relative h-40 flex items-center justify-center mb-6">
                            <div className="absolute w-40 h-40 rounded-full bg-sage/20 blur-3xl animate-breathe-slow" />
                            <div className="absolute w-28 h-28 rounded-full bg-gold/30 blur-2xl animate-breathe" />
                            <div className="relative w-20 h-20 rounded-full glass-strong flex items-center justify-center">
                                <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_20px_rgba(224,177,118,0.7)] animate-breathe" />
                            </div>
                        </div>

                        <h3
                            className="font-serif text-3xl text-cream leading-tight"
                            style={{ fontVariationSettings: '"SOFT" 60, "opsz" 144' }}
                        >
                            <span className="italic text-gold">Seeking Serenity</span> ·
                            10 minutes
                        </h3>
                        <p className="mt-3 text-sm text-creamSoft leading-relaxed">
                            A balanced soundbath for the end of a heavy day.
                            Soft strings, deep low end, breath-paced rhythm.
                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-2 text-center">
                            {["Mood", "Depth", "Time"].map((l) => (
                                <div
                                    key={l}
                                    className="border border-line rounded-xl py-3"
                                >
                                    <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                                        {l}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating tag */}
                    <div className="absolute -top-3 -right-3 glass rounded-full px-4 py-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe" />
                        <span className="text-[10px] uppercase tracking-[0.24em] text-creamSoft">
                            Live now
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WelcomeScreen;
