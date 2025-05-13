import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path) => location === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const linkClasses = (path) => {
    return `${isActive(path) ? 'text-primary font-medium' : 'text-neutral-dark hover:text-primary'} px-3 py-2 rounded-md font-medium transition-colors`;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.5 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
              <Link href="/">
                <a className="font-bold text-xl text-primary">EcoTips</a>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <a className={linkClasses('/')}>Home</a>
            </Link>
            <Link href="/tips">
              <a className={linkClasses('/tips')}>Tips</a>
            </Link>
            <Link href="/contribute">
              <a className={linkClasses('/contribute')}>Contribute</a>
            </Link>
            <Link href="/about">
              <a className={linkClasses('/about')}>About</a>
            </Link>
            <Button className="bg-primary hover:bg-primary-dark text-white">Sign Up</Button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu}
              className="text-neutral-dark hover:text-primary"
              aria-label="Toggle mobile menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
            </Link>
            <Link href="/tips">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/tips') ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Tips
              </a>
            </Link>
            <Link href="/contribute">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contribute') ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contribute
              </a>
            </Link>
            <Link href="/about">
              <a 
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'text-primary' : 'text-neutral-dark hover:text-primary'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
            </Link>
            <Link href="#">
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary-dark"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;