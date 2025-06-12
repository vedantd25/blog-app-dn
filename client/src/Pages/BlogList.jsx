import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDisplayName } from '../utils/displayName';
import api from '../services/api';

export default function BlogList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const userEmail = parseJwt(localStorage.getItem('token'))?.email;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await api.get('/blogposts');
            setPosts(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id, event) => {
        event.stopPropagation();
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await api.delete(`/blogposts/${id}`);
            setPosts(posts.filter((post) => post.id !== id));
            alert('Post deleted!');
        } catch (err) {
            alert('Failed to delete post.');
        }
    };

    const handleCardClick = (postId) => {
        navigate(`/blog/${postId}`);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>Loading amazing content...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        <span style={styles.heroTitleGradient}>Discover</span> Amazing Stories
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Dive into a world of insights, experiences, and knowledge shared by our community
                    </p>

                    {/* Search Bar */}
                    <div style={styles.searchContainer}>
                        
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>
                <div style={styles.heroBackground}></div>
            </div>

            {/* Blog Grid */}
            <div style={styles.blogGrid}>
                {filteredPosts.length === 0 ? (
                    <div style={styles.emptyState}>
                        
                        <h3 style={styles.emptyTitle}>No posts found</h3>
                        <p style={styles.emptyText}>
                            {searchTerm ? 'Try adjusting your search terms' : 'Be the first to share your story!'}
                        </p>
                    </div>
                ) : (
                    filteredPosts.map((post, index) => (
                        <div
                            key={post.id}
                            style={{
                                ...styles.card,
                                animationDelay: `${index * 0.1}s`
                            }}
                            onClick={() => handleCardClick(post.id)}
                        >
                            <div style={styles.cardHeader}>
                                <div style={styles.cardCategory}>Article</div>
                                <div style={styles.cardMeta}>
                                    <span style={styles.author}>By {getDisplayName(post.authorEmail)}</span>
                                </div>
                            </div>

                            <div style={styles.cardContent}>
                                <h3 style={styles.cardTitle}>{post.title}</h3>
                                <p style={styles.cardExcerpt}>
                                    {post.content.length > 120
                                        ? `${post.content.substring(0, 120)}...`
                                        : post.content
                                    }
                                </p>
                            </div>

                            <div style={styles.cardFooter}>
                                <div style={styles.readTime}>
                                    {Math.max(1, Math.ceil(post.content.split(' ').length / 200))} min read
                                </div>
                                {post.authorEmail === userEmail && (
                                    <button
                                        style={styles.deleteBtn}
                                        onClick={(event) => deletePost(post.id, event)}
                                        title="Delete post"
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>

                            <div style={styles.cardGlow}></div>
                        </div>
                    ))
                )}
            </div>

            {/* Stats Section */}
            {filteredPosts.length > 0 && (
                <div style={styles.statsContainer}>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>{filteredPosts.length}</div>
                        <div style={styles.statLabel}>Articles</div>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>
                            {Math.ceil(filteredPosts.reduce((acc, post) => acc + post.content.split(' ').length, 0) / 200)}
                        </div>
                        <div style={styles.statLabel}>Minutes of Reading</div>
                    </div>
                    <div style={styles.stat}>
                        <div style={styles.statNumber}>
                            {new Set(filteredPosts.map(post => post.authorEmail)).size}
                        </div>
                        <div style={styles.statLabel}>Contributors</div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper to decode JWT and get user email
function parseJwt(token) {
    if (!token) return null;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        };
    } catch {
        return null;
    }
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
        maxWidth: '800px',
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
        marginBottom: '3rem',
        lineHeight: '1.6',
        maxWidth: '600px',
        margin: '0 auto 3rem',
    },
    searchContainer: {
        position: 'relative',
        maxWidth: '500px',
        margin: '0 auto',
    },
    searchIcon: {
        position: 'absolute',
        left: '1.5rem',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '1.2rem',
        zIndex: 2,
    },
    searchInput: {
        width: '100%',
        padding: '1.25rem 1.5rem 1.25rem 4rem',
        fontSize: '1.1rem',
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        color: '#f8fafc',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.3s ease',
        '::placeholder': {
            color: 'rgba(148, 163, 184, 0.6)',
        },
        ':focus': {
            outline: 'none',
            border: '1px solid rgba(96, 165, 250, 0.5)',
            boxShadow: '0 0 0 4px rgba(96, 165, 250, 0.1)',
        }
    },
    blogGrid: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
    },
    card: {
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '2rem',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        animation: 'slideUp 0.6s ease-out both',
        overflow: 'hidden',
        ':hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
        },
        ':hover .cardGlow': {
            opacity: 0.6,
        }
    },
    cardGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        borderRadius: '20px',
        zIndex: 0,
    },
    cardHeader: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    cardCategory: {
        padding: '0.5rem 1rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        borderRadius: '25px',
        fontSize: '0.8rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    cardMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    author: {
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    cardContent: {
        position: 'relative',
        zIndex: 1,
        marginBottom: '2rem',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: '1rem',
        lineHeight: '1.3',
        letterSpacing: '-0.01em',
    },
    cardExcerpt: {
        color: 'rgba(248, 250, 252, 0.8)',
        lineHeight: '1.6',
        fontSize: '1rem',
    },
    cardFooter: {
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
    },
    readTime: {
        color: 'rgba(148, 163, 184, 0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    deleteBtn: {
        background: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: '8px',
        padding: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontSize: '1rem',
        ':hover': {
            background: 'rgba(239, 68, 68, 0.2)',
            transform: 'scale(1.1)',
        }
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        color: '#f8fafc',
    },
    loadingSpinner: {
        width: '50px',
        height: '50px',
        border: '3px solid rgba(96, 165, 250, 0.2)',
        borderTop: '3px solid #60a5fa',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem',
    },
    loadingText: {
        fontSize: '1.1rem',
        color: 'rgba(248, 250, 252, 0.8)',
    },
    emptyState: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '4rem 2rem',
        color: '#f8fafc',
    },
    emptyIcon: {
        fontSize: '4rem',
        marginBottom: '1rem',
        opacity: 0.5,
    },
    emptyTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginBottom: '0.5rem',
        color: 'rgba(248, 250, 252, 0.9)',
    },
    emptyText: {
        fontSize: '1rem',
        color: 'rgba(148, 163, 184, 0.8)',
    },
    statsContainer: {
        maxWidth: '800px',
        margin: '4rem auto 2rem',
        padding: '0 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
    },
    stat: {
        textAlign: 'center',
        padding: '1.5rem',
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '16px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
    },
    statNumber: {
        fontSize: '2.5rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '0.5rem',
    },
    statLabel: {
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '0.9rem',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    }
};