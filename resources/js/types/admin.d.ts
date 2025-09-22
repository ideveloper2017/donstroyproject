import { PageProps } from '@inertiajs/core';

declare global {
  // Extend the Window interface to include any global variables
  interface Window {
    // Add any global variables here
  }

  // User type
  interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles?: Array<{
      id: number;
      name: string;
      permissions?: Array<{
        id: number;
        name: string;
      }>;
    }>;
    permissions?: Array<{
      id: number;
      name: string;
    }>;
  }

  // Role type
  interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Array<{
      id: number;
      name: string;
    }>;
    users_count?: number;
  }

  // Permission type
  interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
  }

  // Pagination types
  interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }

  interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }

  // Page props
  interface PagePropsExtended extends PageProps {
    auth: {
      user: User;
    };
    flash: {
      success?: string;
      error?: string;
      warning?: string;
      info?: string;
    };
  }

  // Admin page props
  interface AdminPageProps extends PagePropsExtended {
    // Add any admin-specific page props here
  }

  // Users page props
  interface UsersPageProps extends AdminPageProps {
    users: PaginatedData<User>;
    roles: Array<{
      id: number;
      name: string;
    }>;
  }

  // Roles page props
  interface RolesPageProps extends AdminPageProps {
    roles: PaginatedData<Role>;
    permissions: Permission[];
  }

  // Create/Edit User page props
  interface UserFormPageProps extends AdminPageProps {
    user?: User;
    roles: Array<{
      id: number;
      name: string;
    }>;
  }

  // Create/Edit Role page props
  interface RoleFormPageProps extends AdminPageProps {
    role?: Role;
    permissions: Permission[];
  }

  // Dashboard page props
  interface DashboardPageProps extends AdminPageProps {
    stats: {
      totalUsers: number;
      totalRoles: number;
      activeUsers: number;
      // Add more stats as needed
    };
  }
}

// This is important for TypeScript to recognize the global types
export {};
