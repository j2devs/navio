import React from 'react';
import TripCard from '../components/TripCard';

const You: React.FC = () => {
    return (<>
        <section id="trips-section" className="grid gap-8">
            <TripCard/>
        </section>
    </>);
};

export default You;
