import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
  courses: {
    data: Course[];
    links: any[];
  };
};

export default function CoursesIndex({ courses }: Props) {
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = (course: Course) => {
    setCourseToDelete(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!courseToDelete) return;

    router.delete(`/admin/courses/${courseToDelete.id}`, {
      onSuccess: () => {
        toast.success('Course deleted successfully');
        setIsDeleteDialogOpen(false);
      },
      onError: () => {
        toast.error('Failed to delete course');
      },
    });
  };

  return (
    <AdminLayout>
      <Head title="Courses" />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Yo'nalishlar</h1>
        <Link href="/admin/courses/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yangi yo'nalish qo'shish
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Barcha yo'nalishlar</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rasm</TableHead>
                <TableHead>Yo'nalish nomi</TableHead>
                <TableHead>Uztozlar</TableHead>
                {/*<TableHead>Created At</TableHead>*/}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.data.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    {course.images && course.images.length > 0 ? (
                      <img
                        src={course.images[0].startsWith('http') ? course.images[0] : `${course.images[0]}`}
                        alt={course.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell>{course.teacher}</TableCell>
                  {/*<TableCell>{new Date(course.created_at).toLocaleDateString()}</TableCell>*/}
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link href={`/admin/courses/${course.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(course)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This will permanently delete the course "{courseToDelete?.name}" and all its associated data.
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
