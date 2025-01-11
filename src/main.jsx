import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GuestChatPage from './pages/GuestChatPage'; // Import Guest Chat Page

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/guest-chat" element={<GuestChatPage />} /> {/* Add Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
