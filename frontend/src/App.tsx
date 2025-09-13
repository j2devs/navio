import React from "react";
import Sidebar from "./components/Sidebar";
import DynamicIslandTabs from "./components/DynamicIsland";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
            <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 ml-72">
                    <header className="p-4 flex items-center justify-center h-20 sticky top-0 z-20">
                        <DynamicIslandTabs />
                    </header>
                </div>
            </div>
        </div>
    );
};

export default App;
