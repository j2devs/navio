import React, {useEffect, useRef, useState} from 'react';

interface Notification {
    id: number;
    message: React.ReactNode;
    time: string;
    read: boolean;
}

const NotificationButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([{
        id: 1,
        message: <><span className="font-semibold text-slate-900">Tester2</span> started following you.</>,
        time: '2 hours ago',
        read: false
    }, {
        id: 2,
        message: <>Your trip to <span className="font-semibold text-slate-900">Japan</span> is in 3 days.</>,
        time: '1 day ago',
        read: false
    }, {
        id: 3,
        message: <>Welcome to <span className="font-semibold text-slate-900">Navio</span>!</>,
        time: '3 days ago',
        read: true
    },]);
    const menuRef = useRef<HTMLDivElement>(null);

    const hasUnread = notifications.some(n => !n.read);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({...n, read: true})));
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? {...n, read: true} : n));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<div className="relative" ref={menuRef}>
        <button
            onClick={toggleMenu}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full shadow-md transition-colors duration-300 ${isOpen ? 'bg-gradient-to-r from-violet-500 to-cyan-400 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
        >
            <svg className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-gray-600'}`} fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            {hasUnread && <span
                className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"/>}
        </button>
        <div
            className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl p-4 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-800">Notifications</h3>
                <button onClick={markAllAsRead} className="text-sm text-blue-600 hover:underline">Mark all as read
                </button>
            </div>
            <ul className="space-y-2">
                {notifications.map(notification => (<li
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-3 rounded-lg transition-colors duration-200 cursor-pointer ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-slate-100`}
                >
                    <p className={`text-sm ${notification.read ? 'text-slate-500' : 'text-slate-700'}`}>
                        {notification.message}
                    </p>
                    <p className={`text-xs mt-1 ${notification.read ? 'text-slate-400' : 'text-slate-500'}`}>{notification.time}</p>
                </li>))}
            </ul>
        </div>
    </div>);
};

export default NotificationButton;
