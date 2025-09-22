import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

type NavItem = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
  permission?: string;
};

type NavProps = {
  navigation: NavItem[];
  className?: string;
};

export function Nav({ navigation, className }: NavProps) {
  return (
    <nav className={cn('flex space-x-4 lg:space-x-6', className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
            item.current
              ? 'border-primary-500 text-gray-900'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
            'transition-colors duration-200'
          )}
        >
          <item.icon className="mr-2 h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({ navigation }: { navigation: NavItem[] }) {
  return (
    <nav className="flex flex-1 flex-col space-y-1 px-2 pb-3 pt-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-base font-medium',
            item.current
              ? 'bg-primary-50 text-primary-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            'transition-colors duration-200'
          )}
        >
          <item.icon
            className={cn(
              'mr-3 h-6 w-6 flex-shrink-0',
              item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
