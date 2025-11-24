import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
      <header className="fixed top-0 z-50 w-full bg-white shadow-lg">
          <div className="container mx-auto px-4">
              {/* Top bar */}
              <div className="hidden items-center justify-between border-b py-2 text-sm text-gray-600 md:flex">
                  <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>+998 93 938 22 23</span>
                      </div>
                      <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4" />
                          <span>info@donstroyproject.uz</span>
                      </div>
                  </div>
                  <div className="font-medium text-orange-600">
                      Bepul konsultatsiya olish
                  </div>
              </div>

              {/* Main navigation */}
              <div className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                      <div className="text-2xl font-bold text-blue-800">
                          DonStroy
                          <span className="text-orange-600">Project</span>
                      </div>
                  </div>

                  {/* Desktop Navigation */}
                  <nav className="hidden space-x-8 md:flex">
                      <a
                          href="/"
                          className="font-medium text-gray-700 transition-colors hover:text-blue-800"
                      >
                          Bosh sahifa
                      </a>
                      <a
                          href="#about"
                          className="font-medium text-gray-700 transition-colors hover:text-blue-800"
                      >
                          Biz haqimizda
                      </a>
                      <a
                          href="#services"
                          className="font-medium text-gray-700 transition-colors hover:text-blue-800"
                      >
                          Xizmatlar
                      </a>
                      {/*<a*/}
                      {/*    href="#projects"*/}
                      {/*    className="font-medium text-gray-700 transition-colors hover:text-blue-800"*/}
                      {/*>*/}
                      {/*    Loyihalar*/}
                      {/*</a>*/}
                      <a
                          href="/certificates"
                          className="font-medium text-gray-700 transition-colors hover:text-blue-800"
                      >
                          Sertifikatlar
                      </a>
                      <a
                          href="#contact"
                          className="font-medium text-gray-700 transition-colors hover:text-blue-800"
                      >
                          Aloqa
                      </a>
                  </nav>

                  <div className="hidden items-center space-x-4 md:flex">
                      <button className="rounded-lg bg-orange-600 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-700">
                          Qo'ng'iroq qilish
                      </button>
                  </div>

                  {/* Mobile menu button */}
                  <button
                      className="md:hidden"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                      {isMenuOpen ? (
                          <X className="h-6 w-6" />
                      ) : (
                          <Menu className="h-6 w-6" />
                      )}
                  </button>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                  <nav className="border-t py-4 md:hidden">
                      <div className="flex flex-col space-y-4">
                          <a
                              href="#home"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Bosh sahifa
                          </a>
                          <a
                              href="#about"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Biz haqimizda
                          </a>
                          <a
                              href="#services"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Xizmatlar
                          </a>
                          <a
                              href="#projects"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Loyihalar
                          </a>
                          <a
                              href="#certificates"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Sertifikatlar
                          </a>
                          <a
                              href="#contact"
                              className="font-medium text-gray-700 hover:text-blue-800"
                          >
                              Aloqa
                          </a>
                          <button className="w-full rounded-lg bg-orange-600 px-6 py-2 font-medium text-white transition-colors hover:bg-orange-700">
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
