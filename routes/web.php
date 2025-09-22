<?php

use App\Http\Controllers\CertificateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Certificate Routes
Route::get('/certificate/{certificateNumber}', [CertificateController::class, 'show'])
    ->name('certificate.show');

Route::get('/certificate/{certificateNumber}/download', [CertificateController::class, 'download'])
    ->name('certificate.download');

// Auth routes
require __DIR__.'/auth.php';

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard
//    Route::get('/admin/dashboard', function () {
//        return Inertia::render('dashboard');
//    })->name('dashboard');

    // Admin routes
    require __DIR__.'/admin.php';
    require __DIR__.'/courses.php';
    require __DIR__.'/students.php';
});

// Settings routes (requires auth)
require __DIR__.'/settings.php';
