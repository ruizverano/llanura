// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const history = useHistory();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', credentials);
            history.push(response.data.redirectUrl);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
