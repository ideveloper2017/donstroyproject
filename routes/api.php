<?php

use App\Http\Controllers\Api\CertificateController;
use App\Http\Controllers\RolePermissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes (if any)

// User authentication routes (public)
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);

// Certificate routes (public)
Route::prefix('certificates')->group(function () {
    Route::get('/', [CertificateController::class, 'index']);
    Route::get('/verify/{certificateNumber}', [CertificateController::class, 'verify']);

    // Protected routes (require authentication)
//    Route::middleware(['auth:sanctum'])->group(function () {
//        Route::post('/', [CertificateController::class, 'store']);
        Route::get('/{certificate}', [CertificateController::class, 'show']);
        Route::get('/{certificate}/download', [CertificateController::class, 'download']);
        Route::delete('/{certificate}', [CertificateController::class, 'destroy']);
//    });
});
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

// Protected routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Role management
    Route::prefix('roles')->group(function () {
        Route::get('/', [RolePermissionController::class, 'index']);
        Route::post('/', [RolePermissionController::class, 'storeRole']);
        Route::put('/{id}', [RolePermissionController::class, 'updateRole']);
        Route::delete('/{id}', [RolePermissionController::class, 'destroyRole']);
    });

    // Permission management
    Route::prefix('permissions')->group(function () {
        Route::get('/', [RolePermissionController::class, 'permissions']);
        Route::post('/', [RolePermissionController::class, 'storePermission']);
    });

    // User management
    Route::apiResource('users', \App\Http\Controllers\UserController::class);

    // User role assignment
    Route::post('/users/{userId}/assign-role', [RolePermissionController::class, 'assignRoleToUser']);
});
