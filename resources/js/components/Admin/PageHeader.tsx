import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
    onClick?: () => void;
  };
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
  children?: ReactNode;
};

export function PageHeader({
  title,
  description,
  action,
  breadcrumbs = [],
  className = '',
  children,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-4 flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && (
                  <svg
                    className="mx-1 h-3 w-3 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="flex items-center gap-2">
            {action.onClick ? (
              <Button
                variant={action.variant || 'default'}
                onClick={action.onClick}
                className="whitespace-nowrap"
              >
                {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                {action.label}
              </Button>
            ) : (
              <Button
                asChild
                variant={action.variant || 'default'}
                className="whitespace-nowrap"
              >
                <Link href={action.href}>
                  {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                  {action.label}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
}
