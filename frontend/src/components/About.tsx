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
      <section id="about" className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-800">
                      Biz haqimizda
                  </h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">
                      DonStroyProject – MALAKA OSHIRISH VA QAYTA TAYORLASH
                  </p>
              </div>

              <div className="mb-20 grid items-center gap-16 lg:grid-cols-2">
                  <div>
                      <h3 className="mb-6 text-3xl font-bold text-gray-800">
                          Kompaniyamiz tarixi
                      </h3>
                      <p className="mb-6 leading-relaxed text-gray-600">
                          2009-yilda tashkil etilgan DonStroyProject kompaniyasi
                          bugungi kunda O'zbekistondagi eng yirik qurilish
                          kompaniyalaridan biri hisoblanadi. Biz 15 yil davomida
                          minglab mijozlarimizning ishonchini qozonib keldik.
                      </p>
                      <p className="mb-8 leading-relaxed text-gray-600">
                          Bizning asosiy maqsadimiz – har bir mijozga yuqori
                          sifatli xizmat ko'rsatish va zamonaviy texnologiyalar
                          yordamida ishonchli binolar qurish.
                      </p>

                      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                          {features.map((feature, index) => (
                              <div
                                  key={index}
                                  className="flex items-center space-x-3"
                              >
                                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600" />
                                  <span className="text-gray-700">
                                      {feature}
                                  </span>
                              </div>
                          ))}
                      </div>

                      <button className="rounded-lg bg-blue-800 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-900">
                          Batafsil ma'lumot
                      </button>
                  </div>

                  <div className="space-y-8">
                      <img
                          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1"
                          alt="Our team"
                          className="w-full rounded-2xl shadow-lg"
                      />

                      <div className="grid grid-cols-3 gap-6 text-center">
                          <div className="rounded-xl bg-white p-6 shadow-md">
                              <div className="mb-2 text-2xl font-bold text-blue-800">
                                  500+
                              </div>
                              <div className="text-sm text-gray-600">
                                  Loyihalar
                              </div>
                          </div>
                          <div className="rounded-xl bg-white p-6 shadow-md">
                              <div className="mb-2 text-2xl font-bold text-blue-800">
                                  15
                              </div>
                              <div className="text-sm text-gray-600">
                                  Yil tajriba
                              </div>
                          </div>
                          <div className="rounded-xl bg-white p-6 shadow-md">
                              <div className="mb-2 text-2xl font-bold text-blue-800">
                                  50+
                              </div>
                              <div className="text-sm text-gray-600">
                                  Xodimlar
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Values */}
              <div className="grid gap-8 md:grid-cols-3">
                  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                          <Target className="h-8 w-8 text-blue-800" />
                      </div>
                      <h4 className="mb-4 text-xl font-bold text-gray-800">
                          Bizning maqsadimiz
                      </h4>
                      <p className="text-gray-600">
                          Har bir loyihani eng yuqori sifat standartlariga
                          muvofiq amalga oshirish
                      </p>
                  </div>

                  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                          <Eye className="h-8 w-8 text-orange-600" />
                      </div>
                      <h4 className="mb-4 text-xl font-bold text-gray-800">
                          Bizning ko'rish
                      </h4>
                      <p className="text-gray-600">
                          O'zbekistonda eng ishonchli va innovatsion qurilish
                          kompaniyasi bo'lish
                      </p>
                  </div>

                  <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
                      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <Heart className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="mb-4 text-xl font-bold text-gray-800">
                          Bizning qadriyatlarimiz
                      </h4>
                      <p className="text-gray-600">
                          Halollik, sifat, mijozlarga hurmat va professional
                          yondashuv
                      </p>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default About;
