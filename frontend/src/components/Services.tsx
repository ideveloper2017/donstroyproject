
import {
    Building,
    Wrench,
    PaintBucket,
    Zap,
    TreePine,
    Shield,
    Cloud,
    CloudCog,
    Computer,
    Building2,
    WorkflowIcon,
    LanguagesIcon,
    ConstructionIcon,
    BrickWallIcon,
    PlugZap2Icon,
    Building2Icon,
} from 'lucide-react';


const Services = () => {
  const services = [
      {
          icon: Building,
          title: 'Qurilish nazorati yo`nalishi bo`yicha malaka oshirish',
          // description: 'Uy-joy va tijorat binolarini noldan qurib bitirish',
          // features: ['Loyihalashtirish', 'Qurilish', 'Topshirish'],
      },
      {
          icon: Wrench,
          title: "Issiklik tarmoklari va issiklik punktlarini ishlatish va ta'mirlash",
          // description: "Eski binolarni zamonaviy ko'rinishga keltirish",
          // features: ["Kapital ta'mir", "Kosmetik ta'mir", 'Rekonstruksiya'],
      },
      {
          icon: PaintBucket,
          title: "Suv ta'minoti va oqava suv korxonalarini boshqaruvini tashkil qilish va boshqarish bo`yicha malaka oshirish kursi",
          // description: 'Zamonaviy dizayn va sifatli materiallar bilan bezatish',
          // features: ['Dizayn loyiha', 'Materiallar tanlash', 'Ish bajarish'],
      },
      {
          icon: Zap,
          title: 'Elektr qurilmalariga xizmat kursatuvchi elektromontyorlarni malakasini oshirish kursi',
          // description: "Barcha elektr tizimlarini o'rnatish va ta'mirlash",
          // features: ['Elektr tizimi', 'Avtomatlashtirish', 'Xavfsizlik'],
      },
      {
          icon: TreePine,
          title: 'Qurilish loyixasini boshqarish',
          // description: "Hovli va bog'larni professional jihozlash",
          // features: ["Bog' loyihasi", "O'simlik turi", 'Suv tizimi'],
      },
      {
          icon: Shield,
          title: 'Nasos stansiyasi operatori',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: Cloud,
          title: 'Bug` va issiq suvli qozon operatori',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: CloudCog,
          title: 'Issiqlik yenergetika jixozlari va qozonxona qurilmalari operatori',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: Computer,
          title: 'Kompyuter savodxonligi uquv kursi',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: Building2,
          title: 'Quruvchilar malakasini oshirish',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: WorkflowIcon,
          title: 'Mexnat muxofazasi va texnika xavfsizligi bUyicha malaka oshirish kursi',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: LanguagesIcon,
          title: 'Rus,Ingliz tili kurslari',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: ConstructionIcon,
          title: 'Chilangar-santexnik',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: BrickWallIcon,
          title: 'G`isht teruvchi',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: Building2Icon,
          title: '”Santexnik” malaka oshirish kursi',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },
      {
          icon: PlugZap2Icon,
          title: 'Elektrgazpayvandlovchilarni qayta tayyorlash',
          // description: 'Barcha ishlarimizga uzoq muddatli kafolat beramiz',
          // features: ['5 yil kafolat', '24/7 yordam', 'Bepul tekshiruv'],
      },

      //  Rus tili kursi
      //  Ingliz tili kurslari
      //  Chilangar-santexnik
      //  Bi sht teruvchi
      // ”Santexnik” malaka oshirish kursi
      // elektrgazpayvandlovchilarni kayta tayyorlash
  ];

  return (
      <section id="services" className="bg-white py-20">
          <div className="container mx-auto px-4">
              <div className="mb-16 text-center">
                  <h2 className="mb-4 text-4xl font-bold text-gray-800">
                      TA'LIM YO'NALISHLARI
                  </h2>
                  <p className="mx-auto max-w-3xl text-xl text-gray-600">
                      Kadrlar malakasini oshirish va ularni kayta tayyorlash
                  </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((service, index) => {
                      const IconComponent = service.icon;
                      return (
                          <div
                              key={index}
                              className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                          >
                              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100 transition-colors group-hover:bg-blue-800">
                                  <IconComponent className="h-8 w-8 text-blue-800 transition-colors group-hover:text-white" />
                              </div>

                              <h3 className="mb-4 text-xl font-bold text-gray-800">
                                  {service.title}
                              </h3>

                              {/*<p className="mb-6 leading-relaxed text-gray-600">*/}
                              {/*    {service?.description}*/}
                              {/*</p>*/}

                              {/*<ul className="mb-6 space-y-2">*/}
                              {/*    {service?.features?.map(*/}
                              {/*        (feature, featureIndex) => (*/}
                              {/*            <li*/}
                              {/*                key={featureIndex}*/}
                              {/*                className="flex items-center space-x-2 text-gray-700"*/}
                              {/*            >*/}
                              {/*                <div className="h-2 w-2 rounded-full bg-orange-600"></div>*/}
                              {/*                <span className="text-sm">*/}
                              {/*                    {feature}*/}
                              {/*                </span>*/}
                              {/*            </li>*/}
                              {/*        ),*/}
                              {/*    )}*/}
                              {/*</ul>*/}

                              {/*<button className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-all hover:bg-blue-800 hover:text-white">*/}
                              {/*    Batafsil ma'lumot*/}
                              {/*</button>*/}
                          </div>
                      );
                  })}
              </div>

              <div className="mt-16 text-center">
                  <button className="rounded-lg bg-orange-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-orange-700">
                      Barcha xizmatlarni ko'rish
                  </button>
              </div>
          </div>
      </section>
  );
};

export default Services;
