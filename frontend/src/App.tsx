import React from "react";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 font-sans">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-72 p-10">
        </main>
      </div>
    </div>
  );
};

export default App;