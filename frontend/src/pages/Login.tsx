import './Login.css';
import navioLogo from "../images/navio_logo.png";

export default function LoginPage() {
    const handleGoogleLogin = () => {
        // Google OAuth process will be added here DUYDUNMU EMİR EKlemen lazım
        console.log('Signing in with Google...');
        // window.location.href = 'YOUR_GOOGLE_OAUTH_URL';
    };

    return (
        <div className="login-container">

            <div className="login-panel">
                <div className="login-content">

                    {/* Header */}
                    <div className="login-header">
                        <div className="title-with-logo">
                            <img src={navioLogo} alt="Logo" width="50" height="auto" className="navio-logo" />
                            <h1 className="welcome-title">Login to Navio</h1>
                        </div>

                        <p className="welcome-subtitle">Your travel adventure starts here</p>
                    </div>

                    {/* Login Card */}
                    <div className="login-card">
                        <h2 className="card-title">Sign In</h2>
                        <p className="card-description">
                            Continue with your Google account to proceed
                        </p>

                        {/* Google Login Button */}
                        <button onClick={handleGoogleLogin} className="google-login-btn">
                            <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            <span>Sign in with Google</span>
                        </button>

                        <div className="terms-text">
                            By signing in, you agree to our{' '}
                            <a href="#" className="terms-link">Terms of Use</a>
                            {' '}and{' '}
                            <a href="#" className="terms-link">Privacy Policy</a>.
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="login-footer">
                        <p>© 2025 All rights reserved</p>
                    </div>
                </div>
            </div>

            {/* Right Panel - Background */}
            <div className="background-panel">
                <div className="background-overlay"></div>
                <div className="background-content">
                    <div>
                        <div className='İN'>

                        </div>
                        <h2 className="bg-title">Explore the World</h2>
                    </div>
                    <p className="bg-subtitle">
                        Plan your dream vacation and create unforgettable memories.
                    </p>

                    <p className="bg-description">
                        Thousands of destinations, endless possibilities.
                    </p>

                    <div className="stats-container">

                        <div className="stat-card">
                            <p className="stat-number">200+</p>
                            <p className="stat-label">Destinations</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-number">50K+</p>
                            <p className="stat-label">Happy Travelers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
