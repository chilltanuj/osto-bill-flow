import { useState } from "react";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Edit,
  Check,
  AlertTriangle,
  Building,
  Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const paymentMethods = [
  {
    id: 1,
    type: "credit_card",
    brand: "Visa",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    holderName: "John Doe",
    isDefault: true,
    status: "active",
    addedDate: "2023-06-15",
  },
  {
    id: 2,
    type: "credit_card", 
    brand: "Mastercard",
    last4: "5555",
    expiryMonth: "08",
    expiryYear: "2024",
    holderName: "John Doe",
    isDefault: false,
    status: "expired",
    addedDate: "2022-11-20",
  },
  {
    id: 3,
    type: "bank_account",
    bankName: "Chase Bank",
    last4: "6789",
    accountType: "Checking",
    holderName: "Osto Inc.",
    isDefault: false,
    status: "active",
    addedDate: "2023-09-10",
  },
];

export default function PaymentMethods() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("credit_card");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "active";
      case "expired": return "failed";
      case "pending": return "warning";
      default: return "active";
    }
  };

  const getBrandIcon = (brand: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="w-5 h-5" />;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "credit_card": return <CreditCard className="w-5 h-5" />;
      case "bank_account": return <Landmark className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Methods</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and billing preferences
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4" />
              Add Payment Method
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
              <DialogDescription>
                Add a new payment method for your subscriptions
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Payment Type</Label>
                <Select value={paymentType} onValueChange={setPaymentType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank_account">Bank Account (ACH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentType === "credit_card" ? (
                <>
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="holderName">Cardholder Name</Label>
                    <Input id="holderName" placeholder="John Doe" />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="routingNumber">Routing Number</Label>
                    <Input id="routingNumber" placeholder="123456789" />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input id="accountNumber" placeholder="987654321" />
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking</SelectItem>
                        <SelectItem value="savings">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Add Payment Method
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="bg-gradient-card hover:shadow-elevated transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {getTypeIcon(method.type)}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {method.type === "credit_card" 
                          ? `${method.brand} •••• ${method.last4}`
                          : `${method.bankName} •••• ${method.last4}`
                        }
                      </h3>
                      {method.isDefault && (
                        <Badge variant="outline" className="text-xs">
                          <Check className="w-3 h-3 mr-1" />
                          Default
                        </Badge>
                      )}
                      <StatusBadge variant={getStatusVariant(method.status)} size="sm">
                        {method.status}
                      </StatusBadge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{method.holderName}</span>
                      {method.type === "credit_card" ? (
                        <span>Expires {method.expiryMonth}/{method.expiryYear}</span>
                      ) : (
                        <span>{method.accountType} Account</span>
                      )}
                      <span>Added {new Date(method.addedDate).toLocaleDateString()}</span>
                    </div>

                    {method.status === "expired" && (
                      <div className="flex items-center gap-1 text-xs text-destructive">
                        <AlertTriangle className="w-3 h-3" />
                        This payment method has expired
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!method.isDefault && method.status === "active" && (
                    <Button variant="outline" size="sm">
                      Set as Default
                    </Button>
                  )}
                  
                  {method.status === "expired" && (
                    <Button variant="warning" size="sm">
                      Update
                    </Button>
                  )}
                  
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  {!method.isDefault && (
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payment Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Payment Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Configure the order in which payment methods will be attempted for automatic payments.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium">Visa •••• 4242</p>
                <p className="text-sm text-muted-foreground">Primary payment method</p>
              </div>
              <Badge>Default</Badge>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className="w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium">Chase Bank •••• 6789</p>
                <p className="text-sm text-muted-foreground">Backup payment method</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="mt-4">
            Configure Hierarchy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}