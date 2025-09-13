import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DynamicIsland from "./components/DynamicIsland";
import DiscoverGrid from "./components/DiscoverGrid";
import TripCard from "./components/TripCard";

type Tab = "you" | "discover";

const App: React.FC = () => {
    const [tab, setTab] = useState<Tab>("you");

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 ml-72">
                    <header className="p-4 flex items-center justify-center h-20 sticky top-0 z-20">
                        <DynamicIsland onTabChange={setTab} />
                    </header>
                    <main className="p-10 grid gap-10">
                        <section className={tab === 'discover' ? '' : 'hidden'}>
                            <DiscoverGrid />
                        </section>
                        <section id="trips-section" className={`grid gap-8 ${tab === 'you' ? '' : 'hidden'}`}>
                            <TripCard />
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
