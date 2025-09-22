<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RolePermissionController extends Controller
{
    // List all roles with their permissions
    public function index()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
        
        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    // Create a new role with permissions
    public function storeRole(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();
            
            $role = Role::create(['name' => $request->name, 'guard_name' => 'web']);
            
            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }
            
            DB::commit();
            
            return response()->json([
                'message' => 'Role created successfully',
                'role' => $role->load('permissions')
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error creating role: ' . $e->getMessage()], 500);
        }
    }

    // Update a role and its permissions
    public function updateRole(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'string',
                Rule::unique('roles', 'name')->ignore($role->id)
            ],
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();
            
            $role->update(['name' => $request->name]);
            
            if ($request->has('permissions')) {
                $role->syncPermissions($request->permissions);
            }
            
            DB::commit();
            
            return response()->json([
                'message' => 'Role updated successfully',
                'role' => $role->load('permissions')
            ]);
            
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Error updating role: ' . $e->getMessage()], 500);
        }
    }

    // Delete a role
    public function destroyRole($id)
    {
        try {
            $role = Role::findOrFail($id);
            
            // Prevent deletion of admin role
            if ($role->name === 'admin') {
                return response()->json(['message' => 'Cannot delete admin role'], 403);
            }
            
            $role->delete();
            
            return response()->json(['message' => 'Role deleted successfully']);
            
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting role: ' . $e->getMessage()], 500);
        }
    }
    
    // List all permissions
    public function permissions()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }
    
    // Create a new permission
    public function storePermission(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:permissions,name'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $permission = Permission::create(['name' => $request->name, 'guard_name' => 'web']);
        
        return response()->json([
            'message' => 'Permission created successfully',
            'permission' => $permission
        ], 201);
    }
    
    // Assign role to user
    public function assignRoleToUser(Request $request, $userId)
    {
        $validator = Validator::make($request->all(), [
            'role' => 'required|exists:roles,name'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $user = \App\Models\User::findOrFail($userId);
        $user->syncRoles([$request->role]);
        
        return response()->json([
            'message' => 'Role assigned successfully',
            'user' => $user->load('roles')
        ]);
    }
}
