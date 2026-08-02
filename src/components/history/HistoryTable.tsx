'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { Pagination } from './Pagination';
import { EmptyState } from '../ui/EmptyState';
import { MoreHorizontal, Eye, Printer, Download, Trash2, RotateCcw, Filter, ChevronDown, ChevronUp, Search, FileText, FileImage } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '../ui/DropdownMenu';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/Tooltip';
import { formatDate } from '@/utils/helpers';
import type { LabelHistory } from '@/types';
import { useAppStore } from '@/store/appStore';

interface HistoryTableProps {
  className?: string;
  onView?: (label: LabelHistory) => void;
  onPrint?: (label: LabelHistory) => void;
  onExport?: (label: LabelHistory, format: 'pdf' | 'png' | 'svg') => void;
  onVoid?: (label: LabelHistory, reason: string) => void;
  onDuplicate?: (label: LabelHistory) => void;
}

export function HistoryTable({
  className,
  onView,
  onPrint,
  onExport,
  onVoid,
  onDuplicate,
}: HistoryTableProps) {
  const history = useAppStore(state => state.history);
  const deleteFromHistory = useAppStore(state => state.deleteFromHistory);
  const voidLabel = useAppStore(state => state.voidLabel);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange] = useState<{ from?: Date; to?: Date }>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'createdAt', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const statuses = ['all', 'draft', 'generated', 'printed', 'voided'];

  const filteredHistory = history
    .filter(item => {
      const matchesSearch = search === '' ||
        item.trackingNumber?.toLowerCase().includes(search.toLowerCase()) ||
        item.shipper.name.toLowerCase().includes(search.toLowerCase()) ||
        item.consignee.name.toLowerCase().includes(search.toLowerCase()) ||
        item.templateName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      const matchesDate = (!dateRange.from || new Date(item.createdAt) >= dateRange.from) &&
        (!dateRange.to || new Date(item.createdAt) <= dateRange.to);

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.key as keyof LabelHistory];
      const bVal = b[sortConfig.key as keyof LabelHistory];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortConfig.direction === 'asc' ? -1 : 1;
      if (bVal == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredHistory.length / pageSize);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'success' | 'warning' | 'destructive' | 'outline'> = {
      draft: 'outline',
      generated: 'secondary',
      printed: 'success',
      voided: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  const handleAction = (action: string, item: LabelHistory) => {
    switch (action) {
      case 'view':
        onView?.(item);
        break;
      case 'print':
        onPrint?.(item);
        break;
      case 'export-pdf':
        onExport?.(item, 'pdf');
        break;
      case 'export-png':
        onExport?.(item, 'png');
        break;
      case 'duplicate':
        onDuplicate?.(item);
        break;
      case 'void':
        const reason = prompt('Enter reason for voiding:');
        if (reason) {
          voidLabel(item.id, reason);
          if (onVoid) onVoid(item, reason);
        }
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this label from history?')) {
          deleteFromHistory(item.id);
        }
        break;
    }
  };

  if (history.length === 0) {
    return (
      <Card className={className}>
        <EmptyState
          icon={<FileText className="h-12 w-12" />}
          title="No Labels in History"
          description="Generate your first shipping label to see it appear here."
          action={{
            label: 'Create Label',
            onClick: () => window.location.href = '/generate',
          }}
        />
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg">Label History</CardTitle>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filters</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search labels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
            options={statuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }))}
            className="w-40"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead onClick={() => handleSort('createdAt')} className="cursor-pointer">
                  Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead onClick={() => handleSort('trackingNumber')} className="cursor-pointer">
                  Tracking # {sortConfig.key === 'trackingNumber' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead onClick={() => handleSort('shipper')} className="cursor-pointer">
                  From {sortConfig.key === 'shipper' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead onClick={() => handleSort('consignee')} className="cursor-pointer">
                  To {sortConfig.key === 'consignee' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead onClick={() => handleSort('templateName')} className="cursor-pointer">
                  Template {sortConfig.key === 'templateName' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead onClick={() => handleSort('status')} className="cursor-pointer">
                  Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />)}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No labels match your filters
                  </TableCell>
                </TableRow>
              ) : (
                paginatedHistory.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{formatDate(item.createdAt)}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {item.trackingNumber || <span className="text-muted-foreground">Auto-generated</span>}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.shipper.name}</div>
                      <div className="text-sm text-muted-foreground">{item.shipper.company}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{item.consignee.name}</div>
                      <div className="text-sm text-muted-foreground">{item.consignee.company}</div>
                    </TableCell>
                    <TableCell>{item.templateName}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleAction('view', item)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('print', item)}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction('export-pdf', item)}>
                            <Download className="mr-2 h-4 w-4" />
                            Export as PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('export-png', item)}>
                            <FileImage className="mr-2 h-4 w-4" />
                            Export as PNG
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction('duplicate', item)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          {item.status !== 'voided' && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleAction('void', item)}
                                className="text-destructive focus:text-destructive-foreground"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Void Label
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleAction('delete', item)}
                            className="text-destructive focus:text-destructive-foreground"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete from History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            totalItems={filteredHistory.length}
          />
        )}
      </CardContent>
    </Card>
  );
}