import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Loader2, User, BookOpen, Hash, Clock, Award, FileText, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Course {
  id: number;
  name: string;
}

interface StudentFormProps {
  student?: {
    id?: number;
    name: string;
    course_id: number;
    certificate_number?: string;
    certificate_date?: string;
    hour?: string;
    level?: string;
    control?: string;
    passport?: string;
  };
  courses: Course[];
}

export default function StudentForm({ student, courses }: StudentFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: student?.name || '',
    course_id: student?.course_id || '',
    certificate_number: student?.certificate_number || '',
    certificate_date: student?.certificate_date || '',
    hour: student?.hour || '',
    level: student?.level || '',
    control: student?.control || '',
    passport: student?.passport || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (student?.id) {
      put(`/admin/students/${student.id}`, {
        onSuccess: () => {
          toast.success('Student updated successfully');
        },
      });
    } else {
      post('/admin/students', {
        onSuccess: () => {
          toast.success('Student created successfully');
        },
      });
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {student?.id ? 'Tinlovchini tahrirlash' : 'Yangi tinlovchi qo\'shish'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {student?.id
                ? 'Tinlovchi ma\'lumotlari va sertifikat tafsilotlarini yangilang.'
                : 'Yangi tinlovchini ro\'yxatdan o\'tkazish uchun quyidagi maydonlarni to\'ldiring.'}
            </p>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/10">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span>Tinlovchi ma'lumotlari</span>
            </CardTitle>
            <CardDescription>
              Tinlovchining shaxsiy va o'quv ma'lumotlarini kiriting
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    To'liq ismi <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="To'liq ism sharifingiz"
                      className="pl-9"
                      required
                    />
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Course */}
                <div className="space-y-2">
                  <Label htmlFor="course_id" className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    Kurs <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={data.course_id.toString()}
                    onValueChange={(value) => setData('course_id', parseInt(value))}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <BookOpen className="h-4 w-4 text-muted-foreground mr-2" />
                      <SelectValue placeholder="Kursni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                            {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.course_id && <p className="text-sm text-red-500">{errors.course_id}</p>}
                </div>

                {/* Certificate Number */}
                <div className="space-y-2">
                  <Label htmlFor="certificate_number" className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    Sertifikat raqami
                  </Label>
                  <div className="relative">
                    <Input
                      id="certificate_number"
                      value={data.certificate_number}
                      onChange={(e) => setData('certificate_number', e.target.value)}
                      placeholder="Bo'sh qoldirilsa, avtomatik yaratiladi"
                      className="pl-9"
                    />
                    <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.certificate_number && <p className="text-sm text-red-500">{errors.certificate_number}</p>}
                </div>

                {/* Certificate Date */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    Sertifikat sanasi
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal justify-start",
                          !data.certificate_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data.certificate_date ? (
                          format(new Date(data.certificate_date), "dd/MM/yyyy")
                        ) : (
                          <span>Sana tanlang</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={data.certificate_date ? new Date(data.certificate_date) : undefined}
                        onSelect={(date) => setData('certificate_date', date?.toISOString() || '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.certificate_date && <p className="text-sm text-red-500">{errors.certificate_date}</p>}
                </div>

                {/* Hours */}
                <div className="space-y-2">
                  <Label htmlFor="hour" className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Kurs soatlari
                  </Label>
                  <div className="relative">
                    <Input
                      id="hour"
                      type="number"
                      value={data.hour}
                      onChange={(e) => setData('hour', e.target.value)}
                      placeholder="e.g., 120"
                      className="pl-9"
                    />
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.hour && <p className="text-sm text-red-500">{errors.hour}</p>}
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <Label htmlFor="level" className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    Level
                  </Label>
                  <div className="relative">
                    <Input
                      id="level"
                      value={data.level}
                      onChange={(e) => setData('level', e.target.value)}
                      placeholder="e.g., Beginner, Intermediate, Advanced"
                      className="pl-9"
                    />
                    <Award className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.level && <p className="text-sm text-red-500">{errors.level}</p>}
                </div>

                {/* Control */}
                <div className="space-y-2">
                  <Label htmlFor="control" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Control
                  </Label>
                  <div className="relative">
                    <Input
                      id="control"
                      value={data.control}
                      onChange={(e) => setData('control', e.target.value)}
                      placeholder="Control number or code"
                      className="pl-9"
                    />
                    <FileText className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.control && <p className="text-sm text-red-500">{errors.control}</p>}
                </div>

                {/* Passport/ID */}
                <div className="space-y-2">
                  <Label htmlFor="passport" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    Pasport/ID raqami
                  </Label>
                  <div className="relative">
                    <Input
                      id="passport"
                      value={data.passport}
                      onChange={(e) => setData('passport', e.target.value)}
                      placeholder="Pasport yoki ID raqami"
                      className="pl-9"
                    />
                    <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                  {errors.passport && <p className="text-sm text-red-500">{errors.passport}</p>}
                </div>
              </div>
            </CardContent>

            <CardFooter className="bg-muted/20 px-6 py-4 flex justify-end gap-3 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                disabled={processing}
                className="min-w-[120px]"
              >
                Bekor qilish
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {student?.id ? 'Yangilanmoqda...' : 'Yaratilmoqda...'}
                  </>
                ) : student?.id ? (
                  'Tinlovchini yangilash'
                ) : (
                  'Tinlovchi qo\'shish'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AdminLayout>
  );
}
