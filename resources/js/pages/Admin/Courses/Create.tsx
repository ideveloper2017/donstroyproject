import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CourseForm from './Form';

export default function CreateCourse() {
  return (
    <AdminLayout>
      <Head title="Create Course" />
      <div className="container mx-auto py-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <CourseForm />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
