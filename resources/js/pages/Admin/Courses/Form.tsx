import { router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, X } from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

type Course = {
  id?: number;
  name: string;
  description: string;
  teacher: string;
  images: string[];
};

type FormProps = {
  course?: Course;
};

export default function CourseForm({ course }: FormProps) {
  const { data, setData, post, put, processing, errors, reset } = useForm<Course>({
    name: course?.name || '',
    description: course?.description || '',
    teacher: course?.teacher || '',
    images: course?.images || [],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  useEffect(() => {
    // Set initial preview images if editing
    if (course?.images) {
      setPreviewImages(course.images.map(img =>
        img.startsWith('http') ? img : `/storage/${img}`
      ));
    }
  }, [course]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImageFiles = [...imageFiles];
    const newPreviews = [...previewImages];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast.error('Faqat rasm fayllarini yuklash mumkin');
        return;
      }

      newImageFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setImageFiles(newImageFiles);
    setPreviewImages(newPreviews);
  };

  const removeImage = (index: number) => {
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);

    const newFiles = [...imageFiles];
    newFiles.splice(index, 1);
    setImageFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('teacher', data.teacher);

    // Append new image files
    imageFiles.forEach((file) => {
      formData.append('images[]', file);
    });

    try {
      if (course?.id) {
        // For updates, we need to use POST with _method=PUT for Laravel
        formData.append('_method', 'PUT');
        await axios.post(`/admin/courses/${course.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
          }
        });

        toast.success('Kurs muvaffaqiyatli yangilandi');
        // Refresh the page to show updated data
        router.visit(`/admin/courses/${course.id}/edit`, { only: ['course'] });
      } else {
        // For new course
        await axios.post('/admin/courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
          }
        });

        toast.success('Kurs muvaffaqiyatli yaratildi');
        // Redirect to courses list
        router.visit('/admin/courses');
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.message ||
                         error.response?.data?.errors?.images?.[0] ||
                         'Kursni saqlashda xatolik yuz berdi';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Kurs nomi</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Kurs nomini kiriting"
              className="mt-1"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <Label htmlFor="teacher">O'qituvchi</Label>
            <Input
              id="teacher"
              value={data.teacher}
              onChange={(e) => setData('teacher', e.target.value)}
              placeholder="O'qituvchi ismini kiriting"
              className="mt-1"
            />
            {errors.teacher && <p className="mt-1 text-sm text-red-500">{errors.teacher}</p>}
          </div>

          <div>
            <Label htmlFor="description">Tavsif</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Kurs haqida ma'lumot kiriting"
              rows={5}
              className="mt-1"
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
        </div>

        <div>
          <Label>Kurs rasmlari</Label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Ko'rish ${index + 1}`}
                  className="h-32 w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {previewImages.length < 5 && (
              <label
                htmlFor="images"
                className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <FileUp className="h-8 w-8 text-gray-400" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Maksimal 5 ta rasm yuklashingiz mumkin (PNG, JPG, JPEG)
                </p>
                <input
                  id="images"
                  name="images"
                  type="file"
                  className="sr-only"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Bekor qilish
        </Button>
        <Button type="submit" disabled={processing}>
          {course?.id ? 'Kursni yangilash' : 'Kurs yaratish'}
        </Button>
      </div>
    </form>
  );
}
