import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CreatePost from './Pages/CreatePost';
import ViewBlogs from './Pages/BlogList';
import Navbar from './Pages/Navbar';
import PrivateRoute from './Pages/PrivateRoute';
import BlogDetail from './Pages/BlogDetail';
import './App.css'

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<ViewBlogs />} />
                <Route path="/blog/:id" element={<PrivateRoute><BlogDetail /></PrivateRoute>} />
                <Route
                    path="/create"
                    element={
                        <PrivateRoute>
                            <CreatePost />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
