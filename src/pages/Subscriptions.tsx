import { useState } from "react";
import { 
  Shield, 
  Server, 
  Network, 
  FileCheck, 
  SearchCheck,
  Settings,
  Pause,
  Play,
  Trash2,
  TrendingUp,
  MoreVertical
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const subscriptions = [
  {
    id: 1,
    name: "Cloud Security Pro",
    icon: Shield,
    status: "active",
    plan: "Professional",
    price: 299,
    usage: { current: 85, limit: 100, unit: "assets" },
    nextBilling: "2024-01-15",
    features: ["Real-time monitoring", "Threat detection", "Compliance reports"],
    canUpgrade: true,
  },
  {
    id: 2,
    name: "Endpoint Security",
    icon: Server,
    status: "active", 
    plan: "Standard",
    price: 199,
    usage: { current: 67, limit: 75, unit: "endpoints" },
    nextBilling: "2024-01-15",
    features: ["Antivirus protection", "Device management", "Patch management"],
    canUpgrade: true,
  },
  {
    id: 3,
    name: "Network Security",
    icon: Network,
    status: "warning",
    plan: "Enterprise",
    price: 399,
    usage: { current: 98, limit: 100, unit: "devices" },
    nextBilling: "2024-01-15",
    features: ["Firewall management", "IDS/IPS", "Network monitoring"],
    canUpgrade: false,
  },
  {
    id: 4,
    name: "Compliance Suite",
    icon: FileCheck,
    status: "active",
    plan: "Standard",
    price: 149,
    usage: { current: 45, limit: 50, unit: "frameworks" },
    nextBilling: "2024-01-15",
    features: ["Audit trails", "Policy management", "Risk assessment"],
    canUpgrade: true,
  },
  {
    id: 5,
    name: "VAPT Services",
    icon: SearchCheck,
    status: "failed",
    plan: "Professional",
    price: 499,
    usage: { current: 0, limit: 25, unit: "scans" },
    nextBilling: "2024-01-15",
    features: ["Vulnerability scanning", "Penetration testing", "Security reports"],
    canUpgrade: false,
  },
];

export default function Subscriptions() {
  const [selectedSubscription, setSelectedSubscription] = useState<number | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "active";
      case "warning": return "warning";
      case "failed": return "failed";
      default: return "active";
    }
  };

  const getUsageColor = (current: number, limit: number) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return "text-destructive";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your cybersecurity module subscriptions
          </p>
        </div>
        <Button variant="gradient">
          <TrendingUp className="w-4 h-4" />
          Upgrade Plans
        </Button>
      </div>

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {subscriptions.map((subscription) => {
          const IconComponent = subscription.icon;
          const usagePercentage = (subscription.usage.current / subscription.usage.limit) * 100;
          
          return (
            <Card 
              key={subscription.id} 
              className="bg-gradient-card hover:shadow-elevated transition-smooth cursor-pointer"
              onClick={() => setSelectedSubscription(subscription.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{subscription.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{subscription.plan}</Badge>
                        <StatusBadge variant={getStatusVariant(subscription.status)}>
                          {subscription.status}
                        </StatusBadge>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {subscription.canUpgrade && (
                        <DropdownMenuItem>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Upgrade Plan
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pause className="w-4 h-4 mr-2" />
                        Pause Subscription
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Cancel Subscription
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${subscription.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                {/* Usage */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Usage</span>
                    <span className={getUsageColor(subscription.usage.current, subscription.usage.limit)}>
                      {subscription.usage.current}/{subscription.usage.limit} {subscription.usage.unit}
                    </span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                  {usagePercentage >= 90 && (
                    <p className="text-xs text-warning">
                      ⚠️ Approaching usage limit
                    </p>
                  )}
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Included Features</h4>
                  <div className="space-y-1">
                    {subscription.features.map((feature, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                        <div className="w-1 h-1 bg-success rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Billing */}
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Next billing: {subscription.nextBilling}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {subscription.status === "failed" ? (
                    <Button variant="destructive" size="sm" className="flex-1">
                      Update Payment Method
                    </Button>
                  ) : (
                    <>
                      {subscription.canUpgrade && (
                        <Button variant="outline" size="sm" className="flex-1">
                          Upgrade
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="flex-1">
                        Manage
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add New Subscription */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-smooth cursor-pointer">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Add New Security Module</h3>
          <p className="text-muted-foreground mb-4">
            Enhance your security posture with additional modules
          </p>
          <Button variant="outline">
            Browse Available Modules
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}