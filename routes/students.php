<?php

use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\StudentController;

Route::middleware(['auth:sanctum', 'verified', AdminMiddleware::class])
    ->prefix('admin/students')
    ->name('admin.students.')
    ->group(function () {
        Route::get('/', [StudentController::class, 'index'])->name('index');
        Route::get('/create', [StudentController::class, 'create'])->name('create');
        Route::post('/', [StudentController::class, 'store'])->name('store');
        Route::get('/{student}', [StudentController::class, 'show'])->name('show');
        Route::get('/{student}/edit', [StudentController::class, 'edit'])->name('edit');
        Route::put('/{student}', [StudentController::class, 'update'])->name('update');
        Route::delete('/{student}', [StudentController::class, 'destroy'])->name('destroy');
        Route::get('/export', [StudentController::class, 'export'])->name('export');
    });

// Public certificate route (outside auth middleware for public access)
Route::get('/certificate/{certificate}', [StudentController::class, 'showCertificate'])
    ->name('certificate.show');
