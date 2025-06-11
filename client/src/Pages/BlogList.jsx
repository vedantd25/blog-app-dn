import { useEffect, useState } from 'react';
import api from '../services/api';

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('/blogposts').then((res) => setPosts(res.data));
    }, []);

    return (
        <div>
            <h2>Blog Posts</h2>
            <ul>
                {posts.map((p) => (
                    <li key={p.id}>
                        <h4>{p.title}</h4>
                        <p>{p.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
