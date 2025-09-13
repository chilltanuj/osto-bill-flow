import { useState } from "react";
import { 
  Shield, 
  Server, 
  Network, 
  FileCheck, 
  SearchCheck,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const securityModules = [
  {
    name: "Cloud Security",
    status: "active",
    icon: Shield,
    usage: 85,
    limit: 100,
    nextBilling: "2024-01-15",
    amount: "$299/month",
  },
  {
    name: "Endpoint Security", 
    status: "active",
    icon: Server,
    usage: 67,
    limit: 75,
    nextBilling: "2024-01-15",
    amount: "$199/month",
  },
  {
    name: "Network Security",
    status: "warning",
    icon: Network,
    usage: 98,
    limit: 100,
    nextBilling: "2024-01-15",
    amount: "$399/month",
  },
  {
    name: "Compliance",
    status: "active",
    icon: FileCheck,
    usage: 45,
    limit: 50,
    nextBilling: "2024-01-15",
    amount: "$149/month",
  },
  {
    name: "VAPT",
    status: "failed",
    icon: SearchCheck,
    usage: 0,
    limit: 25,
    nextBilling: "2024-01-15",
    amount: "$499/month",
  },
];

const recentInvoices = [
  {
    invoice: "INV-2024-001",
    amount: "$1,545.00",
    status: "Paid",
    date: "Dec 15, 2023",
    modules: "5 modules",
  },
  {
    invoice: "INV-2024-002", 
    amount: "$1,545.00",
    status: "Pending",
    date: "Jan 15, 2024",
    modules: "5 modules",
  },
  {
    invoice: "INV-2024-003",
    amount: "$499.00",
    status: "Failed",
    date: "Jan 15, 2024",
    modules: "VAPT",
  },
];

const invoiceColumns = [
  { key: "invoice", header: "Invoice" },
  { key: "amount", header: "Amount", className: "text-right" },
  { key: "status", header: "Status" },
  { key: "date", header: "Date" },
  { key: "modules", header: "Modules" },
];

export default function Dashboard() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "active";
      case "warning": return "warning";
      case "failed": return "failed";
      default: return "active";
    }
  };

  const getUsageColor = (usage: number, limit: number) => {
    const percentage = (usage / limit) * 100;
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-warning";
    return "bg-success";
  };

  const processedInvoices = recentInvoices.map(invoice => ({
    ...invoice,
    status: (
      <StatusBadge 
        variant={invoice.status === "Paid" ? "active" : invoice.status === "Failed" ? "failed" : "warning"}
      >
        {invoice.status}
      </StatusBadge>
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your cybersecurity subscriptions and billing
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Monthly Spend"
          value="$1,545"
          subtitle="5 active modules"
          trend={{ value: "+12%", direction: "up" }}
          icon={<DollarSign className="w-5 h-5" />}
          variant="gradient"
        />
        <MetricCard
          title="Next Payment"
          value="Jan 15"
          subtitle="$1,545 due"
          icon={<Calendar className="w-5 h-5" />}
        />
        <MetricCard
          title="Active Modules"
          value="4/5"
          subtitle="1 payment failed"
          trend={{ value: "1 issue", direction: "down" }}
          icon={<Shield className="w-5 h-5" />}
        />
        <MetricCard
          title="Usage Alerts"
          value="2"
          subtitle="Approaching limits"
          icon={<AlertTriangle className="w-5 h-5" />}
          variant="primary"
        />
      </div>

      {/* Active Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Active Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {securityModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card key={index} className="bg-gradient-card hover:shadow-elevated transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{module.name}</h3>
                          <p className="text-sm text-muted-foreground">{module.amount}</p>
                        </div>
                      </div>
                      <StatusBadge variant={getStatusVariant(module.status)}>
                        {module.status}
                      </StatusBadge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Usage</span>
                        <span>{module.usage}/{module.limit}</span>
                      </div>
                      <Progress 
                        value={(module.usage / module.limit) * 100} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        Next billing: {module.nextBilling}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Invoices</CardTitle>
          <Button variant="outline" size="sm">
            View All Invoices
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={invoiceColumns}
            data={processedInvoices}
            variant="compact"
          />
        </CardContent>
      </Card>
    </div>
  );
}