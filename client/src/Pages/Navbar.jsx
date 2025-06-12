import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/login');
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>My Blog</div>
            <div style={styles.links}>
                {!isLoggedIn && (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
                <Link to="/" style={styles.link}>View Blogs</Link>
                {isLoggedIn && (
                    <>
                        <Link to="/create" style={styles.link}>Create Blog</Link>
                        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: '10px 20px',
        marginBottom: '30px'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: 'white'
    },
    links: {
        display: 'flex',
        gap: '15px',
        alignItems: 'center'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px'
    },
    logoutButton: {
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px'
    }
};
