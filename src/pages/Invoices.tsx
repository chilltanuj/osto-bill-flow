import { useState } from "react";
import { 
  FileText, 
  Download, 
  Eye, 
  CreditCard,
  Filter,
  Search,
  Calendar,
  DollarSign
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const invoices = [
  {
    id: "INV-2024-001",
    amount: 1545.00,
    status: "paid",
    date: "2023-12-15",
    dueDate: "2023-12-30",
    modules: ["Cloud Security", "Endpoint Security", "Network Security", "Compliance", "VAPT"],
    paymentMethod: "Visa •••• 4242",
    currency: "USD",
  },
  {
    id: "INV-2024-002",
    amount: 1545.00,
    status: "pending",
    date: "2024-01-15", 
    dueDate: "2024-01-30",
    modules: ["Cloud Security", "Endpoint Security", "Network Security", "Compliance", "VAPT"],
    paymentMethod: "Auto-pay enabled",
    currency: "USD",
  },
  {
    id: "INV-2024-003",
    amount: 499.00,
    status: "failed",
    date: "2024-01-15",
    dueDate: "2024-01-30",
    modules: ["VAPT"],
    paymentMethod: "Visa •••• 4242",
    currency: "USD",
  },
  {
    id: "INV-2023-012",
    amount: 1545.00,
    status: "paid",
    date: "2023-11-15",
    dueDate: "2023-11-30", 
    modules: ["Cloud Security", "Endpoint Security", "Network Security", "Compliance", "VAPT"],
    paymentMethod: "Visa •••• 4242",
    currency: "USD",
  },
  {
    id: "INV-2023-011",
    amount: 1046.00,
    status: "paid",
    date: "2023-10-15",
    dueDate: "2023-10-30",
    modules: ["Cloud Security", "Endpoint Security", "Network Security", "Compliance"],
    paymentMethod: "Visa •••• 4242",
    currency: "USD",
  },
];

const invoiceColumns = [
  { key: "id", header: "Invoice ID" },
  { key: "amount", header: "Amount", className: "text-right" },
  { key: "status", header: "Status" },
  { key: "date", header: "Invoice Date" },
  { key: "dueDate", header: "Due Date" },
  { key: "modules", header: "Modules" },
  { key: "actions", header: "Actions", className: "text-right" },
];

export default function Invoices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "paid": return "active";
      case "pending": return "warning";
      case "failed": return "failed";
      case "overdue": return "failed";
      default: return "active";
    }
  };

  const formatCurrency = (amount: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", 
      day: "numeric",
    });
  };

  const processedInvoices = invoices
    .filter((invoice) => {
      const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount, invoice.currency),
      date: formatDate(invoice.date),
      dueDate: formatDate(invoice.dueDate),
      status: (
        <StatusBadge variant={getStatusVariant(invoice.status)}>
          {invoice.status}
        </StatusBadge>
      ),
      modules: (
        <div className="flex flex-wrap gap-1">
          {invoice.modules.slice(0, 2).map((module, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {module}
            </Badge>
          ))}
          {invoice.modules.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{invoice.modules.length - 2} more
            </Badge>
          )}
        </div>
      ),
      actions: (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          {invoice.status === "pending" || invoice.status === "failed" ? (
            <Button variant="default" size="sm">
              <CreditCard className="w-4 h-4" />
              Pay
            </Button>
          ) : null}
        </div>
      ),
    }));

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices
    .filter(inv => inv.status === "pending" || inv.status === "failed")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Manage and track your billing invoices
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold">{formatCurrency(paidAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Payment</p>
                <p className="text-2xl font-bold">{formatCurrency(pendingAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DataTable
            columns={invoiceColumns}
            data={processedInvoices}
            onRowClick={(row) => setSelectedInvoice(row)}
          />
        </CardContent>
      </Card>
    </div>
  );
}