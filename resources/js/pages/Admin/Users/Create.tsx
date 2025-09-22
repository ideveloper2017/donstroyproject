import AdminLayout from '@/Layouts/AdminLayout';
import UserForm from './UserForm';

type CreateUserPageProps = {
  roles: Array<{ id: number; name: string }>;
};

export default function CreateUserPage({ roles }: CreateUserPageProps) {
  return (
    <AdminLayout title="Create User">
      <div className="max-w-2xl mx-auto">
        <UserForm roles={roles} />
      </div>
    </AdminLayout>
  );
}
