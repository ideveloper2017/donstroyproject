<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCertificateRequest;
use App\Http\Requests\UpdateCertificateRequest;
use App\Models\Student;
use Carbon\Carbon;
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
        $query = Student::with(['course']);

        // Search filter
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('certificate_number', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
//                  ->orWhereHas('student', function($q) use ($search) {
//                      $q->where('name', 'like', "%{$search}%");
//                  })
                  ->orWhereHas('course', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Category filter
        if ($request->has('category') && $request->category !== '0') {
            $query->whereHas('course', function($q) use ($request) {
                $q->where('id', $request->category);
            });
        }

        $perPage = $request->input('per_page', 10); // Default to 10 items per page
        $certificates = $query->with(['course'])->paginate($perPage);

        return response()->json([
            'data' => $certificates->items(),
            'meta' => [
                'current_page' => $certificates->currentPage(),
                'last_page' => $certificates->lastPage(),
                'per_page' => $certificates->perPage(),
                'total' => $certificates->total(),
                'from' => $certificates->firstItem(),
                'to' => $certificates->lastItem(),
            ]
        ]);
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

    public function download($certificateNumber)
    {
        $certificate = Student::with('course')
            ->where('certificate_number', $certificateNumber)
            ->firstOrFail();

        $pdf = Pdf::loadView('certificate.template', [
            'student' => $certificate
        ])->setPaper('a4', 'landscape');

        $filename = "certificate-{$certificate->certificate_number}.pdf";
        return $pdf->download($filename);
    }
//    public function download(Student $certificate)
//    {
//        dd($certificate->certificate_number);
//        $pdf = Pdf::loadView('certificate.template', [
//            'student' => $certificate->load(['course'])
//        ]);
//
//        $pdf->setPaper('a4', 'landscape');
//        $filename = "certificate-{$certificate->certificate_number}.pdf";
//        return $pdf->download($filename);
//    }

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
