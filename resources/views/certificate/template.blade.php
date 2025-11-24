<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background: #f0f0f0;
            /*font-family: 'Montserrat', sans-serif;*/
            transform: scale(0.9);
            transform-origin: top left;
        }

        .certificate {
            position: absolute;
            width: 1123px; /* A4 landscape */
            height: 794px; /* A4 landscape */
            margin: 0 auto;
            overflow: hidden;
            background: url("{{ public_path('certificate.png') }}") no-repeat center center;
            background-size: 100% 100%;
            border: 2px solid #b8860b;
            border-radius: 10px;
        }

        .certificate .bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; /* rasmni cho‘zib bo‘lmaydi */
            z-index: -1; /* yozuvlar ustida turadi */
        }

        .field {
            position: absolute;
            text-align: center;
            color: #111;
        }

        .uzbekistan {
            top: 130px;
            left: 500px;
            width: 40%;
            font-size: 26px;
        }

        .certificate-number {
            top: 350px;
            left: 180px;
            width: 100%;
            font-size: 18px;
        }

        .student-name {
            top: 370px;
            left: 190px;
            width: 100%;
            font-size: 28px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .course-text {
            top: 400px;
            left: 280px;
            width: 900px;
            font-size: 16px;
            line-height: 1.5;
        }

        .level {
            top: 500px;
            left: 150px;
            width: 100%;
            font-size: 20px;
        }

        .dates {
            top: 630px;
            left: 110px;
            width: 100%;
            font-size: 16px;
        }

        .signature {
            position: absolute;
            bottom: 120px;
            left: 300px;
            width: 250px;
            text-align: center;
        }

        .signature p {
            margin: 3px 0;
            font-size: 14px;
            font-weight: 600;
        }

        .qr-code {
            position: absolute;
            bottom: 50px; /* yuqoridan masofa */
            right: 50px; /* o‘ngdan masofa */
            width: 120px; /* element eni (markazlash uchun) */
            text-align: center; /* img va p markazda turadi */
        }

        .qr-code img {
            width: 100px;
            height: 100px;
            background: #fff;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 8px;
            display: block;
            margin: 0 auto; /* markazlash */
        }

        .qr-code p {
            margin-top: 5px;
            font-size: 12px;
            color: #444;
            text-align: center;
        }
    </style>
</head>
<body>
<div class="certificate">
    @php
        $uzbekistan="O`ZBEKISTON RESPUBLIKASI OLIY TA`LIM, FAN VA INNOVATSIYALAR VAZIRLIGI";
        $certificateNumber = $student->certificate_number;
        $studentName = strtoupper($student->name ?? 'JOHN DOE');
        $companyName = $student->company ?? 'DON STROY PROJECT';
        $courseName = strtoupper($student->course->name ?? 'ELEKTR QURILMALARINI MAZORAT KILISH KORSAKASINI OSHIRISH');
        $hours = $student->hour ?? '72';
        $controlType = $student->control ?? 'Ichki nazorat';
        $level = $student->level ?? '';

        if (isset($student->certificate_date)) {
            $issuedAt = \Carbon\Carbon::parse($student->certificate_date);
            $expiresAt = $issuedAt->copy()->addYears(3);
            $expiryDate = $expiresAt->format('d/m/Y');
            $issueDate = $issuedAt->format('d/m/Y');
        }
        $directorName = 'Muminov A.U.';
        $directorTitle = 'MCHJ direktori';

        // QR code path - FAYL YO‘LI bilan
        $qrCodePath = public_path('storage/' . ($student->qr_code ?? 'qrcodes/sample.png'));
//        $qrBase64 = '';
//        if (file_exists($qrPath)) {
//            $qrBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($qrPath));
//        }
    @endphp

    <div class="field uzbekistan">
        {{ $uzbekistan }}
    </div>
    <div class="field certificate-number">
        Sertifikat raqami: {{ $certificateNumber }}
    </div>

    <div class="field student-name">
        {{ $studentName }}
    </div>

    <div class="field course-text">
        "{{ $companyName }} MCHJ" ning kadrlar malakasini oshirish bo'limida <br>
        <strong>{{ $courseName }}</strong> <br>
        bo'yicha {{ $hours }} soatlik sohaviy mavzularni o'qidi, yakuniy baholashni ijobiy topshirganligi uchun<br />
        {!! $controlType
? '<strong>' . $controlType . '</strong> bo‘yicha sertifikat berildi.'
: 'sertifikat berildi.'
!!}
    </div>

    @if (!empty($level))
        <div class="field level">
            {{ $level }}-Daraja
        </div>
    @endif

    <div class="field dates">
        <strong>Amal qilish muddati</strong><br>
        {{ $issueDate }} – {{ $expiryDate }}
    </div>

    <!-- Imzo -->
    <div class="signature">
        <p>{{ $directorName }}</p>
        <p class="director-title">{{ $directorTitle }}</p>
    </div>

    <!-- QR Code -->
    {{--    @if($qrBase64)--}}
    <div class="qr-code">
        <img src="{{ $qrCodePath }}" alt="QR Code">
        <p>QR kod orqali tekshiring</p>
    </div>
    {{--    @endif--}}
</div>
</body>
</html>
