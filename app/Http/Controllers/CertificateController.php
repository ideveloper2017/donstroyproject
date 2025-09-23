<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificateController extends Controller
{
    public function show($certificateNumber)
    {
        $student = Student::where('certificate_number', $certificateNumber)
            ->with('course')
            ->firstOrFail();

        return view('certificate.template2', compact('student'));
    }

    public function download($certificateNumber)
    {
        $student = Student::where('certificate_number', $certificateNumber)
            ->with('course')
            ->firstOrFail();

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('certificate.template', compact('student'));

        return $pdf->download("certificate-{$certificateNumber}.pdf");
    }
}
