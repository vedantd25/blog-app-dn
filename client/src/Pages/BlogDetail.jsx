import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDisplayName } from '../utils/displayName';
import api from '../services/api';

export default function BlogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const userEmail = parseJwt(localStorage.getItem('token'))?.email;

    useEffect(() => {
        fetchPost();

        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            setReadingProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await api.get(`/blogposts/${id}`);
            setPost(response.data);
        } catch (err) {
            setError('Failed to load blog post');
            console.error('Error fetching blog:', err);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async () => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await api.delete(`/blogposts/${id}`);
            alert('Post deleted!');
            navigate('/');
        } catch (err) {
            alert('Failed to delete post.');
        }
    };

    const goBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.loadingSpinner}></div>
                <p style={styles.loadingText}>Loading article...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                
                <h2 style={styles.errorTitle}>Oops! Something went wrong</h2>
                <p style={styles.errorText}>{error}</p>
                <button style={styles.retryButton} onClick={() => window.location.reload()}>
                    Try Again
                </button>
            </div>
        );
    }

    if (!post) {
        return (
            <div style={styles.errorContainer}>
                
                <h2 style={styles.errorTitle}>Article not found</h2>
                <p style={styles.errorText}>This article might have been moved or deleted.</p>
                <button style={styles.retryButton} onClick={goBack}>
                    Go Back
                </button>
            </div>
        );
    }

    const estimatedReadTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));

    return (
        <div style={styles.container}>
            {/* Reading Progress Bar */}
            <div style={styles.progressContainer}>
                <div
                    style={{
                        ...styles.progressBar,
                        width: `${readingProgress}%`
                    }}
                ></div>
            </div>

            {/* Back Navigation */}
            <div style={styles.navigation}>
                <button style={styles.backButton} onClick={goBack}>
                    
                    <span>Back to Articles</span>
                </button>
            </div>

            {/* Article Header */}
            <header style={styles.header}>
                <div style={styles.headerBackground}></div>
                <div style={styles.headerContent}>
                    <div style={styles.category}>Article</div>
                    <h1 style={styles.title}>{post.title}</h1>
                    <div style={styles.meta}>
                        <div style={styles.author}>
                            <div style={styles.authorAvatar}>
                                {getDisplayName(post.authorEmail).charAt(0).toUpperCase()}
                            </div>
                            <div style={styles.authorInfo}>
                                <div style={styles.authorName}>
                                    {getDisplayName(post.authorEmail)}
                                </div>
                                <div style={styles.authorEmail}>{post.authorEmail}</div>
                            </div>
                        </div>
                        <div style={styles.readTime}>
                            
                            {estimatedReadTime} min read
                        </div>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <main style={styles.main}>
                <article style={styles.article}>
                    <div style={styles.content}>
                        {post.content.split('\n').map((paragraph, index) => {
                            if (paragraph.trim() === '') return null;
                            return (
                                <p key={index} style={styles.paragraph}>
                                    {paragraph}
                                </p>
                            );
                        })}
                    </div>

                    {/* Article Actions */}
                    {post.authorEmail === userEmail && (
                        <div style={styles.actions}>
                            <div style={styles.actionsTitle}>Manage Your Article</div>
                            <div style={styles.actionButtons}>
                                <button
                                    style={styles.editButton}
                                    onClick={() => navigate(`/edit-post/${post.id}`)}
                                >
                                    
                                    Edit Article
                                </button>
                                <button style={styles.deleteButton} onClick={deletePost}>
                                    
                                    Delete Article
                                </button>
                            </div>
                        </div>
                    )}
                </article>

                {/* Related Articles Placeholder */}
                <div style={styles.relatedSection}>
                    <h3 style={styles.relatedTitle}>Continue Reading</h3>
                    <p style={styles.relatedText}>
                        Discover more amazing articles by exploring our blog collection.
                    </p>
                    <button style={styles.exploreButton} onClick={() => navigate('/')}>
                        
                        Explore More Articles
                    </button>
                </div>
            </main>
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
        paddingTop: '80px',
    },
    progressContainer: {
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        height: '3px',
        background: 'rgba(30, 41, 59, 0.5)',
        zIndex: 1000,
    },
    progressBar: {
        height: '100%',
        background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
        transition: 'width 0.1s ease',
    },
    navigation: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '2rem 2rem 0',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '12px',
        padding: '0.75rem 1.5rem',
        color: 'rgba(248, 250, 252, 0.9)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
        fontSize: '0.95rem',
        fontWeight: '500',
        ':hover': {
            background: 'rgba(96, 165, 250, 0.1)',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            transform: 'translateX(-4px)',
        }
    },
    backIcon: {
        fontSize: '1.2rem',
        transition: 'transform 0.3s ease',
    },
    header: {
        position: 'relative',
        padding: '4rem 2rem',
        textAlign: 'center',
        overflow: 'hidden',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
        zIndex: 0,
    },
    headerContent: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        margin: '0 auto',
    },
    category: {
        display: 'inline-block',
        padding: '0.5rem 1.5rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        borderRadius: '25px',
        fontSize: '0.9rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: '2rem',
    },
    title: {
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: '800',
        color: '#f8fafc',
        marginBottom: '2rem',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
    },
    meta: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    authorAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: '700',
    },
    authorInfo: {
        textAlign: 'left',
    },
    authorName: {
        color: '#f8fafc',
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    authorEmail: {
        color: 'rgba(148, 163, 184, 0.8)',
        fontSize: '0.9rem',
    },
    readTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '0.95rem',
        fontWeight: '500',
    },
    readTimeIcon: {
        fontSize: '1.1rem',
    },
    main: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
    },
    article: {
        background: 'rgba(30, 41, 59, 0.6)',
        borderRadius: '24px',
        padding: '3rem',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        marginBottom: '3rem',
    },
    content: {
        color: 'rgba(248, 250, 252, 0.9)',
        fontSize: '1.1rem',
        lineHeight: '1.8',
        marginBottom: '3rem',
    },
    paragraph: {
        marginBottom: '1.5rem',
        textAlign: 'justify',
    },
    actions: {
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        paddingTop: '2rem',
    },
    actionsTitle: {
        color: '#f8fafc',
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '1rem',
    },
    actionButtons: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
    },
    editButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.3)',
        }
    },
    deleteButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '0.75rem 1.5rem',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.3)',
        }
    },
    buttonIcon: {
        fontSize: '1rem',
    },
    relatedSection: {
        background: 'rgba(30, 41, 59, 0.4)',
        borderRadius: '20px',
        padding: '2.5rem',
        textAlign: 'center',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
    },
    relatedTitle: {
        color: '#f8fafc',
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
    },
    relatedText: {
        color: 'rgba(148, 163, 184, 0.9)',
        fontSize: '1rem',
        marginBottom: '2rem',
        lineHeight: '1.6',
    },
    exploreButton: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '1rem 2rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
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
    errorContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        color: '#f8fafc',
        textAlign: 'center',
        padding: '2rem',
    },
    errorIcon: {
        fontSize: '4rem',
        marginBottom: '1rem',
        opacity: 0.7,
    },
    errorTitle: {
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: '#f8fafc',
    },
    errorText: {
        fontSize: '1.1rem',
        color: 'rgba(148, 163, 184, 0.8)',
        marginBottom: '2rem',
        maxWidth: '500px',
    },
    retryButton: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        padding: '1rem 2rem',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        ':hover': {
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            transform: 'translateY(-2px)',
        }
    }
};