import React, { Suspense } from "react";
import {Route, Routes} from "react-router-dom";
import DynamicIsland from "./components/DynamicIsland.tsx";
import NotificationButton from "./components/NotificationButton.tsx";
import {ModalProvider} from "./contexts/ModalContext";

const You = React.lazy(() => import("./pages/You"));
const Discover = React.lazy(() => import("./pages/Discover"));

const App: React.FC = () => {
    return (<ModalProvider>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
                <div className="flex min-h-screen">
                    <div className="flex-1 ml-72">
                        <header className="p-4 flex items-center justify-between h-20 sticky top-0 z-20">
                            <div />
                            <DynamicIsland/>
                            <NotificationButton />
                        </header>

                        <main className="p-10">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route path="/home" element={<You/>}/>
                                    <Route path="/" element={<You/>}/>
                                    <Route path="/discover" element={<Discover/>}/>
                                </Routes>
                            </Suspense>
                        </main>
                    </div>
                </div>
            </div>
        </ModalProvider>);
};

export default App;
