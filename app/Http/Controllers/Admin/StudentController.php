<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Course;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelHigh;
use Endroid\QrCode\Label\Alignment\LabelAlignmentCenter;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\Label\Font\OpenSans;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\RoundBlockSizeMode\RoundBlockSizeModeMargin;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManager;


class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::with('course')
            ->latest()
            ->paginate(10)
            ->through(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'certificate_number' => $student->certificate_number,
                    'certificate_date' => $student->certificate_date,
                    'course' => $student->course ? [
                        'id' => $student->course->id,
                        'name' => $student->course->name,
                    ] : null,
                ];
            });

        return Inertia::render('Admin/Students/Index', [
            'students' => array_merge($students->toArray(), [
                'data' => $students->items(),
            ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('Admin/Students/Form', [
            'courses' => $courses,
            'isEdit' => false,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'certificate_number' => 'nullable|string|unique:students',
            'certificate_date' => 'nullable|date',
            'hour' => 'nullable|string',
            'level' => 'nullable|string',
            'control' => 'nullable|string',
            'passport' => 'nullable|string|max:255',
        ]);

        $latest=Student::latest()->first();
        $monthYear = date('mY');
        // Generate certificate number if not provided
        if (empty($validated['certificate_number'])) {
            $validated['certificate_number'] = $latest
                ?  ((int) $latest->certificate_number + 1)
                :1;
          //  $validated['certificate_number'] = date('dmY')+((int)($latest->certificate_number)+1);
        }

        $certificateData = [
            'student_name' => '...',
            'certificate_number' => '...',
            'date' => '...',
            'course' => '...',
            'level' => '...',
            'qr_code' => 'path/to/qrcode.png'
        ];

        // Generate QR Code with Builder
        $builder = new Builder(
            writer: new PngWriter(),
            writerOptions: [],
            validateResult: false,
            data: env('APP_URL').'/certificate/'.$validated['certificate_number'],
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            //logoPath: __DIR__.'/assets/bender.png',
            logoResizeToWidth: 50,
            logoPunchoutBackground: true,
            labelText: 'Don Stroy project',
            labelFont: new OpenSans(20),
            labelAlignment: LabelAlignment::Center
        );

        $result = $builder->build();
        $qrCodePath = 'qrcodes/' . $validated['certificate_number'] . '.png';
        $result->saveToFile(storage_path('app/public/' . $qrCodePath));
        $validated['qr_code'] = $qrCodePath;

        // Generate certificate URL
       // $validated['certificate_url'] = route('certificate.show', ['certificate' => $validated['certificate_number']]);

        $student = Student::create($validated);

        //$this->generateCertificate($student);
        return redirect()->route('admin.students.index')
            ->with('success', 'Student created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return Inertia::render('Admin/Students/Show', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'course' => $student->course ? $student->course->name : null,
                'course_id' => $student->course_id,
                'certificate_number' => $student->certificate_number,
                'certificate_date' => $student->certificate_date,
                'hour' => $student->hour,
                'level' => $student->level,
                'control' => $student->control,
                'passport' => $student->passport,
                'qr_code' => $student->qr_code ? asset('storage/' . $student->qr_code) : null,
                'certificate_url' => $student->certificate_url,
                'created_at' => $student->created_at->format('Y-m-d H:i:s'),
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        $courses = Course::select('id', 'name')->get();

        return Inertia::render('Admin/Students/Form', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'course_id' => $student->course_id,
                'certificate_number' => $student->certificate_number,
                'certificate_date' => $student->certificate_date,
                'hour' => $student->hour,
                'level' => $student->level,
                'control' => $student->control,
                'passport' => $student->passport,
            ],
            'courses' => $courses,
            'isEdit' => true,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'certificate_number' => 'nullable|string|unique:students,certificate_number,' . $student->id,
            'certificate_date' => 'nullable|date',
            'hour' => 'nullable|string',
            'level' => 'nullable|string',
            'control' => 'nullable|string',
            'passport' => 'nullable|string|max:255',
        ]);
        $latest=Student::latest()->first();
        $monthYear = date('mY');
        // Generate certificate number if not provided

        if (empty($validated['certificate_number'])) {
            $validated['certificate_number'] = $latest
                ?  ((int) $latest->certificate_number + 1)
                :  1;
            //  $validated['certificate_number'] = date('dmY')+((int)($latest->certificate_number)+1);
        }
        // Delete old QR code if exists
        if ($student->qr_code) {
            Storage::disk('public')->delete($student->qr_code);
        }

        $builder = new Builder(
            writer: new PngWriter(),
            writerOptions: [],
            validateResult: false,
            data: env('APP_URL').'/certificate/'.$validated['certificate_number'],
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 10,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            //logoPath: __DIR__.'/assets/bender.png',
            logoResizeToWidth: 50,
            logoPunchoutBackground: true,
            labelText: 'Don Stroy project',
            labelFont: new OpenSans(20),
            labelAlignment: LabelAlignment::Center
        );

        $result = $builder->build();
        $qrCodePath = 'qrcodes/' . uniqid('qr_', true) . '.png';
        $result->saveToFile(storage_path('app/public/' . $qrCodePath));
        $validated['qr_code'] = $qrCodePath;

        $student->update($validated);

        return redirect()->route('admin.students.index')
            ->with('success', 'Student updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        // Delete QR code file
        if ($student->qr_code) {
            Storage::disk('public')->delete($student->qr_code);
        }

        $student->delete();

        return redirect()->route('admin.students.index')
            ->with('success', 'Student deleted successfully');
    }

    /**
     * Display the certificate for a student
     */
    public function showCertificate($certificateNumber)
    {
        $student = Student::with('course')
            ->where('certificate_number', $certificateNumber)
            ->firstOrFail();

        return Inertia::render('Certificate/Show', [
            'student' => [
                'name' => $student->name,
                'certificate_number' => $student->certificate_number,
                'certificate_date' => $student->certificate_date,
                'hour' => $student->hour,
                'level' => $student->level,
                'qr_code' => $student->qr_code ? asset('storage/' . $student->qr_code) : null,
            ],
            'course' => $student->course ? [
                'name' => $student->course->name,
                'description' => $student->course->description,
            ] : null,
        ]);
    }

    public function generateCertificate(Student $student)
    {
        // Ensure the certificates directory exists
        $certificateDir = public_path('certificates/generated');
        if (!file_exists($certificateDir)) {
            mkdir($certificateDir, 0755, true);
        }

        // Get course name
        $courseName = $student->course ? $student->course->name : 'Professional Development';
        // Sertifikat raqami va sanalar
        $certificateNumber = uniqid("№");
        $issueDate = now()->format('d/m/Y');
        $expiryDate = now()->addYears(3)->format('d/m/Y');
        // Create a unique filename
        $fileName = 'certificate_' . $student->id . '_' . time() . '.png';
        $filePath = $certificateDir . '/' . $fileName;

        $manager = new ImageManager(new \Intervention\Image\Drivers\Gd\Driver()); // yoki Imagick

        // Sertifikat shablonini yuklash
        $image = $manager->read(public_path('certificate.png'));

        // Foydalanuvchi ismi yozuvi
        $image->text($student->name, 480, 250, function ($font) {
            $font->filename(public_path('fonts/arial.ttf'));
            $font->size(28);
            $font->color('#000000');
            $font->align('center');
        });

        // Kurs nomi
        $image->text($courseName, 480, 300, function ($font) {
            $font->filename(public_path('fonts/arial.ttf'));
            $font->size(22);
            $font->color('#000000');
            $font->align('center');
        });



        // Raqam
        $image->text($certificateNumber, 480, 220, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(22);
            $font->color('#000000');
            $font->align('center');
        });

        // ISM FAMILYA
        $image->text($name, 480, 270, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(28);
            $font->color('#000000');
            $font->align('center');
        });

        // Kurs nomi
        $image->text($course, 480, 310, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(24);
            $font->color('#000000');
            $font->align('center');
        });

        // Yo‘nalish
        $image->text("Yo'nalish: $specialty", 480, 350, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(20);
            $font->color('#000000');
            $font->align('center');
        });

        // Soat
        $image->text("Davomiyligi: $hours", 480, 380, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(20);
            $font->color('#000000');
            $font->align('center');
        });

        // Daraja
        $image->text("Darajasi: $level", 480, 410, function ($font) use ($fontPath) {
            $font->filename($fontPath);
            $font->size(20);
            $font->color('#000000');
            $font->align('center');
        });

        // Saqlash
        $filename = 'certificate_' . time() . '.png';
        $savePath = public_path('certificates/generated/' . $filename);
        $image->save($savePath);
        // Sertifikatni saqlash
        $filename = 'certificate_' . time() . '.png';
        $image->save(public_path('certificates/' . $filename));

        return response()->download(public_path('certificates/' . $filename));
    }
}
