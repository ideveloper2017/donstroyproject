import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, Download, Edit, Printer, QrCode } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  certificate_number: string;
  certificate_date: string;
  certificate_url: string;
  qr_code: string;
  hour: string;
  level: string;
  control: string;
  passport: string;
  course: {
    id: number;
    name: string;
    teacher: string;
  };
  created_at: string;
  updated_at: string;
}

interface Props {
  student: Student;
}

export default function ShowStudent({ student }: Props) {
  const handlePrint = () => {
    window.open(`/certificate/${student.certificate_number}`, '_blank');
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = `/storage/${student.qr_code}`;
    link.download = `qr-code-${student.certificate_number}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Orqaga qaytish
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Sertifikatni chop etish
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadQR}
              title="Download QR Code"
            >
              <QrCode className="h-4 w-4" />
            </Button>
            <Link href={`/admin/students/${student.id}/edit`}>
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Tinlovchi ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">To'liq ismi</p>
                  <p className="font-medium">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pasport/ID raqami</p>
                  <p className="font-medium">{student.passport || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sertifikat raqami</p>
                  <p className="font-mono">{student.certificate_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Berilgan sana</p>
                  <p className="font-medium">
                    {student.certificate_date
                      ? format(new Date(student.certificate_date), 'PP')
                      : '-'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-3">Kurs tafsilotlari</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kurs nomi</p>
                    <p className="font-medium">{student.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">O'qituvchi</p>
                    <p className="font-medium">{student.control}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Davomiyligi</p>
                    <p className="font-medium">{student.hour || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Darajasi</p>
                    <p className="font-medium">{student.level || '-'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sertifikat QR kodi</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {student.qr_code ? (
                  <div className="p-4 border rounded-lg">
                    <img
                      src={`${student.qr_code}`}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                    <p className="mt-2 text-center text-xs text-gray-500">
                      Sertifikatni tekshirish uchun skan qiling
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">QR kodi yaratilmagan</p>
                )}
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={handleDownloadQR}
                  disabled={!student.qr_code}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sertifikat havolasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm break-all">
                    {window.location.origin}/certificate/{student.certificate_number}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/certificate/${student.certificate_number}`
                    );
                    toast.success('Link copied to clipboard');
                  }}
                >
                  Havolani nusxalash
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
