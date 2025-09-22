import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { PageProps } from '@/types';

type Student = {
  id: number;
  name: string;
  certificate_number: string;
  certificate_date: string;
  course: {
    id: number;
    name: string;
  };
};

type Props = {
  students: {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: any[];
    next_page_url: string | null;
    prev_page_url: string | null;
  };
};

const columns: ColumnDef<Student>[] = [
  {
    accessorKey: 'certificate_number',
    header: 'Sertifikat raqami',
  },
  {
    accessorKey: 'name',
    header: 'Tinlovchi ismi',
  },
  {
    accessorKey: 'course.name',
    header: 'Kurs',
  },
  {
    accessorKey: 'certificate_date',
    header: 'Berilgan sana',
    cell: ({ row }) => (
      <div>{row.original.certificate_date ? format(new Date(row.original.certificate_date), 'PP') : '-'}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.visit(`/admin/students/${row.original.id}`)}
        >
          Ko'rish
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.visit(`/admin/students/${row.original.id}/edit`)}
        >
          Tahrirlash
        </Button>
      </div>
    ),
  },
];

export default function StudentsIndex({ students }: Props) {
  const { auth } = usePage<PageProps>().props;

  return (
    <AdminLayout user={auth.user}>
      <div className="container mx-auto py-6 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Tinlovchilar</h1>
          <Link href="/admin/students/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tinlovchi qo'shish
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <DataTable
            columns={columns}
            data={students.data}
            pagination={{
              current_page: students.current_page,
              last_page: students.last_page,
              per_page: students.per_page,
              total: students.total,
              from: students.from,
              to: students.to,
              next_page_url: students.next_page_url,
              prev_page_url: students.prev_page_url,
            }}
            onPaginationChange={(pagination) => {
              router.visit(`/admin/students?page=${pagination.pageIndex + 1}`, {
                only: ['students'],
                preserveState: true,
                preserveScroll: true,
              });
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
