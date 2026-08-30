import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Contact from './Pages/Contact';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;