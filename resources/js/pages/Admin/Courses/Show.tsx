import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';

type Course = {
  id: number;
  name: string;
  description: string;
  teacher: string;
  images: string[];
  created_at: string;
  updated_at: string;
};

type Props = {
  course: Course;
};

export default function ShowCourse({ course }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    router.delete(`/admin/courses/${course.id}`, {
      onSuccess: () => {
        toast.success('Kurs muvaffaqiyatli o\'chirildi');
      },
      onError: () => {
        toast.error('Kursni o\'chirishda xatolik yuz berdi');
      },
    });
  };

  return (
    <AdminLayout>
      <Head title={course.name} />
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kurslar ro'yxatiga qaytish
            </Link>
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/admin/courses/${course.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Tahrirlash
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              O'chirish
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{course.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Yaratilgan sana: {new Date(course.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Tavsif</h3>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {course.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">O'qituvchi</h3>
                    <p className="text-muted-foreground">{course.teacher}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kurs rasmlari</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {course.images && course.images.length > 0 ? (
                    course.images.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={image.startsWith('http') ? image : `${image}`}
                          alt={`${course.name} - ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex h-32 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                      Rasm yuklanmagan
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kurs ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yaratilgan sana</span>
                  <span>{new Date(course.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Oxirgi yangilanish</span>
                  <span>{new Date(course.updated_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ishonchingiz komilmi?</DialogTitle>
            <DialogDescription>
              "{course.name}" kursi va unga tegishli barcha ma'lumotlar o'chirib tashlanadi.
              Bu amalni qaytarib bo'lmaydi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Bekor qilish
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
Kursni o'chirish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
