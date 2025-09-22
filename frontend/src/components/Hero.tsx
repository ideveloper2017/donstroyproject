import React from 'react';
import { ArrowRight, Award, Users, Building2 } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="pt-24 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Sizning <span className="text-orange-400">orzuyingizdagi</span> binoni quramiz
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              15 yillik tajriba bilan zamonaviy qurilish texnologiyalaridan foydalanib, 
              yuqori sifatli va ishonchli binolar quramiz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
                <span>Bepul konsultatsiya</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-800 px-8 py-4 rounded-lg font-semibold transition-all">
                Loyihalarni ko'rish
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Construction site"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-white text-blue-800 p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="font-medium">Muvaffaqiyatli loyiha</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-blue-700">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">15+</div>
            <div className="text-blue-200">Yillik tajriba</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-200">Professional jamoa</div>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Building2 className="w-12 h-12 text-orange-400" />
            </div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-200">Qurilgan obyekt</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;