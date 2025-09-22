import { useForm as useInertiaForm } from '@inertiajs/react';
import { FormEvent, ReactNode, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FormField = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'textarea' | 'date' | 'datetime-local' | 'time' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string | number; label: string }>;
  defaultValue?: any;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  helpText?: string;
  rows?: number;
  cols?: number;
  autoComplete?: string;
  autoFocus?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  multiple?: boolean;
  accept?: string;
  render?: (field: any, error: string | undefined) => ReactNode;
};

type FormProps = {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
  className?: string;
  submitButtonProps?: any;
  cancelButtonProps?: any;
  formProps?: any;
  loading?: boolean;
  errors?: Record<string, string>;
  defaultValues?: Record<string, any>;
  gridCols?: number;
  showActions?: boolean;
  resetOnSubmit?: boolean;
};

export function Form({
  fields,
  onSubmit,
  submitText = 'Save',
  cancelText = 'Cancel',
  onCancel,
  className = '',
  submitButtonProps = {},
  cancelButtonProps = {},
  formProps = {},
  loading = false,
  errors = {},
  defaultValues = {},
  gridCols = 1,
  showActions = true,
  resetOnSubmit = false,
}: FormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Set up form with default values
  const { data, setData, post, put, reset, processing } = useInertiaForm(
    fields.reduce((acc, field) => {
      const value = defaultValues[field.name] !== undefined 
        ? defaultValues[field.name] 
        : field.defaultValue !== undefined 
          ? field.defaultValue 
          : '';
      return { ...acc, [field.name]: value };
    }, {})
  );

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(data);
    
    if (resetOnSubmit) {
      reset();
    }
  };

  // Render form field based on type
  const renderField = (field: FormField) => {
    const error = errors?.[field.name];
    const fieldValue = data[field.name] ?? '';
    const fieldId = `field-${field.name}`;

    // Allow custom render function
    if (field.render) {
      return field.render(field, error);
    }

    // Common input props
    const inputProps = {
      id: fieldId,
      name: field.name,
      value: fieldValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = field.type === 'checkbox' 
          ? (e.target as HTMLInputElement).checked 
          : e.target.value;
        setData(field.name, value);
      },
      placeholder: field.placeholder,
      required: field.required,
      disabled: field.disabled || loading,
      className: cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        field.inputClassName,
        error ? 'border-red-500' : 'border-input',
      ),
      autoComplete: field.autoComplete,
      autoFocus: field.autoFocus,
      min: field.min,
      max: field.max,
      step: field.step,
      multiple: field.multiple,
      accept: field.accept,
    };

    // Render different input types
    switch (field.type) {
      case 'select':
        return (
          <select {...inputProps}>
            {field.placeholder && !field.defaultValue && (
              <option value="">{field.placeholder}</option>
            )}
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center h-10">
            <input
              type="checkbox"
              {...inputProps}
              checked={!!fieldValue}
              className={cn(
                'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
                field.inputClassName,
                error ? 'border-red-500' : 'border-input',
              )}
            />
          </div>
        );
      
      case 'textarea':
        return (
          <textarea
            {...inputProps}
            rows={field.rows || 3}
            cols={field.cols}
            className={cn(
              'min-h-[80px]',
              inputProps.className,
            )}
          />
        );
      
      default:
        return <input type={field.type || 'text'} {...inputProps} />;
    }
  };

  // Calculate grid classes based on number of columns
  const getGridClasses = () => {
    const cols = Math.min(Math.max(1, gridCols), 4);
    return {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }[cols];
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      {...formProps}
    >
      <div className={cn('grid gap-6', getGridClasses())}>
        {fields.map((field) => (
          <div key={field.name} className={cn('space-y-2', field.className)}>
            {field.label && (
              <label 
                htmlFor={`field-${field.name}`}
                className={cn('block text-sm font-medium leading-none', field.labelClassName, {
                  'after:content-["*"] after:ml-0.5 after:text-red-500': field.required,
                })}
              >
                {field.label}
              </label>
            )}
            
            {renderField(field)}
            
            {field.helpText && !errors?.[field.name] && (
              <p className="text-xs text-muted-foreground">
                {field.helpText}
              </p>
            )}
            
            {errors?.[field.name] && (
              <p className="text-xs text-red-500">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      
      {showActions && (
        <div className="flex justify-end space-x-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={processing || loading}
            {...submitButtonProps}
          >
            {processing || loading ? 'Saving...' : submitText}
          </Button>
        </div>
      )}
    </form>
  );
}

// Re-export useForm from Inertia with our custom types
export { useInertiaForm as useForm };
