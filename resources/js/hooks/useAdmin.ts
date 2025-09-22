import { useState, useCallback, useRef, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import { toast } from 'sonner';
import { PageProps } from '@inertiajs/core';

// Types
type FormData = Record<string, any>;
type UseFormOptions = {
  onSuccess?: (data: any) => void;
  onError?: (errors: Record<string, string>) => void;
  preserveScroll?: boolean;
  preserveState?: boolean | number | string | (string | number)[];
  onFinish?: (response: any) => void;
};

export function useAdmin() {
  const { flash } = usePage<PageProps>().props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Show toast messages from flash
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.warning) {
      toast.warning(flash.warning);
    }
    if (flash?.info) {
      toast.info(flash.info);
    }
  }, [flash]);

  // Form submission handler
  const submit = useCallback(
    (method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, data: FormData, options: UseFormOptions = {}) => {
      const {
        onSuccess,
        onError,
        preserveScroll = true,
        preserveState = true,
        onFinish,
      } = options;

      setIsLoading(true);

      return new Promise((resolve) => {
        router[method](url, data, {
          preserveScroll,
          preserveState,
          onSuccess: (page) => {
            if (onSuccess) onSuccess(page);
            if (onFinish) onFinish(page);
            resolve(page);
          },
          onError: (errors) => {
            if (onError) onError(errors);
            resolve(errors);
          },
          onFinish: () => {
            setIsLoading(false);
          },
        });
      });
    },
    []
  );

  // Handle delete action
  const handleDelete = useCallback(
    (url: string, options: { onSuccess?: () => void; onError?: () => void } = {}) => {
      setIsDeleting(true);

      router.delete(url, {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Item deleted successfully');
          if (options.onSuccess) options.onSuccess();
        },
        onError: () => {
          toast.error('Failed to delete item');
          if (options.onError) options.onError();
        },
        onFinish: () => {
          setIsDeleting(false);
          closeModal();
        },
      });
    },
    []
  );

  // Modal handlers
  const openModal = useCallback((item: any = null) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Small delay to allow for animations to complete
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  // Confirmation dialog
  const confirmAction = useCallback(({ 
    title, 
    description, 
    onConfirm, 
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default'
  }: {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
  }) => {
    // This would be connected to a global dialog component
    // For now, we'll just use the browser's confirm dialog
    if (window.confirm(`${title}\n\n${description}`)) {
      onConfirm();
    } else if (onCancel) {
      onCancel();
    }
  }, []);

  // Format date
  const formatDate = useCallback((dateString: string | Date, options: Intl.DateTimeFormatOptions = {}) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(date);
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Check permissions
  const hasPermission = useCallback((permission: string): boolean => {
    const { auth } = usePage<PageProps>().props as any;
    const user = auth?.user;
    
    if (!user) return false;
    
    // Check direct permissions
    const hasDirectPermission = user.permissions?.some((p: any) => p.name === permission);
    if (hasDirectPermission) return true;
    
    // Check role permissions
    const hasRolePermission = user.roles?.some((role: any) => 
      role.permissions?.some((p: any) => p.name === permission)
    );
    
    return !!hasRolePermission;
  }, []);

  // Check if user has any of the given permissions
  const hasAnyPermission = useCallback((...permissions: string[]): boolean => {
    const { auth } = usePage<PageProps>().props as any;
    const user = auth?.user;
    
    if (!user) return false;
    
    // Check direct permissions
    const hasDirectPermission = user.permissions?.some((p: any) => 
      permissions.includes(p.name)
    );
    if (hasDirectPermission) return true;
    
    // Check role permissions
    const hasRolePermission = user.roles?.some((role: any) => 
      role.permissions?.some((p: any) => permissions.includes(p.name))
    );
    
    return !!hasRolePermission;
  }, []);

  // Check if user has a specific role
  const hasRole = useCallback((roleName: string): boolean => {
    const { auth } = usePage<PageProps>().props as any;
    const user = auth?.user;
    
    if (!user?.roles) return false;
    return user.roles.some((role: any) => role.name === roleName);
  }, []);

  // Check if user has any of the given roles
  const hasAnyRole = useCallback((...roleNames: string[]): boolean => {
    const { auth } = usePage<PageProps>().props as any;
    const user = auth?.user;
    
    if (!user?.roles) return false;
    return user.roles.some((role: any) => roleNames.includes(role.name));
  }, []);

  return {
    // State
    isLoading,
    isDeleting,
    isModalOpen,
    selectedItem,
    formRef,
    
    // Methods
    submit,
    handleDelete,
    openModal,
    closeModal,
    confirmAction,
    formatDate,
    formatFileSize,
    hasPermission,
    hasAnyPermission,
    hasRole,
    hasAnyRole,
  };
}
