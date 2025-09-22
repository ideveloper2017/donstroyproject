import React, { useState, useEffect } from 'react';
import { Award, Calendar, User, Download, Search, Filter, Eye, X, CheckCircle, Loader2 } from 'lucide-react';
import { certificateService } from '../services/api';

interface Certificate {
  id: number;
  studentName: string;
  course: string;
  issueDate: string;
  certificateNumber: string;
  grade: string;
  duration: string;
  photo: string;
  category: string;
}

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch certificates when component mounts or filters change
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await certificateService.getAll({
          search: searchTerm,
          category: selectedCategory,
        });
        setCertificates(data);
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Sertifikatlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
      } finally {
        setIsLoading(false);
      }
    };

    // Add debounce to prevent too many API calls while typing
    const timer = setTimeout(() => {
      fetchCertificates();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory]);

  const handleDownload = async (id: number) => {
    try {
      const blob = await certificateService.download(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading certificate:', err);
      alert('Sertifikatni yuklab olishda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
    }
  };
  // Loading and error states are handled at the beginning of the render
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Qayta yuklash
        </button>
      </div>
    );
  }
      grade: 'A+',
      duration: '5 oy',
      photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      category: 'design'
    },
    {
      id: 5,
      studentName: 'Umarov Jasur Rustamovich',
      course: 'Qurilish texnologiyalari',
      issueDate: '2024-03-01',
      certificateNumber: 'DSP-2024-005',
      grade: 'A',
      duration: '7 oy',
      photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      category: 'construction'
    },
    {
      id: 6,
      studentName: 'Nazarova Dilfuza Olimovna',
      course: 'Loyihalash va smeta',
      issueDate: '2024-03-10',
      certificateNumber: 'DSP-2024-006',
      grade: 'A+',
      duration: '6 oy',
      photo: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      category: 'management'
    },
    {
      id: 7,
      studentName: 'Yusupov Otabek Farhodovich',
      course: 'Santexnika va isitish tizimlari',
      issueDate: '2024-03-20',
      certificateNumber: 'DSP-2024-007',
      grade: 'A',
      duration: '4 oy',
      photo: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      category: 'plumbing'
    },
    {
      id: 8,
      studentName: 'Abdullayeva Maryam Davronovna',
      course: 'Landshaft dizayni',
      issueDate: '2024-04-05',
      certificateNumber: 'DSP-2024-008',
      grade: 'A+',
      duration: '5 oy',
      photo: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      category: 'design'
    }
  ];

  const categories = [
    { value: 'all', label: 'Barcha kurslar' },
    { value: 'management', label: 'Menejment' },
    { value: 'design', label: 'Dizayn' },
    { value: 'construction', label: 'Qurilish' },
    { value: 'electrical', label: 'Elektr' },
    { value: 'plumbing', label: 'Santexnika' }
  ];

  // Filtering is now handled by the API, but we can add client-side filtering if needed
  const filteredCertificates = certificates;
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('uz-UZ', options);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100';
      case 'A': return 'text-blue-600 bg-blue-100';
      case 'B+': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const openModal = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    setIsModalOpen(false);
  };

  // If no certificates found and not loading
  if (!isLoading && filteredCertificates.length === 0) {
    return (
      <section id="certificates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Sertifikatlar
            </h2>
            <div className="text-gray-500 my-12">
              <p className="text-lg">Hozircha hech qanday sertifikat topilmadi</p>
              <p className="mt-2">Iltimos, keyinroq yoki boshqa filtrlarda qayta urinib ko'ring</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="certificates" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sertifikat egalarimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bizning kurslarimizni muvaffaqiyatli tugatgan va sertifikat olgan o'quvchilarimiz
          </p>
        </div>

        {/* Search and Filter */}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="O'quvchi nomi, kurs yoki sertifikat raqami bo'yicha qidiring..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-gray-600">
              <span className="font-semibold">{filteredCertificates.length}</span> ta natija topildi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCertificates.map((certificate) => (
              <div 
                key={certificate.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={certificate.photo}
                      alt={certificate.studentName}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {certificate.studentName}
                      </h3>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getGradeColor(certificate.grade)}`}>
                        <Award className="w-4 h-4 mr-1" />
                        {certificate.grade}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{certificate.course}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Berilgan sana: {formatDate(certificate.issueDate)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Davomiyligi: {certificate.duration}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Sertifikat raqami</div>
                    <div className="font-mono text-sm font-semibold text-gray-800">
                      {certificate.certificateNumber}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => openModal(certificate)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ko'rish</span>
                    </button>
                    <button 
                      onClick={() => handleDownload(certificate.id)}
                      className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Yuklab olish</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCertificates.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Award className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Hech qanday natija topilmadi
              </h3>
              <p className="text-gray-500">
                Qidiruv shartlarini o'zgartirib ko'ring
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                {certificates.length}
              </div>
              <div className="text-gray-600">Sertifikat berilgan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certificates.filter(c => c.grade === 'A+').length}
              </div>
              <div className="text-gray-600">A+ baho</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Kurs yo'nalishlari</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                98%
              </div>
              <div className="text-gray-600">Muvaffaqiyat darajasi</div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">Sertifikat ma'lumotlari</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-200 rounded-2xl p-8 mb-6">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-blue-800 mb-2">
                      DonStroy<span className="text-orange-600">Project</span>
                    </div>
                    <div className="text-lg text-blue-700 font-semibold">
                      Ta'lim Markazi
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      SERTIFIKAT
                    </h2>
                    <div className="w-24 h-1 bg-orange-600 mx-auto"></div>
                  </div>

                  <div className="mb-6">
                    <img
                      src={selectedCertificate.photo}
                      alt={selectedCertificate.studentName}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Ushbu sertifikat berildi:</div>
                    <div className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedCertificate.studentName}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-gray-600 mb-1">Kurs:</div>
                    <div className="text-xl font-semibold text-blue-800 mb-4">
                      {selectedCertificate.course}
                    </div>
                    <div className="text-sm text-gray-600">
                      Davomiyligi: {selectedCertificate.duration}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-gray-800">
                        Baho: <span className={`${selectedCertificate.grade === 'A+' ? 'text-green-600' : 'text-blue-600'}`}>
                          {selectedCertificate.grade}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <div className="text-gray-600 mb-1">Berilgan sana:</div>
                      <div className="font-semibold text-gray-800">
                        {formatDate(selectedCertificate.issueDate)}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">Sertifikat raqami:</div>
                      <div className="font-mono font-semibold text-gray-800">
                        {selectedCertificate.certificateNumber}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-blue-200 pt-6 mt-8">
                    <div className="grid grid-cols-2 gap-8 text-sm">
                      <div>
                        <div className="border-t border-gray-400 pt-2 mt-8">
                          <div className="font-semibold">Direktor</div>
                          <div className="text-gray-600">A. Karimov</div>
                        </div>
                      </div>
                      <div>
                        <div className="border-t border-gray-400 pt-2 mt-8">
                          <div className="font-semibold">O'quv bo'limi mudiri</div>
                          <div className="text-gray-600">M. Rahimova</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition-colors"
                >
                  Yopish
                </button>
                <button className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Yuklab olish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;