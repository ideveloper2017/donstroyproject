<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class CertificateController extends Controller
{
    /**
     * Display a listing of the certificates.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Certificate::with(['student', 'course']);

        // Search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('certificate_number', 'like', "%{$search}%")
                  ->orWhereHas('student', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('course', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Category filter
        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('course', function($q) use ($request) {
                $q->where('category', $request->category);
            });
        }

        $certificates = $query->latest()->paginate(15);

        return response()->json($certificates);
    }

    /**
     * Store a newly created certificate in storage.
     */
    public function store(StoreCertificateRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['certificate_number'] = (new Certificate())->generateCertificateNumber();
        $data['verification_token'] = Str::uuid();
        
        $certificate = Certificate::create($data);
        
        return response()->json([
            'message' => 'Certificate created successfully',
            'data' => $certificate->load(['student', 'course'])
        ], 201);
    }

    /**
     * Display the specified certificate.
     */
    public function show(Certificate $certificate): JsonResponse
    {
        return response()->json($certificate->load(['student', 'course']));
    }

    /**
     * Verify a certificate by its number.
     */
    public function verify(string $certificateNumber): JsonResponse
    {
        $certificate = Certificate::where('certificate_number', $certificateNumber)
            ->with(['student', 'course'])
            ->firstOrFail();

        return response()->json([
            'valid' => true,
            'data' => $certificate,
            'status' => $certificate->isExpired() ? 'expired' : 'valid'
        ]);
    }

    /**
     * Download the certificate as PDF.
     */
    public function download(Certificate $certificate)
    {
        $pdf = Pdf::loadView('certificate.template', [
            'certificate' => $certificate->load(['student', 'course'])
        ]);

        return $pdf->download("certificate-{$certificate->certificate_number}.pdf");
    }

    /**
     * Remove the specified certificate from storage.
     */
    public function destroy(Certificate $certificate): JsonResponse
    {
        $certificate->delete();
        
        return response()->json([
            'message' => 'Certificate deleted successfully'
        ]);
    }
}
