import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
      <section id="contact" className="bg-white py-20">
          <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-800">
                      Biz bilan bog'laning
                  </h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">
                      Loyihangiz haqida gaplashish uchun biz bilan bog'laning.
                      Bepul konsultatsiya oling!
                  </p>
              </div>

              <div className="grid gap-16 lg:grid-cols-2">
                  {/* Contact Form */}
                  <div className="rounded-2xl bg-gray-50 p-8">
                      <h3 className="mb-6 text-2xl font-bold text-gray-800">
                          Bepul konsultatsiya olish
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid gap-6 md:grid-cols-2">
                              <div>
                                  <label className="mb-2 block font-medium text-gray-700">
                                      Ism familiya *
                                  </label>
                                  <input
                                      type="text"
                                      name="name"
                                      value={formData.name}
                                      onChange={handleChange}
                                      required
                                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                      placeholder="Ismingizni kiriting"
                                  />
                              </div>
                              <div>
                                  <label className="mb-2 block font-medium text-gray-700">
                                      Email *
                                  </label>
                                  <input
                                      type="email"
                                      name="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      required
                                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                      placeholder="emailingizni kiriting"
                                  />
                              </div>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                              <div>
                                  <label className="mb-2 block font-medium text-gray-700">
                                      Telefon raqam *
                                  </label>
                                  <input
                                      type="tel"
                                      name="phone"
                                      value={formData.phone}
                                      onChange={handleChange}
                                      required
                                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                      placeholder="+998 90 123 45 67"
                                  />
                              </div>
                              <div>
                                  <label className="mb-2 block font-medium text-gray-700">
                                      Xizmat turi
                                  </label>
                                  <select
                                      name="service"
                                      value={formData.service}
                                      onChange={handleChange}
                                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                  >
                                      <option value="">
                                          Xizmat turini tanlang
                                      </option>
                                      <option value="construction">
                                          Qurilish ishlari
                                      </option>
                                      <option value="renovation">
                                          Ta'mirlash ishlari
                                      </option>
                                      <option value="interior">
                                          Ichki bezatish
                                      </option>
                                      <option value="electrical">
                                          Elektr ishlari
                                      </option>
                                      <option value="landscape">
                                          Landshaft dizayni
                                      </option>
                                  </select>
                              </div>
                          </div>

                          <div>
                              <label className="mb-2 block font-medium text-gray-700">
                                  Xabar
                              </label>
                              <textarea
                                  name="message"
                                  value={formData.message}
                                  onChange={handleChange}
                                  rows={4}
                                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                  placeholder="Loyihangiz haqida batafsil yozing..."
                              ></textarea>
                          </div>

                          <button
                              type="submit"
                              className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-orange-700"
                          >
                              <span>Yuborish</span>
                              <Send className="h-5 w-5" />
                          </button>
                      </form>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-8">
                      <div>
                          <h3 className="mb-6 text-2xl font-bold text-gray-800">
                              Aloqa ma'lumotlari
                          </h3>
                          <p className="mb-8 leading-relaxed text-gray-600">
                              Bizning ofisimizga tashrif buyuring yoki
                              qo'ng'iroq qiling. Mutaxassislarimiz sizga bepul
                              konsultatsiya berishadi.
                          </p>
                      </div>

                      <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                                  <Phone className="h-6 w-6 text-blue-800" />
                              </div>
                              <div>
                                  <h4 className="mb-1 font-semibold text-gray-800">
                                      Telefon
                                  </h4>
                                  <p className="text-gray-600">
                                      +998 93 938 22 23
                                  </p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                  <Mail className="h-6 w-6 text-orange-600" />
                              </div>
                              <div>
                                  <h4 className="mb-1 font-semibold text-gray-800">
                                      Email
                                  </h4>
                                  <p className="text-gray-600">
                                      info@donstroyproject.uz
                                  </p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-100">
                                  <MapPin className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                  <h4 className="mb-1 font-semibold text-gray-800">
                                      Manzil
                                  </h4>
                                  <p className="text-gray-600">
                                      Namangan viloyat, Namangan shahar,
                                      <br />
                                      Mustaqillik MFY, Mustaqillik ko'chasi, 6-a
                                      uy
                                  </p>
                              </div>
                          </div>

                          <div className="flex items-start space-x-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100">
                                  <Clock className="h-6 w-6 text-purple-600" />
                              </div>
                              <div>
                                  <h4 className="mb-1 font-semibold text-gray-800">
                                      Ish vaqti
                                  </h4>
                                  <p className="text-gray-600">
                                      Dushanba-Juma: 9:00 - 18:00
                                  </p>

                              </div>
                          </div>
                      </div>

                      {/* Map placeholder */}
                      {/*<div className="flex h-64 items-center justify-center rounded-2xl bg-gray-200">*/}
                      {/*    <div className="text-center text-gray-500">*/}
                      {/*        <MapPin className="mx-auto mb-2 h-12 w-12" />*/}
                      {/*        <p>Xarita bu yerda ko'rsatiladi</p>*/}
                      {/*    </div>*/}
                      {/*</div>*/}
                  </div>
              </div>
          </div>
      </section>
  );
};

export default Contact;
