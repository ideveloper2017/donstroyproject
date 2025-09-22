import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  actions?: ReactNode;
  noPadding?: boolean;
  fullWidth?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
};

export function Card({
  title,
  description,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  actions,
  noPadding = false,
  fullWidth = false,
  variant = 'default',
}: CardProps) {
  const variantClasses = {
    default: 'bg-card text-card-foreground border',
    outlined: 'bg-transparent border border-border',
    elevated: 'bg-card text-card-foreground shadow-sm',
  };

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        variantClasses[variant],
        !fullWidth && 'max-w-full',
        className
      )}
    >
      {(title || description || actions) && (
        <div
          className={cn(
            'border-b border-border bg-card px-6 py-4',
            headerClassName,
            {
              'flex items-center justify-between': actions,
            }
          )}
        >
          <div>
            {title && (
              <h3 className="text-lg font-semibold leading-6 text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="mt-0">{actions}</div>}
        </div>
      )}

      <div
        className={cn(
          !noPadding && 'p-6',
          'bg-card text-card-foreground',
          bodyClassName
        )}
      >
        {children}
      </div>

      {footer && (
        <div
          className={cn(
            'border-t border-border bg-muted/50 px-6 py-4',
            footerClassName
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
}

type CardGridProps = {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
};

export function CardGrid({
  children,
  className = '',
  cols = 3,
  gap = 'md',
}: CardGridProps) {
  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  };

  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid',
        colClasses[cols],
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
  trend?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
    label?: string;
  };
  className?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className = '',
}: StatCardProps) {
  const trendColors = {
    increase: 'text-green-600 dark:text-green-400',
    decrease: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-500 dark:text-gray-400',
  };

  const trendIcons = {
    increase: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    ),
    decrease: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    ),
    neutral: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
  };

  return (
    <Card className={cn('h-full', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-foreground">{value}</p>
            {trend && (
              <div
                className={cn(
                  'ml-2 flex items-center text-sm font-medium',
                  trendColors[trend.type]
                )}
              >
                {trendIcons[trend.type]}
                <span className="ml-1">
                  {trend.value}
                  {trend.label && ` ${trend.label}`}
                </span>
              </div>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-lg bg-primary/10 p-3 text-primary">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </Card>
  );
}
