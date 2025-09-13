import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down" | "neutral";
  };
  icon?: React.ReactNode;
  variant?: "default" | "gradient" | "primary";
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, subtitle, trend, icon, variant = "default", ...props }, ref) => {
    const cardClasses = cn(
      "transition-smooth hover:shadow-elevated",
      variant === "gradient" && "bg-gradient-card border-primary/20",
      variant === "primary" && "bg-gradient-primary text-primary-foreground border-primary",
      className
    );

    const trendClasses = cn(
      "text-sm font-medium",
      trend?.direction === "up" && "text-success",
      trend?.direction === "down" && "text-destructive",
      trend?.direction === "neutral" && "text-muted-foreground"
    );

    return (
      <Card className={cardClasses} ref={ref} {...props}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-80">{title}</CardTitle>
          {icon && <div className="opacity-60">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{value}</div>
          {subtitle && (
            <p className="text-sm opacity-70 mb-1">{subtitle}</p>
          )}
          {trend && (
            <p className={trendClasses}>
              {trend.direction === "up" && "↗ "}
              {trend.direction === "down" && "↘ "}
              {trend.value}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }
);
MetricCard.displayName = "MetricCard";

export { MetricCard };