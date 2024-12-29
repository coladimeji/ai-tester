import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<div>Welcome to AI Tester</div>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;