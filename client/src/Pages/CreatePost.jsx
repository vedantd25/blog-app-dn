import { useState } from 'react';
import api from '../services/api';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submit = async () => {
        try {
            await api.post('/blogposts', { title, content });
            alert('Post created!');
            setTitle('');
            setContent('');
        } catch (err) {
            alert('Failed to create post');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create a New Blog Post</h2>
            <input
                style={styles.input}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                style={styles.textarea}
                placeholder="Content"
                rows="6"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button style={styles.button} onClick={submit}>Submit</button>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        resize: 'vertical'
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};
