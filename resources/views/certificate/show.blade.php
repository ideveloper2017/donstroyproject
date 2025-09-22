<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Montserrat', sans-serif;
            color: #333;
            background-color: #f9f9f9;
        }
        
        .certificate-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            box-sizing: border-box;
        }
        
        .certificate {
            background-color: #fff;
            border: 20px solid #f0e6d2;
            padding: 3rem;
            position: relative;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        
        .certificate::before, .certificate::after {
            content: '';
            position: absolute;
            width: 100px;
            height: 100px;
            border: 2px solid #8b5a2b;
        }
        
        .certificate::before {
            top: 20px;
            left: 20px;
            border-right: none;
            border-bottom: none;
        }
        
        .certificate::after {
            bottom: 20px;
            right: 20px;
            border-left: none;
            border-top: none;
        }
        
        .header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            color: #2c3e50;
            margin: 0 0 0.5rem;
            letter-spacing: 2px;
        }
        
        .header p {
            font-size: 1.2rem;
            color: #7f8c8d;
            margin: 0;
        }
        
        .awarded-to {
            text-align: center;
            margin: 3rem 0;
        }
        
        .awarded-to h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            color: #2c3e50;
            margin: 0 0 1rem;
            font-weight: 400;
        }
        
        .awarded-to p {
            font-size: 1.2rem;
            margin: 0.5rem 0;
        }
        
        .course-details {
            text-align: center;
            margin: 3rem 0;
            line-height: 1.8;
        }
        
        .course-details p {
            margin: 0.5rem 0;
        }
        
        .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 1px solid #ddd;
        }
        
        .signature {
            text-align: center;
            width: 45%;
        }
        
        .signature-line {
            border-top: 1px solid #333;
            width: 200px;
            margin: 2rem auto 0.5rem;
            padding-top: 0.5rem;
        }
        
        .qr-code {
            position: absolute;
            bottom: 40px;
            left: 40px;
            width: 100px;
            height: 100px;
        }
        
        .certificate-number {
            position: absolute;
            bottom: 40px;
            right: 40px;
            font-size: 0.9rem;
            color: #7f8c8d;
        }
        
        @media print {
            body {
                background: none;
            }
            
            .no-print {
                display: none;
            }
            
            .certificate {
                border: 20px solid #f0e6d2;
                box-shadow: none;
                padding: 2rem;
            }
        }
        
        .print-button {
            display: block;
            width: 200px;
            margin: 2rem auto;
            padding: 0.8rem 1.5rem;
            background-color: #2c3e50;
            color: white;
            text-align: center;
            border-radius: 4px;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.3s;
        }
        
        .print-button:hover {
            background-color: #1a252f;
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="certificate">
            <div class="header">
                <h1>CERTIFICATE OF COMPLETION</h1>
                <p>This is to certify that</p>
            </div>
            
            <div class="awarded-to">
                <h2>{{ $student->name }}</h2>
                <p>has successfully completed the course</p>
            </div>
            
            <div class="course-details">
                <h3>{{ $course->name }}</h3>
                @if($student->level)
                    <p>Level: {{ $student->level }}</p>
                @endif
                @if($student->hour)
                    <p>Duration: {{ $student->hour }} hours</p>
                @endif
                <p>Instructor: {{ $course->teacher }}</p>
                @if($student->certificate_date)
                    <p>Date of Completion: {{ \Carbon\Carbon::parse($student->certificate_date)->format('F j, Y') }}</p>
                @endif
            </div>
            
            <div class="signatures">
                <div class="signature">
                    <div class="signature-line"></div>
                    <p>Instructor's Signature</p>
                </div>
                <div class="signature">
                    <div class="signature-line"></div>
                    <p>Director's Signature</p>
                </div>
            </div>
            
            @if($student->qr_code)
                <div class="qr-code">
                    <img src="{{ asset('storage/' . $student->qr_code) }}" alt="Verification QR Code" style="width: 100%; height: auto;">
                </div>
            @endif
            
            <div class="certificate-number">
                Certificate #: {{ $student->certificate_number }}
            </div>
        </div>
        
        <a href="#" onclick="window.print(); return false;" class="print-button no-print">Print Certificate</a>
    </div>
    
    <script>
        // Auto-print when the page loads (for direct access)
        window.onload = function() {
            // Only auto-print if this is a direct access (not from iframe)
            if (window.self === window.top) {
                window.print();
            }
        };
    </script>
</body>
</html>
