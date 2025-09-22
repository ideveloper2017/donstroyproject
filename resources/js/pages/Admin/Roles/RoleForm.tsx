import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

type Permission = {
  id: number;
  name: string;
};

type RoleFormProps = {
  role?: {
    id?: number;
    name: string;
    permissions: Array<{ id: number; name: string }>;
  };
  permissions: Permission[];
  isEdit?: boolean;
};

export default function RoleForm({ role, permissions, isEdit = false }: RoleFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    name: role?.name || '',
    permissions: role?.permissions.map(p => p.id) || [],
  });

  const togglePermission = (permissionId: number) => {
    setData('permissions', 
      data.permissions.includes(permissionId)
        ? data.permissions.filter(id => id !== permissionId)
        : [...data.permissions, permissionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = isEdit && role?.id ? `/admin/roles/${role.id}` : '/admin/roles';
    const method = isEdit ? put : post;
    
    method(url, {
      onSuccess: () => {
        toast.success(`Role ${isEdit ? 'updated' : 'created'} successfully`);
      },
      onError: () => {
        toast.error(`Failed to ${isEdit ? 'update' : 'create'} role`);
      },
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Role' : 'Create New Role'}</CardTitle>
          <CardDescription>
            {isEdit 
              ? 'Update the role details and permissions below.'
              : 'Fill in the form below to create a new role with specific permissions.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Role Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="e.g., admin, editor, viewer"
              required
              disabled={role?.name === 'admin'}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {permissions.map((permission) => (
                <div 
                  key={permission.id} 
                  className={`flex items-center space-x-2 p-3 rounded-lg border ${
                    data.permissions.includes(permission.id)
                      ? 'bg-primary-50 border-primary-200' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  } cursor-pointer`}
                  onClick={() => togglePermission(permission.id)}
                >
                  <input
                    type="checkbox"
                    checked={data.permissions.includes(permission.id)}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    {permission.name}
                  </label>
                </div>
              ))}
            </div>
            {errors.permissions && (
              <p className="text-sm text-red-600">{errors.permissions}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={processing || (isEdit && role?.name === 'admin')}>
            {processing ? 'Saving...' : 'Save'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
