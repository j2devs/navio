import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import navioLogo from "../images/navio_logo.png";
import './Home.css';
import AIAssistant from '../components/AIAssistant';

const Home: React.FC = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const toggleAbout = () => {
        setShowAbout(!showAbout);
    };

    const togglePrivacy = () => {
        setShowPrivacy(!showPrivacy);
    };

    return (
        <div className="home-container">
            <AIAssistant />
            <header className="home-header">
                <div className="home-logo">
                    <img src={navioLogo} alt="Logo" width="50" height="auto" />
                    <span className="brand-text">
                        Navio
                    </span>
                </div>
                <nav className="home-nav">
                    <Link to="/features">Features</Link>
                    <Link to="/pricing">Pricing</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/login" className="login-button">Login</Link>
                    <Link to="/register" className="register-button">Register</Link>
                </nav>
            </header>
            <main className="home-main">
                <div className="hero-section">
                    <h2>Plan your trips like never before</h2>
                    <p>Navio is the all-in-one platform for travelers.</p>
                    <div className="hero-buttons">
                        <Link to="/tester/you/trips" className="get-started-button">Get Started</Link>
                    </div>
                </div>
            </main>
            <section className="about-section">
                <div className="about-row">
                    <div className="about-text">
                        <h3>Discover Your Next Adventure</h3>
                        <p>
                            Navio helps you discover amazing destinations, plan your trips with ease, and share your experiences with a community of fellow travelers. Explore the world like never before.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="City of Paris" />
                    </div>
                </div>
                <div className="about-row reverse">
                    <div className="about-text">
                        <h3>Plan Every Detail</h3>
                        <p>
                            From flights and accommodations to daily itineraries, Navio's powerful planning tools make trip organization seamless. Keep all your bookings and notes in one place.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="City of Tokyo" />
                    </div>
                </div>
            </section>
            <footer className="footer">
                <div className="footer__content">
                    <span>© 2025 Navio. All rights reserved.</span>
                    <div className="footer__links">
                        <a href="javascript:void(0)" onClick={toggleAbout}>About Us</a>
                        <a href="/contact">Contact</a>
                        <a href="javascript:void(0)" onClick={togglePrivacy}>Privacy</a>
                    </div>
                </div>
            </footer>

            {showAbout && (
                <>
                    <div className="footer-modal-backdrop" onClick={toggleAbout}></div>
                    <div className="footer-modal">
                        <button className="footer-modal__close" onClick={toggleAbout}>&times;</button>
                        <h3>About Us</h3>
                        <p>
                            Navio is an innovative platform that aims to provide its users with the best travel experience. For more information about us, feel free to get in touch.
                        </p>
                    </div>
                </>
            )}

            {showPrivacy && (
                <>
                    <div className="footer-modal-backdrop" onClick={togglePrivacy}></div>
                    <div className="footer-modal">
                        <button className="footer-modal__close" onClick={togglePrivacy}>&times;</button>
                        <h3>Privacy</h3>
                        <p>
                            Your privacy is important to us. Your personal data is protected in accordance with legal regulations and is never shared with third parties.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
