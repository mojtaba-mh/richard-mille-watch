import React, { useState } from 'react';
import styles from './navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        className={styles.navbar}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.navLinksLeft}>
          <a href="#collections">Collections</a>
          <a href="#heritage">Heritage</a>
        </div>
        <div className={styles.logo}>RICHARD MILLE</div>
        <div className={styles.navLinksRight}>
          <a href="#boutiques">Boutiques</a>
          <button className={styles.searchBtn}>Search</button>
        </div>
        <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <span className={isOpen ? styles.open : ''}></span>
          <span className={isOpen ? styles.open : ''}></span>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <a onClick={() => setIsOpen(false)} href="#collections">Collections</a>
            <a onClick={() => setIsOpen(false)} href="#heritage">Heritage</a>
            <a onClick={() => setIsOpen(false)} href="#boutiques">Boutiques</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
