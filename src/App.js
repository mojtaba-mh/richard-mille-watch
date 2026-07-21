import React from 'react';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/navbar';
import Hero from './components/Hero/hero';



function App() {
  return (
    <AnimatePresence mode='wait'>
      <div className='App'>
        <Navbar/>
        <main>
          <Hero/>
          

        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
