<?php

namespace Tests\Unit;

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserRolePermissionTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create roles and permissions for testing
        $this->adminRole = Role::create(['name' => 'admin']);
        $this->userRole = Role::create(['name' => 'user']);
        
        $this->createUserPermission = Permission::create(['name' => 'create users']);
        $this->editUserPermission = Permission::create(['name' => 'edit users']);
        
        $this->adminRole->givePermissionTo([$this->createUserPermission, $this->editUserPermission]);
    }

    /** @test */
    public function it_can_assign_roles_to_users()
    {
        $user = User::factory()->create();
        
        $user->assignRole('admin');
        
        $this->assertTrue($user->hasRole('admin'));
        $this->assertFalse($user->hasRole('user'));
    }

    /** @test */
    public function it_can_check_if_user_has_permission()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        
        $this->assertTrue($user->hasPermissionTo('create users'));
        $this->assertTrue($user->hasPermissionTo('edit users'));
    }

    /** @test */
    public function it_can_assign_permissions_to_roles()
    {
        $this->assertTrue($this->adminRole->hasPermissionTo('create users'));
        $this->assertTrue($this->adminRole->hasPermissionTo('edit users'));
        
        $this->assertFalse($this->userRole->hasPermissionTo('create users'));
    }

    /** @test */
    public function it_can_sync_roles()
    {
        $user = User::factory()->create();
        
        $user->assignRole('admin');
        $this->assertTrue($user->hasRole('admin'));
        
        $user->syncRoles(['user']);
        $this->assertFalse($user->hasRole('admin'));
        $this->assertTrue($user->hasRole('user'));
    }

    /** @test */
    public function it_can_revoke_roles()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        
        $this->assertTrue($user->hasRole('admin'));
        
        $user->removeRole('admin');
        $this->assertFalse($user->hasRole('admin'));
    }

    /** @test */
    public function it_can_check_permissions_through_roles()
    {
        $user = User::factory()->create();
        $user->assignRole('admin');
        
        $this->assertTrue($user->can('create users'));
        $this->assertTrue($user->can('edit users'));
        
        // Test with a user that has no permissions
        $regularUser = User::factory()->create();
        $regularUser->assignRole('user');
        
        $this->assertFalse($regularUser->can('create users'));
        $this->assertFalse($regularUser->can('edit users'));
    }
}
