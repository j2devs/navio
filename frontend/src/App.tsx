import React from "react";
import {Route, Routes} from "react-router-dom";
import DynamicIsland from "./components/DynamicIsland.tsx";
import You from "./pages/You";
import Discover from "./pages/Discover";
import { ModalProvider } from "./contexts/ModalContext";

const App: React.FC = () => {
    return (
        <ModalProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
                <div className="flex min-h-screen">
                    <div className="flex-1 ml-72">
                        <header className="p-4 flex items-center justify-center h-20 sticky top-0 z-20">
                            <DynamicIsland/>
                        </header>

                        <main className="p-10">
                            <Routes>
                                <Route path="/home" element={<You/>}/>
                                <Route path="/" element={<You/>}/>
                                <Route path="/discover" element={<Discover/>}/>
                            </Routes>
                        </main>
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
};

export default App;
