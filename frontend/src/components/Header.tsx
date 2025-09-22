import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="hidden md:flex justify-between items-center py-2 text-sm text-gray-600 border-b">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+998 90 123 45 67</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>info@donstroyproject.uz</span>
            </div>
          </div>
          <div className="text-orange-600 font-medium">
            Bepul konsultatsiya olish
          </div>
        </div>

        {/* Main navigation */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-800">
              DonStroy<span className="text-orange-600">Project</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Bosh sahifa
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Biz haqimizda
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Xizmatlar
            </a>
            <a href="#projects" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Loyihalar
            </a>
            <a href="#certificates" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Sertifikatlar
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-800 font-medium transition-colors">
              Aloqa
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium">
              Qo'ng'iroq qilish
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-blue-800 font-medium">
                Bosh sahifa
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-800 font-medium">
                Biz haqimizda
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-800 font-medium">
                Xizmatlar
              </a>
              <a href="#projects" className="text-gray-700 hover:text-blue-800 font-medium">
                Loyihalar
              </a>
              <a href="#certificates" className="text-gray-700 hover:text-blue-800 font-medium">
                Sertifikatlar
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-800 font-medium">
                Aloqa
              </a>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-medium w-full">
                Qo'ng'iroq qilish
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;