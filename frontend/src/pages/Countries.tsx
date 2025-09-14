import React from 'react';
import WorldMap from '../components/WorldMap';
import Sidebar from '../components/Sidebar';

const Countries: React.FC = () => {
    return (<>
        <Sidebar/>
        <WorldMap/>
    </>);
};

export default Countries;
