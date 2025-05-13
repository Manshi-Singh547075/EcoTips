import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const linkClasses = (path: string) => {
    return `${isActive(path) ? 'text-primary font-medium' : 'text-neutral-dark hover:text-primary'} px-3 py-2 rounded-md font-medium transition-colors`;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Leaf className="h-6 w-6 text-primary mr-2" />
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
