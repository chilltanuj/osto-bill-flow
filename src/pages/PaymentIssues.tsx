import { useState } from "react";
import { 
  AlertTriangle, 
  CreditCard, 
  RefreshCw, 
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "@/components/ui/data-table";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const paymentIssues = [
  {
    id: "ISSUE-001",
    type: "card_declined",
    invoice: "INV-2024-003",
    amount: "$499.00",
    module: "VAPT Services",
    date: "2024-01-15",
    status: "active",
    retryCount: 3,
    nextRetry: "2024-01-16 14:00",
    reason: "Insufficient funds",
  },
  {
    id: "ISSUE-002", 
    type: "card_expired",
    invoice: "INV-2024-002",
    amount: "$199.00",
    module: "Endpoint Security",
    date: "2024-01-10",
    status: "resolved",
    retryCount: 0,
    nextRetry: null,
    reason: "Card expired",
  },
  {
    id: "ISSUE-003",
    type: "payment_method_removed",
    invoice: "INV-2023-012",
    amount: "$299.00", 
    module: "Cloud Security",
    date: "2023-12-20",
    status: "grace_period",
    retryCount: 1,
    nextRetry: "2023-12-25 09:00",
    reason: "Payment method was removed",
  },
];

const issueColumns = [
  { key: "id", header: "Issue ID" },
  { key: "type", header: "Type" },
  { key: "invoice", header: "Invoice" },
  { key: "amount", header: "Amount", className: "text-right" },
  { key: "module", header: "Module" },
  { key: "status", header: "Status" },
  { key: "actions", header: "Actions", className: "text-right" },
];

export default function PaymentIssues() {
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "failed";
      case "grace_period": return "warning";
      case "resolved": return "active";
      default: return "failed";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "card_declined": return <XCircle className="w-4 h-4 text-destructive" />;
      case "card_expired": return <Clock className="w-4 h-4 text-warning" />;
      case "payment_method_removed": return <CreditCard className="w-4 h-4 text-destructive" />;
      default: return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const formatType = (type: string) => {
    switch (type) {
      case "card_declined": return "Card Declined";
      case "card_expired": return "Card Expired";
      case "payment_method_removed": return "Payment Method Removed";
      default: return type;
    }
  };

  const processedIssues = paymentIssues.map((issue) => ({
    ...issue,
    type: (
      <div className="flex items-center gap-2">
        {getTypeIcon(issue.type)}
        {formatType(issue.type)}
      </div>
    ),
    status: (
      <StatusBadge variant={getStatusVariant(issue.status)}>
        {issue.status.replace('_', ' ')}
      </StatusBadge>
    ),
    actions: (
      <div className="flex items-center gap-1">
        {issue.status === "active" && (
          <>
            <Button variant="default" size="sm">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
            <Button variant="outline" size="sm">
              Update Payment
            </Button>
          </>
        )}
        {issue.status === "grace_period" && (
          <Button variant="warning" size="sm">
            Resolve Now
          </Button>
        )}
      </div>
    ),
  }));

  const activeIssues = paymentIssues.filter(issue => issue.status === "active").length;
  const gracePeriodIssues = paymentIssues.filter(issue => issue.status === "grace_period").length;
  const resolvedIssues = paymentIssues.filter(issue => issue.status === "resolved").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Issues</h1>
          <p className="text-muted-foreground">
            Manage and resolve payment-related issues
          </p>
        </div>
        
        <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Phone className="w-4 h-4" />
              Contact Support
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contact Billing Support</DialogTitle>
              <DialogDescription>
                Need help with payment issues? Our billing team is here to assist.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="issue-description">Describe your issue</Label>
                <Textarea 
                  id="issue-description"
                  placeholder="Please describe the payment issue you're experiencing..."
                  rows={4}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setContactDialogOpen(false)}>
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Issues</p>
                <p className="text-2xl font-bold text-destructive">{activeIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Grace Period</p>
                <p className="text-2xl font-bold text-warning">{gracePeriodIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold text-success">{resolvedIssues}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Issues */}
      {activeIssues > 0 && (
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Urgent: Payment Issues Requiring Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentIssues
                .filter(issue => issue.status === "active")
                .map((issue) => (
                  <div key={issue.id} className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(issue.type)}
                      <div>
                        <h4 className="font-medium">{formatType(issue.type)}</h4>
                        <p className="text-sm text-muted-foreground">
                          {issue.module} - {issue.amount} ({issue.invoice})
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {issue.reason} • Next retry: {issue.nextRetry}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="destructive" size="sm">
                        <RefreshCw className="w-4 h-4" />
                        Retry Payment
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Payment Method
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Issue History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={issueColumns}
            data={processedIssues}
            onRowClick={(row) => setSelectedIssue(row)}
          />
        </CardContent>
      </Card>

      {/* Recovery Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Automatic Recovery Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium">
                  1
                </div>
                <h4 className="font-medium">Immediate Retry</h4>
                <p className="text-sm text-muted-foreground">
                  First retry happens within 1 hour
                </p>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium">
                  2
                </div>
                <h4 className="font-medium">Grace Period</h4>
                <p className="text-sm text-muted-foreground">
                  7-day grace period with service maintained
                </p>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-medium">
                  3
                </div>
                <h4 className="font-medium">Service Suspension</h4>
                <p className="text-sm text-muted-foreground">
                  Service paused until payment is resolved
                </p>
              </div>
            </div>
            
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <p className="text-sm">
                <strong>Pro Tip:</strong> Add multiple payment methods to reduce the risk of payment failures. 
                Our system will automatically try backup payment methods if the primary method fails.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}