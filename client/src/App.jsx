import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import CreatePost from './pages/CreatePost';

export default function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Posts</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/create">New Post</Link>
            </nav>
            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={<CreatePost />} />
            </Routes>
        </BrowserRouter>
    );
}
