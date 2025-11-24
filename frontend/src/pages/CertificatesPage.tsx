import { Download, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { certificateService } from '../services/api';
import About from '../components/About';

interface Course {
    id: number;
    name: string;
}

interface Certificate {
    id: number;
    name: string;
    certificate_number: string;
    course: {
        name: string;
    };
}

const CertificatesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<string>('all');
    const [courses, setCourses] = useState<Course[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 10,
        total: 0,
        lastPage: 1,
    });

    const navigate = useNavigate();
    const location = useLocation();

    // Load courses
    useEffect(() => {
        const loadCourses = async () => {
            try {
                const response = await certificateService.getCategories();
                setCourses(response);
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        };

        loadCourses();
    }, []);

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
            alert(
                "Sertifikatni yuklab olishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
            );
        }
    };
    // Load certificates
    useEffect(() => {
        const loadCertificates = async () => {
            try {
                setIsLoading(true);
                const response = await certificateService.getAll({
                    search: searchTerm,
                    category:
                        selectedCourse !== 'all' ? selectedCourse : undefined,
                    page: pagination.currentPage,
                    per_page: pagination.perPage,
                });

                setCertificates(response.data);
                setPagination((prev) => ({
                    ...prev,
                    total: response.meta?.total || 0,
                    lastPage: response.meta?.last_page || 1,
                }));
            } catch (error) {
                console.error('Error loading certificates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const timer = setTimeout(() => {
            loadCertificates();
        }, 500);

        return () => clearTimeout(timer);
    }, [
        searchTerm,
        selectedCourse,
        pagination.currentPage,
        pagination.perPage,
    ]);

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

    const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPagination((prev) => ({
            ...prev,
            perPage: Number(e.target.value),
            currentPage: 1,
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <About />
            <div className="flex flex-col gap-8 md:flex-row">
                {/* Left Sidebar - Courses */}
                <div className="w-full md:w-1/4">
                    <div className="rounded-lg bg-white p-4 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Kurslar</h2>
                        <div className="space-y-2">
                            <div
                                className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                                    selectedCourse === 'all'
                                        ? 'border-l-4 border-blue-500 bg-blue-50'
                                        : ''
                                }`}
                                onClick={() => setSelectedCourse('0')}
                            >
                                <span className="font-medium">
                                    Barcha kurslar
                                </span>
                                <span className="float-right text-sm text-gray-500">
                                    ({pagination.total})
                                </span>
                            </div>
                            {courses.map((course) => (
                                <div
                                    key={course.id}
                                    className={`cursor-pointer rounded p-2 hover:bg-gray-100 ${
                                        selectedCourse === course.id.toString()
                                            ? 'border-l-4 border-blue-500 bg-blue-50'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setSelectedCourse(course.id.toString())
                                    }
                                >
                                    <span className="font-medium">
                                        {course.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content - Certificates */}
                <div className="w-full md:w-3/4">
                    {/* Search and Filter */}
                    <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setPagination((prev) => ({
                                            ...prev,
                                            currentPage: 1,
                                        }));
                                    }}
                                    placeholder="Sertifikat qidirish..."
                                    className="w-full rounded-lg border py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                <div className="absolute top-2.5 left-3 text-gray-400">
                                    <Search className="h-5 w-5" />
                                </div>
                            </div>
                            <select
                                value={pagination.perPage}
                                onChange={handlePerPageChange}
                                className="rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="10">10 ta</option>
                                <option value="20">20 ta</option>
                                <option value="50">50 ta</option>
                            </select>
                        </div>
                    </div>

                    {/* Certificates List */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : certificates.length > 0 ? (
                            certificates.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
                                >
                                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {cert.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {cert.course?.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Sertifikat raqami:{' '}
                                                {cert.certificate_number}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleDownload(
                                                    cert.certificate_number,
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span>Yuklab olish</span>
                                        </button>
                                        {/*<a*/}
                                        {/*    href={`/api/certificates/${cert.id}/download`}*/}
                                        {/*    className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"*/}
                                        {/*>*/}
                                        {/*    <Download className="h-4 w-4" />*/}
                                        {/*    Yuklab olish*/}
                                        {/*</a>*/}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-lg bg-white py-12 text-center shadow">
                                <p className="text-gray-500">
                                    Hech qanday sertifikat topilmadi
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pagination.lastPage > 1 && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex space-x-1">
                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage - 1,
                                        )
                                    }
                                    disabled={pagination.currentPage === 1}
                                    className={`rounded px-3 py-1 ${
                                        pagination.currentPage === 1
                                            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    &laquo;
                                </button>

                                {Array.from(
                                    { length: pagination.lastPage },
                                    (_, i) => i + 1,
                                ).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`rounded px-3 py-1 ${
                                            pagination.currentPage === page
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white hover:bg-gray-100'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() =>
                                        handlePageChange(
                                            pagination.currentPage + 1,
                                        )
                                    }
                                    disabled={
                                        pagination.currentPage ===
                                        pagination.lastPage
                                    }
                                    className={`rounded px-3 py-1 ${
                                        pagination.currentPage ===
                                        pagination.lastPage
                                            ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                            : 'bg-white hover:bg-gray-100'
                                    }`}
                                >
                                    &raquo;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CertificatesPage;
