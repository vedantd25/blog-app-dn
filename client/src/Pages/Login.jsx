import { useState } from 'react';
import api from '../services/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            console.log('Full login response:', res);

            const token = res.data.token;
            if (token) {
                localStorage.setItem('token', token);
                alert('Login successful');
            } else {
                alert('Login failed: No token in response.');
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            alert('Login failed');
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
        </div>
    );
}
