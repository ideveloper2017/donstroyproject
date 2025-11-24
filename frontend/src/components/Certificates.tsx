import React, { useState, useEffect } from 'react';
import { Award, Calendar, User, Download, Search, Filter, Eye, X, CheckCircle, Loader2 } from 'lucide-react';
import { certificateService } from '../services/api';
import { id } from 'zod/locales';

interface Category {
  id: number;
  name: string;
}

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
  const [selectedCategory, setSelectedCategory] = useState('0');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 9,
    total: 0,
    lastPage: 1,
    from: 0,
    to: 0
  });

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await certificateService.getCategories();

        // Ensure we have an array and it's not empty
        const data = Array.isArray(response) ? response : [];
        const allCategories = [
          { id: 0, name: 'Barcha kurslar' },
          ...data.map((cat: Category) => {
            const category:Category = {
              id: cat.id || 0,
              name: cat.name,
            };
            return category;
          })
        ];

        console.log('All categories to be set:', allCategories);
        setCategories(allCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Kurslarni yuklashda xatolik yuz berdi. Iltimos, qayta yuklang.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch certificates when component mounts or filters change
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await certificateService.getAll({
          search: searchTerm,
          category: selectedCategory !== '0' ? selectedCategory : undefined,
          page: pagination.currentPage,
          per_page: pagination.perPage
        });

        console.log('API Response:', response); // Debug log

        // Check if response has data and meta properties
        if (response && response.data) {
          setCertificates(response.data);

          // Update pagination info from response
          if (response.meta) {
            console.log('Pagination meta:', response.meta); // Debug log
            setPagination(prev => ({
              ...prev,
              total: response.meta.total || 0,
              lastPage: response.meta.last_page || 1,
              from: response.meta.from || 0,
              to: response.meta.to || 0
            }));
          } else {
            console.log('No meta data in response, using default pagination');
            // Set default values if meta is not available
            setPagination(prev => ({
              ...prev,
              total: response.data.length,
              lastPage: 1,
              from: 1,
              to: response.data.length
            }));
          }
        } else {
          console.error('Invalid response format:', response);
          setCertificates([]);
          setPagination(prev => ({
            ...prev,
            total: 0,
            lastPage: 1,
            from: 0,
            to: 0
          }));
        }
      } catch (err) {
        console.error('Error fetching certificates:', err);
        setError('Sertifikatlarni yuklashda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
      } finally {
        setIsLoading(false);
      }
    };

    // Add debounce to prevent too many API calls while typing
    const timer = setTimeout(() => {
      // Always fetch certificates when any dependency changes
      fetchCertificates();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, pagination.currentPage, pagination.perPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    // Save current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
    
    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  // Handle items per page change
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination(prev => ({
      ...prev,
      perPage: parseInt(e.target.value),
      currentPage: 1 // Reset to first page when changing items per page
    }));
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Maximum number of page buttons to show

    if (pagination.lastPage <= maxPagesToShow) {
      // If total pages is less than max pages to show, show all pages
      for (let i = 1; i <= pagination.lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page with neighbors, and last page
      const startPage = Math.max(2, pagination.currentPage - 1);
      const endPage = Math.min(pagination.lastPage - 1, pagination.currentPage + 1);

      // Always show first page
      pages.push(1);

      // Add ellipsis if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Add current page and its neighbors
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (endPage < pagination.lastPage - 1) {
        pages.push(-1); // -1 represents ellipsis
      }

      // Always show last page
      if (pagination.lastPage > 1) {
        pages.push(pagination.lastPage);
      }
    }

    return pages;
  };

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
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  // Error state
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

  // No results state
  if (certificates.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and filter section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Sertifikat qidirish..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {isLoadingCategories ? (
            <div className="block w-full sm:w-64 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md bg-gray-100 animate-pulse">
              Yuklanmoqda...
            </div>
          ) : (

            <select
              id="category"
              name="category"
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >

              {categories.map((category:Category) => (

                <option  value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* No results message */}
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <div className="flex flex-col items-center">
            <Award className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hozircha hech qanday sertifikat topilmadi</h3>
            <p className="text-gray-500 mb-6">Iltimos, boshqa filtrlarda qayta urinib ko'ring</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Filtrlarni tozalash
            </button>
          </div>
        </div>
      </div>
    );
  }
  const filteredCertificates = certificates;

  //  console.log(filteredCertificates);
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
                              {categories.map((category:Category) => (
                                  <option
                                      key={category.id}
                                      value={category.id}
                                  >
                                      {category.name}
                                  </option>
                              ))}
                          </select>
                      </div>
                  </div>

                  <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
                      <p className="text-gray-600 mb-4 sm:mb-0">
                          <span className="font-semibold">
                              {pagination.total}
                          </span>{' '}
                          ta natijadan <span className="font-semibold">
                              {pagination.from}-{pagination.to}
                          </span> ko'rsatilmoqda
                      </p>

                      {/* Items per page selector */}
                      <div className="flex items-center">
                          <label htmlFor="perPage" className="mr-2 text-sm text-gray-600">Ko'rsatish:</label>
                          <select
                              id="perPage"
                              value={pagination.perPage}
                              onChange={handlePerPageChange}
                              className="rounded-md border border-gray-300 py-1 pl-2 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          >
                              <option value="9">9</option>
                              <option value="15">15</option>
                              <option value="30">30</option>
                              <option value="60">60</option>
                          </select>
                      </div>
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

                  {/* Pagination */}
                  {pagination.lastPage > 1 && (
                      <div className="mt-8 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
                          <div className="text-sm text-gray-600">
                              Sahifa {pagination.currentPage} / {pagination.lastPage}
                          </div>

                          <div className="flex space-x-1">
                              {/* First Page */}
                              <button
                                  onClick={() => handlePageChange(1)}
                                  disabled={pagination.currentPage === 1}
                                  className={`rounded-md px-3 py-1 ${pagination.currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                              >
                                  &laquo;
                              </button>

                              {/* Previous Page */}
                              <button
                                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                                  disabled={pagination.currentPage === 1}
                                  className={`rounded-md px-3 py-1 ${pagination.currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                              >
                                  &lsaquo;
                              </button>

                              {/* Page Numbers */}
                              {getPageNumbers().map((page, index) => (
                                  <button
                                      key={index}
                                      onClick={() => page > 0 && handlePageChange(page)}
                                      className={`rounded-md px-3 py-1 ${page === pagination.currentPage
                                          ? 'bg-blue-600 text-white'
                                          : page === -1
                                              ? 'cursor-default'
                                              : 'text-gray-700 hover:bg-gray-100'}`}
                                      disabled={page === -1}
                                  >
                                      {page === -1 ? '...' : page}
                                  </button>
                              ))}

                              {/* Next Page */}
                              <button
                                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                                  disabled={pagination.currentPage === pagination.lastPage}
                                  className={`rounded-md px-3 py-1 ${pagination.currentPage === pagination.lastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                              >
                                  &rsaquo;
                              </button>

                              {/* Last Page */}
                              <button
                                  onClick={() => handlePageChange(pagination.lastPage)}
                                  disabled={pagination.currentPage === pagination.lastPage}
                                  className={`rounded-md px-3 py-1 ${pagination.currentPage === pagination.lastPage ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                              >
                                  &raquo;
                              </button>
                          </div>
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
