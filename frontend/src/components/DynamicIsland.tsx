import React, { useState } from "react";

type Tab = "you" | "discover";

interface Props {
    onTabChange?: (tab: Tab) => void;
}

const DynamicIslandTabs: React.FC<Props> = ({ onTabChange }) => {
    const [tab, setTab] = useState<Tab>("you");
    const [hovered, setHovered] = useState(false);

    const change = (t: Tab) => {
        setTab(t);
        onTabChange?.(t);
    };

    return (
        <div
            id="dynamic-island"
            className={`${hovered ? "w-60 h-12" : "w-52 h-10"
                } bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center relative transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex relative w-full h-full">
                <div
                    id="tab-indicator"
                    className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_10px_rgba(139,92,246,0.3)] ${tab === "discover" ? "translate-x-full" : ""
                        }`}
                ></div>
                <button
                    data-tab="you"
                    className={`flex-1 flex items-center justify-center text-center font-semibold text-sm transition-colors duration-300 z-10 ${tab === "you" ? "text-white" : "text-slate-500"
                        }`}
                    onClick={() => change("you")}
                >
                    You
                </button>
                <button
                    data-tab="discover"
                    className={`flex-1 flex items-center justify-center text-center font-semibold text-sm transition-colors duration-300 z-10 ${tab === "discover" ? "text-white" : "text-slate-500"
                        }`}
                    onClick={() => change("discover")}
                >
                    Discover
                </button>
            </div>
        </div>
    );
};

export default DynamicIslandTabs;
