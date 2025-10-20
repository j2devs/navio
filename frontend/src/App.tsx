import React, { Suspense } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import DynamicIsland from "./components/DynamicIsland";
import NotificationButton from "./components/NotificationButton";
import { ModalProvider } from "./contexts/ModalContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

const You = React.lazy(() => import("./pages/You"));
const Discover = React.lazy(() => import("./pages/Discover"));
const Countries = React.lazy(() => import("./pages/Countries"));
const Trips = React.lazy(() => import("./pages/Trips"));
const MyPosts = React.lazy(() => import("./pages/MyPosts"));

function Shell() {
    return (<div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-72">
            <header className="p-4 flex items-center justify-between h-20 sticky top-0 z-20">
                <div />
                <DynamicIsland />
                <NotificationButton />
            </header>
            <main className="p-10">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    </div>);
}

export default function App() {
    return (<ModalProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
            <Routes>
                {/* redirect landing to a real username (replace with logged-in user) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/:username" element={<Shell />}>
                    <Route path="you" element={<You />} />
                    <Route path="you/countries" element={<Countries />} />
                    <Route path="you/trips" element={<Trips />} />
                    <Route path="discover" element={<Discover />} />
                    <Route path="discover/myposts" element={<MyPosts />} />
                </Route>
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </div>
    </ModalProvider>);
}
