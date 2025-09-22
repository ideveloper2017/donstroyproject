import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="text-2xl font-bold mb-4">
              DonStroy<span className="text-orange-600">Project</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              O'zbekistonda qurilish sohasida 15 yillik tajribaga ega bo'lgan kompaniyamiz 
              eng yuqori sifatli xizmatlarni taqdim etadi. Bizning maqsadimiz - har bir 
              mijozning orzularini ro'yobga chiqarish.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Xizmatlarimiz</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Qurilish ishlari</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ta'mirlash ishlari</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Ichki bezatish</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Elektr ishlari</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Landshaft dizayni</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Kafolat xizmati</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Aloqa</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <span className="text-gray-300">+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-orange-600" />
                <span className="text-gray-300">info@donstroyproject.uz</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-1" />
                <span className="text-gray-300">
                  Toshkent shahar, Yunusobod tumani<br />
                  Amir Temur ko'chasi, 108-uy
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 DonStroyProject. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Maxfiylik siyosati
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Foydalanish shartlari
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Sayt xaritasi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;