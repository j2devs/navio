import React, {useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";

const DynamicIsland: React.FC = () => {
    const [hovered, setHovered] = useState(false);
    const location = useLocation();
    const {username} = useParams<{ username: string }>();

    const isYou = location.pathname.startsWith(`/${username}/you`);
    const isDiscover = location.pathname.startsWith(`/${username}/discover`);

    return (<div
        id="dynamic-island"
        className={`${hovered ? "w-60 h-12" : "w-52 h-10"} bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center justify-center relative transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
        <div className="flex relative w-full h-full">
            <div
                id="tab-indicator"
                className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-2xl transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] shadow-[0_2px_10px_rgba(139,92,246,0.3)] ${isDiscover ? "translate-x-full" : ""}`}
            ></div>
            <NavLink
                to={`/${username}/you/trips`}
                className={({isActive}) => `flex-1 flex items-center justify-center text-center font-semibold text-sm transition-colors duration-300 z-10 ${isActive || isYou ? "text-white" : "text-slate-500"}`}
            >
                You
            </NavLink>
            <NavLink
                to={`/${username}/discover`}
                className={({isActive}) => `flex-1 flex items-center justify-center text-center font-semibold text-sm transition-colors duration-300 z-10 ${isActive ? "text-white" : "text-slate-500"}`}
            >
                Discover
            </NavLink>
        </div>
    </div>);
};

export default React.memo(DynamicIsland);
