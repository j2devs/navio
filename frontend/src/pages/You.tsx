import React from 'react';
import TripCard from '../components/TripCard';
import Sidebar from "../components/Sidebar.tsx";

const You: React.FC = () => {
    return (
        <><Sidebar/>
            <section id="trips-section" className="grid gap-8">
                <TripCard/>
            </section>
        </>
    );
};

export default You;
