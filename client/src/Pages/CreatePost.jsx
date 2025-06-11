import { useState } from 'react';
import api from '../services/api';

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const submit = async () => {
        try {
            const res = await api.post('/blogposts', {
                title,
                content
            });
            alert('Post created!');
        } catch (err) {
            console.error('Post creation failed:', err.response?.data || err.message);
            alert('Post creation failed');
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={submit}>Create</button>
        </div>
    );
}
