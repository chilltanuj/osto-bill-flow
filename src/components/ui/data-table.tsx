import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: {
    key: string;
    header: string;
    className?: string;
  }[];
  data: Record<string, any>[];
  onRowClick?: (row: Record<string, any>, index: number) => void;
  variant?: "default" | "compact" | "elevated";
}

const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, columns, data, onRowClick, variant = "default", ...props }, ref) => {
    const tableClasses = cn(
      variant === "compact" && "[&_td]:py-2 [&_th]:py-2",
      variant === "elevated" && "shadow-card"
    );

    const rowClasses = cn(
      "transition-smooth",
      onRowClick && "cursor-pointer hover:bg-muted/50"
    );

    return (
      <Card className={cn("overflow-hidden", className)} ref={ref} {...props}>
        <Table className={tableClasses}>
          <TableHeader>
            <TableRow className="bg-muted/30">
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="text-center py-8 text-muted-foreground"
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={index}
                  className={rowClasses}
                  onClick={() => onRowClick?.(row, index)}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} className={column.className}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }
);
DataTable.displayName = "DataTable";

export { DataTable };