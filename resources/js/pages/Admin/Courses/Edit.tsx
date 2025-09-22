import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseForm from './Form';

type Course = {
  id: number;
  name: string;
  description: string;
  teacher: string;
  images: string[];
};

type Props = {
  course: Course;
};

export default function EditCourse({ course }: Props) {
  return (
    <AdminLayout>
      <Head title={`Edit ${course.name}`} />
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Edit Course: {course.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseForm course={course} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
