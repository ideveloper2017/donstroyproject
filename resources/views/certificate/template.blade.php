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
            font-family: 'Montserrat', sans-serif;
        }

        .certificate {
            position: relative;
            width: 1200px;
            height: 850px;
            margin: 20px auto;
            background: url("{{ asset('certificate.png') }}") no-repeat center;
            background-size: cover;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border: 2px solid #b8860b;
            border-radius: 10px;
        }

        .field {
            position: absolute;
            text-align: center;
            /*font-weight: 600;*/
            color: #111;
        }
        .uzbekistan {
            top: 150px;
            left:540px;
            width: 40%;
            font-size: 26px;
        }

        .certificate-number {
            top: 380px;
            left: 180px;
            width: 100%;
            font-size: 18px;
        }

        .student-name {
            top: 410px;
            left: 190px;
            width: 100%;
            font-size: 28px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .course-text {
            top: 450px;
            left: 280px;
            width: 900px;
            font-size: 16px;
            line-height: 1.5;
        }

        .level {
            top: 570px;
            left: 150px;
            width: 100%;
            font-size: 20px;
        }

        .dates {
            top: 730px;
            left: 110px;
            width: 100%;
            font-size: 16px;
        }

        .signature {
            position: absolute;
            bottom: 80px;
            left: 300px;
            width: 250px;
            text-align: center;
        }

        .signature .line {
            width: 150px;
            border-top: 2px solid #000;
            margin: 25px auto 10px;
        }

        .signature p {
            margin: 3px 0;
            font-size: 14px;
            font-weight: 600;
        }

        .qr-code {
            position: absolute;
            bottom:25px;
            right: 50px;
            text-align: center;
        }

        .qr-code img {
            width: 120px;
            height: 120px;
            background: #fff;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 8px;
        }

        .qr-code p {
            margin-top: 5px;
            font-size: 12px;
            color: #444;
        }
    </style>
</head>
<body>
<div class="certificate">
    @php
    $uzbekistan="O`ZBEKISTON RESPUBLIKASI OLIY TA`LIM, FAN VA INNOVATSIYALAR VAZIRLIGI";
    $certificateNumber = $student->certificate_number ?? '0969';
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
    $qrCodePath = asset('storage/' . ($student->qr_code ?? 'qrcodes/sample.png'));
@endphp

    <div class="field uzbekistan">
        {{ $uzbekistan }}
    </div>
    <div class="field certificate-number">
        №: {{ $certificateNumber }}
    </div>

    <div class="field student-name">
        {{ $studentName }}
    </div>

    <div class="field course-text">
        "{{ $companyName }} MCHJ" ning kadrlar malakasini oshirish bo'limida <br>
        <strong>{{ $courseName }}</strong> <br>
        bo'yicha {{ $hours }} soatlik sohaviy mavzularni o'qidi, yakuniy baholashni ijobiy topshirganligi uchun<br/>
        "<strong>{{ $controlType }}</strong>" bo'yicha sertifikat berildi.
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
{{--        <div class="line"></div>--}}
        <p>{{ $directorName }}</p>
        <p class="director-title">{{ $directorTitle }}</p>
    </div>

    <!-- QR Code -->
    <div class="qr-code">
        <img src="{{ $qrCodePath }}" alt="QR Code">
        <p>QR kod orqali tekshiring</p>
    </div>
</div>
</body>
</html>
