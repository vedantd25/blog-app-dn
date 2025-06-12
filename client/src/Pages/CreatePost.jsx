import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const navigate = useNavigate();

    const handleContentChange = (e) => {
        const text = e.target.value;
        setContent(text);
        setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    };

    const submit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        setIsSubmitting(true);
        try {
            await api.post('/blogposts', { title: title.trim(), content: content.trim() });
            alert('Post created successfully!');
            navigate('/');
        } catch (err) {
            alert('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div style={styles.container}>
            {/* Header Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>
                        <span style={styles.heroTitleGradient}>Create</span> Your Story
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Share your thoughts, experiences, and insights with the world
                    </p>
                </div>
                <div style={styles.heroBackground}></div>
            </div>

            {/* Form Container */}
            <div style={styles.formContainer}>
                <div style={styles.form}>
                    {/* Title Input */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Article Title</label>
                        <input
                            style={styles.titleInput}
                            placeholder="Enter an engaging title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={100}
                        />
                        <div style={styles.inputMeta}>
                            <span style={styles.metaText}>{title.length}/100 characters</span>
                        </div>
                    </div>

                    {/* Content Input */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Article Content</label>
                        <textarea
                            style={styles.contentTextarea}
                            placeholder="Start writing your amazing article..."
                            rows="12"
                            value={content}
                            onChange={handleContentChange}
                        />
                        <div style={styles.contentMeta}>
                            <div style={styles.stats}>
                                <span style={styles.stat}>
                                    
                                    {wordCount} words
                                </span>
                                <span style={styles.stat}>
                                    
                                    ~{estimatedReadTime} min read
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actions}>
                        <button
                            style={styles.cancelButton}
                            onClick={() => navigate('/')}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            style={{
                                ...styles.submitButton,
                                ...(isSubmitting ? styles.submitButtonDisabled : {}),
                                ...(!title.trim() || !content.trim() ? styles.submitButtonDisabled : {})
                            }}
                            onClick={submit}
                            disabled={isSubmitting || !title.trim() || !content.trim()}
                        >
                            {isSubmitting ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    
                                    Publish Article
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <div style={styles.tipsCard}>
                        <h3 style={styles.cardTitle}>
                            
                            Writing Tips
                        </h3>
                        <ul style={styles.tipsList}>
                            <li style={styles.tip}>
                                <strong style={styles.tipStrong}>Hook your readers:</strong> Start with an engaging opening that captures attention
                            </li>
                            <li style={styles.tip}>
                                <strong style={styles.tipStrong}>Use clear structure:</strong> Break your content into digestible paragraphs
                            </li>
                            <li style={styles.tip}>
                                <strong style={styles.tipStrong}>Tell a story:</strong> Share personal experiences or concrete examples
                            </li>
                            <li style={styles.tip}>
                                <strong style={styles.tipStrong}>End with impact:</strong> Conclude with a call to action or thought-provoking question
                            </li>
                        </ul>
                    </div>

                    <div style={styles.previewCard}>
                        <h3 style={styles.cardTitle}>
                            
                            Live Preview
                        </h3>
                        <div style={styles.previewContent}>
                            {title ? (
                                <h4 style={styles.previewArticleTitle}>{title}</h4>
                            ) : (
                                <p style={styles.previewPlaceholder}>Your title will appear here</p>
                            )}
                            {content ? (
                                <p style={styles.previewArticleContent}>
                                    {content.length > 150
                                        ? `${content.substring(0, 150)}...`
                                        : content
                                    }
                                </p>
                            ) : (
                                <p style={styles.previewPlaceholder}>Your content preview will appear here</p>
                            )}
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
    formContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '3rem',
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
    inputGroup: {
        marginBottom: '2.5rem',
    },
    label: {
        display: 'block',
        color: '#f8fafc',
        fontSize: '1.1rem',
        fontWeight: '700',
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
    },
    titleInput: {
        width: '100%',
        padding: '1.25rem 1.5rem',
        fontSize: '1.2rem',
        fontWeight: '600',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        color: '#f8fafc',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
        boxSizing: 'border-box',
    },
    contentTextarea: {
        width: '100%',
        padding: '1.25rem 1.5rem',
        fontSize: '1rem',
        background: 'rgba(15, 23, 42, 0.8)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        color: '#f8fafc',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
        resize: 'vertical',
        minHeight: '300px',
        lineHeight: '1.6',
        fontFamily: 'inherit',
        boxSizing: 'border-box',
    },
    inputMeta: {
        marginTop: '0.75rem',
        textAlign: 'right',
    },
    metaText: {
        color: 'rgba(148, 163, 184, 0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    contentMeta: {
        marginTop: '1rem',
    },
    stats: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    },
    stat: {
        color: 'rgba(148, 163, 184, 0.8)',
        fontSize: '0.9rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
    },
    statIcon: {
        fontSize: '1rem',
    },
    actions: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        marginTop: '3rem',
    },
    cancelButton: {
        padding: '1rem 2rem',
        background: 'rgba(148, 163, 184, 0.1)',
        color: 'rgba(148, 163, 184, 0.9)',
        border: '1px solid rgba(148, 163, 184, 0.3)',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(20px)',
    },
    submitButton: {
        padding: '1rem 2rem',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
    },
    submitButtonDisabled: {
        background: 'rgba(148, 163, 184, 0.3)',
        cursor: 'not-allowed',
        boxShadow: 'none',
    },
    buttonIcon: {
        fontSize: '1.1rem',
    },
    spinner: {
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    tipsCard: {
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
    },
    previewCard: {
        position: 'relative',
        background: 'rgba(30, 41, 59, 0.8)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        letterSpacing: '-0.01em',
    },
    cardTitleIcon: {
        fontSize: '1.3rem',
    },
    tipsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    tip: {
        color: 'rgba(248, 250, 252, 0.8)',
        lineHeight: '1.6',
        marginBottom: '1rem',
        fontSize: '0.95rem',
        paddingLeft: '1rem',
        position: 'relative',
    },
    tipStrong: {
        color: '#f8fafc',
        fontWeight: '600',
    },
    previewContent: {
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '12px',
        border: '1px solid rgba(148, 163, 184, 0.1)',
    },
    previewArticleTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#f8fafc',
        marginBottom: '1rem',
        lineHeight: '1.3',
        letterSpacing: '-0.01em',
    },
    previewArticleContent: {
        color: 'rgba(248, 250, 252, 0.8)',
        lineHeight: '1.6',
        fontSize: '0.95rem',
    },
    previewPlaceholder: {
        color: 'rgba(148, 163, 184, 0.6)',
        fontStyle: 'italic',
        fontSize: '0.95rem',
        lineHeight: '1.6',
    }
};