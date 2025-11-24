@extends('layouts.app')

@section('content')
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Left Sidebar - Courses -->
            <div class="w-full md:w-1/4">
                <div class="bg-white rounded-lg shadow-md p-4">
                    <h2 class="text-xl font-bold mb-4">Kurslar</h2>
                    <div class="space-y-2" id="coursesList">
                        <!-- Courses will be loaded here via JavaScript -->
                    </div>
                </div>
            </div>

            <!-- Main Content - Certificates -->
            <div class="w-full md:w-3/4">
                <!-- Search and Filter -->
                <div class="bg-white rounded-lg shadow-md p-4 mb-6">
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="relative flex-1">
                            <input
                                type="text"
                                id="searchInput"
                                placeholder="Sertifikat qidirish..."
                                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                            <div class="absolute left-3 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                        <select
                            id="perPageSelect"
                            class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="10">10 ta</option>
                            <option value="20">20 ta</option>
                            <option value="50">50 ta</option>
                        </select>
                    </div>
                </div>

                <!-- Certificates List -->
                <div id="certificatesList" class="space-y-4">
                    <!-- Certificates will be loaded here via JavaScript -->
                </div>

                <!-- Pagination -->
                <div id="pagination" class="mt-6 flex justify-center">
                    <!-- Pagination will be loaded here via JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Include JavaScript -->
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let currentPage = 1;
            let perPage = 10;
            let searchQuery = '';
            let selectedCourse = 'all';

            // Load courses
            function loadCourses() {
                fetch('/api/courses')
                    .then(response => response.json())
                    .then(data => {
                        const coursesList = document.getElementById('coursesList');
                        coursesList.innerHTML = `
                    <div class="p-2 hover:bg-gray-100 rounded cursor-pointer" data-course="all">
                        <span class="font-medium">Barcha kurslar</span>
                        <span class="text-gray-500 text-sm float-right" id="allCount">(0)</span>
                    </div>
                    ${data.map(course => `
                        <div class="p-2 hover:bg-gray-100 rounded cursor-pointer" data-course="${course.id}">
                            <span class="font-medium">${course.name}</span>
                            <span class="text-gray-500 text-sm float-right course-count" id="course-${course.id}">(0)</span>
                        </div>
                    `).join('')}
                `;

                        // Add click event listeners
                        document.querySelectorAll('[data-course]').forEach(item => {
                            item.addEventListener('click', function() {
                                selectedCourse = this.dataset.course;
                                currentPage = 1;
                                loadCertificates();
                            });
                        });
                    });
            }

            // Load certificates
            function loadCertificates() {
                let url = `/api/certificates?page=${currentPage}&per_page=${perPage}`;
                if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
                if (selectedCourse !== 'all') url += `&course_id=${selectedCourse}`;

                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        const certificatesList = document.getElementById('certificatesList');
                        certificatesList.innerHTML = data.data.map(cert => `
                    <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                        <div class="flex justify-between items-center">
                            <div>
                                <h3 class="font-bold text-lg">${cert.name}</h3>
                                <p class="text-gray-600">${cert.course.name}</p>
                                <p class="text-sm text-gray-500">Sertifikat raqami: ${cert.certificate_number}</p>
                            </div>
                            <a href="/certificates/${cert.id}/download"
                               class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                                Yuklab olish
                            </a>
                        </div>
                    </div>
                `).join('');

                        // Update pagination
                        updatePagination(data.meta);
                    });
            }

            // Update pagination
            function updatePagination(meta) {
                const pagination = document.getElementById('pagination');
                let html = '';

                if (meta.last_page > 1) {
                    html += '<div class="flex space-x-1">';

                    // Previous button
                    html += `<button onclick="changePage(${meta.current_page - 1})"
                    ${meta.current_page === 1 ? 'disabled' : ''}
                    class="px-3 py-1 rounded ${meta.current_page === 1 ? 'bg-gray-200 text-gray-400' : 'bg-white hover:bg-gray-100'}">
                    &laquo;
                </button>`;

                    // Page numbers
                    for (let i = 1; i <= meta.last_page; i++) {
                        html += `<button onclick="changePage(${i})"
                        class="px-3 py-1 rounded ${meta.current_page === i ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}">
                        ${i}
                    </button>`;
                    }

                    // Next button
                    html += `<button onclick="changePage(${meta.current_page + 1})"
                    ${meta.current_page === meta.last_page ? 'disabled' : ''}
                    class="px-3 py-1 rounded ${meta.current_page === meta.last_page ? 'bg-gray-200 text-gray-400' : 'bg-white hover:bg-gray-100'}">
                    &raquo;
                </button>`;

                    html += '</div>';
                }

                pagination.innerHTML = html;
            }

            // Global function for pagination
            window.changePage = function(page) {
                if (page < 1 || page > document.querySelectorAll('#pagination button').length - 2) return;
                currentPage = page;
                loadCertificates();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            // Event listeners
            document.getElementById('searchInput').addEventListener('input', (e) => {
                searchQuery = e.target.value;
                currentPage = 1;
                clearTimeout(window.searchTimeout);
                window.searchTimeout = setTimeout(loadCertificates, 500);
            });

            document.getElementById('perPageSelect').addEventListener('change', (e) => {
                perPage = e.target.value;
                currentPage = 1;
                loadCertificates();
            });

            // Initial load
            loadCourses();
            loadCertificates();
        });
    </script>
@endsection
