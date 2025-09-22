import AdminLayout from '@/Layouts/AdminLayout';
import UserForm from './UserForm';

type EditUserPageProps = {
  user: {
    id: number;
    name: string;
    email: string;
    roles: Array<{ id: number; name: string }>;
  };
  roles: Array<{ id: number; name: string }>;
};

export default function EditUserPage({ user, roles }: EditUserPageProps) {
  return (
    <AdminLayout title="Edit User">
      <div className="max-w-2xl mx-auto">
        <UserForm user={user} roles={roles} isEdit />
      </div>
    </AdminLayout>
  );
}
