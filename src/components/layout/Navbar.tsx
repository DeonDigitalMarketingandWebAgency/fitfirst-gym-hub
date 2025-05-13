
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, Menu, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-gym-blue">
                Fitness<span className="text-gym-orange">First</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gym-dark hover:text-gym-orange font-medium">
              Home
            </Link>
            <Link to="/packages" className="text-gym-dark hover:text-gym-orange font-medium">
              Packages
            </Link>
            <Link to="/trainers" className="text-gym-dark hover:text-gym-orange font-medium">
              Trainers
            </Link>
            <Link to="/equipment" className="text-gym-dark hover:text-gym-orange font-medium">
              Equipment
            </Link>
            <Link to="/contact" className="text-gym-dark hover:text-gym-orange font-medium">
              Contact
            </Link>
            <div className="flex items-center space-x-3">
              <Button asChild variant="outline" className="border-gym-blue text-gym-blue hover:bg-gym-blue hover:text-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gym-orange hover:bg-gym-orange/90 text-white">
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gym-dark hover:text-gym-orange focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-medium text-gym-dark hover:text-gym-orange"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/packages" 
              className="block px-3 py-2 text-base font-medium text-gym-dark hover:text-gym-orange"
              onClick={() => setIsOpen(false)}
            >
              Packages
            </Link>
            <Link 
              to="/trainers" 
              className="block px-3 py-2 text-base font-medium text-gym-dark hover:text-gym-orange"
              onClick={() => setIsOpen(false)}
            >
              Trainers
            </Link>
            <Link 
              to="/equipment" 
              className="block px-3 py-2 text-base font-medium text-gym-dark hover:text-gym-orange"
              onClick={() => setIsOpen(false)}
            >
              Equipment
            </Link>
            <Link 
              to="/contact" 
              className="block px-3 py-2 text-base font-medium text-gym-dark hover:text-gym-orange"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button asChild variant="outline" className="border-gym-blue text-gym-blue w-full">
                <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>
              <Button asChild className="bg-gym-orange w-full">
                <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
