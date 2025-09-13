import { useState } from "react";
import { 
  Settings, 
  Mail, 
  MapPin, 
  Bell,
  Building,
  FileText,
  CreditCard,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function BillingSettings() {
  const [emailNotifications, setEmailNotifications] = useState({
    invoices: true,
    paymentFailures: true,
    renewals: true,
    usage: false,
    marketing: false,
  });

  const [billingInfo, setBillingInfo] = useState({
    companyName: "Osto Inc.",
    email: "billing@osto.com",
    secondaryEmail: "finance@osto.com",
    phone: "+1 (555) 123-4567",
    taxId: "12-3456789",
    currency: "USD",
    timezone: "America/New_York",
  });

  const [address, setAddress] = useState({
    street: "123 Business Ave",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing Settings</h1>
        <p className="text-muted-foreground">
          Manage your billing information and preferences
        </p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={billingInfo.companyName}
                onChange={(e) => setBillingInfo(prev => ({...prev, companyName: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={billingInfo.taxId}
                onChange={(e) => setBillingInfo(prev => ({...prev, taxId: e.target.value}))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select value={billingInfo.currency} onValueChange={(value) => setBillingInfo(prev => ({...prev, currency: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">EUR - Euro</SelectItem>
                  <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={billingInfo.timezone} onValueChange={(value) => setBillingInfo(prev => ({...prev, timezone: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time</SelectItem>
                  <SelectItem value="America/Chicago">Central Time</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Billing Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryEmail">Primary Email</Label>
              <Input
                id="primaryEmail"
                type="email"
                value={billingInfo.email}
                onChange={(e) => setBillingInfo(prev => ({...prev, email: e.target.value}))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                This email will receive all billing communications
              </p>
            </div>
            <div>
              <Label htmlFor="secondaryEmail">Secondary Email</Label>
              <Input
                id="secondaryEmail"
                type="email"
                value={billingInfo.secondaryEmail}
                onChange={(e) => setBillingInfo(prev => ({...prev, secondaryEmail: e.target.value}))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Backup contact for billing issues
              </p>
            </div>
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={billingInfo.phone}
              onChange={(e) => setBillingInfo(prev => ({...prev, phone: e.target.value}))}
            />
          </div>
          
          <Button variant="outline">
            Verify Email Addresses
          </Button>
        </CardContent>
      </Card>

      {/* Billing Address */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Billing Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => setAddress(prev => ({...prev, street: e.target.value}))}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={address.city}
                onChange={(e) => setAddress(prev => ({...prev, city: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={address.state}
                onChange={(e) => setAddress(prev => ({...prev, state: e.target.value}))}
              />
            </div>
            <div>
              <Label htmlFor="zipCode">ZIP/Postal Code</Label>
              <Input
                id="zipCode"
                value={address.zipCode}
                onChange={(e) => setAddress(prev => ({...prev, zipCode: e.target.value}))}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="country">Country</Label>
            <Select value={address.country} onValueChange={(value) => setAddress(prev => ({...prev, country: value}))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Germany">Germany</SelectItem>
                <SelectItem value="France">France</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Invoice Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications when new invoices are generated
              </p>
            </div>
            <Switch
              checked={emailNotifications.invoices}
              onCheckedChange={(checked) => setEmailNotifications(prev => ({...prev, invoices: checked}))}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Payment Failure Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified immediately when payments fail
              </p>
            </div>
            <Switch
              checked={emailNotifications.paymentFailures}
              onCheckedChange={(checked) => setEmailNotifications(prev => ({...prev, paymentFailures: checked}))}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Renewal Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Reminders before subscription renewals
              </p>
            </div>
            <Switch
              checked={emailNotifications.renewals}
              onCheckedChange={(checked) => setEmailNotifications(prev => ({...prev, renewals: checked}))}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Usage Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Notifications when approaching usage limits
              </p>
            </div>
            <Switch
              checked={emailNotifications.usage}
              onCheckedChange={(checked) => setEmailNotifications(prev => ({...prev, usage: checked}))}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Communications</Label>
              <p className="text-sm text-muted-foreground">
                Product updates and promotional emails
              </p>
            </div>
            <Switch
              checked={emailNotifications.marketing}
              onCheckedChange={(checked) => setEmailNotifications(prev => ({...prev, marketing: checked}))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Changes */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset Changes</Button>
        <Button variant="gradient">Save All Changes</Button>
      </div>
    </div>
  );
}