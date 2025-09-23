import React, { useState, useEffect } from 'react';
import { Award, Calendar, User, Download, Search, Filter, Eye, X, CheckCircle, Loader2 } from 'lucide-react';
import { certificateService } from '../services/api';

interface Certificate {
    id: number;
    name: string;
    course: Course;
    certificate_date: string;
    certificate_number: string;
    grade: string;
    hour: string;
    photo: string;
    category: string;
}
interface Course {
    name: string;
    teachers: string;
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
        setCertificates(data?.data);
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

  const handleDownload = async (id: string) => {
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


  const categories = [
    { value: 'all', label: 'Barcha kurslar' },
    { value: 'management', label: 'Menejment' },
    { value: 'design', label: 'Dizayn' },
    { value: 'construction', label: 'Qurilish' },
    { value: 'electrical', label: 'Elektr' },
    { value: 'plumbing', label: 'Santexnika' }
  ];



  const filteredCertificates = certificates;

    console.log(filteredCertificates);
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };
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
          <section id="certificates" className="bg-gray-50 py-20">
              <div className="container mx-auto px-4">
                  <div className="mb-16 text-center">
                      <h2 className="mb-4 text-4xl font-bold text-gray-800">
                          Sertifikat egalarimiz
                      </h2>
                      <p className="mx-auto max-w-3xl text-xl text-gray-600">
                          Bizning kurslarimizni muvaffaqiyatli tugatgan va
                          sertifikat olgan o'quvchilarimiz
                      </p>
                  </div>

                  <div className="mb-12 flex flex-col gap-4 md:flex-row">
                      <div className="relative flex-1">
                          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                          <input
                              type="text"
                              placeholder="O'quvchi nomi, kurs yoki sertifikat raqami bo'yicha qidiring..."
                              value={searchTerm}
                              onChange={handleSearchChange}
                              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          />
                      </div>
                      <div className="relative">
                          <Filter className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                          <select
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="min-w-[200px] appearance-none rounded-lg border border-gray-300 bg-white py-3 pr-8 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          >
                              {categories.map((category) => (
                                  <option
                                      key={category.value}
                                      value={category.value}
                                  >
                                      {category.label}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <div className="mb-8">
                      <p className="text-gray-600">
                          <span className="font-semibold">
                              {filteredCertificates.length}
                          </span>{' '}
                          ta natija topildi
                      </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {filteredCertificates.map((certificate) => (
                          <div
                              key={certificate.id}
                              className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                          >
                              <div className="p-6">
                                  <div className="mb-6 flex items-center space-x-4">
                                      {certificate.photo ? (
                                          <img
                                              src={certificate.photo}
                                              alt={certificate.name}
                                              className="h-16 w-16 rounded-full border-4 border-blue-100 object-cover"
                                          />
                                      ) : (
                                          <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-500 text-xl font-bold text-white">
                                              {certificate.name
                                                  ?.split(" ")                // ismini va familiyasini ajratadi
                                                  .map((n: string) => n[0])   // har birining birinchi harfini oladi
                                                  .join("")                   // birlashtiradi (masalan: "Ali Valiyev" → "AV")
                                                  .toUpperCase()}
                                          </div>
                                      )}
                                      <div className="flex-1">
                                          <h3 className="mb-1 text-lg font-bold text-gray-800">
                                              {certificate.name}
                                          </h3>
                                          {/*<div*/}
                                          {/*    className={`inline-flex items-center rounded-full px-2 py-1 text-sm font-medium ${getGradeColor(certificate.grade)}`}*/}
                                          {/*>*/}
                                          {/*    <Award className="mr-1 h-4 w-4" />*/}
                                          {/*    {certificate.grade}*/}
                                          {/*</div>*/}
                                      </div>
                                  </div>

                                  <div className="mb-6 space-y-3">
                                      <div className="flex items-center space-x-2">
                                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                                          <span className="font-medium text-gray-700">
                                              {certificate.course?.name}
                                          </span>
                                      </div>

                                      <div className="flex items-center space-x-2 text-gray-600">
                                          <Calendar className="h-4 w-4" />
                                          <span className="text-sm">
                                              Berilgan sana:{' '}
                                              {formatDate(
                                                  certificate.certificate_date,
                                              )}
                                          </span>
                                      </div>

                                      <div className="flex items-center space-x-2 text-gray-600">
                                          <User className="h-4 w-4" />
                                          <span className="text-sm">
                                              Davomiyligi: {certificate.hour}
                                          </span>
                                      </div>
                                  </div>

                                  <div className="mb-4 rounded-lg bg-gray-50 p-3">
                                      <div className="mb-1 font-mono text-sm font-semibold text-gray-500">
                                          Sertifikat raqami{' '}
                                          {certificate.certificate_number}
                                      </div>
                                      {/*<div className="font-mono text-sm font-semibold text-gray-800">*/}
                                      {/*    {certificate.certificate_number}*/}
                                      {/*</div>*/}
                                  </div>

                                  <div className="flex gap-2">
                                      {/*<button*/}
                                      {/*    onClick={() => openModal(certificate)}*/}
                                      {/*    className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-200"*/}
                                      {/*>*/}
                                      {/*    <Eye className="h-4 w-4" />*/}
                                      {/*    <span>Ko'rish</span>*/}
                                      {/*</button>*/}
                                      {/*//handleDownload(certificate.id)*/}
                                      {/*(document.location.href =*/}
                                      {/*'http://localhost:8000/certificate/' +certificate.certificate_number)*/}
                                      <button
                                          onClick={() => handleDownload(certificate.certificate_number)}
                                          className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-800 py-3 font-semibold text-white transition-colors hover:bg-blue-900"
                                          >
                                          <Download className="h-4 w-4" />
                                          <span>Yuklab olish</span>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>

                  {filteredCertificates.length === 0 && (
                      <div className="py-12 text-center">
                          <div className="mb-4 text-gray-400">
                              <Award className="mx-auto h-16 w-16" />
                          </div>
                          <h3 className="mb-2 text-xl font-semibold text-gray-600">
                              Hech qanday natija topilmadi
                          </h3>
                          <p className="text-gray-500">
                              Qidiruv shartlarini o'zgartirib ko'ring
                          </p>
                      </div>
                  )}

                  <div className="mt-16 grid grid-cols-2 gap-6 border-t border-gray-200 pt-12 md:grid-cols-4">
                      <div className="text-center">
                          <div className="mb-2 text-3xl font-bold text-blue-800">
                              {certificates.length}
                          </div>
                          <div className="text-gray-600">
                              Sertifikat berilgan
                          </div>
                      </div>
                      <div className="text-center">
                          <div className="mb-2 text-3xl font-bold text-green-600">
                              {
                                  certificates.filter((c) => c.grade === 'A+')
                                      .length
                              }
                          </div>
                          <div className="text-gray-600">A+ baho</div>
                      </div>
                      <div className="text-center">
                          <div className="mb-2 text-3xl font-bold text-orange-600">
                              {categories.length - 1}
                          </div>
                          <div className="text-gray-600">
                              Kurs yo'nalishlari
                          </div>
                      </div>
                      <div className="text-center">
                          <div className="mb-2 text-3xl font-bold text-purple-600">
                              98%
                          </div>
                          <div className="text-gray-600">
                              Muvaffaqiyat darajasi
                          </div>
                      </div>
                  </div>
              </div>
          </section>

          {isModalOpen && selectedCertificate && (
              <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                  <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
                      <div className="flex items-center justify-between border-b p-6">
                          <h3 className="text-2xl font-bold text-gray-800">
                              Sertifikat ma'lumotlari
                          </h3>
                          <button
                              onClick={closeModal}
                              className="rounded-full p-2 transition-colors hover:bg-gray-100"
                          >
                              <X className="h-6 w-6 text-gray-600" />
                          </button>
                      </div>

                      <div className="p-6">
                          <div className="mb-6 rounded-2xl border-4 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-8">
                              <div className="text-center">
                                  <div className="mb-6">
                                      <div className="mb-2 text-3xl font-bold text-blue-800">
                                          DonStroy
                                          <span className="text-orange-600">
                                              Project
                                          </span>
                                      </div>
                                      <div className="text-lg font-semibold text-blue-700">
                                          Ta'lim Markazi
                                      </div>
                                  </div>

                                  <div className="mb-8">
                                      <h2 className="mb-2 text-2xl font-bold text-gray-800">
                                          SERTIFIKAT
                                      </h2>
                                      <div className="mx-auto h-1 w-24 bg-orange-600"></div>
                                  </div>

                                  <div className="mb-6">
                                      <img
                                          src={selectedCertificate.photo}
                                          alt={selectedCertificate.studentName}
                                          className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                                      />
                                  </div>

                                  <div className="mb-6">
                                      <div className="mb-1 text-sm text-gray-600">
                                          Ushbu sertifikat berildi:
                                      </div>
                                      <div className="mb-2 text-2xl font-bold text-gray-800">
                                          {selectedCertificate.studentName}
                                      </div>
                                  </div>

                                  <div className="mb-6">
                                      <div className="mb-1 text-sm text-gray-600">
                                          Kurs:
                                      </div>
                                      <div className="mb-4 text-xl font-semibold text-blue-800">
                                          {selectedCertificate.course}
                                      </div>
                                      <div className="text-sm text-gray-600">
                                          Davomiyligi:{' '}
                                          {selectedCertificate.duration}
                                      </div>
                                  </div>

                                  <div className="mb-6">
                                      <div className="flex items-center justify-center space-x-2">
                                          <CheckCircle className="h-6 w-6 text-green-600" />
                                          <span className="text-lg font-semibold text-gray-800">
                                              Baho:{' '}
                                              <span
                                                  className={`${selectedCertificate.grade === 'A+' ? 'text-green-600' : 'text-blue-600'}`}
                                              >
                                                  {selectedCertificate.grade}
                                              </span>
                                          </span>
                                      </div>
                                  </div>

                                  <div className="mb-6 grid grid-cols-2 gap-4 text-sm">
                                      <div>
                                          <div className="mb-1 text-gray-600">
                                              Berilgan sana:
                                          </div>
                                          <div className="font-semibold text-gray-800">
                                              {formatDate(
                                                  selectedCertificate.issueDate,
                                              )}
                                          </div>
                                      </div>
                                      <div>
                                          <div className="mb-1 text-gray-600">
                                              Sertifikat raqami:
                                          </div>
                                          <div className="font-mono font-semibold text-gray-800">
                                              {
                                                  selectedCertificate.certificateNumber
                                              }
                                          </div>
                                      </div>
                                  </div>

                                  <div className="mt-8 border-t border-blue-200 pt-6">
                                      <div className="grid grid-cols-2 gap-8 text-sm">
                                          <div>
                                              <div className="mt-8 border-t border-gray-400 pt-2">
                                                  <div className="font-semibold">
                                                      Direktor
                                                  </div>
                                                  <div className="text-gray-600">
                                                      A. Karimov
                                                  </div>
                                              </div>
                                          </div>
                                          <div>
                                              <div className="mt-8 border-t border-gray-400 pt-2">
                                                  <div className="font-semibold">
                                                      O'quv bo'limi mudiri
                                                  </div>
                                                  <div className="text-gray-600">
                                                      M. Rahimova
                                                  </div>
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
                                  className="flex-1 rounded-lg bg-gray-100 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-200"
                              >
                                  Yopish
                              </button>
                              <button className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-blue-800 py-3 font-semibold text-white transition-colors hover:bg-blue-900">
                                  <Download className="h-5 w-5" />
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
