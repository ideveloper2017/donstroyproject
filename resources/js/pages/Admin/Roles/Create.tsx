import AdminLayout from '@/Layouts/AdminLayout';
import RoleForm from './RoleForm';

type CreateRolePageProps = {
  permissions: Array<{ id: number; name: string }>;
};

export default function CreateRolePage({ permissions }: CreateRolePageProps) {
  return (
    <AdminLayout title="Create Role">
      <div className="max-w-4xl mx-auto">
        <RoleForm permissions={permissions} />
      </div>
    </AdminLayout>
  );
}
