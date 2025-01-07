import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom" 
import { Toaster } from "react-hot-toast";
import Navbar from './components/navbar';
import HeroSection from './components/heroSection';
import Services from './components/services';
import About from './components/about';
import Contact from './components/contact';
import Footer from './components/footer';

const App = () => {
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <Services />
      <About />
      <Contact />
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
