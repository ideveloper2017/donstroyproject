import React from 'react';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Zamonaviy turar-joy majmuasi',
      location: 'Toshkent, Yunusobod tumani',
      date: '2023',
      image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: '120 xonadonga mo\'ljallangan zamonaviy turar-joy majmuasi'
    },
    {
      title: 'Biznes markaz "Poytaxt"',
      location: 'Toshkent, Mirobod tumani',
      date: '2023',
      image: 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: '12 qavatli zamonaviy biznes markazi'
    },
    {
      title: 'Ta\'lim majmuasi "Kelajak"',
      location: 'Toshkent, Shayxontohur tumani',
      date: '2022',
      image: 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: '1000 o\'quvchiga mo\'ljallangan zamonaviy maktab binosi'
    },
    {
      title: 'Tibbiyot markazi "Salomatlik"',
      location: 'Toshkent, Sergeli tumani',
      date: '2022',
      image: 'https://images.pexels.com/photos/236381/pexels-photo-236381.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: 'Zamonaviy tibbiy asbob-uskunalar bilan jihozlangan tibbiyot markazi'
    },
    {
      title: 'Savdo markazi "Guliston"',
      location: 'Toshkent, Olmazor tumani',
      date: '2021',
      image: 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: '5 qavatli zamonaviy savdo va ko\'ngilochar markazi'
    },
    {
      title: 'Mehmonxona "Grand Plaza"',
      location: 'Toshkent, Amir Temur tumani',
      date: '2021',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
      description: '200 xonali 4 yulduzli mehmonxona majmuasi'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Bizning loyihalar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            15 yil davomida amalga oshirgan eng yaxshi loyihalarimiz
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4">
                    <button className="bg-white text-blue-800 p-2 rounded-full hover:bg-blue-800 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {project.title}
                </h3>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.date}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <button className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold transition-colors">
                  Loyihani ko'rish
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Barcha loyihalarni ko'rish
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;