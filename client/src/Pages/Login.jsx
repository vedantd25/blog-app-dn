import { useState } from 'react';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const login = async () => {
        if (!email.trim() || !password.trim()) {
            alert('Please fill in both email and password');
            return;
        }

        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
        } catch (err) {
            alert('Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        <span style={styles.heroTitleGradient}>Welcome</span> Back
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Sign in to continue your journey and share your stories
                    </p>
                </div>
                <div style={styles.heroBackground}></div>
            </div>

            {/* Login Form */}
            <div style={styles.formContainer}>
                <div style={styles.form}>
                    <div style={styles.formHeader}>
                        <h2 style={styles.formTitle}>
                            
                            Sign In
                        </h2>
                        <p style={styles.formSubtitle}>Enter your credentials to access your account</p>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputContainer}>
                            
                            <input
                                style={styles.input}
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputContainer}>
                            
                            <input
                                style={styles.input}
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        style={{
                            ...styles.button,
                            ...(isLoading || !email.trim() || !password.trim() ? styles.buttonDisabled : {})
                        }}
                        onClick={login}
                        disabled={isLoading || !email.trim() || !password.trim()}
                    >
                        {isLoading ? (
                            <>
                                <div style={styles.spinner}></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                
                                Sign In
                            </>
                        )}
                    </button>

                    <div style={styles.formFooter}>
                        <p style={styles.footerText}>
                            New to our platform?
                            <span style={styles.footerLink}> Create an account</span>
                        </p>
                    </div>
                </div>

                {/* Welcome Message Card */}
                <div style={styles.welcomeCard}>
                    
                    <h3 style={styles.welcomeTitle}>Join Our Community</h3>
                    <p style={styles.welcomeText}>
                        Connect with writers, share your thoughts, and discover amazing stories from around the world.
                    </p>
                    <div style={styles.features}>
                        <div style={styles.feature}>
                            
                            <span style={styles.featureText}>Write & Share</span>
                        </div>
                        <div style={styles.feature}>
                            
                            <span style={styles.featureText}>Connect</span>
                        </div>
                        <div style={styles.feature}>
                            
                            <span style={styles.featureText}>Discover</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        paddingTop: '80px', // Account for fixed navbar
    },
    hero: {
        position: 'relative',
        padding: '4rem 2rem',
        textAlign: 'center',
        overflow: 'hidden',
    },
    heroBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)',
        zIndex: 0,
    },
    heroContent: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '600px',
        margin: '0 auto',
    },
    heroTitle: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: '1.5rem',
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
    },
    heroTitleGradient: {
        background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    heroSubtitle: {
        fontSize: '1.25rem',
        color: 'rgba(248, 250, 252, 0.8)',
        lineHeight: '1.6',
        maxWidth: '500px',
        margin: '0 auto',
    },
    formContainer: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start',
    },
    form: {
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '3rem',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
    },
    formHeader: {
        textAlign: 'center',
        marginBottom: '2.5rem',
    },
    formTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        letterSpacing: '-0.01em',
    },
    formIcon: {
        fontSize: '2rem',
    },
    formSubtitle: {
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '1rem',
        lineHeight: '1.5',
    },
    inputGroup: {
        marginBottom: '2rem',
    },
    label: {
        display: 'block',
        color: '#f8fafc',
        fontSize: '1rem',
        fontWeight: '600',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
    },
    inputContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        left: '1.25rem',
        fontSize: '1.1rem',
        zIndex: 2,
    },
    input: {
        width: '100%',
        padding: '1.25rem 1.5rem 1.25rem 3.5rem',
        fontSize: '1rem',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        color: '#f8fafc',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
        boxSizing: 'border-box',
    },
    button: {
        width: '100%',
        padding: '1.25rem 2rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '16px',
        fontSize: '1.1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
        marginBottom: '2rem',
    },
    buttonDisabled: {
        background: 'rgba(148, 163, 184, 0.3)',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    buttonIcon: {
        fontSize: '1.1rem',
    },
    spinner: {
        width: '20px',
        height: '20px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    formFooter: {
        textAlign: 'center',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    },
    footerText: {
        color: 'rgba(148, 163, 184, 0.8)',
        fontSize: '0.95rem',
        margin: 0,
    },
    footerLink: {
        color: '#60a5fa',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
    },
    welcomeCard: {
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '3rem',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        textAlign: 'center',
    },
    welcomeIcon: {
        fontSize: '3rem',
        marginBottom: '1.5rem',
    },
    welcomeTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: '1rem',
        letterSpacing: '-0.01em',
    },
    welcomeText: {
        color: 'rgba(248, 250, 252, 0.8)',
        lineHeight: '1.6',
        fontSize: '1rem',
        marginBottom: '2rem',
    },
    features: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '1rem',
    },
    feature: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
    },
    featureIcon: {
        fontSize: '1.5rem',
    },
    featureText: {
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '0.9rem',
        fontWeight: '500',
    }
};