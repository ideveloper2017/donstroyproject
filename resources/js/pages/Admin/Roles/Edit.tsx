import AdminLayout from '@/Layouts/AdminLayout';
import RoleForm from './RoleForm';

type EditRolePageProps = {
  role: {
    id: number;
    name: string;
    permissions: Array<{ id: number; name: string }>;
  };
  permissions: Array<{ id: number; name: string }>;
};

export default function EditRolePage({ role, permissions }: EditRolePageProps) {
  return (
    <AdminLayout title="Edit Role">
      <div className="max-w-4xl mx-auto">
        <RoleForm role={role} permissions={permissions} isEdit />
      </div>
    </AdminLayout>
  );
}
