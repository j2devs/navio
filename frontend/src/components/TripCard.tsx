import React from "react";

const TripCard: React.FC = () => {
    return (<div
        className="card bg-white rounded-2xl p-8 shadow-xl border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-violet-500">
        <div
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-violet-500/10 to-cyan-400/10 flex items-center justify-center text-3xl">
            🚀
        </div>
        <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Create new trip!</h2>
        <p className="text-center text-slate-500 leading-relaxed mb-6">
            Planning is where the adventure starts. Create your trip and start yours! 🎯
        </p>
        <div className="text-center">
            <button
                className="px-5 py-2 rounded-xl text-white font-semibold bg-gradient-to-tr from-violet-500 to-cyan-400 shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                Create your trip
            </button>
        </div>
    </div>);
};

export default TripCard;
