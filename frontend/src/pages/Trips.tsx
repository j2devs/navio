import React from 'react';
import Sidebar from '../components/Sidebar';
import TripCard from '../components/TripCard';

const Trips: React.FC = () => {
    return (<>
        <Sidebar/>
        <section id="trips-section" className="grid gap-8">
            <TripCard/>
        </section>
    </>);
};

export default Trips;
