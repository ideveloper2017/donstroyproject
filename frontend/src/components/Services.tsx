
import { Building, Wrench, PaintBucket, Zap, TreePine, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Building,
      title: 'Qurilish ishlari',
      description: 'Uy-joy va tijorat binolarini noldan qurib bitirish',
      features: ['Loyihalashtirish', 'Qurilish', 'Topshirish']
    },
    {
      icon: Wrench,
      title: 'Ta\'mirlash ishlari',
      description: 'Eski binolarni zamonaviy ko\'rinishga keltirish',
      features: ['Kapital ta\'mir', 'Kosmetik ta\'mir', 'Rekonstruksiya']
    },
    {
      icon: PaintBucket,
      title: 'Ichki bezatish',
      description: 'Zamonaviy dizayn va sifatli materiallar bilan bezatish',
      features: ['Dizayn loyiha', 'Materiallar tanlash', 'Ish bajarish']
    },
    {
      icon: Zap,
      title: 'Elektr ishlari',
      description: 'Barcha elektr tizimlarini o\'rnatish va ta\'mirlash',
      features: ['Elektr tizimi', 'Avtomatlashtirish', 'Xavfsizlik']
    },
    {
      icon: TreePine,
      title: 'Landshaft dizayni',
      description: 'Hovli va bog\'larni professional jihozlash',
      features: ['Bog\' loyihasi', 'O\'simlik turi', 'Suv tizimi']
    },
    {
      icon: Shield,
      title: 'Kafolat xizmati',
      description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
      features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bizning xizmatlarimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Qurilish sohasidagi barcha xizmatlarni yuqori sifat bilan taqdim etamiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 group-hover:bg-blue-800 rounded-xl mb-6 transition-colors">
                  <IconComponent className="w-8 h-8 text-blue-800 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-gray-700">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-gray-100 hover:bg-blue-800 text-gray-800 hover:text-white py-3 rounded-lg font-semibold transition-all">
                  Batafsil ma'lumot
                </button>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Barcha xizmatlarni ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
