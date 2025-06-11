import { useState } from 'react';
import api from '../services/api';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            await api.post('/auth/register', { email, password });
            alert('Registered successfully');
        } catch {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={register}>Register</button>
        </div>
    );
}
