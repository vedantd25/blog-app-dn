import { useEffect, useState } from 'react';
import api from '../services/api';

export default function BlogList() {
    const [posts, setPosts] = useState([]);
    const userEmail = parseJwt(localStorage.getItem('token'))?.email;

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await api.get('/blogposts');
        setPosts(res.data);
    };

    const deletePost = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;
        try {
            await api.delete(`/blogposts/${id}`);
            setPosts(posts.filter((post) => post.id !== id));
            alert('Post deleted!');
        } catch (err) {
            alert('Failed to delete post.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Blog Posts</h2>
            {posts.map((post) => (
                <div key={post.id} style={styles.card}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p style={styles.author}>By: {post.authorEmail}</p>
                    {post.authorEmail === userEmail && (
                        <button style={styles.deleteBtn} onClick={() => deletePost(post.id)}>
                            Delete
                        </button>
                    )}
                </div>
            ))}
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
        maxWidth: '800px',
        margin: '40px auto',
        padding: '0 20px',
    },
    heading: {
        textAlign: 'center',
        fontSize: '28px',
        marginBottom: '20px',
        color: '#333',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        backgroundColor: '#fafafa',
        boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
    },
    author: {
        fontSize: '12px',
        color: '#777',
        marginTop: '10px',
    },
    deleteBtn: {
        marginTop: '10px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};
