import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav style={{
            ...styles.navbar,
            ...(scrolled ? styles.navbarScrolled : {})
        }}>
            <div style={styles.container}>
                <div style={styles.logo}>
                    
                    <span style={styles.logoText}>Debugging Life.</span>
                    
                </div>

                {/* Desktop Menu */}
                <div style={styles.desktopLinks}>
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" style={styles.link}>
                                <span style={styles.linkText}>Login</span>
                            </Link>
                            <Link to="/register" style={{ ...styles.link, ...styles.primaryLink }}>
                                <span style={styles.linkText}>Register</span>
                            </Link>
                        </>
                    )}
                    <Link to="/" style={styles.link}>
                        <span style={styles.linkText}>View Blogs</span>
                    </Link>
                    {isLoggedIn && (
                        <>
                            <Link to="/create" style={styles.link}>
                                <span style={styles.linkText}>Create Blog</span>
                            </Link>
                            <button onClick={handleLogout} style={styles.logoutButton}>
                                <span style={styles.buttonText}>Logout</span>
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    style={styles.mobileMenuButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <div style={{ ...styles.hamburger, ...(mobileMenuOpen ? styles.hamburgerOpen : {}) }}>
                        <span style={styles.hamburgerLine}></span>
                        <span style={styles.hamburgerLine}></span>
                        <span style={styles.hamburgerLine}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={styles.mobileMenu}>
                    <div style={styles.mobileMenuContent}>
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                                    Login
                                </Link>
                                <Link to="/register" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                                    Register
                                </Link>
                            </>
                        )}
                        <Link to="/" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                            View Blogs
                        </Link>
                        {isLoggedIn && (
                            <>
                                <Link to="/create" style={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
                                    Create Blog
                                </Link>
                                <button onClick={handleLogout} style={styles.mobileLogoutButton}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

const styles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        padding: '0',
    },
    navbarScrolled: {
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
        backdropFilter: 'blur(25px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 2rem',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    },
    logoIcon: {
        fontSize: '1.5rem',
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.3))',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-0.02em',
    },
    logoDot: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#60a5fa',
        filter: 'drop-shadow(0 0 4px rgba(96, 165, 250, 0.5))',
    },
    desktopLinks: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        '@media (max-width: 768px)': {
            display: 'none',
        }
    },
    link: {
        position: 'relative',
        color: 'rgba(248, 250, 252, 0.9)',
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '500',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        border: '1px solid transparent',
        backdropFilter: 'blur(10px)',
        ':hover': {
            background: 'rgba(148, 163, 184, 0.1)',
            color: '#60a5fa',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(96, 165, 250, 0.15)',
        }
    },
    primaryLink: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 4px 16px rgba(59, 130, 246, 0.2)',
        ':hover': {
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
        }
    },
    linkText: {
        position: 'relative',
        zIndex: 1,
    },
    logoutButton: {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#fca5a5',
        padding: '0.75rem 1.25rem',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        ':hover': {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
            color: '#f87171',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
        }
    },
    buttonText: {
        position: 'relative',
        zIndex: 1,
    },
    mobileMenuButton: {
        display: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        '@media (max-width: 768px)': {
            display: 'block',
        }
    },
    hamburger: {
        width: '24px',
        height: '18px',
        position: 'relative',
        transition: 'transform 0.3s ease',
    },
    hamburgerOpen: {
        transform: 'rotate(45deg)',
    },
    hamburgerLine: {
        display: 'block',
        position: 'absolute',
        height: '2px',
        width: '100%',
        background: '#f8fafc',
        borderRadius: '1px',
        opacity: 1,
        left: 0,
        transform: 'rotate(0deg)',
        transition: '0.25s ease-in-out',
        ':nth-child(1)': {
            top: '0px',
        },
        ':nth-child(2)': {
            top: '8px',
        },
        ':nth-child(3)': {
            top: '16px',
        }
    },
    mobileMenu: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%)',
        backdropFilter: 'blur(25px)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        animation: 'slideDown 0.3s ease-out',
    },
    mobileMenuContent: {
        padding: '1rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    mobileLink: {
        color: 'rgba(248, 250, 252, 0.9)',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: '500',
        padding: '1rem',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        border: '1px solid transparent',
        ':hover': {
            background: 'rgba(148, 163, 184, 0.1)',
            color: '#60a5fa',
            border: '1px solid rgba(96, 165, 250, 0.2)',
        }
    },
    mobileLogoutButton: {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        color: '#fca5a5',
        padding: '1rem',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        ':hover': {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.2) 100%)',
            color: '#f87171',
        }
    }
};