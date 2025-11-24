import React from 'react';
import { ArrowRight, Award, Users, Building2 } from 'lucide-react';

const Hero = () => {
  return (
      <section
          id="home"
          className="bg-gradient-to-r from-blue-900 to-blue-800 pt-24 text-white"
      >
          <div className="container mx-auto px-4 py-20">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div className="space-y-8">
                      <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                          Sizning{' '}
                          <span className="text-orange-400">
                              orzuyingizdagi
                          </span>{' '}
                          binoni qurish uchun bilim va tajriba kerak
                      </h1>
                      <p className="text-xl leading-relaxed text-blue-100">
                          Bu tizimga bog`lanishingiz bilan o`z korxonangiz
                          kelajagi to`g`risida o`ylay boshlaysiz va bizdan imkon
                          topasiz. Korxonangiz rivojiga biz hissa qo`shamiz!
                          Kelajakni biz bilan quring!!!
                          <br />
                          Don Stroy Project jamoasi.
                      </p>
                      {/*<div className="flex flex-col gap-4 sm:flex-row">*/}
                      {/*    <button className="flex transform items-center justify-center space-x-2 rounded-lg bg-orange-600 px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-orange-700">*/}
                      {/*        <span>Bepul konsultatsiya</span>*/}
                      {/*        <ArrowRight className="h-5 w-5" />*/}
                      {/*    </button>*/}
                      {/*    <button className="rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-blue-800">*/}
                      {/*        Loyihalarni ko'rish*/}
                      {/*    </button>*/}
                      {/*</div>*/}
                  </div>

                  <div className="relative">
                      <img
                          src="high-angle-measuring-tools-desk-still-life.jpg"
                          alt="Construction site"
                          className="rounded-2xl shadow-2xl"
                      />
                      <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 text-blue-800 shadow-xl">
                          <div className="text-3xl font-bold text-orange-600">
                              300+
                          </div>
                          <div className="font-medium">
                              Muvaffaqiyatli yakunlanga kurslar
                          </div>
                      </div>
                  </div>
              </div>

              {/* Stats */}
              <div className="mt-20 grid grid-cols-1 gap-8 border-t border-blue-700 pt-12 md:grid-cols-3">
                  <div className="text-center">
                      <div className="mb-4 flex justify-center">
                          <Award className="h-12 w-12 text-orange-400" />
                      </div>
                      <div className="mb-2 text-3xl font-bold">5+</div>
                      <div className="text-blue-200">Yillik tajriba</div>
                  </div>
                  <div className="text-center">
                      <div className="mb-4 flex justify-center">
                          <Users className="h-12 w-12 text-orange-400" />
                      </div>
                      <div className="mb-2 text-3xl font-bold">15+</div>
                      <div className="text-blue-200">Professional jamoa</div>
                  </div>
                  <div className="text-center">
                      <div className="mb-4 flex justify-center">
                          <Building2 className="h-12 w-12 text-orange-400" />
                      </div>
                      <div className="mb-2 text-3xl font-bold">300+</div>
                      <div className="text-blue-200">
                          Tamomlagan malak oshirish kurslari
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Hero;
