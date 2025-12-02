import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    title: "Business Owner",
    price: "$29",
    period: "/month",
    description: "For entrepreneurs ready to launch and grow.",
    features: [
      "Post up to 5 business ideas",
      "Access to investor and loan listings",
      "Direct messaging with investors",
      "Basic analytics",
    ],
    cta: "Choose Business Plan",
  },
  {
    title: "Investor",
    price: "$49",
    period: "/month",
    description: "For investors seeking the next big thing.",
    features: [
      "Post unlimited investment proposals",
      "Advanced search and filtering",
      "Direct messaging with business owners",
      "Full access to business proposals",
      "Priority support",
    ],
    cta: "Choose Investor Plan",
    featured: true,
  },
  {
    title: "Partner",
    price: "$39",
    period: "/month",
    description: "For bankers and advisors.",
    features: [
      "Post loan and advisory services",
      "Appear in partner listings",
      "Direct messaging with businesses",
      "Access to relevant business proposals",
    ],
    cta: "Choose Partner Plan",
  },
];

export default function PricingPage() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              Find the Perfect Plan
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Unlock powerful features to connect and grow. Simple, transparent pricing for everyone.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.title} className={`flex flex-col h-full ${plan.featured ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
