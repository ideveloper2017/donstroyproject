import { useState, useEffect, useMemo } from 'react';
import { Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search, SlidersHorizontal } from 'lucide-react';
import { formatDate } from '@/lib/admin-utils';

// Types
type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: (value: any, item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  pagination?: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    onPageChange: (page: number) => void;
    onPerPageChange?: (perPage: number) => void;
  };
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearch?: (search: string) => void;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  actions?: (item: T) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  rowClassName?: string;
  onRowClick?: (item: T) => void;
};

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pagination,
  searchable = false,
  searchPlaceholder = 'Search...',
  onSearch,
  onSort,
  sortField,
  sortDirection = 'asc',
  actions,
  emptyState,
  className = '',
  rowClassName = '',
  onRowClick,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [localData, setLocalData] = useState<T[]>(data);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  // Update local data when data prop changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Handle search
  useEffect(() => {
    if (onSearch) {
      const timer = setTimeout(() => {
        onSearch(search);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [search, onSearch]);

  // Handle sort
  const handleSort = (field: string) => {
    if (!onSort) return;
    
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, direction);
  };

  // Render cell content
  const renderCellContent = (column: Column<T>, item: T) => {
    let content: any;
    
    if (typeof column.accessor === 'function') {
      content = column.accessor(item);
    } else {
      content = item[column.accessor];
      
      // Apply custom cell renderer if provided
      if (column.cell) {
        return column.cell(content, item);
      }
      
      // Format dates
      if (content instanceof Date || (typeof content === 'string' && !isNaN(Date.parse(content)))) {
        return formatDate(content);
      }
      
      // Handle boolean values
      if (typeof content === 'boolean') {
        return content ? 'Yes' : 'No';
      }
      
      // Handle null/undefined
      if (content === null || content === undefined) {
        return '-';
      }
    }
    
    return content || '-';
  };

  // Empty state
  const renderEmptyState = () => {
    if (emptyState) return emptyState;
    
    return (
      <TableRow>
        <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
          No results found.
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {searchable && (
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="ml-auto"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          
          {pagination?.onPerPageChange && (
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Rows per page</p>
              <Select
                value={`${pagination.perPage}`}
                onValueChange={(value) => pagination.onPerPageChange?.(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pagination.perPage} />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
      
      {/* Filters panel */}
      {showFilters && (
        <div className="rounded-md border p-4">
          <h4 className="text-sm font-medium mb-4">Filters</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <div key={String(column.header)}>
                <label className="text-sm font-medium text-muted-foreground">
                  {column.header}
                </label>
                <Input
                  placeholder={`Filter ${column.header.toLowerCase()}...`}
                  className="mt-1"
                  value={filters[String(column.accessor)] || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      [String(column.accessor)]: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilters({});
                setShowFilters(false);
              }}
            >
              Clear all
            </Button>
            <Button size="sm" onClick={() => setShowFilters(false)}>
              Apply filters
            </Button>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={String(column.header)}
                  className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => column.sortable && onSort && handleSort(String(column.accessor))}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && onSort && (
                      <span className="ml-2">
                        {sortField === column.accessor && (
                          sortDirection === 'asc' ? '↑' : '↓'
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {actions && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {localData.length > 0 ? (
              localData.map((item, index) => (
                <TableRow 
                  key={index} 
                  className={onRowClick ? 'cursor-pointer hover:bg-muted/50' : ''}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.header)} className={column.className}>
                      {renderCellContent(column, item)}
                    </TableCell>
                  ))}
                  {actions && (
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        {actions(item)}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              renderEmptyState()
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{pagination.perPage * (pagination.currentPage - 1) + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(pagination.perPage * pagination.currentPage, pagination.total)}
            </span>{' '}
            of <span className="font-medium">{pagination.total}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => pagination.onPageChange(1)}
              disabled={pagination.currentPage === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {pagination.currentPage} of {pagination.lastPage}
            </div>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.lastPage}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => pagination.onPageChange(pagination.lastPage)}
              disabled={pagination.currentPage === pagination.lastPage}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
