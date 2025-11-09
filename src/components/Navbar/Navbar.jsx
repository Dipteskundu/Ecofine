import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from '../../assets/Image_y5uqkny5uqkny5uq.png';
import backgroundImage2 from '../../assets/Image_o5et04o5et04o5et.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 0 = image1, 1 = image2
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const nextImageTimerRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      // Trigger slide animation when mouse moves, but only if not already transitioning
      if (!isTransitioning && !hasMouseMoved) {
        setHasMouseMoved(true);
        setIsTransitioning(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTransitioning, hasMouseMoved]);

  useEffect(() => {
    if (isTransitioning) {
      // Switch image immediately when transitioning starts
      setCurrentImageIndex(prev => 1 - prev);
      
      // After slide animation completes (1 second), reset transition state
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    if (!isTransitioning && hasMouseMoved) {
      // Clear any existing timer
      if (nextImageTimerRef.current) {
        clearTimeout(nextImageTimerRef.current);
      }

      // Wait 3 seconds, then trigger next slide animation
      nextImageTimerRef.current = setTimeout(() => {
        setIsTransitioning(true);
      }, 3000);

      return () => {
        if (nextImageTimerRef.current) {
          clearTimeout(nextImageTimerRef.current);
        }
      };
    }
  }, [isTransitioning, hasMouseMoved, currentImageIndex]);
  
  const images = [backgroundImage, backgroundImage2];
  const currentImage = images[currentImageIndex];
  const nextImage = images[1 - currentImageIndex];

  // Navigation Links matching the image
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Service', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Images with Slide Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-10"
          style={{ backgroundImage: `url(${currentImage})` }}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10">
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-black text-xl font-bold">Ecofine</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-black hover:text-green-400 transition-colors duration-200 text-sm font-medium" 
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Right Side - CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition-colors duration-200 font-medium flex items-center space-x-2">
                <span>Get A Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-gray-900 border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-white hover:text-green-400 hover:bg-white/5 px-4 py-2 rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded transition-colors duration-200 font-medium mt-4 flex items-center justify-center space-x-2">
                <span>Get A Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Split Layout */}
      <div className="min-h-screen pt-20">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-12 lg:py-20">
            <div className="max-w-2xl">
              {/* Tagline */}
              
              {/* Main Heading */}
              <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-black leading-tight mb-6">
                Leading the way to a <br />greener future
              </h1>
              
              {/* Paragraph */}
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                Ecology is the scientific study of the relationships between organisms and their environment, including their physical, chemical, and biological interactions. It explores how living things interact with each other and their surroundings, helping us understand the delicate balance of nature and the importance of preserving our planet for future generations.
              </p>
              
              {/* CTA Button */}
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded transition-colors duration-200 font-medium flex items-center space-x-2 mb-12">
                <span>Join Us Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              

            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="flex-1 relative">
            <div className="w-full h-full min-h-[400px] lg:min-h-full" />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}