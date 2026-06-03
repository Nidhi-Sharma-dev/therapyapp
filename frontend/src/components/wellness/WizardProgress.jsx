const STEPS = [
    { key: "mood", label: "Mood" },
    { key: "intensity", label: "Intensity" },
    { key: "duration", label: "Duration" },
    { key: "session", label: "Session" },
    { key: "reflection", label: "Reflection" },
];

export const WizardProgress = ({ currentKey }) => {
    const currentIndex = STEPS.findIndex((s) => s.key === currentKey);
    return (
        <nav
            className="w-full max-w-3xl mx-auto px-6 sm:px-8 mt-8"
            data-testid="wizard-progress"
        >
            <ol className="flex items-center gap-2 sm:gap-3">
                {STEPS.map((step, idx) => {
                    const active = idx === currentIndex;
                    const done = idx < currentIndex;
                    return (
                        <li
                            key={step.key}
                            className="flex-1 flex items-center gap-2 sm:gap-3"
                        >
                            <div
                                className={`flex-1 h-[2px] rounded-full transition-all duration-700 ${
                                    done || active
                                        ? "bg-ink"
                                        : "bg-line"
                                }`}
                            />
                            <span
                                className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] whitespace-nowrap transition-colors duration-500 ${
                                    active
                                        ? "text-ink"
                                        : done
                                            ? "text-inkSoft"
                                            : "text-inkSoft/50"
                                }`}
                            >
                                {step.label}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default WizardProgress;
