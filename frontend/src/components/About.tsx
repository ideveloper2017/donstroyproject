import React from 'react';
import { CheckCircle, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  const features = [
    'ISO 9001:2015 sertifikatiga ega',
    'Zamonaviy qurilish texnologiyalari',
    '24/7 mijozlar bilan aloqa',
    'Kafolat va post-xizmat'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Biz haqimizda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DonStroyProject – O'zbekistonda qurilish sohasida yetakchi kompaniyalardan biri
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Kompaniyamiz tarixi
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              2009-yilda tashkil etilgan DonStroyProject kompaniyasi bugungi kunda 
              O'zbekistondagi eng yirik qurilish kompaniyalaridan biri hisoblanadi. 
              Biz 15 yil davomida minglab mijozlarimizning ishonchini qozonib keldik.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Bizning asosiy maqsadimiz – har bir mijozga yuqori sifatli xizmat 
              ko'rsatish va zamonaviy texnologiyalar yordamida ishonchli binolar qurish.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Batafsil ma'lumot
            </button>
          </div>

          <div className="space-y-8">
            <img
              src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
              alt="Our team"
              className="rounded-2xl shadow-lg w-full"
            />
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-blue-800 mb-2">500+</div>
                <div className="text-gray-600 text-sm">Loyihalar</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-blue-800 mb-2">15</div>
                <div className="text-gray-600 text-sm">Yil tajriba</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-2xl font-bold text-blue-800 mb-2">50+</div>
                <div className="text-gray-600 text-sm">Xodimlar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Target className="w-8 h-8 text-blue-800" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Bizning maqsadimiz</h4>
            <p className="text-gray-600">
              Har bir loyihani eng yuqori sifat standartlariga muvofiq amalga oshirish
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Bizning ko'rish</h4>
            <p className="text-gray-600">
              O'zbekistonda eng ishonchli va innovatsion qurilish kompaniyasi bo'lish
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Heart className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">Bizning qadriyatlarimiz</h4>
            <p className="text-gray-600">
              Halollik, sifat, mijozlarga hurmat va professional yondashuv
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;